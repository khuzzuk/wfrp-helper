CREATE SCHEMA rules;

CREATE TABLE rules.determinant (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    type         VARCHAR(255),
    value        INT
);
CREATE TABLE rules.determinant_history (
    rev          BIGINT REFERENCES revinfo,
    revtype      SMALLINT,
    id           BIGINT NOT NULL,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    type         VARCHAR(255),
    value        INT,
    PRIMARY KEY (id, rev)
);

CREATE TABLE rules.modifier (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    type         VARCHAR(255) NOT NULL,
    value        INT          NOT NULL
);
CREATE TABLE rules.modifier_history (
    rev          BIGINT REFERENCES revinfo,
    revtype      SMALLINT,
    id           BIGINT,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    type         VARCHAR(255),
    value        INT,
    PRIMARY KEY (rev, id)
);

CREATE TABLE rules.determinant_modifiers (
    determinant_id BIGINT REFERENCES rules.determinant (id),
    modifiers_id   BIGINT REFERENCES rules.modifier (id),
    PRIMARY KEY (determinant_id, modifiers_id)
);
CREATE TABLE rules.determinant_modifiers_history (
    rev            BIGINT REFERENCES revinfo,
    revtype        SMALLINT,
    determinant_id BIGINT,
    modifiers_id   BIGINT,
    PRIMARY KEY (determinant_id, modifiers_id, rev)
);

CREATE TYPE DICE AS ENUM ('K2', 'K3', 'K4', 'K6', 'K8', 'K10', 'K12', 'K20', 'K100');
CREATE TABLE rules.dice_roll (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    dice         DICE,
    rolls        INT
);

CREATE TABLE rules.modifier_rolls (
    modifier_id BIGINT REFERENCES rules.modifier (id),
    rolls_id    BIGINT REFERENCES rules.dice_roll (id),
    PRIMARY KEY (rolls_id, modifier_id)
);
CREATE TABLE rules.modifier_rolls_history (
    rev         BIGINT,
    revtype     SMALLINT,
    modifier_id BIGINT,
    rolls_id    BIGINT,
    PRIMARY KEY (rolls_id, modifier_id, rev)
);

CREATE TYPE ACTION_TYPE AS ENUM ('ACTION', 'ROUND', 'TURN');
