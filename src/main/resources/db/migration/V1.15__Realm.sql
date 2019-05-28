CREATE SCHEMA realm;

CREATE TABLE realm.realm (
  id   BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE realm.realm_nations (
  realm_id  BIGINT NOT NULL REFERENCES realm.realm,
  nation_id BIGINT NOT NULL REFERENCES world.nation,
  CONSTRAINT realm_nations_pk PRIMARY KEY (realm_id, nation_id)
);

CREATE TABLE realm.realm_persons (
  realm_id  BIGINT NOT NULL REFERENCES realm.realm,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  CONSTRAINT realm_persons_pk PRIMARY KEY (realm_id, person_id)
);
