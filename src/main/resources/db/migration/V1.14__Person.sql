CREATE SEQUENCE person_seq;
CREATE TABLE person (
  id          BIGINT PRIMARY KEY DEFAULT nextval('person_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255),
  history     TEXT
);

CREATE TABLE person_skills (
  person_id BIGINT NOT NULL REFERENCES person,
  skills_id BIGINT NOT NULL REFERENCES skill,
  PRIMARY KEY (person_id, skills_id)
);

CREATE TABLE person_animals (
  person_id  BIGINT NOT NULL REFERENCES person,
  animals_id BIGINT NOT NULL REFERENCES animal,
  PRIMARY KEY (person_id, animals_id)
);

CREATE SEQUENCE person_inventory_seq;
CREATE TABLE person_inventory (
  id        BIGINT NOT NULL DEFAULT nextval('person_inventory_seq' :: regclass),
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);

CREATE SEQUENCE person_melee_weapons_seq;
CREATE TABLE person_melee_weapons (
  id        BIGINT NOT NULL DEFAULT nextval('person_melee_weapons_seq' :: regclass),
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);

CREATE SEQUENCE person_ranged_weapons_seq;
CREATE TABLE person_ranged_weapons (
  id        BIGINT NOT NULL DEFAULT nextval('person_ranged_weapons_seq' :: regclass) PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);

CREATE SEQUENCE person_armor_seq;
CREATE TABLE person_armor (
  id        BIGINT NOT NULL DEFAULT nextval('person_armor_seq' :: regclass) PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);

