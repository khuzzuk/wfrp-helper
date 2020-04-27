CREATE FUNCTION pg_temp.addRaceRoll
(extension_type VARCHAR(255),
 rolls_to_insert INT,
 mods_to_insert INT,
 dice_to_insert DICE,
 race_id_to_insert BIGINT)
    RETURNS VOID AS
$$
DECLARE
    inserted_extension_id BIGINT;
    inserted_modifier_id  BIGINT;
    inserted_rolls_id  BIGINT;
BEGIN


    INSERT INTO determinant (type, value)
    VALUES (extension_type, 0) RETURNING id
        INTO inserted_extension_id;

    INSERT INTO modifier (type, value)
    VALUES ('DICE', mods_to_insert) RETURNING id
        INTO inserted_modifier_id;
    INSERT INTO determinant_modifiers (determinant_id, modifiers_id)
    VALUES (inserted_extension_id, inserted_modifier_id);

    INSERT INTO dice_roll (dice, rolls) VALUES (dice_to_insert, rolls_to_insert) RETURNING id INTO inserted_rolls_id;
    INSERT INTO modifier_rolls (modifier_id, rolls_id) VALUES (inserted_modifier_id, inserted_rolls_id);

    INSERT INTO world.race_determinants (race_id, determinants_id)
    VALUES (race_id_to_insert, inserted_extension_id);

END;

$$
    LANGUAGE plpgsql;

CREATE FUNCTION pg_temp.add_race
(name TEXT,
 speed_rolls INT, speed_mod INT, speed_dice DICE,
 battle_rolls INT, battle_mod INT, battle_dice DICE,
 shooting_rolls INT, shooting_mod INT, shooting_dice DICE,
 strenght_rolls INT, strenght_mod INT, strenght_dice DICE,
 durability_rolls INT, durability_mod INT, durability_dice DICE,
 vitality_rolls INT, vitality_mod INT, vitality_dice DICE,
 initiative_rolls INT, initiative_mod INT, initiative_dice DICE,
 dexterity_rolls INT, dexterity_mod INT, dexterity_dice DICE,
 leadership_rolls INT, leadership_mod INT, leadership_dice DICE,
 intelligence_rolls INT, intelligence_mod INT, intelligence_dice DICE,
 control_rolls INT, control_mod INT, control_dice DICE,
 will_rolls INT, will_mod INT, will_dice DICE,
 charisma_rolls INT, charisma_mod INT, charisma_dice DICE, nations_names TEXT[]) RETURNS VOID AS
$$
DECLARE
    inserted_race_id BIGINT;
    inserted_attack_determinant_id BIGINT;

BEGIN
    INSERT INTO world.race ("name") VALUES (name) RETURNING id INTO inserted_race_id;

    PERFORM pg_temp.addRaceRoll('SPEED', speed_rolls, speed_mod, speed_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('BATTLE', battle_rolls, battle_mod, battle_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('SHOOTING', shooting_rolls, shooting_mod, shooting_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('STRENGTH', strenght_rolls, strenght_mod, strenght_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('DURABILITY', durability_rolls, durability_mod, durability_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('HEALTH', vitality_rolls, vitality_mod, vitality_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('INITIATIVE', initiative_rolls, initiative_mod, initiative_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('DEXTERITY', dexterity_rolls, dexterity_mod, dexterity_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('LEADER_SKILLS', leadership_rolls, leadership_mod, leadership_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('INTELLIGENCE', intelligence_rolls, intelligence_mod, intelligence_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('CONTROL', control_rolls, control_mod, control_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('WILL', will_rolls, will_mod, will_dice, inserted_race_id);
    PERFORM pg_temp.addRaceRoll('CHARISMA', charisma_rolls, charisma_mod, charisma_dice, inserted_race_id);

    INSERT INTO determinant (type, value)
    VALUES ('ATTACK', 1)
    RETURNING id INTO inserted_attack_determinant_id;

    INSERT INTO world.race_determinants(race_id, determinants_id)
    VALUES (inserted_race_id, inserted_attack_determinant_id);

END;

$$ LANGUAGE plpgsql;
--                       name           speed       battle       shooting      strength    durability  vitality    initiative    dexterity     leadership   intelligence    control       will         charisma
SELECT pg_temp.add_race('Człowiek',     1, 2, 'K3', 2, 20, 'K10', 2, 20, 'K10', 1, 1, 'K3', 1, 1, 'K3', 1, 4, 'K3', 2, 20, 'K10', 2, 20, 'K10', 2, 20, 'K10', 2, 20, 'K10', 2, 20, 'K10', 2, 20, 'K10', 2, 20, 'K10', '{}');
SELECT pg_temp.add_race('Wysoki Elf',   1, 2, 'K3', 2, 30, 'K10', 2, 30, 'K10', 1, 1, 'K3', 1, 1, 'K3', 1, 3, 'K3', 2, 50, 'K10', 2, 30, 'K10', 2, 30, 'K10', 2, 40, 'K10', 2, 40, 'K10', 2, 30, 'K10', 2, 30, 'K10', '{}');
SELECT pg_temp.add_race('Leśny Elf',    1, 2, 'K3', 2, 30, 'K10', 2, 40, 'K10', 1, 1, 'K3', 1, 1, 'K3', 1, 3, 'K3', 2, 50, 'K10', 2, 30, 'K10', 2, 30, 'K10', 2, 30, 'K10', 2, 40, 'K10', 2, 30, 'K10', 2, 30, 'K10', '{"Lorien"}');
SELECT pg_temp.add_race('Mroczny Elf',  1, 2, 'K3', 2, 40, 'K10', 2, 30, 'K10', 1, 1, 'K3', 1, 1, 'K3', 1, 3, 'K3', 2, 40, 'K10', 2, 30, 'K10', 2, 30, 'K10', 2, 50, 'K10', 2, 40, 'K10', 2, 30, 'K10', 2, 30, 'K10', '{}');
SELECT pg_temp.add_race('Krasnolud',    1, 2, 'K2', 2, 30, 'K10', 2, 10, 'K10', 1, 1, 'K3', 1, 2, 'K3', 1, 5, 'K3', 2, 10, 'K10', 2, 10, 'K10', 2, 40, 'K10', 2, 20, 'K10', 2, 40, 'K10', 2, 40, 'K10', 2, 10, 'K10', '{}');
SELECT pg_temp.add_race('Halfling',     1, 2, 'K2', 2, 10, 'K10', 2, 20, 'K10', 1, 0, 'K3', 1, 0, 'K3', 1, 3, 'K3', 2, 30, 'K10', 2, 30, 'K10', 2, 10, 'K10', 2, 20, 'K10', 2, 10, 'K10', 2, 30, 'K10', 2, 30, 'K10', '{}');
