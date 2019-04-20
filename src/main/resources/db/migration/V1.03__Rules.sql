CREATE SEQUENCE determinant_seq;

CREATE TABLE determinant (
  id    BIGINT PRIMARY KEY DEFAULT nextval('determinant_seq' :: REGCLASS),
  type  VARCHAR(255),
  uuid  VARCHAR(36),
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

CREATE SEQUENCE modifier_seq;

CREATE TABLE modifier (
  id    BIGINT PRIMARY KEY DEFAULT nextval('modifier_seq' :: REGCLASS),
  type  VARCHAR(255) NOT NULL,
  uuid  VARCHAR(36),
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

CREATE SEQUENCE dice_roll_seq;

CREATE TABLE dice_roll (
  id    BIGINT PRIMARY KEY DEFAULT nextval('dice_roll_seq' :: REGCLASS),
  uuid  VARCHAR(36),
  dice  INT,
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
