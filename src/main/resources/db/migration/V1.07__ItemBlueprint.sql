CREATE TYPE PLACEMENT AS ENUM ('BODY', 'HEAD', 'TORSO', 'HAND', 'LEG', 'BELT', 'NECK', 'FINGER', 'SHIELD', 'BOTH_HANDS');

CREATE TABLE crafting.item_blueprint (
    id               BIGSERIAL PRIMARY KEY,
    uuid             VARCHAR(36) DEFAULT uuid_generate_v4(),
    version          INTEGER,
    created          TIMESTAMP,
    last_updated     TIMESTAMP,
    type             VARCHAR(255)       NOT NULL,
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
    damage_id        BIGINT REFERENCES rules.modifier (id),
    prepare_type     ACTION_TYPE,
    prepare_amount   INT
);

CREATE TABLE crafting.item_blueprint_determinants (
    item_blueprint_id BIGINT NOT NULL REFERENCES crafting.item_blueprint,
    determinant_id    BIGINT NOT NULL REFERENCES rules.determinant,
    PRIMARY KEY (item_blueprint_id, determinant_id)
);

CREATE TABLE crafting.item_blueprint_placements (
    item_blueprint_id BIGINT REFERENCES crafting.item_blueprint,
    placement         PLACEMENT NOT NULL,
    PRIMARY KEY (item_blueprint_id, placement)
);
