CREATE SCHEMA security;

CREATE TABLE security.role (
    id        BIGSERIAL PRIMARY KEY,
    authority VARCHAR(100) UNIQUE
);

CREATE TABLE security."user" (
    id                      BIGSERIAL PRIMARY KEY,
    uuid                    VARCHAR(36)           DEFAULT uuid_generate_v4(),
    version                 INTEGER,
    created                 TIMESTAMP,
    last_updated            TIMESTAMP,
    username                VARCHAR(100) NOT NULL UNIQUE,
    password                VARCHAR(255) NOT NULL,
    account_non_expired     BOOLEAN      NOT NULL DEFAULT TRUE,
    account_non_locked      BOOLEAN      NOT NULL DEFAULT TRUE,
    credentials_non_expired BOOLEAN      NOT NULL DEFAULT TRUE,
    enabled                 BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE security.user_roles (
    user_id  BIGINT NOT NULL REFERENCES security."user" (id),
    roles_id BIGINT NOT NULL REFERENCES security.role (id),
    PRIMARY KEY (user_id, roles_id)
);
