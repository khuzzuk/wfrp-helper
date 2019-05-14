CREATE SEQUENCE spell_school_seq;
CREATE TABLE spell_school (
  id          BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('spell_school_seq' :: regclass),
  name        VARCHAR(64)        NOT NULL UNIQUE,
  description VARCHAR(255),
  levels      INT                         DEFAULT 1
);

CREATE SEQUENCE spell_seq;
CREATE TABLE spell (
  id              BIGINT PRIMARY KEY NOT NULL                     DEFAULT nextval('spell_seq' :: regclass),
  name            VARCHAR(64)        NOT NULL UNIQUE,
  description     VARCHAR(255),
  effect          VARCHAR(255)       NOT NULL,
  spell_school_id BIGINT             NOT NULL REFERENCES spell_school,
  level           INT                NOT NULL                     DEFAULT 0,
  mana_cost       INT                NOT NULL                     DEFAULT 0,
  range           INT                NOT NULL                     DEFAULT 1,
  duration_type   ACTION_TYPE,
  duration_amount INT,
  prepare_type    ACTION_TYPE,
  prepare_amount  INT
);
CREATE SEQUENCE spell_ingredients_seq;
CREATE TABLE spell_ingredients (
  id            BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('spell_ingredients_seq' :: regclass),
  ingrediend_id BIGINT             NOT NULL REFERENCES item,
  spell_id      BIGINT             NOT NULL REFERENCES spell
);


