CREATE SEQUENCE character_seq;
CREATE TABLE character (
  id          BIGINT PRIMARY KEY DEFAULT nextval('character_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);

CREATE SEQUENCE eye_color_seq;
CREATE TABLE eye_color (
  id          BIGINT PRIMARY KEY DEFAULT nextval('eye_color_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);

CREATE SEQUENCE hair_color_seq;
CREATE TABLE hair_color (
  id          BIGINT PRIMARY KEY DEFAULT nextval('hair_color_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);

CREATE SEQUENCE physical_feature_seq;
CREATE TABLE physical_feature (
  id          BIGINT PRIMARY KEY DEFAULT nextval('physical_feature_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255)
);
CREATE TABLE physical_feature_determinants (
  physical_feature_id BIGINT NOT NULL REFERENCES physical_feature (id),
  determinants_id     BIGINT NOT NULL UNIQUE REFERENCES determinant (id),
  PRIMARY KEY (physical_feature_id, determinants_id)
);

