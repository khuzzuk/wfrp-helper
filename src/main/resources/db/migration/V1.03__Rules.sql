CREATE TABLE determinant (
  id    BIGSERIAL PRIMARY KEY,
  type  VARCHAR(255),
  uuid  VARCHAR(36) DEFAULT uuid_generate_v4(),
  value INT
);
CREATE TABLE determinant_history (
  rev     BIGINT REFERENCES revinfo,
  revtype SMALLINT,
  id      BIGINT NOT NULL,
  type    VARCHAR(255),
  uuid    VARCHAR(36),
  value   INT,
  PRIMARY KEY (id, rev)
);

CREATE TABLE modifier (
  id    BIGSERIAL PRIMARY KEY,
  type  VARCHAR(255) NOT NULL,
  uuid  VARCHAR(36) DEFAULT uuid_generate_v4(),
  value INT          NOT NULL
);
CREATE TABLE modifier_history (
  rev     BIGINT REFERENCES revinfo,
  revtype SMALLINT,
  id      BIGINT,
  type    VARCHAR(255),
  uuid    VARCHAR(36),
  value   INT,
  PRIMARY KEY (rev, id)
);

CREATE TABLE determinant_modifiers (
  determinant_id BIGINT REFERENCES determinant (id),
  modifiers_id   BIGINT REFERENCES modifier (id),
  PRIMARY KEY (determinant_id, modifiers_id)
);
CREATE TABLE determinant_modifiers_history (
  rev            BIGINT REFERENCES revinfo,
  revtype        SMALLINT,
  determinant_id BIGINT,
  modifiers_id   BIGINT,
  PRIMARY KEY (determinant_id, modifiers_id, rev)
);

CREATE TYPE DICE AS ENUM ('K2', 'K3', 'K4', 'K6', 'K8', 'K10', 'K12', 'K20', 'K100');
CREATE TABLE dice_roll (
  id    BIGSERIAL PRIMARY KEY,
  uuid  VARCHAR(36) DEFAULT uuid_generate_v4(),
  dice  DICE,
  rolls INT
);

CREATE TABLE modifier_rolls (
  modifier_id BIGINT REFERENCES modifier (id),
  rolls_id    BIGINT REFERENCES dice_roll (id),
  PRIMARY KEY (rolls_id, modifier_id)
);
CREATE TABLE modifier_rolls_history (
  rev         BIGINT,
  revtype     SMALLINT,
  modifier_id BIGINT,
  rolls_id    BIGINT REFERENCES dice_roll (id),
  PRIMARY KEY (rolls_id, modifier_id, rev)
);

CREATE TYPE ACTION_TYPE AS ENUM('ACTION', 'ROUND', 'TURN');
