CREATE TABLE item (
  id                    BIGSERIAL PRIMARY KEY,
  dtype                 VARCHAR(255)       NOT NULL,
  name                  VARCHAR(64) UNIQUE NOT NULL,
  description           VARCHAR(255),
  gold                  INT                NOT NULL,
  silver                INT                NOT NULL,
  lead                  INT                NOT NULL,
  weight                REAL               NOT NULL CHECK (weight >= (0) :: DOUBLE PRECISION),
  armor                 INT,
  maximum_range         INT,
  medium_range          INT,
  minimum_range         INT,
  placement             INT,
  item_blueprint_id     BIGINT REFERENCES item_blueprint (id),
  availability          AVAILABILITY      NOT NULL,
  primary_resource_id   BIGINT REFERENCES resource (id),
  secondary_resource_id BIGINT REFERENCES resource (id),
  armor_pattern_id      BIGINT REFERENCES armor_pattern (id)
);

CREATE TABLE item_determinants (
  item_id         BIGINT NOT NULL REFERENCES item (id),
  determinants_id BIGINT NOT NULL UNIQUE REFERENCES determinant (id),
  PRIMARY KEY (item_id, determinants_id)
);
