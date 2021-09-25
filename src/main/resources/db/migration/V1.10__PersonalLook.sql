CREATE SCHEMA creature;

CREATE TABLE creature.character (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) UNIQUE NOT NULL,
    description  VARCHAR(255)
);

CREATE TABLE creature.eye_color (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) UNIQUE NOT NULL,
    description  VARCHAR(255)
);

CREATE TABLE creature.hair_color (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) UNIQUE NOT NULL,
    description  VARCHAR(255)
);

CREATE TABLE creature.physical_feature (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) UNIQUE NOT NULL,
    description  VARCHAR(255)
);
CREATE TABLE creature.physical_feature_determinants (
    physical_feature_id BIGINT NOT NULL REFERENCES creature.physical_feature (id),
    determinants_id     BIGINT NOT NULL UNIQUE REFERENCES rules.determinant (id),
    PRIMARY KEY (physical_feature_id, determinants_id)
);

