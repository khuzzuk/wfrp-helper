CREATE SEQUENCE profession_seq;

CREATE TABLE knowledge.profession (
    id                  BIGSERIAL PRIMARY KEY,
    uuid                VARCHAR(36) DEFAULT uuid_generate_v4(),
    version             INTEGER,
    created             TIMESTAMP,
    last_updated        TIMESTAMP,
    name                VARCHAR(64) UNIQUE,
    description         TEXT,
    profession_class_id BIGINT REFERENCES knowledge.profession_class (id),
    next_professions    VARCHAR(255)[]
);

CREATE TABLE knowledge.profession_skills (
    profession_id BIGINT NOT NULL REFERENCES knowledge.profession (id),
    skills_id     BIGINT NOT NULL REFERENCES knowledge.skill (id),
    PRIMARY KEY (profession_id, skills_id)
);

CREATE TABLE knowledge.profession_determinants (
    profession_id   BIGINT NOT NULL REFERENCES knowledge.profession,
    determinants_id BIGINT NOT NULL UNIQUE REFERENCES rules.determinant,
    PRIMARY KEY (profession_id, determinants_id)
);

CREATE TABLE knowledge.next_profession (
    profession_id      BIGINT NOT NULL REFERENCES knowledge.profession,
    next_profession_id BIGINT NOT NULL REFERENCES knowledge.profession,
    CONSTRAINT next_professions_pk PRIMARY KEY (profession_id, next_profession_id)
);
