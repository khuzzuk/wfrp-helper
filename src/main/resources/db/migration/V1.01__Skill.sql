CREATE SEQUENCE skill_seq;
CREATE TABLE skill (
  id          BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('skill_seq' :: regclass),
  name        VARCHAR(100) UNIQUE,
  description TEXT
);
