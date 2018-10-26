CREATE SCHEMA security;

CREATE SEQUENCE security.role_seq;

CREATE TABLE security.role (
  id   BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('security.role_seq' :: regclass),
  name VARCHAR(100) UNIQUE
);

CREATE SEQUENCE security.user_seq;

CREATE TABLE security."user" (
  id                BIGINT PRIMARY KEY NOT NULL DEFAULT nextval('security.user_seq' :: regclass),
  name              VARCHAR(100)       NOT NULL UNIQUE,
  password          VARCHAR(255)       NOT NULL,
  one_time_password BOOLEAN            NOT NULL DEFAULT TRUE,
  deleted           BOOLEAN            NOT NULL DEFAULT FALSE
);

CREATE TABLE security.user_roles (
  user_id  BIGINT NOT NULL REFERENCES security."user" (id),
  roles_id BIGINT NOT NULL REFERENCES security.role (id),
  PRIMARY KEY (user_id, roles_id)
);

INSERT INTO security.role (name) VALUES
  ('ROLE_USER'),
  ('ROLE_ADMIN');
