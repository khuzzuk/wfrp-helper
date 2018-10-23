CREATE SEQUENCE race_seq;

CREATE TABLE race (
  id               BIGINT PRIMARY KEY DEFAULT nextval('race_seq' :: regclass),
  name             VARCHAR(64) UNIQUE,
  special_features VARCHAR(255)
);

CREATE TABLE race_determinants (
  race_id         BIGINT NOT NULL REFERENCES race (id),
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant (id),
  PRIMARY KEY (race_id, determinants_id)
);

