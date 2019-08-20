CREATE SEQUENCE profession_seq;

CREATE TABLE profession (
  id                  BIGINT PRIMARY KEY DEFAULT nextval('profession_seq' :: REGCLASS),
  name                VARCHAR(64) UNIQUE,
  uuid                VARCHAR(36) DEFAULT uuid_generate_v4(),
  description         VARCHAR(255),
  profession_class_id BIGINT REFERENCES profession_class (id),
  next_professions    VARCHAR(255)[]
);

CREATE TABLE profession_skills (
  profession_id BIGINT NOT NULL REFERENCES profession (id),
  skills_id     BIGINT NOT NULL REFERENCES skill (id),
  PRIMARY KEY (profession_id, skills_id)
);

CREATE TABLE profession_determinants (
  profession_id   BIGINT NOT NULL REFERENCES profession,
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant,
  PRIMARY KEY (profession_id, determinants_id)
);

CREATE TABLE next_profession (
  profession_id      BIGINT NOT NULL REFERENCES profession,
  next_profession_id BIGINT NOT NULL REFERENCES profession,
  CONSTRAINT next_professions_pk PRIMARY KEY (profession_id, next_profession_id)
);
