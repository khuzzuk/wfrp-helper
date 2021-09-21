CREATE SCHEMA magic;

CREATE TABLE magic.spell_school (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) NOT NULL UNIQUE,
    description  VARCHAR(255),
    levels       INT         DEFAULT 1
);

CREATE TABLE magic.spell (
    id              BIGSERIAL PRIMARY KEY,
    uuid            VARCHAR(36)           DEFAULT uuid_generate_v4(),
    version         INTEGER,
    created         TIMESTAMP,
    last_updated    TIMESTAMP,
    name            VARCHAR(64)  NOT NULL UNIQUE,
    description     VARCHAR(255),
    effect          VARCHAR(255) NOT NULL,
    spell_school_id BIGINT       NOT NULL REFERENCES magic.spell_school,
    level           INT          NOT NULL DEFAULT 0,
    mana_cost       INT          NOT NULL DEFAULT 0,
    range           INT          NOT NULL DEFAULT 1,
    duration_type   ACTION_TYPE,
    duration_amount INT,
    prepare_type    ACTION_TYPE,
    prepare_amount  INT
);
CREATE TABLE magic.spell_ingredients (
    id            BIGSERIAL PRIMARY KEY,
    ingrediend_id BIGINT NOT NULL REFERENCES crafting.item,
    spell_id      BIGINT NOT NULL REFERENCES magic.spell
);
