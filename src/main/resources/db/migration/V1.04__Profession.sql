CREATE SEQUENCE profession_seq;

CREATE TABLE profession (
  id                  BIGINT PRIMARY KEY DEFAULT nextval('profession_seq' :: regclass),
  name                VARCHAR(64) UNIQUE,
  description         VARCHAR(255),
  profession_class_id BIGINT REFERENCES profession_class (id)
);

CREATE TABLE profession_skill (
  profession_id BIGINT NOT NULL REFERENCES profession(id),
  skill_id      BIGINT NOT NULL REFERENCES skill(id),
  PRIMARY KEY (profession_id, skill_id)
);
