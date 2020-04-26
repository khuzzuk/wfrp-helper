CREATE SCHEMA world;

CREATE TABLE world.nation (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(64) UNIQUE NOT NULL,
    description VARCHAR(50000)
);

CREATE SEQUENCE language_seq;
CREATE TABLE world.language (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(64) UNIQUE NOT NULL,
    description VARCHAR(255)
);
CREATE TABLE world.language_nations (
    language_id BIGINT NOT NULL REFERENCES world.language,
    nations_id  BIGINT NOT NULL REFERENCES world.nation,
    PRIMARY KEY (language_id, nations_id)
);

CREATE TABLE world.currency (
    id               BIGSERIAL PRIMARY KEY,
    name             VARCHAR(64) UNIQUE NOT NULL,
    description      VARCHAR(255),
    value_multiplier REAL CHECK (value_multiplier > 0)
);
CREATE TABLE world.currency_nations (
    currency_id BIGINT NOT NULL REFERENCES world.currency,
    nations_id  BIGINT NOT NULL REFERENCES world.nation,
    PRIMARY KEY (currency_id, nations_id)
);

CREATE TABLE world.culture_name (
    name      VARCHAR(255),
    nation_id BIGINT REFERENCES world.nation,
    PRIMARY KEY (name, nation_id)
);

CREATE TABLE world.religion (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);
CREATE TABLE world.religion_nation (
    religion_id BIGINT NOT NULL REFERENCES world.religion,
    nation_id   BIGINT NOT NULL REFERENCES world.nation,
    PRIMARY KEY (religion_id, nation_id)
);

CREATE TABLE world.race (
    id               BIGSERIAL PRIMARY KEY,
    name             VARCHAR(64) UNIQUE,
    special_features VARCHAR(255)
);

CREATE TABLE world.race_determinants (
    race_id         BIGINT NOT NULL REFERENCES world.race (id),
    determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant (id),
    PRIMARY KEY (race_id, determinants_id)
);

CREATE TABLE world.race_nation (
    race_id   BIGINT NOT NULL REFERENCES world.race,
    nation_id BIGINT NOT NULL REFERENCES world.nation
);

CREATE TABLE world.place (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(64) UNIQUE,
    description TEXT,
    nation_id   BIGINT NOT NULL REFERENCES world.nation
);