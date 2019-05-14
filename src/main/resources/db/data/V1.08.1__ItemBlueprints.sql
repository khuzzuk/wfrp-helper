CREATE FUNCTION pg_temp.add_armor(name_to_insert VARCHAR(255),
                                  description_to_insert VARCHAR(255),
                                  gold_to_insert INT,
                                  silver_to_insert INT,
                                  lead_to_insert INT,
                                  suggested_weight_to_insert REAL,
                                  armor_to_insert INT,
                                  placement_to_insert PLACEMENT) RETURNS VOID AS
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

DROP FUNCTION pg_temp.add_armor(name_to_insert VARCHAR, description_to_insert VARCHAR, gold_to_insert INT, silver_to_insert INT, lead_to_insert INT, suggested_weight_to_insert REAL, armor_to_insert INT, placement_to_insert PLACEMENT);

CREATE FUNCTION pg_temp.add_meleeWeapon(name_to_insert VARCHAR(255),
                                        damage_value INT,
                                        dice_type DICE,
                                        rolls_to_insert INT,
                                        description_to_insert VARCHAR(255),
                                        gold_to_insert INT,
                                        silver_to_insert INT,
                                        lead_to_insert INT,
                                        suggested_weight_to_insert REAL,
                                        placement_to_insert PLACEMENT,
                                        initiative_mod INT,
                                        parry_mod INT,
                                        opponent_parry_mod INT,
                                        battle_mod INT) RETURNS VOID AS
$$
DECLARE
  parry_mod               INT := parry_mod ;
  inserted_roll_id        BIGINT;
  inserted_mod_id         BIGINT;
  inserted_blueprint_id   BIGINT;
  inserted_determinant_id BIGINT;

BEGIN
  INSERT INTO dice_roll(dice, rolls)
  VALUES (dice_type, rolls_to_insert) RETURNING id INTO inserted_roll_id;

  INSERT INTO modifier (type, value)
  VALUES ('DICE', damage_value) RETURNING id INTO inserted_mod_id;

  INSERT INTO modifier_rolls (modifier_id, rolls_id) VALUES (inserted_mod_id, inserted_roll_id);

  INSERT INTO item_blueprint (type,
                              name,
                              description,
                              gold,
                              silver,
                              lead,
                              suggested_weight,
                              placement,
                              damage_id,
                              prepare_type, prepare_amount)
  VALUES ('MELEE_WEAPON',
          name_to_insert,
          description_to_insert,
          gold_to_insert,
          silver_to_insert,
          lead_to_insert,
          suggested_weight_to_insert,
          placement_to_insert,
          inserted_mod_id,
          'ACTION', 1) RETURNING id INTO inserted_blueprint_id;

  IF initiative_mod > 0
  THEN
    INSERT INTO determinant (type, value) VALUES ('INITIATIVE', 0) RETURNING id INTO inserted_determinant_id;
    INSERT INTO modifier (type, value) VALUES ('REGULAR', initiative_mod) RETURNING id INTO inserted_mod_id;
    INSERT INTO determinant_modifiers (determinant_id, modifiers_id) VALUES (inserted_determinant_id, inserted_mod_id);
  END IF;

  IF parry_mod > 0
  THEN
    INSERT INTO determinant (type, value) VALUES ('PARRY', 0) RETURNING id INTO inserted_determinant_id;
    INSERT INTO modifier (type, value) VALUES ('REGULAR', parry_mod) RETURNING id INTO inserted_mod_id;
    INSERT INTO determinant_modifiers (determinant_id, modifiers_id) VALUES (inserted_determinant_id, inserted_mod_id);
  END IF;

  IF opponent_parry_mod > 0
  THEN
    INSERT INTO determinant (type, value) VALUES ('OPPONENT_PARRY', 0) RETURNING id INTO inserted_determinant_id;
    INSERT INTO modifier (type, value) VALUES ('REGULAR', opponent_parry_mod) RETURNING id INTO inserted_mod_id;
    INSERT INTO determinant_modifiers (determinant_id, modifiers_id) VALUES (inserted_determinant_id, inserted_mod_id);
  END IF;

  IF battle_mod > 0
  THEN
    INSERT INTO determinant (type, value) VALUES ('BATTLE', 0) RETURNING id INTO inserted_determinant_id;
    INSERT INTO modifier (type, value) VALUES ('REGULAR', battle_mod) RETURNING id INTO inserted_mod_id;
    INSERT INTO determinant_modifiers (determinant_id, modifiers_id) VALUES (inserted_determinant_id, inserted_mod_id);
  END IF;

END;
$$
  LANGUAGE plpgsql;

-- @formatter:off
SELECT pg_temp.add_meleeWeapon('Bicz',                  -1,   'K4',  1, NULL, 0,   15, 0,  0.3,    'HAND',        0,   -30,  0,    0);
SELECT pg_temp.add_meleeWeapon('Buzdygan',              0,    'K6',  1, NULL, 7,   0,  0,  0.5,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Garota',                -2,   'K3',  1, NULL, 1,   0,  0,  0.01,   'HAND',        10,  -20,  0,    0);
SELECT pg_temp.add_meleeWeapon('Hak',                   -1,   'K4',  1, NULL, 1,   0,  0,  0.01,   'HAND',        0,   -10,  0,    0);
SELECT pg_temp.add_meleeWeapon('Halabarda',             2,    'K8',  1, NULL, 8,   0,  0,  1.75,   'BOTH_HANDS',  0,   10,   0,    -10);
SELECT pg_temp.add_meleeWeapon('Kastet',                -1,   'K4',  1, NULL, 1,   0,  0,  0.01,   'HAND',        10,  -20,  0,    0);
SELECT pg_temp.add_meleeWeapon('Kij',                   -1,   'K4',  1, NULL, 0,   3,  0,  0.5,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Kopia',                 0,    'K8',  1, NULL, 0,   50, 0,  1,      'HAND',        10,  -30,  -10,  -10);
SELECT pg_temp.add_meleeWeapon('Korbacz',               2,    'K8',  1, NULL, 10,  0,  0,  0.6,    'HAND',        -10, -10,  -10,  -10);
SELECT pg_temp.add_meleeWeapon('Korbacz dwuręczny',     3,    'K12', 1, NULL, 20,  0,  0,  1.2,    'BOTH_HANDS',  -20, -10,  -20,  -20);
SELECT pg_temp.add_meleeWeapon('Łamacz mieczy',         0,    'K4',  1, NULL, 5,   0,  0,  0.4,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Maczuga',               0,    'K6',  1, NULL, 0,   2,  0,  0.5,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Maczuga dwuręczna',     0,    'K8',  1, NULL, 15,  0,  0,  1,      'BOTH_HANDS',  -10, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Miecz',                 0,    'K6',  1, NULL, 14,  0,  0,  0.6,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Długi Miecz',           1,    'K6',  1, NULL, 16,  0,  0,  0.7,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Bastard',               1,    'K8',  1, NULL, 20,  0,  0,  1,      'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Dwuręczny Miecz',       2,    'K10', 1, NULL, 35,  0,  0,  2.5,    'BOTH_HANDS',  -10, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Młot bojowy',           0,    'K6',  1, NULL, 8,   0,  0,  0.75,   'HAND',        -10, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Młot bojowy dwuręczny', 1,    'K8',  1, NULL, 15,  0,  0,  2,      'BOTH_HANDS',  -20, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Nadziak',               0,    'K4',  1, NULL, 9,   0,  0,  0.6,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Pałasz',                0,    'K6',  1, NULL, 14,  0,  0,  0.5,    'HAND',        10,  10,   0,    10);
SELECT pg_temp.add_meleeWeapon('Rapier',                0,    'K8',  1, NULL, 20,  0,  0,  0.4,    'HAND',        20,  10,   0,    10);
SELECT pg_temp.add_meleeWeapon('Sieć',                  -4,   'K2',  1, NULL, 0,   30, 0,  0.3,    'BOTH_HANDS',  0,   -40,  -20,  -10);
SELECT pg_temp.add_meleeWeapon('Szpada',                0,    'K6',  1, NULL, 18,  0,  0,  0.4,    'HAND',        10,  10,   0,    0);
SELECT pg_temp.add_meleeWeapon('Sztylet',               -2,   'K4',  1, NULL, 3,   0,  0,  0.1,    'HAND',        10,  -10,  0,    0);
SELECT pg_temp.add_meleeWeapon('Topór bojowy',          0,    'K6',  1, NULL, 6,   0,  0,  1.1,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Topór jeździecki',      1,    'K8',  1, NULL, 7,   0,  0,  1.5,    'HAND',        0,   0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Dwuręczny Topór',       2,    'K10', 1, NULL, 12,  0,  0,  7.5,    'BOTH_HANDS',  -10, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Obusieczny Topór',      1,    'K8',  1, NULL, 8,   0,  0,  2.5,    'HAND',        -10, 0,    0,    0);
SELECT pg_temp.add_meleeWeapon('Włócznia',              0,    'K8',  1, NULL, 0,   35, 0,  0.5,    'HAND',        10,  -10,  0,    10);
SELECT pg_temp.add_meleeWeapon('Lanca',                 2,    'K12', 1, NULL, 10,  0,  0,  0.4,    'BOTH_HANDS',  20,  -10,  -10,  10);
-- @formatter:on

DROP FUNCTION pg_temp.add_meleeWeapon(name_to_insert VARCHAR, damage_value INT, dice_type DICE, rolls_to_insert INT, description_to_insert VARCHAR, gold_to_insert INT, silver_to_insert INT, lead_to_insert INT, suggested_weight_to_insert REAL, placement_to_insert PLACEMENT, parry_mod INT, opponent_parry_mod INT, battle_mod INT, initiative_mod INT);
