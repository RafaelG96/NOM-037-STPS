# Backend (pendiente)

Este directorio está reservado para el servicio backend que gestionará el cuestionario de la NOM-035-STPS-2023.

## Ideas para implementar más adelante

- API REST (por ejemplo con Express o Fastify) para recibir, validar y almacenar las respuestas.
- Integración con una base de datos relacional (PostgreSQL/MySQL) o documento (MongoDB), según se defina.
- Mecanismos de autenticación/autorización si se requiere acceso restringido.
- Servicios para exportar reportes o enviar notificaciones al área de seguridad y salud laboral.

Mientras tanto, el frontend guarda las respuestas localmente en el navegador mediante `localStorage`. Cuando el backend esté listo, bastará con reemplazar la lógica de persistencia en `frontend/src/pages/Questionnaire.jsx` por las llamadas al API correspondiente.

