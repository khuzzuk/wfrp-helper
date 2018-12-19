CREATE FUNCTION pg_temp.addProfession(
  profession_name        VARCHAR(255),
  profession_desc        VARCHAR(255),
  profession_class_name  VARCHAR(255),
  profession_skills_set  VARCHAR(255) [],
  speed_extension        INT,
  battle_extension       INT,
  shooting_extension     INT,
  strenght_extension     INT,
  durability_extension   INT,
  vitality_extension     INT,
  initiative_extension   INT,
  attack_extension       INT,
  dexterity_extension    INT,
  leadership_extension   INT,
  intelligence_extension INT,
  control_extension      INT,
  will_extension         INT,
  charisma_extension     INT
)
  RETURNS VOID AS $$

DECLARE
  inserted_profession_id  BIGINT;
  inserted_determinant_id BIGINT;
  inserted_modifier_id    BIGINT;

BEGIN
  INSERT INTO profession (name, description, profession_class_id)
  VALUES (profession_name, profession_desc, (SELECT id FROM profession_class pc WHERE pc.name = profession_class_name))
      RETURNING id
        INTO inserted_profession_id;

  FOR i IN 1 .. array_upper(profession_skills_set, 1)
  LOOP
    INSERT INTO profession_skills (profession_id, skills_id)
    VALUES (inserted_profession_id, (SELECT sk.id FROM skill sk WHERE sk.name = profession_skills_set [ i ]));
  END LOOP;

  IF speed_extension > 0
  THEN
    INSERT INTO determinant (type, value) VALUES ('SPEED', 0) RETURNING id
      INTO inserted_determinant_id;

    INSERT INTO modifier (type, value)
    VALUES ('PROFESSION', speed_extension) RETURNING id
      INTO inserted_modifier_id;

    INSERT INTO determinant_modifiers (determinant_id, modifiers_id)
    VALUES (inserted_determinant_id, inserted_modifier_id);


    INSERT INTO profession_determinants (profession_id, determinants_id)
    VALUES (inserted_profession_id, inserted_determinant_id);
  END IF;

END;
$$
LANGUAGE plpgsql;

SELECT pg_temp.addProfession('Aptekarz', '', 'Uczony', '{Chemia}', 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 10, 0, 0, 0)