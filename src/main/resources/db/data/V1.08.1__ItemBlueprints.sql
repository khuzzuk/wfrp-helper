CREATE FUNCTION pg_temp.add_armor(name_to_insert VARCHAR(255),
                                  description_to_insert VARCHAR(255),
                                  gold_to_insert INT,
                                  silver_to_insert INT,
                                  lead_to_insert INT,
                                  suggested_weight_to_insert REAL,
                                  armor_to_insert INT,
                                  placement_to_insert placement) RETURNS VOID AS
$$
BEGIN
  INSERT INTO item_blueprint (type, name, description, gold, silver, lead, suggested_weight, armor, placement)
  VALUES ('ARMOR', name_to_insert, description_to_insert, gold_to_insert, silver_to_insert, lead_to_insert,
          suggested_weight_to_insert, armor_to_insert, placement_to_insert);

END;
$$
  LANGUAGE plpgsql;

-- @formatter:off
SELECT pg_temp.add_armor('Kaptur',                              NULL, 0,  5,  0,  0.1,  0,  'HEAD');
SELECT pg_temp.add_armor('Czepiec',                             NULL, 2,  5,  0,  0.1,  1,  'HEAD');
SELECT pg_temp.add_armor('Szyszak',                             NULL, 4,  0,  0,  0.95, 1,  'HEAD');
SELECT pg_temp.add_armor('Hełm',                                NULL, 5,  0,  0,  1,    2,  'HEAD');
SELECT pg_temp.add_armor('Pełny Hełm',                          NULL, 7,  5,  0,  1.2,  3,  'HEAD');
SELECT pg_temp.add_armor('Koszulka',                            NULL, 8,  0,  0,  2,    1,  'TORSO');
SELECT pg_temp.add_armor('Zbroja',                              NULL, 10, 0,  0,  4,    1,  'TORSO');
SELECT pg_temp.add_armor('Zbroja z naramiennikami',             NULL, 15, 0,  0,  5,    2,  'TORSO');
SELECT pg_temp.add_armor('Napierśnik',                          NULL, 8,  0,  0,  1,    1,  'TORSO');
SELECT pg_temp.add_armor('Napierśnik z Naplecznikiem',          NULL, 9,  0,  0,  4,    2,  'TORSO');
SELECT pg_temp.add_armor('Rękawice',                            NULL, 1,  5,  0,  1.25, 1,  'HAND');
SELECT pg_temp.add_armor('Rękawice z rękawami',                 NULL, 1,  7,  5,  1.5,  2,  'HAND');
SELECT pg_temp.add_armor('Spodnie',                             NULL, 1,  2,  5,  1.35, 1,  'LEG');
SELECT pg_temp.add_armor('Buty',                                NULL, 1,  2,  5,  1.35, 1,  'LEG');
SELECT pg_temp.add_armor('Buty z nagolennikami',                NULL, 1,  5,  0,  2,    2,  'LEG');
SELECT pg_temp.add_armor('Puklerz',                             NULL, 0,  9,  0,  0.8,  1,  'SHIELD');
SELECT pg_temp.add_armor('Tarcza trójkątna',                    NULL, 1,  5,  0,  2,    2,  'SHIELD');
SELECT pg_temp.add_armor('Pawęż',                               NULL, 1,  7,  5,  3,    3,  'SHIELD');
-- @formatter:on

/*
SELECT pg_temp.add_armor('Sztylet', NULL, 0, 3, 3, 0.1, '0,75', 'Broń', '');
SELECT pg_temp.add_armor('Miecz', NULL, 0, 5, 0, 0.75, '1', 'Broń', '');
SELECT pg_temp.add_armor('Długi Miecz', NULL, 0, 7, 5, 1.1, '1,1', 'Broń', '');
SELECT pg_temp.add_armor('Bastard', NULL, 0, 8, 0, 1.6, '1,2', 'Broń', '');
SELECT pg_temp.add_armor('Dwuręczny Miecz', NULL, 1, 0, 0, 1.85, '1,5', 'Broń', '');
SELECT pg_temp.add_armor('Topór', NULL, 0, 7, 0, 0.85, '1', 'Broń', '');
SELECT pg_temp.add_armor('Dwuręczny Topór', NULL, 0, 9, 0, 2, '1,5', 'Broń', '');
SELECT pg_temp.add_armor('Obusieczny Topór', NULL, 1, 2, 0, 2.3, '1,6', 'Broń', '');
SELECT pg_temp.add_armor('Maczuga', NULL, 0, 5, 5, 1, '1', 'Broń', '');
SELECT pg_temp.add_armor('Korbacz', NULL, 1, 0, 0, 1.5, '1,25', 'Broń', '');
SELECT pg_temp.add_armor('Korbacz Dwuręczny', NULL, 1, 2, 5, 2.25, '1,85', 'Broń', '');
SELECT pg_temp.add_armor('Włócznia', NULL, 0, 3, 3, 0.75, '1,1', 'Broń', '');
SELECT pg_temp.add_armor('Halabarda', NULL, 1, 0, 0, 1.5, '1,45', 'Broń', '');
SELECT pg_temp.add_armor('Lanca', NULL, 0, 9, 0, 1.25, '1,33', 'Broń', '');
*/

DROP FUNCTION pg_temp.add_armor(name_to_insert VARCHAR, description_to_insert VARCHAR, gold_to_insert INT, silver_to_insert INT, lead_to_insert INT, suggested_weight_to_insert REAL, armor_to_insert INT, placement_to_insert placement);

CREATE FUNCTION pg_temp.add_meleeWeapon(name_to_insert VARCHAR(255),
                                  damage_value INT,
                                  dice_type DICE,
                                  rolls_to_insert INT,
                                  description_to_insert VARCHAR(255),
                                  gold_to_insert INT,
                                  silver_to_insert INT,
                                  lead_to_insert INT,
                                  suggested_weight_to_insert REAL,
                                  armor_to_insert INT,
                                  placement_to_insert placement) RETURNS VOID AS
$$
DECLARE
  inserted_roll_id BIGINT;
  inserted_damage_id BIGINT;

BEGIN
  INSERT INTO dice_roll(dice, rolls)
  VALUES (dice_type, rolls_to_insert)
  RETURNING id INTO inserted_roll_id;

  INSERT INTO modifier (type, value)
  VALUES ('DICE', damage_value)
  RETURNING id INTO inserted_damage_id;

  INSERT INTO modifier_rolls (modifier_id, rolls_id) VALUES (inserted_damage_id, inserted_roll_id);

  INSERT INTO item_blueprint (type, name, description, gold, silver, lead, suggested_weight, armor, placement)
  VALUES ('MELEE_WEAPON', name_to_insert, description_to_insert, gold_to_insert, silver_to_insert, lead_to_insert,
          suggested_weight_to_insert, armor_to_insert, placement_to_insert);

END;
$$
  LANGUAGE plpgsql;