CREATE TABLE creature.animal_kind (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(64) NOT NULL UNIQUE,
    description  VARCHAR(255)
);
CREATE TABLE creature.animal_kind_determinants (
    animal_kind_id  BIGINT NOT NULL REFERENCES creature.animal_kind,
    determinants_id BIGINT NOT NULL REFERENCES rules.determinant,
    PRIMARY KEY (animal_kind_id, determinants_id)
);

CREATE TABLE creature.animal (
    id             BIGSERIAL PRIMARY KEY,
    uuid           VARCHAR(36) DEFAULT uuid_generate_v4(),
    version        INTEGER     DEFAULT 0,
    created        TIMESTAMP,
    last_updated   TIMESTAMP,
    name           VARCHAR(64) NOT NULL UNIQUE,
    description    VARCHAR(255),
    animal_kind_id BIGINT      NOT NULL REFERENCES creature.animal_kind
);
CREATE TABLE creature.animal_determinants (
    animal_id       BIGINT NOT NULL REFERENCES creature.animal (id),
    determinants_id BIGINT NOT NULL REFERENCES rules.determinant (id),
    PRIMARY KEY (animal_id, determinants_id)
);

