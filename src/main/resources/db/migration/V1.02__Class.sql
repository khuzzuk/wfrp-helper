CREATE TABLE knowledge.profession_class (
    id           BIGSERIAL PRIMARY KEY,
    uuid         VARCHAR(36) DEFAULT uuid_generate_v4(),
    version      INTEGER     DEFAULT 0,
    created      TIMESTAMP,
    last_updated TIMESTAMP,
    name         VARCHAR(100),
    description  VARCHAR(500)
);

CREATE TABLE knowledge.profession_class_skills (
    class_id  BIGINT REFERENCES knowledge.profession_class (id) NOT NULL,
    skills_id BIGINT REFERENCES knowledge.skill (id)            NOT NULL,
    PRIMARY KEY (class_id, skills_id)
);

