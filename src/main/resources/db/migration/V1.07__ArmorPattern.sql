CREATE SEQUENCE armor_pattern_seq;

CREATE TABLE armor_pattern (
  id               BIGINT PRIMARY KEY DEFAULT nextval('armor_pattern_seq' :: regclass),
  name             VARCHAR(64) UNIQUE NOT NULL,
  description      VARCHAR(512),
  price_multiplier REAL               NOT NULL CHECK (price_multiplier >= (0) :: DOUBLE PRECISION),
  weight           REAL               NOT NULL CHECK (weight >= (0) :: DOUBLE PRECISION),
  strength         REAL               NOT NULL CHECK (strength >= (0) :: DOUBLE PRECISION),
  accessibility    INT                NOT NULL
);
