# NOM-037-STPS-2023

NOM-037-STPS-2023: Norma mexicana que establece los requisitos de seguridad y salud para el teletrabajo. Incluye políticas, identificación de riesgos ergonómicos y psicosociales, entrega de equipo y derecho a la desconexión.

## Estructura del proyecto

```
.
├── backend/
│   └── README.md                # Ideas y lineamientos para el servicio de API
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
│       ├── services/            # Servicios auxiliares (ej. localStorage)
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

## Próximos pasos sugeridos

1. Definir el stack del backend (por ejemplo, Node.js con Express o Fastify).
2. Diseñar el modelo de datos y la integración con la base de datos elegida.
3. Reemplazar en el frontend la persistencia local por llamadas al backend cuando esté disponible.
