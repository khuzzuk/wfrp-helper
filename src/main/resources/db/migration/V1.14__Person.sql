CREATE SCHEMA creature;

CREATE TABLE creature.person
(
  id                    BIGSERIAL PRIMARY KEY,
  name                  VARCHAR(64) UNIQUE NOT NULL,
  description           VARCHAR(255),
  gender                INT                NOT NULL,
  age                   INT                NOT NULL,
  height                INT                NOT NULL,
  weight                REAL               NOT NULL,
  hair_color_id         BIGINT             NOT NULL REFERENCES hair_color,
  eye_color_id          BIGINT             NOT NULL REFERENCES eye_color,
  history               TEXT,
  profession_class_id   BIGINT             NOT NULL REFERENCES profession_class,
  current_profession_id BIGINT             NOT NULL REFERENCES profession
);
CREATE TABLE creature.person_history
(
  rev                   BIGINT,
  revtype               SMALLINT,
  id                    BIGINT NOT NULL,
  name                  VARCHAR(64),
  description           VARCHAR(255),
  gender                INT,
  age                   INT,
  height                INT,
  weight                REAL,
  hair_color_id         BIGINT,
  eye_color_id          BIGINT,
  history               TEXT,
  profession_class_id   BIGINT,
  current_profession_id BIGINT,
  PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_physical_features
(
  person_id            BIGINT NOT NULL REFERENCES creature.person,
  physical_features_id BIGINT NOT NULL REFERENCES physical_feature,
  PRIMARY KEY (person_id, physical_features_id)
);
CREATE TABLE creature.person_physical_features_history
(
  rev                  BIGINT,
  revtype              SMALLINT,
  person_id            BIGINT,
  physical_features_id BIGINT,
  PRIMARY KEY (person_id, physical_features_id, rev)
);

CREATE TABLE creature.person_determinants
(
  person_id       BIGINT NOT NULL REFERENCES creature.person,
  determinants_id BIGINT NOT NULL REFERENCES determinant,
  PRIMARY KEY (person_id, determinants_id)
);
CREATE TABLE creature.person_determinants_history
(
  rev             BIGINT,
  revtype         SMALLINT,
  person_id       BIGINT,
  determinants_id BIGINT,
  PRIMARY KEY (person_id, determinants_id, rev)
);

CREATE TABLE creature.person_skills
(
  person_id BIGINT NOT NULL REFERENCES creature.person,
  skills_id BIGINT NOT NULL REFERENCES skill,
  PRIMARY KEY (person_id, skills_id)
);
CREATE TABLE creature.person_skills_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  person_id BIGINT,
  skills_id BIGINT,
  PRIMARY KEY (person_id, skills_id, rev)
);

CREATE TABLE creature.person_professions
(
  person_id     BIGINT NOT NULL REFERENCES creature.person,
  profession_id BIGINT NOT NULL REFERENCES profession,
  PRIMARY KEY (person_id, profession_id)
);
CREATE TABLE creature.person_professions_history
(
  rev           BIGINT,
  revtype       SMALLINT,
  person_id     BIGINT,
  profession_id BIGINT,
  PRIMARY KEY (person_id, profession_id, rev)
);

CREATE TABLE creature.person_animals
(
  person_id  BIGINT NOT NULL REFERENCES creature.person,
  animals_id BIGINT NOT NULL REFERENCES animal,
  PRIMARY KEY (person_id, animals_id)
);
CREATE TABLE creature.person_animals_history
(
  rev        BIGINT,
  revtype    SMALLINT,
  person_id  BIGINT,
  animals_id BIGINT,
  PRIMARY KEY (person_id, animals_id, rev)
);

CREATE TABLE creature.person_inventory
(
  id        BIGSERIAL PRIMARY KEY,
  amount    INT,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE creature.person_inventory_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  amount    INT,
  person_id BIGINT,
  item_id   BIGINT,
  PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_melee_weapons
(
  id        BIGSERIAL PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE creature.person_melee_weapons_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT,
  item_id   BIGINT,
  PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_ranged_weapons
(
  id        BIGSERIAL PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE creature.person_ranged_weapons_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_armor
(
  id        BIGSERIAL PRIMARY KEY,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item
);
CREATE TABLE creature.person_armor_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  id        BIGINT NOT NULL,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  item_id   BIGINT NOT NULL REFERENCES item,
  PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_spell_schools
(
  person_id         BIGINT NOT NULL REFERENCES creature.person,
  spell_schools_key BIGINT NOT NULL REFERENCES spell_school,
  level             INT    NOT NULL DEFAULT 0,
  PRIMARY KEY (person_id, spell_schools_key)
);
CREATE TABLE creature.person_spell_schools_history
(
  rev               BIGINT,
  revtype           SMALLINT,
  person_id         BIGINT NOT NULL REFERENCES creature.person,
  spell_schools_key BIGINT NOT NULL REFERENCES spell_school,
  level             INT    NOT NULL DEFAULT 0,
  PRIMARY KEY (person_id, spell_schools_key, rev)
);

CREATE TABLE creature.person_spells
(
  person_id BIGINT NOT NULL REFERENCES creature.person,
  spells_id BIGINT NOT NULL REFERENCES spell,
  PRIMARY KEY (person_id, spells_id)
);
CREATE TABLE creature.person_spells_history
(
  rev       BIGINT,
  revtype   SMALLINT,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  spells_id BIGINT NOT NULL REFERENCES spell,
  PRIMARY KEY (person_id, spells_id, rev)
);

