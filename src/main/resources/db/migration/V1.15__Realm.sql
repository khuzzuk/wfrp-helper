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

CREATE TABLE realm.realm_races (
  realm_id  BIGINT NOT NULL REFERENCES realm.realm,
  race_id BIGINT NOT NULL REFERENCES world.race,
  CONSTRAINT realm_races_pk PRIMARY KEY (realm_id, race_id)
);

CREATE TABLE realm.realm_spell_schools (
    realm_id  BIGINT NOT NULL REFERENCES realm.realm,
    spell_school_id BIGINT NOT NULL REFERENCES magic.spell_school,
    CONSTRAINT realm_spell_schools_pk PRIMARY KEY (realm_id, spell_school_id)
                                 );

CREATE TABLE realm.realm_persons (
  realm_id  BIGINT NOT NULL REFERENCES realm.realm,
  person_id BIGINT NOT NULL REFERENCES creature.person,
  CONSTRAINT realm_persons_pk PRIMARY KEY (realm_id, person_id)
);
