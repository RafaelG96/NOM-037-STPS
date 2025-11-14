-- NOM-037-STPS · Esquema de base de datos para MariaDB
-- Ejecutar con un usuario que tenga permisos de creación (por ejemplo: root)

CREATE DATABASE IF NOT EXISTS nom037 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nom037;

-- Personas u organizaciones que responden cuestionarios.
CREATE TABLE IF NOT EXISTS respondents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  phone VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- Tipos y metadatos de los cuestionarios disponibles.
CREATE TABLE IF NOT EXISTS questionnaires (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE, -- ej. 'primera_vez', 'revision'
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

-- Preguntas pertenecientes a un cuestionario.
CREATE TABLE IF NOT EXISTS questions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  questionnaire_id INT UNSIGNED NOT NULL,
  order_index INT UNSIGNED NOT NULL DEFAULT 1,
  text TEXT NOT NULL,
  input_type ENUM('single_choice', 'multi_choice', 'text', 'number', 'boolean') NOT NULL DEFAULT 'single_choice',
  options_json JSON NULL, -- lista de opciones cuando aplica
  help_text TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaires (id) ON DELETE CASCADE
) ENGINE = InnoDB;

-- Respuestas enviadas por una persona para un cuestionario.
CREATE TABLE IF NOT EXISTS responses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  questionnaire_id INT UNSIGNED NOT NULL,
  respondent_id INT UNSIGNED NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft', 'submitted', 'reviewed') NOT NULL DEFAULT 'submitted',
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaires (id) ON DELETE CASCADE,
  FOREIGN KEY (respondent_id) REFERENCES respondents (id) ON DELETE SET NULL
) ENGINE = InnoDB;

-- Respuestas a cada pregunta concreta.
CREATE TABLE IF NOT EXISTS answers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  response_id BIGINT UNSIGNED NOT NULL,
  question_id INT UNSIGNED NOT NULL,
  answer_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (response_id) REFERENCES responses (id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
  UNIQUE KEY unique_response_question (response_id, question_id)
) ENGINE = InnoDB;

-- Fotografías asociadas al espacio de trabajo declarado en una respuesta.
CREATE TABLE IF NOT EXISTS workspace_photos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  response_id BIGINT UNSIGNED NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes BIGINT UNSIGNED NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (response_id) REFERENCES responses (id) ON DELETE CASCADE,
  INDEX idx_response (response_id)
) ENGINE = InnoDB;

-- Índices auxiliares para consultas frecuentes.
CREATE INDEX idx_questionnaire_code ON questionnaires (code);
CREATE INDEX idx_response_status ON responses (status);

