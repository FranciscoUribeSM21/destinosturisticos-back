require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    console.log("✅ DB OK:", rows);

    await conn.end();
  } catch (err) {
    console.error("❌ DB ERROR:", err);
    process.exit(1);
  }
})();