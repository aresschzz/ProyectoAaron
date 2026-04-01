import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg; // <-- PARA POSTGRES BRUNO
// lo que hace es que permita hacer que el docker de la base y el node puedan funcionar Bien 
// cada que se apague o prenda el server

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Docker Compose inyectará estas variables gracias a tu archivo .env
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Vital para que tu API pueda recibir datos JSON cuando agregues un disco

// Cliente
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, 'views', 'registro.html')));
app.get('/catalogo', (req, res) => res.sendFile(path.join(__dirname, 'views', 'catalogo.html')));
app.get('/detalle', (req, res) => res.sendFile(path.join(__dirname, 'views', 'detalle.html')));
app.get('/carrito', (req, res) => res.sendFile(path.join(__dirname, 'views', 'carrito.html')));
app.get('/checkout', (req, res) => res.sendFile(path.join(__dirname, 'views', 'checkout.html')));
app.get('/confirmacion', (req, res) => res.sendFile(path.join(__dirname, 'views', 'confirmacion.html')));
app.get('/compras', (req, res) => res.sendFile(path.join(__dirname, 'views', 'compras.html')));
app.get('/perfil', (req, res) => res.sendFile(path.join(__dirname, 'views', 'perfil.html')));

// Admin
app.get('/admin/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'dashboard.html')));
app.get('/admin/inventario', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'inventario.html')));
app.get('/admin/agregar-vinilo', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'agregar-vinilo.html')));
app.get('/admin/compras-vinilo', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'compras-vinilo.html')));
app.get('/admin/nueva-compra', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'nueva-compra.html')));
app.get('/admin/ventas', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'ventas.html')));
app.get('/admin/usuarios', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'usuarios.html')));
app.get('/admin/reportes', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin', 'reportes.html')));

app.listen(PORT, () => {
  console.log(`VINIL corriendo seguro y con Pool en http://localhost:${PORT} xd`);
});