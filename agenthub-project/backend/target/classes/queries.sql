-- Tabla de Usuarios
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    empresa VARCHAR(255),
    nombre VARCHAR(255),
    telefono INT
);

-- Tabla Agente
CREATE TABLE Agente (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(255),
    descripcion  TEXT,
    systemPromt  TEXT,
    modelo       VARCHAR(255),
    categoria    VARCHAR(255),
    precio       INT,
    publicado    BOOLEAN DEFAULT FALSE
);

-- Tabla Herramienta
CREATE TABLE Herramienta (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(255),
    descripcion     TEXT,
    parametrosJson  JSONB,
    implementacion  TEXT
);

-- Tabla intermedia Agente_Herramienta (relación n:n)
CREATE TABLE Agente_Herramienta (
    id_agente       INT NOT NULL,
    id_herramienta  INT NOT NULL,
    PRIMARY KEY (id_agente, id_herramienta),
    CONSTRAINT fk_ah_agente      FOREIGN KEY (id_agente)      REFERENCES Agente(id)      ON DELETE CASCADE,
    CONSTRAINT fk_ah_herramienta FOREIGN KEY (id_herramienta) REFERENCES Herramienta(id) ON DELETE CASCADE
);

-- Tabla Instancia_agente
CREATE TABLE Instancia_agente (
    id             SERIAL PRIMARY KEY,
    configuracion  JSONB,
    estado         VARCHAR(100),
    fechaCreacion  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario     INT NOT NULL,
    id_agente      INT,  -- nullable porque la cardinalidad es 0..1
    CONSTRAINT fk_ia_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id)         ON DELETE CASCADE,
    CONSTRAINT fk_ia_agente  FOREIGN KEY (id_agente)  REFERENCES Agente(id)          ON DELETE SET NULL
);

-- Tabla Conversacion
CREATE TABLE Conversacion (
    id                   SERIAL PRIMARY KEY,
    fechaInicio          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaFin             TIMESTAMP,
    estado               VARCHAR(100),
    id_instancia_agente  INT NOT NULL,
    CONSTRAINT fk_conv_instancia FOREIGN KEY (id_instancia_agente) REFERENCES Instancia_agente(id) ON DELETE CASCADE
);

-- Tabla Mensaje
CREATE TABLE Mensaje (
    id                  SERIAL PRIMARY KEY,
    rol                 VARCHAR(100),
    contenido           TEXT,
    nombreHerramienta   VARCHAR(255),
    llamadaHerramienta  TEXT,
    fechaMensaje        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_conversacion     INT NOT NULL,
    CONSTRAINT fk_msg_conversacion FOREIGN KEY (id_conversacion) REFERENCES Conversacion(id) ON DELETE CASCADE
);