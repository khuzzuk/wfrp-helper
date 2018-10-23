CREATE SEQUENCE profession_class_seq;

CREATE TABLE profession_class (
  id BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('profession_class_seq'::regclass),
  name VARCHAR(100),
  description VARCHAR(500)
);

CREATE TABLE profession_class_skills (
  class_id BIGINT REFERENCES profession_class (id) NOT NULL,
  skills_id BIGINT REFERENCES skill (id) NOT NULL,
  PRIMARY KEY (class_id, skills_id)
);

