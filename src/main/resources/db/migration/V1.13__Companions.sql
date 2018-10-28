CREATE SEQUENCE person_seq;
CREATE TABLE person (
  id          BIGINT PRIMARY KEY DEFAULT nextval('person_seq' :: regclass),
  name        VARCHAR(64) UNIQUE NOT NULL,
  description VARCHAR(255),
  history     TEXT
);

CREATE TABLE person_skills (
  person_id BIGINT NOT NULL REFERENCES person,
  skills_id BIGINT NOT NULL REFERENCES skill,
  PRIMARY KEY (person_id, skills_id)
);

