import db from "../db.js"; 

async function test() {
  try {
    await db.authenticate();
    console.log('Conexión establecida con PostgreSQL.');
  } catch (err) {
    console.error('Error de conexión:', err);
  } finally {
    await db.close();
  }
}
test();