const express = require('express');
const { Company }= require('../models');

const router = express.Router();

const getExternalApiConfig = () => ({
  baseUrl: process.env.EXTERNAL_API_BASE_URL,
  loginPath: process.env.EXTERNAL_API_LOGIN_PATH || '/api/login',
  emissionsPath: process.env.EXTERNAL_API_EMISSIONS_PATH || '/api/admin/emisiones-por-empresa',
  email: process.env.EXTERNAL_API_EMAIL,
  password: process.env.EXTERNAL_API_PASSWORD,
});

const buildSyncNotFoundMessage = (companyName) =>
  `La empresa ${companyName} no aparece al momento de revisar la ruta. Comuníquese con quienes administran la API.`;

const buildExternalUrl = (baseUrl, path) =>
  `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

const normalizeCompanyName = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getTargetEmissionYear = (value) => {
  const parsedYear = Number(value);
  if (Number.isInteger(parsedYear) && parsedYear > 1900) return parsedYear;
  return new Date().getFullYear() - 1;
};

const roundToTwoDecimals = (value) => {
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return null;
  return Number(parsedValue.toFixed(2));
};

const loginToExternalApi = async ({ baseUrl, loginPath, email, password }) => {
  const response = await fetch(buildExternalUrl(baseUrl, loginPath), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('External API login failed');
  }

  const data = await response.json();
  const token = data.access_token || data.token;
  if (!token) {
    throw new Error('External API token missing');
  }

  return token;
};

const fetchExternalEmissions = async ({ baseUrl, emissionsPath, token, year }) => {
  const url = new URL(buildExternalUrl(baseUrl, emissionsPath));
  url.searchParams.set('anio', String(year));

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('External emissions request failed');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.data || data.emisiones || [];
};

const getExternalEmissionIntensity = (externalData) => {
  const intensity =
    externalData.intensidad_emisiones_kgco2e_unidad ??
    externalData.medida_productiva_anio?.intensidad_emisiones_kgco2e_unidad;

  const parsedIntensity = Number(intensity);
  if (!Number.isFinite(parsedIntensity)) return null;

  return parsedIntensity / 365;
};

// ✅ Get all companies
router.get('/', async (_req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// ✅ Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// ✅ Create company
router.post('/', async (req, res) => {
  try {
     const userId = req.user?.id; 
     const companyData = {
       ...req.body,
       created_by: userId,
       updated_by: userId,
     };
    const company = await Company.create(companyData);
    res.status(201).json(company);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create company' });
  }
});

// ✅ Update company
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    await company.update(req.body);
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update company' });
  }
});

// ✅ Sync company carbon footprint from external platform
router.post('/:id/sync-carbon-footprint', async (req, res) => {
  let syncTargetName = req.body.external_company_id;

  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const externalCompanyName = req.body.external_company_id || company.external_company_id;
    syncTargetName = externalCompanyName || company.name;
    if (!externalCompanyName) {
      return res.status(400).json({ error: 'External company name is required' });
    }

    const config = getExternalApiConfig();
    if (!config.baseUrl || !config.email || !config.password) {
      return res.status(503).json({
        error: buildSyncNotFoundMessage(company.name || externalCompanyName),
      });
    }

    const year = getTargetEmissionYear(req.body.emission_year);
    const token = await loginToExternalApi(config);
    const emissions = await fetchExternalEmissions({
      baseUrl: config.baseUrl,
      emissionsPath: config.emissionsPath,
      token,
      year,
    });
    const externalData = emissions.find(
      (item) => normalizeCompanyName(item.empresa) === normalizeCompanyName(externalCompanyName)
    );

    if (!externalData) {
      return res.status(404).json({
        error: buildSyncNotFoundMessage(externalCompanyName),
      });
    }

    const totalGhgKgco2e = Number(externalData.total_ghg_kgco2e);
    if (!Number.isFinite(totalGhgKgco2e)) {
      return res.status(502).json({ error: 'External emissions response is missing total_ghg_kgco2e' });
    }

    const syncData = {
      external_company_id: externalCompanyName,
      annual_emissions: roundToTwoDecimals(totalGhgKgco2e),
      emission_factor: roundToTwoDecimals(getExternalEmissionIntensity(externalData)) ?? company.emission_factor,
      emission_year: Number(externalData.anio) || year,
      updated_by: req.user?.id || company.updated_by,
    };

    await company.update(syncData);
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: buildSyncNotFoundMessage(syncTargetName || 'indicada') });
  }
});

// ✅ Delete company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Soft delete: marcar como eliminado en vez de borrar
    company.is_deleted = true;
    await company.save();

    res.json({ message: 'Company marked as deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark company as deleted' });
  }
});


module.exports = router;
