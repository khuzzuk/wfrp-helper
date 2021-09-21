CREATE TABLE creature.person (
    id                    BIGSERIAL PRIMARY KEY,
    uuid                  VARCHAR(36) DEFAULT uuid_generate_v4(),
    version               INTEGER,
    created               TIMESTAMP,
    last_updated          TIMESTAMP,
    name                  VARCHAR(64) UNIQUE NOT NULL,
    description           VARCHAR(255),
    gender                INT                NOT NULL,
    age                   INT                NOT NULL,
    height                INT                NOT NULL,
    weight                REAL               NOT NULL,
    fate_points           INT                NOT NULL,
    mana                  INT                NOT NULL,
    current_mana          INT                NOT NULL,
    sanity_points         INT                NOT NULL,
    hair_color_id         BIGINT             NOT NULL REFERENCES creature.hair_color,
    eye_color_id          BIGINT             NOT NULL REFERENCES creature.eye_color,
    history               TEXT,
    profession_class_id   BIGINT             NOT NULL REFERENCES knowledge.profession_class,
    current_profession_id BIGINT             NOT NULL REFERENCES knowledge.profession,
    personality_id        BIGINT             NOT NULL REFERENCES creature.character,
    race_id               BIGINT             NOT NULL REFERENCES world.race,
    total_experience      INT,
    experience            INT,
    nation_id             BIGINT REFERENCES world.nation,
    birthplace            TEXT,
    parents               TEXT,
    family                TEXT,
    health                TEXT,
    religion_id           BIGINT REFERENCES world.religion
);

CREATE TABLE creature.person_history (
    rev                   BIGINT,
    revtype               SMALLINT,
    id                    BIGINT NOT NULL,
    uuid                  VARCHAR(36),
    version               INTEGER,
    created               TIMESTAMP,
    last_updated          TIMESTAMP,
    name                  VARCHAR(64),
    description           VARCHAR(255),
    gender                INT,
    age                   INT,
    height                INT,
    weight                REAL,
    fate_points           INT    NOT NULL,
    mana                  INT    NOT NULL,
    current_mana          INT    NOT NULL,
    sanity_points         INT    NOT NULL,
    hair_color_id         BIGINT,
    eye_color_id          BIGINT,
    history               TEXT,
    profession_class_id   BIGINT,
    current_profession_id BIGINT,
    personality_id        BIGINT,
    race_id               BIGINT,
    total_experience      INT,
    experience            INT,
    nation_id             BIGINT,
    birthplace            TEXT,
    parents               TEXT,
    family                TEXT,
    health                TEXT,
    religion_id           BIGINT,
    PRIMARY KEY (rev, id)
);

CREATE TABLE creature.person_physical_features (
    person_id            BIGINT NOT NULL REFERENCES creature.person,
    physical_features_id BIGINT NOT NULL REFERENCES creature.physical_feature,
    PRIMARY KEY (person_id, physical_features_id)
);
CREATE TABLE creature.person_physical_features_history (
    rev                  BIGINT,
    revtype              SMALLINT,
    person_id            BIGINT,
    physical_features_id BIGINT,
    PRIMARY KEY (person_id, physical_features_id, rev)
);

CREATE TABLE creature.person_determinants (
    person_id       BIGINT NOT NULL REFERENCES creature.person,
    determinants_id BIGINT NOT NULL REFERENCES rules.determinant,
    PRIMARY KEY (person_id, determinants_id)
);
CREATE TABLE creature.person_determinants_history (
    rev             BIGINT,
    revtype         SMALLINT,
    person_id       BIGINT,
    determinants_id BIGINT,
    PRIMARY KEY (person_id, determinants_id, rev)
);

CREATE TABLE creature.person_skills (
    person_id BIGINT NOT NULL REFERENCES creature.person,
    skills_id BIGINT NOT NULL REFERENCES knowledge.skill,
    PRIMARY KEY (person_id, skills_id)
);
CREATE TABLE creature.person_skills_history (
    rev       BIGINT,
    revtype   SMALLINT,
    person_id BIGINT,
    skills_id BIGINT,
    PRIMARY KEY (person_id, skills_id, rev)
);

CREATE TABLE creature.person_professions (
    person_id     BIGINT NOT NULL REFERENCES creature.person,
    profession_id BIGINT NOT NULL REFERENCES knowledge.profession,
    PRIMARY KEY (person_id, profession_id)
);
CREATE TABLE creature.person_professions_history (
    rev           BIGINT,
    revtype       SMALLINT,
    person_id     BIGINT,
    profession_id BIGINT,
    PRIMARY KEY (person_id, profession_id, rev)
);

CREATE TABLE creature.person_animals (
    person_id  BIGINT NOT NULL REFERENCES creature.person,
    animals_id BIGINT NOT NULL REFERENCES creature.animal,
    PRIMARY KEY (person_id, animals_id)
);
CREATE TABLE creature.person_animals_history (
    rev        BIGINT,
    revtype    SMALLINT,
    person_id  BIGINT,
    animals_id BIGINT,
    PRIMARY KEY (person_id, animals_id, rev)
);

CREATE TABLE creature.inventory (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    item_id      BIGINT,
    person_id    BIGINT,
    amount       REAL CHECK ( amount >= (0) :: DOUBLE PRECISION )
);
CREATE TABLE creature.inventory_history (
    history_id   BIGSERIAL PRIMARY KEY,
    rev          BIGINT,
    revtype      SMALLINT,
    id           BIGSERIAL,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    item_id      BIGINT,
    person_id    BIGINT,
    amount       REAL
);
CREATE TABLE creature.person_inventory_history (
    history_id   BIGSERIAL PRIMARY KEY,
    rev          BIGINT,
    revtype      SMALLINT,
    id           BIGSERIAL,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    item_id      BIGINT,
    person_id    BIGINT,
    amount       REAL
);

CREATE TABLE creature.person_melee_weapons (
    id        BIGSERIAL PRIMARY KEY,
    person_id BIGINT NOT NULL REFERENCES creature.person,
    item_id   BIGINT NOT NULL REFERENCES crafting.item
);

CREATE TABLE creature.person_ranged_weapons (
    id                BIGSERIAL PRIMARY KEY,
    uuid              VARCHAR(36) DEFAULT uuid_generate_v4(),
    version           INTEGER,
    created           TIMESTAMP,
    last_updated      TIMESTAMP,
    person_id         BIGINT REFERENCES creature.person,
    ranged_weapon_id  BIGINT NOT NULL REFERENCES crafting.item,
    ammunition_id     BIGINT REFERENCES crafting.item,
    ammunition_amount INT
);
CREATE TABLE creature.person_ranged_weapons_history (
    history_id        BIGSERIAL PRIMARY KEY,
    rev               BIGINT,
    revtype           SMALLINT,
    id                BIGINT,
    uuid              VARCHAR(36),
    version           INTEGER,
    created           TIMESTAMP,
    last_updated      TIMESTAMP,
    person_id         BIGINT,
    ranged_weapon_id  BIGINT,
    ammunition_id     BIGINT,
    ammunition_amount INT
);

CREATE TABLE creature.person_armor (
    id        BIGSERIAL PRIMARY KEY,
    person_id BIGINT NOT NULL REFERENCES creature.person,
    item_id   BIGINT NOT NULL REFERENCES crafting.item
);

CREATE TABLE creature.person_spell_school_level (
    id              BIGSERIAL PRIMARY KEY,
    uuid            VARCHAR(36)     DEFAULT uuid_generate_v4(),
    version         INTEGER,
    created         TIMESTAMP,
    last_updated    TIMESTAMP,
    person_id       BIGINT REFERENCES creature.person,
    spell_school_id BIGINT NOT NULL REFERENCES magic.spell_school,
    level           INT    NOT NULL DEFAULT 0
);
CREATE TABLE creature.person_spell_school_level_history (
    history_id      BIGSERIAL PRIMARY KEY,
    rev             BIGINT,
    revtype         SMALLINT,
    id              BIGINT,
    uuid            VARCHAR(36),
    version         INTEGER,
    created         TIMESTAMP,
    last_updated    TIMESTAMP,
    person_id       BIGINT,
    spell_school_id BIGINT,
    level           INT
);

CREATE TABLE creature.person_spells (
    person_id BIGINT NOT NULL REFERENCES creature.person,
    spells_id BIGINT NOT NULL REFERENCES magic.spell,
    PRIMARY KEY (person_id, spells_id)
);
CREATE TABLE creature.person_spells_history (
    rev       BIGINT,
    revtype   SMALLINT,
    person_id BIGINT,
    spells_id BIGINT,
    PRIMARY KEY (person_id, spells_id, rev)
);

CREATE TABLE creature.money (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    person_id    BIGINT,
    currency_id  BIGINT REFERENCES world.currency,
    gold         INT NOT NULL,
    silver       INT NOT NULL,
    lead         INT NOT NULL
);
CREATE TABLE creature.money_history (
    history_id   BIGSERIAL PRIMARY KEY,
    rev          BIGINT,
    revtype      SMALLINT,
    id           BIGINT,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    person_id    BIGINT,
    currency_id  BIGINT REFERENCES world.currency,
    gold         INT NOT NULL,
    silver       INT NOT NULL,
    lead         INT NOT NULL
);
CREATE TABLE creature.person_money_history (
    history_id   BIGSERIAL PRIMARY KEY,
    rev          BIGINT,
    revtype      SMALLINT,
    id           BIGINT,
    uuid         VARCHAR(36),
    version      INTEGER,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    person_id    BIGINT,
    currency_id  BIGINT REFERENCES world.currency,
    gold         INT NOT NULL,
    silver       INT NOT NULL,
    lead         INT NOT NULL
);

CREATE TABLE creature.person_languages (
    person_id   BIGINT REFERENCES creature.person,
    language_id BIGINT REFERENCES world.language,
    PRIMARY KEY (person_id, language_id)
);
CREATE TABLE creature.person_languages_history (
    history_id  BIGSERIAL PRIMARY KEY,
    rev         BIGINT,
    revtype     SMALLINT,
    person_id   BIGINT,
    language_id BIGINT
);
