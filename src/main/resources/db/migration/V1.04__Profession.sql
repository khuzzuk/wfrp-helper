CREATE SEQUENCE profession_seq;

CREATE TABLE profession (
  id                  BIGINT PRIMARY KEY DEFAULT nextval('profession_seq' :: regclass),
  name                VARCHAR(64) UNIQUE,
  description         VARCHAR(255),
  profession_class_id BIGINT REFERENCES profession_class (id)
);

CREATE TABLE profession_skills (
  profession_id BIGINT NOT NULL REFERENCES profession(id),
  skills_id      BIGINT NOT NULL REFERENCES skill(id),
  PRIMARY KEY (profession_id, skills_id)
);

CREATE TABLE profession_determinants (
  profession_id         BIGINT NOT NULL REFERENCES profession,
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant,
  PRIMARY KEY (profession_id, determinants_id)
);
