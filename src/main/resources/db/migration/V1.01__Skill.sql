CREATE SCHEMA knowledge;

CREATE TABLE knowledge.skill (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(100) UNIQUE,
    description  TEXT
);
