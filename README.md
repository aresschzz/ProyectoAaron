VINIL — Tienda de Vinilos con Chatbot Inteligente

Aplicación web fullstack para la gestión y compra de vinilos, con integración de un chatbot inteligente que permite buscar productos mediante lenguaje natural.

Características

Catálogo de vinilos con filtros por artista y género
Carrito de compras dinámico
Flujo completo de checkout
Confirmación de compra con detalle de orden
Chatbot inteligente con NLP (Flask + Python)
Búsqueda semántica (ej: "quiero rock de nirvana")
Enlaces directos a productos desde el chatbot
Integración con base de datos en tiempo real

Arquitectura

Frontend (SvelteKit)
↓
Backend Node (SvelteKit Server)
↓
Base de datos PostgreSQL
↑
Chatbot (Flask + Python)

Tecnologías

Frontend

SvelteKit
JavaScript
Bootstrap

Backend

Node.js
Sequelize ORM

Base de Datos

PostgreSQL

Chatbot

Flask
scikit-learn
RapidFuzz

Instalación

Clonar repositorio

git clone https://github.com/tu-usuario/vinil.git

cd vinil

Backend (SvelteKit)

npm install
npm run dev

Base de datos

Crear base en PostgreSQL:

CREATE DATABASE tienda_vinilos;

Configurar variables de entorno en ".env":

DB_NAME=tienda_vinilos
DB_USER=postgres
DB_PASS=tu_password
DB_HOST=localhost
DB_PORT=5432

Chatbot (Flask)

Ir al proyecto del chatbot:

cd vinil-chatbot
pip install -r requirements.txt
python app.py

Servidor correrá en:
https://localhost:5000

Uso del Chatbot

Ejemplos:

busco vinilos de rock
quiero comprar vinilos de radiohead
tienen algo de the beatles

El chatbot:

Detecta intención (búsqueda / compra)
Extrae artista y género
Consulta la base de datos
Devuelve resultados en tiempo real

Estructura del Proyecto

src/
├── routes/
│ ├── catalogo/
│ ├── carrito/
│ ├── checkout/
│ ├── confirmacion/
│ └── compras/
│
├── lib/
│ └── server/
│ ├── models/
│ ├── db.js
│ └── associations.js
│
vinil-chatbot/
├── app.py
├── chatbot_core.py

Endpoints principales

Chatbot

POST /chat

Body:

{
"mensaje": "busco rock de nirvana"
}

Funcionalidades inteligentes

NLP con similitud de texto
Detección de intención automática
Fuzzy matching para artistas
Integración directa con la BD
Respuestas dinámicas según contexto

Mejoras futuras

Recomendaciones inteligentes tipo Spotify
Mostrar vinilos como tarjetas en el chatbot
Tracking de envíos
Wishlist de usuarios
Autenticación avanzada

Autor

Proyecto desarrollado por:

Donovan Amaury Alcantara Cruz
Bruno Ricardo Valdes Pelz
Alan Oltzar Lopez Rivera
Mariana MOntejo Padilla
Jessica Mariana Linares Sanchez
Alejandro Ortega Enriquez 
