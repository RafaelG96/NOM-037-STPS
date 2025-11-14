# NOM-037-STPS-2023

NOM-037-STPS-2023: Norma mexicana que establece los requisitos de seguridad y salud para el teletrabajo. Incluye políticas, identificación de riesgos ergonómicos y psicosociales, entrega de equipo y derecho a la desconexión.

## Estructura del proyecto

```
.
├── backend/
│   ├── db/
│   │   ├── schema_postgresql.sql    # Esquema completo de PostgreSQL
│   │   └── init_postgresql.sh      # Script de inicialización de la BD
│   ├── src/
│   │   ├── server.js                # Servidor Express principal
│   │   ├── db/
│   │   │   └── connection.js        # Configuración de conexión a PostgreSQL
│   │   └── routes/
│   │       ├── responses.js         # Endpoints para respuestas de cuestionarios
│   │       ├── photos.js            # Endpoints para subir/obtener fotografías
│   │       └── questionnaires.js    # Endpoints para listar cuestionarios
│   ├── package.json                 # Dependencias del backend
│   ├── env.example                  # Plantilla de variables de entorno
│   └── README.md                    # Guía de implementación del backend
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx             # Punto de entrada de la app React
│       ├── App.jsx              # Definición de rutas
│       ├── content/             # Configuración estática de cuestionarios y recursos
│       ├── components/          # Componentes reutilizables (Hero, Forms, Cards, etc.)
│       ├── pages/               # Vistas principales (Home, Questionnaire, QuestionnaireForm)
│       ├── services/            # Servicios auxiliares (localStorage, API)
│       └── styles/              # Hojas de estilo compartidas
└── README.md
```

## Cómo ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Esto levanta la aplicación en `http://localhost:5173`.

## Cómo ejecutar el backend

### Requisitos previos

- Node.js 18+ instalado
- PostgreSQL instalado y corriendo
- Base de datos `nom037` creada (ver sección de configuración de BD)

### Instalación y configuración

```bash
cd backend
npm install
cp env.example .env
# Edita .env con tus credenciales de PostgreSQL
mkdir -p uploads/workspaces
```

### Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Endpoints disponibles

- `GET /api/health` - Estado del servidor y conexión a BD
- `POST /api/responses` - Guardar respuesta de cuestionario
- `POST /api/photos/:instanceId` - Subir fotografías
- `GET /api/photos/:instanceId` - Obtener fotografías de una instancia
- `GET /api/questionnaires` - Listar cuestionarios disponibles

## Configuración de la base de datos

El proyecto utiliza **PostgreSQL** con un esquema completo que incluye gestión de empleadores, trabajadores, checklists, validaciones y evidencias.

### Inicialización rápida

```bash
# Ejecutar el script de inicialización
bash backend/db/init_postgresql.sh
```

Este script:
- Verifica que PostgreSQL esté instalado y corriendo
- Crea la base de datos `nom037`
- Crea un usuario dedicado (opcional)
- Importa el esquema completo desde `backend/db/schema_postgresql.sql`

### Configuración manual

Si prefieres configurar manualmente, consulta las instrucciones detalladas en `backend/README.md`.

## Características implementadas

- ✅ Base de datos PostgreSQL configurada con esquema completo
- ✅ Backend Node.js + Express con conexión a PostgreSQL
- ✅ API REST para guardar respuestas de cuestionarios
- ✅ Sistema de subida de fotografías con almacenamiento en filesystem
- ✅ Frontend integrado con el backend (con fallback a localStorage)
- ✅ Formularios para solicitud inicial y revisión periódica
- ✅ Validación de condiciones de teletrabajo según NOM-037-STPS-2023

## Tecnologías utilizadas

**Frontend:**
- React 18
- Vite
- React Router

**Backend:**
- Node.js
- Express
- PostgreSQL (pg)
- Multer (para subida de archivos)

**Base de datos:**
- PostgreSQL 16+
- Esquema completo con 14 tablas, triggers, funciones y vistas
