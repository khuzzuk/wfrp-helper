CREATE TABLE crafting.armor_pattern (
    id               BIGSERIAL PRIMARY KEY,
    uuid             VARCHAR(36) DEFAULT uuid_generate_v4(),
    version          INTEGER,
    created          TIMESTAMP,
    last_updated     TIMESTAMP,
    name             VARCHAR(64) UNIQUE NOT NULL,
    description      VARCHAR(512),
    price_multiplier REAL               NOT NULL CHECK (price_multiplier >= (0) :: DOUBLE PRECISION),
    weight           REAL               NOT NULL CHECK (weight >= (0) :: DOUBLE PRECISION),
    strength         REAL               NOT NULL CHECK (strength >= (0) :: DOUBLE PRECISION),
    availability     AVAILABILITY       NOT NULL
);
