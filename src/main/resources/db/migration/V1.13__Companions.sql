CREATE SEQUENCE animal_kind_seq;
CREATE TABLE animal_kind (
  id          BIGINT PRIMARY KEY DEFAULT nextval('animal_kind_seq' :: regclass),
  name        VARCHAR(64) NOT NULL UNIQUE,
  description VARCHAR(255)
);
CREATE TABLE animal_kind_determinants (
  animal_kind_id BIGINT NOT NULL REFERENCES animal_kind,
  determinants_id BIGINT NOT NULL REFERENCES determinant,
  PRIMARY KEY (animal_kind_id, determinants_id)
);

CREATE SEQUENCE animal_seq;
CREATE TABLE animal (
  id          BIGINT PRIMARY KEY DEFAULT nextval('animal_seq' :: regclass),
  name        VARCHAR(64) NOT NULL UNIQUE,
  description VARCHAR(255),
  animal_kind_id BIGINT NOT NULL REFERENCES animal_kind
);
CREATE TABLE animal_determinants (
  animal_id BIGINT NOT NULL REFERENCES animal,
  determinants_id BIGINT NOT NULL REFERENCES determinant,
  PRIMARY KEY (animal_id, determinants_id)
);

