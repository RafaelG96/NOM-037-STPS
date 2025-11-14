

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS nom037 AUTHORIZATION CURRENT_USER;

SET search_path = nom037, public;


CREATE TYPE nom037.evidence_type AS ENUM ('photo','video','document','other');
CREATE TYPE nom037.equipment_type AS ENUM ('computer','peripheral','furniture','ergonomic','other');
CREATE TYPE nom037.validation_result AS ENUM ('approved','rejected','requires_action');

CREATE TABLE IF NOT EXISTS nom037.empleadores (
    id_empleador uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    razon_social VARCHAR(255) NOT NULL,
    rfc VARCHAR(13),
    domicilio TEXT,
    telefono VARCHAR(30),
    correo VARCHAR(255),
    actividad_principal VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_empleadores_rfc ON nom037.empleadores (rfc);


CREATE TABLE IF NOT EXISTS nom037.trabajadores (
    id_trabajador uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_empleador uuid NOT NULL REFERENCES nom037.empleadores(id_empleador) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    genero VARCHAR(32),
    estado_civil VARCHAR(32),
    perfil_puesto VARCHAR(255),
    actividades JSONB, 
    porcentaje_teletrabajo SMALLINT CHECK (porcentaje_teletrabajo BETWEEN 0 AND 100),
    telefono VARCHAR(30),
    domicilio TEXT,
    fecha_ingreso DATE,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_trabajadores_empleador ON nom037.trabajadores (id_empleador);


CREATE TABLE IF NOT EXISTS nom037.lugares_trabajo (
    id_lugar uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_trabajador uuid NOT NULL REFERENCES nom037.trabajadores(id_trabajador) ON DELETE CASCADE,
    etiqueta VARCHAR(120), 
    direccion TEXT,
    tiene_conectividad BOOLEAN,
    cumple_iluminacion BOOLEAN,
    cumple_ventilacion BOOLEAN,
    cumple_instalacion_electrica BOOLEAN,
    cumple_ergonomia BOOLEAN,
    privado BOOLEAN, 
    nota TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_lugares_trabajo_trabajador ON nom037.lugares_trabajo (id_trabajador);


CREATE TABLE IF NOT EXISTS nom037.equipos_catalogo (
    id_equipo uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    tipo nom037.equipment_type DEFAULT 'other',
    descripcion TEXT,
    fabricante VARCHAR(200),
    modelo VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_equipos_catalogo_tipo ON nom037.equipos_catalogo (tipo);


CREATE TABLE IF NOT EXISTS nom037.equipos_asignados (
    id_asignacion uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_trabajador uuid NOT NULL REFERENCES nom037.trabajadores(id_trabajador) ON DELETE CASCADE,
    id_equipo uuid NOT NULL REFERENCES nom037.equipos_catalogo(id_equipo) ON DELETE RESTRICT,
    serial VARCHAR(200),
    fecha_entrega DATE,
    fecha_devolucion DATE,
    estado VARCHAR(100),
    observacion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (id_trabajador, id_equipo, serial, fecha_entrega)
);

CREATE INDEX IF NOT EXISTS ix_equipos_asignados_trabajador ON nom037.equipos_asignados (id_trabajador);


CREATE TABLE IF NOT EXISTS nom037.checklist_templates (
    id_template uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    version INTEGER DEFAULT 1,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE IF NOT EXISTS nom037.checklist_items (
    id_item uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_template uuid NOT NULL REFERENCES nom037.checklist_templates(id_template) ON DELETE CASCADE,
    orden SMALLINT NOT NULL,
    categoria VARCHAR(120), 
    pregunta TEXT NOT NULL,
    tipo_respuesta VARCHAR(50) DEFAULT 'boolean', 
    obligatorio BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT uq_template_orden UNIQUE (id_template, orden)
);

CREATE INDEX IF NOT EXISTS ix_checklist_items_template ON nom037.checklist_items (id_template);


CREATE TABLE IF NOT EXISTS nom037.checklist_instances (
    id_instance uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_template uuid NOT NULL REFERENCES nom037.checklist_templates(id_template) ON DELETE RESTRICT,
    id_trabajador uuid NOT NULL REFERENCES nom037.trabajadores(id_trabajador) ON DELETE CASCADE,
    id_lugar uuid REFERENCES nom037.lugares_trabajo(id_lugar) ON DELETE SET NULL,
    fecha_aplicacion TIMESTAMP WITH TIME ZONE DEFAULT now(),
    aplicado_por VARCHAR(255), 
    metodo_aplicacion VARCHAR(50) DEFAULT 'self', 
    version_template INTEGER,
    notas TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_instances_trabajador ON nom037.checklist_instances (id_trabajador);


CREATE TABLE IF NOT EXISTS nom037.checklist_answers (
    id_answer uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_instance uuid NOT NULL REFERENCES nom037.checklist_instances(id_instance) ON DELETE CASCADE,
    id_item uuid NOT NULL REFERENCES nom037.checklist_items(id_item) ON DELETE RESTRICT,
    respuesta_boolean BOOLEAN,
    respuesta_text TEXT,
    observacion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (id_instance, id_item)
);

CREATE INDEX IF NOT EXISTS ix_answers_instance ON nom037.checklist_answers (id_instance);


CREATE TABLE IF NOT EXISTS nom037.validaciones (
    id_validacion uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_instance uuid NOT NULL REFERENCES nom037.checklist_instances(id_instance) ON DELETE CASCADE,
    id_unidad_inspeccion uuid, 
    fecha_validacion TIMESTAMP WITH TIME ZONE DEFAULT now(),
    validado_por VARCHAR(255),
    resultado nom037.validation_result,
    comentarios TEXT,
    numero_dictamen VARCHAR(255),
    vigencia_anios SMALLINT DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_validaciones_instance ON nom037.validaciones (id_instance);


CREATE TABLE IF NOT EXISTS nom037.evidencias (
    id_evidencia uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_validacion uuid NOT NULL REFERENCES nom037.validaciones(id_validacion) ON DELETE CASCADE,
    tipo nom037.evidence_type DEFAULT 'photo',
    nombre_archivo VARCHAR(255),
    uri_archivo TEXT NOT NULL, 
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_evidencias_validacion ON nom037.evidencias (id_validacion);


CREATE TABLE IF NOT EXISTS nom037.capacitaciones (
    id_capacitacion uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_trabajador uuid NOT NULL REFERENCES nom037.trabajadores(id_trabajador) ON DELETE CASCADE,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now(),
    tema VARCHAR(255) NOT NULL,
    descripcion TEXT,
    modalidad VARCHAR(50), 
    comprobante_uri TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_capacitaciones_trabajador ON nom037.capacitaciones (id_trabajador);


CREATE TABLE IF NOT EXISTS nom037.politicas (
    id_politica uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_empleador uuid NOT NULL REFERENCES nom037.empleadores(id_empleador) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    version INTEGER DEFAULT 1,
    fecha_publicacion DATE,
    archivo_uri TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_politicas_empleador ON nom037.politicas (id_empleador);


CREATE TABLE IF NOT EXISTS nom037.auditoria (
    id_auditoria uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    entidad TEXT NOT NULL,
    entidad_id uuid,
    accion VARCHAR(50) NOT NULL, 
    usuario VARCHAR(255),
    detalles JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_auditoria_entidad ON nom037.auditoria (entidad, entidad_id);


CREATE OR REPLACE VIEW nom037.v_trabajador_resumen AS
SELECT
  t.id_trabajador,
  t.nombre,
  t.id_empleador,
  t.porcentaje_teletrabajo,
  COUNT(DISTINCT l.id_lugar) AS num_lugares,
  COUNT(DISTINCT ea.id_asignacion) AS num_equipos
FROM nom037.trabajadores t
LEFT JOIN nom037.lugares_trabajo l ON l.id_trabajador = t.id_trabajador
LEFT JOIN nom037.equipos_asignados ea ON ea.id_trabajador = t.id_trabajador
GROUP BY t.id_trabajador, t.nombre, t.id_empleador, t.porcentaje_teletrabajo;


CREATE OR REPLACE FUNCTION nom037.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_timestamp_trabajadores') THEN
    CREATE TRIGGER trg_set_timestamp_trabajadores
    BEFORE UPDATE ON nom037.trabajadores
    FOR EACH ROW EXECUTE FUNCTION nom037.trigger_set_timestamp();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_timestamp_empleadores') THEN
    CREATE TRIGGER trg_set_timestamp_empleadores
    BEFORE UPDATE ON nom037.empleadores
    FOR EACH ROW EXECUTE FUNCTION nom037.trigger_set_timestamp();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_timestamp_equipos_asignados') THEN
    CREATE TRIGGER trg_set_timestamp_equipos_asignados
    BEFORE UPDATE ON nom037.equipos_asignados
    FOR EACH ROW EXECUTE FUNCTION nom037.trigger_set_timestamp();
  END IF;

END$$;


CREATE OR REPLACE FUNCTION nom037.fn_audit_changes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  rec JSONB;
BEGIN
  IF TG_OP = 'DELETE' THEN
    rec = to_jsonb(OLD);
  ELSE
    rec = to_jsonb(NEW);
  END IF;

  INSERT INTO nom037.auditoria(entidad, entidad_id, accion, usuario, detalles, created_at)
  VALUES (TG_TABLE_NAME, COALESCE((rec->>'id_trabajador')::uuid, NULL), TG_OP, current_user, rec, now());

  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END;
$$;


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_audit_trabajadores') THEN
    CREATE TRIGGER trg_audit_trabajadores
    AFTER INSERT OR UPDATE OR DELETE ON nom037.trabajadores
    FOR EACH ROW EXECUTE FUNCTION nom037.fn_audit_changes();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_audit_equipos_asignados') THEN
    CREATE TRIGGER trg_audit_equipos_asignados
    AFTER INSERT OR UPDATE OR DELETE ON nom037.equipos_asignados
    FOR EACH ROW EXECUTE FUNCTION nom037.fn_audit_changes();
  END IF;
END$$;





