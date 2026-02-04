'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Companies
    // await queryInterface.bulkInsert('companies', [
    //   {
    //     name: 'Blumar',
    //     logo_url: 'https://www.blumar.com/images/logo.png',
    //     annual_emissions: 120000,
    //     is_active: true,
    //     description: 'Empresa salmonera chilena dedicada a la producción y exportación de salmón y jurel.',
    //     email: 'contacto@blumar.com',
    //     region: 'Biobío',
    //     dashboard_url: 'https://dashboard.blumar.com',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Australis Seafoods',
    //     logo_url: 'https://www.australis-seafoods.com/logo.png',
    //     annual_emissions: 95000,
    //     is_active: true,
    //     description: 'Australis Seafoods se dedica a la producción de salmón Atlántico en la región sur de Chile.',
    //     email: 'info@australis-seafoods.com',
    //     region: 'Los Lagos',
    //     dashboard_url: 'https://dashboard.australis-seafoods.com',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Skretting',
    //     logo_url: 'https://www.skretting.com/cl/logo.png',
    //     annual_emissions: 60000,
    //     is_active: true,
    //     description: 'Skretting Chile es proveedor de alimentos para la industria salmonera y acuícola.',
    //     email: 'contact.cl@skretting.com',
    //     region: 'Los Lagos',
    //     dashboard_url: 'https://dashboard.skretting.com',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Cultivos Yadran SA',
    //     logo_url: 'https://www.yadran.cl/logo.png',
    //     annual_emissions: 70000,
    //     is_active: true,
    //     description: 'Yadran produce, procesa y exporta salmón Atlántico desde Chiloé.',
    //     email: 'contacto@yadran.cl',
    //     region: 'Los Lagos',
    //     dashboard_url: 'https://dashboard.yadran.cl',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Cermaq Chile',
    //     logo_url: 'https://www.cermaq.cl/logo.png',
    //     annual_emissions: 110000,
    //     is_active: true,
    //     description: 'Cermaq Chile es parte del grupo Cermaq, productor global de salmón con operaciones en la región de Los Lagos.',
    //     email: 'contact@cermaq.cl',
    //     region: 'Los Lagos',
    //     dashboard_url: 'https://dashboard.cermaq.cl',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   }
    // ]);

    // // Projects
    // await queryInterface.bulkInsert('projects', [
    //   {
    //     name: 'Predio Trafunco',
    //     carousel_image_1: 'https://cdn.example.com/trafunco1.jpg',
    //     carousel_image_2: 'https://cdn.example.com/trafunco2.jpg',
    //     carousel_image_3: 'https://cdn.example.com/trafunco3.jpg',
    //     region: 'Los Lagos',
    //     methodology: 'REDD (VM0048)',
    //     area: 11833,
    //     is_open_for_purchase: true,
    //     is_visible: true,
    //     credit_price: 5.00,
    //     total_project_value: 500000,
    //     total_credits: 100000,
    //     available_credits: 85000,
    //     tons_per_credit: 1.0,
    //     content_block_1: '<h2>Sobre el proyecto</h2><p>Predio Trafunco se ubica en San Juan de la Costa. Este predio busca conservar bosques nativos y proteger especies endémicas de la zona. El proyecto está evaluado bajo la metodología REDD (VM0048), con una superficie de más de 11.833 hectáreas.</p>',
    //     content_block_2: '<h2>Impacto ambiental</h2><p>Se espera una reducción significativa de emisiones de CO₂, además de mejorar la calidad del suelo, conservar recursos hídricos y fomentar la biodiversidad local.</p>',
    //     content_block_3: '<h2>Impacto social</h2><p>El proyecto incluye la participación de comunidades locales en labores de monitoreo y conservación, generando empleo y fortaleciendo capacidades en gestión ambiental.</p>',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Isla Puqueldón',
    //     carousel_image_1: 'https://cdn.example.com/puqueldon1.jpg',
    //     carousel_image_2: 'https://cdn.example.com/puqueldon2.jpg',
    //     carousel_image_3: 'https://cdn.example.com/puqueldon3.jpg',
    //     region: 'Los Lagos',
    //     methodology: 'ARR (VM0047)',
    //     area: 5000,
    //     is_open_for_purchase: true,
    //     is_visible: true,
    //     credit_price: 6.00,
    //     total_project_value: 450000,
    //     total_credits: 75000,
    //     available_credits: 70000,
    //     tons_per_credit: 1.0,
    //     content_block_1: '<h2>Sobre el proyecto</h2><p>Ubicado en Chiloé, este proyecto de forestación busca generar beneficios económicos y sociales sostenibles para la comunidad local. La metodología aplicada es VM0047 (ARR), enfocada en reforestación y restauración.</p>',
    //     content_block_2: '<h2>Impacto ambiental</h2><p>La forestación permitirá recuperar suelos erosionados, generar sumideros de carbono y restaurar ecosistemas degradados, aportando al cumplimiento de compromisos climáticos.</p>',
    //     content_block_3: '<h2>Impacto social</h2><p>Se espera involucrar a comunidades indígenas y pescadores artesanales en el desarrollo del proyecto, garantizando una distribución justa de los beneficios económicos.</p>',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Hacienda California REED',
    //     carousel_image_1: 'https://cdn.example.com/california1.jpg',
    //     carousel_image_2: 'https://cdn.example.com/california2.jpg',
    //     carousel_image_3: 'https://cdn.example.com/california3.jpg',
    //     region: 'Arica y Parinacota',
    //     methodology: 'REDD (VM0007)',
    //     area: 800,
    //     is_open_for_purchase: true,
    //     is_visible: true,
    //     credit_price: 5.50,
    //     total_project_value: 300000,
    //     total_credits: 60000,
    //     available_credits: 58000,
    //     tons_per_credit: 1.0,
    //     content_block_1: '<h2>Sobre el proyecto</h2><p>El plan "Siembra por Chile" de CONAF en Putre, con foco en reforestación de 70 mil m² y manejo de 800 hectáreas de bosque nativo, busca restaurar la resiliencia ecológica de la zona.</p>',
    //     content_block_2: '<h2>Impacto ambiental</h2><p>El proyecto ayudará a combatir la desertificación y fortalecer la captura de carbono en ecosistemas áridos de alta montaña.</p>',
    //     content_block_3: '<h2>Impacto social</h2><p>Genera empleo en comunidades rurales aisladas, además de educación ambiental en escuelas locales.</p>',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Hacienda California Restauración',
    //     carousel_image_1: 'https://cdn.example.com/californiaR1.jpg',
    //     carousel_image_2: 'https://cdn.example.com/californiaR2.jpg',
    //     carousel_image_3: 'https://cdn.example.com/californiaR3.jpg',
    //     region: 'Arica y Parinacota',
    //     methodology: 'Restauración Forestal',
    //     area: 800,
    //     is_open_for_purchase: true,
    //     is_visible: true,
    //     credit_price: 5.50,
    //     total_project_value: 280000,
    //     total_credits: 55000,
    //     available_credits: 54000,
    //     tons_per_credit: 1.0,
    //     content_block_1: '<h2>Sobre el proyecto</h2><p>Complementario a Hacienda California REED, este plan se centra en la restauración forestal de áreas específicas degradadas en Putre, con plantación de especies nativas.</p>',
    //     content_block_2: '<h2>Impacto ambiental</h2><p>Se busca la recuperación de suelos y hábitats para especies en riesgo, aumentando la capacidad de captura de carbono.</p>',
    //     content_block_3: '<h2>Impacto social</h2><p>El proyecto fortalece la colaboración con comunidades aymaras, incluyendo talleres y capacitación en prácticas de restauración.</p>',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   },
    //   {
    //     name: 'Comunidad Indígena Chiloé',
    //     carousel_image_1: 'https://cdn.example.com/chiloe1.jpg',
    //     carousel_image_2: 'https://cdn.example.com/chiloe2.jpg',
    //     carousel_image_3: 'https://cdn.example.com/chiloe3.jpg',
    //     region: 'Los Lagos',
    //     methodology: 'REDD+ Comunitario',
    //     area: 11000,
    //     is_open_for_purchase: true,
    //     is_visible: true,
    //     credit_price: 6.50,
    //     total_project_value: 600000,
    //     total_credits: 90000,
    //     available_credits: 88000,
    //     tons_per_credit: 1.0,
    //     content_block_1: '<h2>Sobre el proyecto</h2><p>Ubicado en Chiloé, este predio comunitario de 11.000 hectáreas busca reducir la deforestación y degradación no planificada, mediante acuerdos de manejo sostenible con comunidades indígenas locales.</p>',
    //     content_block_2: '<h2>Impacto ambiental</h2><p>El proyecto contribuye a la protección de bosques templados lluviosos, sumideros de carbono clave en Chile, y promueve la regeneración natural.</p>',
    //     content_block_3: '<h2>Impacto social</h2><p>Empodera a comunidades indígenas en la gobernanza de sus territorios, fomenta el uso sostenible de recursos y garantiza beneficios económicos distribuidos equitativamente.</p>',
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     created_by: 1,
    //     updated_by: 1
    //   }
    // ]);

    // Transactions
   /*  await queryInterface.bulkInsert('transactions', [
      { company_id: 1, project_id: 1, amount: 25000, credits_count: 5000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 2, project_id: 2, amount: 30000, credits_count: 5000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 3, project_id: 3, amount: 11000, credits_count: 2000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 4, project_id: 5, amount: 32500, credits_count: 5000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 5, project_id: 1, amount: 15000, credits_count: 3000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 1, project_id: 4, amount: 20000, credits_count: 3600, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 },
      { company_id: 2, project_id: 5, amount: 19500, credits_count: 3000, created_at: new Date(), updated_at: new Date(), created_by: 1, updated_by: 1 }
    ]); */
  },

  async down(queryInterface, Sequelize) {
  /*   await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('projects', null, {});
    await queryInterface.bulkDelete('companies', null, {}); */
  }
};
