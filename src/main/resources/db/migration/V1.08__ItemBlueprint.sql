CREATE SEQUENCE item_blueprint_seq;

CREATE TABLE item_blueprint (
  id               BIGINT PRIMARY KEY DEFAULT nextval('item_blueprint_seq' :: regclass),
  dtype            VARCHAR(255)       NOT NULL,
  name             VARCHAR(64) UNIQUE NOT NULL,
  description      VARCHAR(255),
  gold             INT                NOT NULL,
  silver           INT                NOT NULL,
  lead             INT                NOT NULL,
  suggested_weight REAL               NOT NULL CHECK (suggested_weight >= (0) :: DOUBLE PRECISION),
  armor            INT,
  maximum_range    INT,
  medium_range     INT,
  minimum_range    INT,
  placement        INT                NOT NULL,
  damage_id        BIGINT REFERENCES modifier (id),
  armor_pattern_id BIGINT REFERENCES armor_pattern (id)
);

CREATE TABLE item_blueprint_determinants (
  item_blueprint_id BIGINT NOT NULL REFERENCES item_blueprint (id),
  determinant_id    BIGINT NOT NULL UNIQUE REFERENCES determinant (id),
  PRIMARY KEY (item_blueprint_id, determinant_id)
);
