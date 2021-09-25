CREATE TABLE crafting.item (
    id                    BIGSERIAL PRIMARY KEY,
    uuid                  VARCHAR(36) DEFAULT uuid_generate_v4(),
    version               INTEGER     DEFAULT 0,
    created               TIMESTAMP,
    last_updated          TIMESTAMP,

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
    item_blueprint_id     BIGINT REFERENCES crafting.item_blueprint (id),
    availability          AVAILABILITY       NOT NULL,
    primary_resource_id   BIGINT REFERENCES crafting.resource (id),
    secondary_resource_id BIGINT REFERENCES crafting.resource (id),
    armor_pattern_id      BIGINT REFERENCES crafting.armor_pattern (id)
);

CREATE TABLE crafting.item_determinants (
    item_id         BIGINT NOT NULL REFERENCES crafting.item (id),
    determinants_id BIGINT NOT NULL UNIQUE REFERENCES rules.determinant (id),
    PRIMARY KEY (item_id, determinants_id)
);

CREATE TABLE crafting.weapon_ammunition (
    ranged_weapon_id BIGINT NOT NULL REFERENCES crafting.item,
    ammunition_id    BIGINT NOT NULL,
    PRIMARY KEY (ranged_weapon_id, ammunition_id)
);
