# NOM-035-STPS-2023

Estructura principal del proyecto dividida en dos capas:

- `frontend/`: aplicación React + Vite que presenta la información de la NOM-035 y el cuestionario interactivo con persistencia local vía `localStorage`.
- `backend/`: carpeta preparada para el futuro servicio de API. Actualmente contiene ideas y lineamientos en `backend/README.md`.

## Cómo ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Esto levanta la aplicación en `http://localhost:5173`.

## Próximos pasos sugeridos

1. Definir el stack del backend (por ejemplo, Node.js con Express/Fastify).
2. Diseñar el modelo de datos y la integración con la base de datos elegida.
3. Reemplazar en el frontend la persistencia local por llamadas al backend cuando esté disponible.

