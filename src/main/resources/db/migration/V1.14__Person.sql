CREATE SEQUENCE person_seq;
CREATE TABLE person
(
  id                    BIGINT PRIMARY KEY DEFAULT nextval('person_seq' :: regclass),
  name                  VARCHAR(64) UNIQUE NOT NULL,
  description           VARCHAR(255),
  gender                INT                NOT NULL,
  age                   INT                NOT NULL,
  height                INT                NOT NULL,
  weight                REAL               NOT NULL,
  hair_color_id         BIGINT             NOT NULL REFERENCES hair_color,
  eye_color_id          BIGINT             NOT NULL REFERENCES eye_color,
  history               TEXT,
  current_profession_id BIGINT             NOT NULL REFERENCES profession
);
CREATE TABLE person_history
(
  rev                   BIGINT,
  revtype               SMALLINT,
  id                    BIGINT,
  name                  VARCHAR(64) NOT NULL,
  description           VARCHAR(255),
  gender                INT         NOT NULL,
  age                   INT         NOT NULL,
  height                INT         NOT NULL,
  weight                REAL        NOT NULL,
  hair_color_id         BIGINT      NOT NULL REFERENCES hair_color,
  eye_color_id          BIGINT      NOT NULL REFERENCES eye_color,
  history               TEXT,
  current_profession_id BIGINT      NOT NULL REFERENCES profession,
  PRIMARY KEY (rev, id)
);

CREATE TABLE person_physical_features
(
  person_id            BIGINT NOT NULL REFERENCES person,
  physical_features_id BIGINT NOT NULL REFERENCES physical_feature,
  PRIMARY KEY (person_id, physical_features_id)
);
CREATE TABLE person_physical_features_history
(
  rev                  BIGINT,
  revtype              SMALLINT,
  person_id            BIGINT NOT NULL REFERENCES person,
  physical_features_id BIGINT NOT NULL REFERENCES physical_feature,
  PRIMARY KEY (person_id, physical_features_id, rev)
);

CREATE TABLE person_determinants
(
  person_id       BIGINT NOT NULL REFERENCES person,
  determinants_id BIGINT NOT NULL REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id)
);
CREATE TABLE person_determinants_history
(
  rev             BIGINT,
  revtype         SMALLINT,
  person_id       BIGINT NOT NULL REFERENCES person,
  determinants_id BIGINT NOT NULL REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id, rev)
);

CREATE TABLE person_skills
(
  person_id BIGINT NOT NULL REFERENCES person,
  skills_id BIGINT NOT NULL REFERENCES skill,
  PRIMARY KEY (person_id, skills_id)
);
CREATE TABLE person_skills_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  person_id BIGINT NOT NULL REFERENCES person,
  skills_id BIGINT NOT NULL REFERENCES skill,
  PRIMARY KEY (person_id, skills_id, rev)
);

CREATE TABLE person_professions
(
  person_id     BIGINT NOT NULL REFERENCES person,
  profession_id BIGINT NOT NULL REFERENCES profession,
  PRIMARY KEY (person_id, profession_id)
);
CREATE TABLE person_professions_history
(
  rev           BIGINT,
  revtype       SMALLINT,
  person_id     BIGINT NOT NULL REFERENCES person,
  profession_id BIGINT NOT NULL REFERENCES profession,
  PRIMARY KEY (person_id, profession_id, rev)
);

CREATE TABLE person_animals
(
  person_id  BIGINT NOT NULL REFERENCES person,
  animals_id BIGINT NOT NULL REFERENCES animal,
  PRIMARY KEY (person_id, animals_id)
);
CREATE TABLE person_animals_history
(
  rev        BIGINT,
  revtype    SMALLINT,
  person_id  BIGINT NOT NULL REFERENCES person,
  animals_id BIGINT NOT NULL REFERENCES animal,
  PRIMARY KEY (person_id, animals_id, rev)
);

CREATE SEQUENCE person_inventory_seq;
CREATE TABLE person_inventory
(
  id        BIGINT NOT NULL DEFAULT nextval('person_inventory_seq' :: regclass),
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE person_inventory_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE SEQUENCE person_melee_weapons_seq;
CREATE TABLE person_melee_weapons
(
  id        BIGINT NOT NULL DEFAULT nextval('person_melee_weapons_seq' :: regclass),
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE person_melee_weapons_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE SEQUENCE person_ranged_weapons_seq;
CREATE TABLE person_ranged_weapons
(
  id        BIGINT NOT NULL DEFAULT nextval('person_ranged_weapons_seq' :: regclass) PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE person_ranged_weapons_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE SEQUENCE person_armor_seq;
CREATE TABLE person_armor
(
  id        BIGINT NOT NULL DEFAULT nextval('person_armor_seq' :: regclass) PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE person_armor_history
(
  rev       INT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT NOT NULL REFERENCES person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE TABLE person_spell_schools
(
  person_id         BIGINT NOT NULL REFERENCES person,
  spell_schools_key BIGINT NOT NULL REFERENCES spell_school,
  level             INT    NOT NULL DEFAULT 0,
  PRIMARY KEY (person_id, spell_schools_key)
);
CREATE TABLE person_spell_schools_history
(
  rev               BIGINT,
  revtype           SMALLINT,
  person_id         BIGINT NOT NULL REFERENCES person,
  spell_schools_key BIGINT NOT NULL REFERENCES spell_school,
  level             INT    NOT NULL DEFAULT 0,
  PRIMARY KEY (person_id, spell_schools_key, rev)
);

CREATE TABLE person_spells
(
  person_id BIGINT NOT NULL REFERENCES person,
  spells_id BIGINT NOT NULL REFERENCES spell,
  PRIMARY KEY (person_id, spells_id)
);
CREATE TABLE person_spells_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  person_id BIGINT NOT NULL REFERENCES person,
  spells_id BIGINT NOT NULL REFERENCES spell,
  PRIMARY KEY (person_id, spells_id, rev)
);

