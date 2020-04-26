CREATE EXTENSION IF NOT EXISTS "lo";

CREATE SCHEMA multimedia;

CREATE TABLE multimedia.picture (
    id       BIGSERIAL PRIMARY KEY,
    name     VARCHAR(100),
    place_id BIGINT REFERENCES world.place,
    image    lo
);

CREATE TRIGGER multimedia_picture_image
    BEFORE UPDATE OR DELETE
    ON multimedia.picture
    FOR EACH ROW
EXECUTE PROCEDURE lo_manage(image);
