CREATE SEQUENCE person_seq;
CREATE TABLE person (
  id          BIGINT PRIMARY KEY DEFAULT nextval('person_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255),
  gender INT NOT NULL,
  age INT NOT NULL,
  height INT NOT NULL,
  weight REAL NOT NULL,
  hair_color_id BIGINT NOT NULL REFERENCES hair_color,
  eye_color_id BIGINT NOT NULL REFERENCES eye_color,
  history     TEXT
);

CREATE TABLE person_physical_features (
  person_id       BIGINT NOT NULL REFERENCES person,
  physical_features_id BIGINT NOT NULL UNIQUE REFERENCES physical_feature,
  PRIMARY KEY (person_id, physical_features_id)
);

CREATE TABLE person_basic_determinants (
  person_id       BIGINT NOT NULL REFERENCES person,
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id)
);

CREATE TABLE person_extension_determinants (
  person_id       BIGINT NOT NULL REFERENCES person,
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id)
);

CREATE TABLE person_additional_determinants (
  person_id       BIGINT NOT NULL REFERENCES person,
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id)
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

CREATE TABLE person_spell_schools (
  person_id BIGINT NOT NULL REFERENCES person,
  spell_schools_key BIGINT NOT NULL REFERENCES spell_school,
  level     INT    NOT NULL DEFAULT 0,
  PRIMARY KEY (person_id, spell_schools_key)
);

CREATE TABLE person_spells (
  person_id BIGINT NOT NULL REFERENCES person,
  spells_id BIGINT NOT NULL REFERENCES spell,
  PRIMARY KEY (person_id, spells_id)
);

