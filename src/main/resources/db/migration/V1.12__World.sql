CREATE SEQUENCE nation_seq;
CREATE TABLE nation (
  id          BIGINT PRIMARY KEY DEFAULT nextval('nation_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);

CREATE SEQUENCE language_seq;
CREATE TABLE language (
  id          BIGINT PRIMARY KEY DEFAULT nextval('language_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);
CREATE TABLE language_nations (
  language_id BIGINT NOT NULL REFERENCES language,
  nations_id  BIGINT NOT NULL REFERENCES nation,
  PRIMARY KEY (language_id, nations_id)
);

CREATE SEQUENCE currency_seq;
CREATE TABLE currency (
  id               BIGINT PRIMARY KEY DEFAULT nextval('currency_seq' :: regclass),
  name             VARCHAR(64) UNIQUE NOT NULL,
  description      VARCHAR(255),
  value_multiplier REAL CHECK (value_multiplier > 0)
);
CREATE TABLE currency_nations (
  currency_id BIGINT NOT NULL REFERENCES currency,
  nations_id  BIGINT NOT NULL REFERENCES nation,
  PRIMARY KEY (currency_id, nations_id)
);
