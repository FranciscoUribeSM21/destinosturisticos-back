import app from './app.js';
import { sequelize } from './db.js';

const port = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL ok');

    // Sin migraciones: crea tablas si no existen
    await sequelize.sync();

    app.listen(port, () => console.log(`🚀 API en http://localhost:${port}`));
  } catch (err) {
    console.error('❌ Error al iniciar API:', err);
    process.exit(1);
  }
})();