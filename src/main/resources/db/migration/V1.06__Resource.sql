CREATE TYPE AVAILABILITY AS ENUM ('ABUNDANT', 'PLENTIFUL', 'COMMON', 'AVERAGE', 'SCARCE', 'RARE', 'VERY_RARE');

CREATE SEQUENCE resource_seq;

CREATE TABLE resource
(
  id               BIGINT PRIMARY KEY DEFAULT nextval('resource_seq' :: regclass),
  name             VARCHAR(64) UNIQUE NOT NULL,
  description      VARCHAR(512),
  price_multiplier REAL               NOT NULL CHECK (price_multiplier >= (0) :: DOUBLE PRECISION),
  weight           REAL               NOT NULL CHECK (weight >= (0) :: DOUBLE PRECISION),
  durability       REAL               NOT NULL CHECK (durability >= (0) :: DOUBLE PRECISION),
  strength         REAL               NOT NULL CHECK (strength >= (0) :: DOUBLE PRECISION),
  availability     AVAILABILITY       NOT NULL
);
