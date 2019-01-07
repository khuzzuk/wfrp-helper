CREATE FUNCTION pg_temp.add_armor(name_to_insert VARCHAR(255),
                                  description_to_insert VARCHAR(255),
                                  gold_to_insert INT,
                                  silver_to_insert INT,
                                  lead_to_insert INT,
                                  suggested_weight_to_insert REAL,
                                  armor_to_insert INT,
                                  placement_to_insert placement,
                                  armor_pattern_name VARCHAR(255)) RETURNS VOID AS
$$
DECLARE
  armor_pattern_id_by_name BIGINT;

BEGIN
  armor_pattern_id_by_name = (SELECT id FROM armor_pattern WHERE name = armor_pattern_name);


  INSERT INTO item_blueprint (type, name, description, gold, silver, lead, suggested_weight, armor, placement,
                              armor_pattern_id)
  VALUES ('ARMOR', name_to_insert, description_to_insert, gold_to_insert, silver_to_insert, lead_to_insert,
          suggested_weight_to_insert, armor_to_insert, placement_to_insert, armor_pattern_id_by_name);

END;
$$
  LANGUAGE plpgsql;

SELECT pg_temp.add_armor('Kaptur', NULL, 0, 5, 0, 0.1, 0, 'HEAD', 'Wyszywany');
SELECT pg_temp.add_armor('Czepiec Kolczy', NULL, 2, 5, 0, 0.1, 1, 'HEAD', 'Kolczy');
SELECT pg_temp.add_armor('Szyszak', NULL, 4, 0, 0, 0.95, 1, 'HEAD', 'Płytowy');
SELECT pg_temp.add_armor('Hełm', NULL, 5, 0, 0, 1, 2, 'HEAD', 'Płytowy');
SELECT pg_temp.add_armor('Pełny Hełm', NULL, 7, 5, 0, 1.2, 3, 'HEAD', 'Płytowy');
SELECT pg_temp.add_armor('Koszulka kolcza', NULL, 8, 0, 0, 2, 1, 'TORSO', 'Kolczy');
SELECT pg_temp.add_armor('Zbroja paskowa', NULL, 10, 0, 0, 5, 1, 'TORSO', 'Paskowany');
SELECT pg_temp.add_armor('Zbroja paskowa z naramiennikami', NULL, 15, 0, 0, 5, 2, 'TORSO', 'Paskowany');
SELECT pg_temp.add_armor('Napierśnik', NULL, 20, 0, 0, 3, 1, 'TORSO', 'Płytowy');
SELECT pg_temp.add_armor('Napierśnik z Naplecznikiem', NULL, 30, 0, 0, 4, 2, 'TORSO', 'Płytowy');
SELECT pg_temp.add_armor('Zbroja płytowa z naramiennikami', NULL, 50, 0, 0, 5, 3, 'TORSO', 'Płytowy');
SELECT pg_temp.add_armor('Rękawice kolcze', NULL, 1, 5, 0, 1.25, 1, 'HAND', 'Kolczy');
SELECT pg_temp.add_armor('Rękawice kolcze z rękawami', NULL, 1, 7, 5, 1.5, 2, 'HAND', 'Kolczy');
SELECT pg_temp.add_armor('Rękawice płytowe', NULL, 1, 5, 0, 1.25, 2, 'HAND', 'Płytowy');
SELECT pg_temp.add_armor('Rękawice płytowe z rękawami', NULL, 1, 7, 5, 1.5, 3, 'HAND', 'Płytowy');
SELECT pg_temp.add_armor('Spodnie kolcze', 'NULL', 1, 2, 5, 1.35, 1, 'LEG', 'Kolczy');
SELECT pg_temp.add_armor('Buty skórzane', 'NULL', 1, 2, 5, 1.35, 0, 'LEG', 'Wyszywany');
SELECT pg_temp.add_armor('Buty płytowe', 'NULL', 1, 2, 5, 1.35, 1, 'LEG', 'Płytowy');
SELECT pg_temp.add_armor('Buty płytowe z nagolennikami', NULL, 1, 5, 0, 2, 2, 'LEG', 'Płytowy');
SELECT pg_temp.add_armor('Puklerz', NULL, 0, 9, 0, 0.8, 1, 'SHIELD', 'Płytowy');
SELECT pg_temp.add_armor('Tarcza trójkątna', NULL, 1, 5, 0, 2, 2, 'SHIELD', 'Płytowy');
SELECT pg_temp.add_armor('Pawęż', NULL, 1, 7, 5, 3, 3, 'SHIELD', 'Płytowy');


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

DROP FUNCTION pg_temp.add_armor(name_to_insert VARCHAR, description_to_insert VARCHAR, gold_to_insert INT, silver_to_insert INT, lead_to_insert INT, suggested_weight_to_insert REAL, armor_to_insert INT, placement_to_insert placement, armor_pattern_name VARCHAR);
