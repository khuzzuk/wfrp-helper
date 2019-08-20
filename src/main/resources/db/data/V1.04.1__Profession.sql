CREATE FUNCTION pg_temp.addExtension(
  extension_type             VARCHAR(255),
  profession_extension_value INT,
  profession_id_to_insert    BIGINT
)
  RETURNS VOID AS $$
DECLARE
  inserted_extension_id BIGINT;
  inserted_modifier_id  BIGINT;

BEGIN

  IF profession_extension_value > 0
    THEN

      INSERT INTO determinant (type, value) VALUES (extension_type, 0) RETURNING id
        INTO inserted_extension_id;
      INSERT INTO modifier (type, value)
      VALUES ('PROFESSION', profession_extension_value) RETURNING id
        INTO inserted_modifier_id;
      INSERT INTO determinant_modifiers (determinant_id, modifiers_id)
      VALUES (inserted_extension_id, inserted_modifier_id);
      INSERT INTO profession_determinants (profession_id, determinants_id)
      VALUES (profession_id_to_insert, inserted_extension_id);

  END IF;

END;

$$
LANGUAGE plpgsql;


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
    inserted_profession_id BIGINT;

BEGIN
    INSERT INTO profession (name, description, profession_class_id)
    VALUES (profession_name, profession_desc,
            (SELECT id FROM profession_class pc WHERE pc.name = profession_class_name)) RETURNING id
               INTO inserted_profession_id;

    FOR i IN 1 .. array_upper(profession_skills_set, 1)
        LOOP
            RAISE INFO 'adding skill %', profession_skills_set[i];

            INSERT INTO profession_skills (profession_id, skills_id)
            VALUES (inserted_profession_id, (SELECT sk.id FROM skill sk WHERE sk.name = profession_skills_set[i]));
        END LOOP;

    PERFORM pg_temp.addExtension('SPEED', speed_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('BATTLE', battle_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('SHOOTING', shooting_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('STRENGTH', strenght_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('DURABILITY', durability_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('HEALTH', vitality_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('INITIATIVE', initiative_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('ATTACK', attack_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('DEXTERITY', dexterity_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('LEADER_SKILLS', leadership_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('INTELLIGENCE', intelligence_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('CONTROL', control_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('WILL', will_extension, inserted_profession_id);
    PERFORM pg_temp.addExtension('CHARISMA', charisma_extension, inserted_profession_id);

END;
$$
LANGUAGE plpgsql;

SELECT pg_temp.addProfession('Aptekarz1', '', 'Uczony', '{Chemia, Leczenie ran, Farmacja, Leczenie chorób, Odporność na trucizny, Warzenie trucizn}', 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 10, 0, 0, 0);
SELECT pg_temp.addProfession('Banita', '', '', '{Ukrywanie się w mieście, Ukrywanie się na wsi, Silny Cios, Ogłuszenie, Wykrywanie pułapek, Zastawianie pułapek, Wspinaczka, Uniki, Rozbrajanie, Serketny jezyk – bitewny, Serketny jezyk – złodziei, Jeździectwo, Powożenie, Opieka nad zwierzętami, Sekretne znaki drwali, Celne strzelanie}', 0, 10, 10, 0, 0, 2, 10, 1, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Bydlokrad', '', '', '{Powożenie, Cichy chód na wsi, Specjalna broń – lasso, Serketny jezyk – rangerów, Opieka nad zwierzętami}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Cyrkowiec-Akrobata', '', '', '{Akrobatyka}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Aktor', '', '', '{Aktorstwo}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Treser', '', '', '{Opieka nad zwierzętami, Tresura}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Bentlarz', '', '', '{Gadanina, Zwinne palce}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Uczen czarodzieja', '', '', '{Komedianctwo, Błyskotliwość}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Eskapolog', '', '', '{Wyzwalanie sie z więzów}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Połykacz ognia', '', '', '{Połykanie ognia}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Jasnowidz', '', '', '{Chiromancja}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Hipnotyzer', '', '', '{Hipnoza}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Parodysta', '', '', '{Naśladownictwo}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Trefniś', '', '', '{Szyderstwo}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Żongler', '', '', '{Żonglerka}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Miotacz noży', '', '', '{Specjalna broń – nóż rzucany}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Malarz uliczny', '', '', '{Sztuka}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Wierszokleta', '', '', '{Krasomówstwo}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Śpiewak', '', '', '{Śpiew}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Siłacz', '', '', '{Siłacz}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Linoskoczek', '', '', '{Akrobatyka, Wspinaczka}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Trubadur', '', '', '{Muzykalność, Śpiew}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Brzuchomowca', '', '', '{Brzuchomówstwo}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Cykrowiec-Zapasnik', '', '', '{Zapasy}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Czeladnik', '', '', '{Powożenie, Bardzo silny, Bardzo wytrzymały}', 0, 0, 0, 0, 0, 1, 10, 0, 10, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Druid', '', '', '{Opieka nad zwierzętami, Różdżkarstwo, Tropienie, Rozpoznawanie roślin, Sekretne znaki druidów}', 0, 10, 10, 0, 0, 1, 10, 0, 0, 0, 10, 10, 10, 0);
SELECT pg_temp.addProfession('Drwal', '', '', '{Ukrywanie się na wsi, Cichy chód na wsi, Tropienie, Zastawianie pułapek, Rozpoznawanie roślin, Specjalna broń – dwuręczna, Serketny jezyk – rangerów, Sekretne znaki drwali}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Gajowy', '', '', '{}', 0, 0, 20, 1, 0, 2, 0, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Gawedziarz', '', '', '{}', 0, 10, 0, 0, 0, 1, 0, 0, 0, 10, 10, 10, 0, 10);
SELECT pg_temp.addProfession('Giermek', '', '', '{Rozbrajanie, Uniki, Silny Cios, Celny cios, Specjalna bron - korbacz, parujaca, dwureczna, uliczna, 50%-Bardzo silny, 50%-ardzo wytrzymały}', 0, 10, 10, 0, 0, 2, 10, 1, 0, 10, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Gladiator', '', '', '{}', 0, 20, 0, 0, 1, 2, 10, 0, 10, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Goniec', '', '', '{}', 1, 20, 0, 1, 1, 1, 10, 0, 10, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Handlarz', '', '', '{}', 0, 10, 0, 0, 0, 1, 0, 0, 0, 0, 10, 0, 0, 10);
SELECT pg_temp.addProfession('Hiena cmentarna', '', '', '{}', 0, 10, 0, 0, 0, 2, 10, 0, 10, 0, 0, 10, 10, 0);
SELECT pg_temp.addProfession('Hipnotyzer', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 10, 0, 10, 0, 0, 0);
SELECT pg_temp.addProfession('Inżynier', '', '', '{}', 0, 10, 10, 0, 0, 2, 0, 0, 10, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Lowca nagrod', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Milicjant', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 1, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Minstrel', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 20, 10, 10, 0, 0, 10);
SELECT pg_temp.addProfession('Mysliwy', '', '', '{Tropienie, Cichy chód na wsi, Ukrywanie sien a wsi, Lowiectwo, Serketny jezyk – Rangerow, Sekr. Zn. Drwali, odpornosc na trucizny}', 0, 0, 20, 1, 0, 2, 10, 0, 0, 0, 0, 0, 10, 0);
SELECT pg_temp.addProfession('Mytnik', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Najemnik', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 1, 0, 10, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Nowicjusz', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 0, 0, 0, 10, 10, 10);
SELECT pg_temp.addProfession('Ochroniarz', '', '', '{}', 0, 20, 0, 1, 0, 2, 10, 1, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Oprych', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Pasterz', '', '', '{}', 0, 0, 20, 1, 0, 2, 10, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Pilot', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 10, 0, 0, 10, 0, 10);
SELECT pg_temp.addProfession('Poborca podatkowy', '', '', '{}', 0, 10, 0, 0, 0, 2, 10, 0, 0, 0, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Podzegacz', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 10, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Poganiacz mulow', '', '', '{}', 0, 10, 0, 0, 0, 2, 0, 0, 0, 0, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Porywacz zwlok', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Poszukiwacz zlota', '', '', '{}', 0, 10, 10, 1, 1, 2, 0, 1, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Przemytnik', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Przepatrywacz', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Przewoznik', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Rajfur', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Robotnik', '', '', '{}', 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Rybak', '', '', '{}', 0, 0, 0, 1, 0, 1, 0, 0, 10, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Skryba', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 0, 10, 0, 0, 10, 10);
SELECT pg_temp.addProfession('Sluzacy', '', '', '{}', 0, 10, 0, 0, 0, 2, 10, 0, 0, 0, 0, 0, 10, 0);
SELECT pg_temp.addProfession('Straznik drog', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 10, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Straznik miejski', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 1, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Straznik wiezienny', '', '', '{}', 0, 10, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 10, 0);
SELECT pg_temp.addProfession('Szczurolap', '', '', '{}', 0, 10, 10, 0, 0, 1, 0, 0, 10, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Szlachcic', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 20, 0, 10, 0, 10);
SELECT pg_temp.addProfession('Szuler', '', '', '{}', 0, 0, 10, 0, 0, 2, 10, 0, 10, 0, 10, 0, 0, 10);
SELECT pg_temp.addProfession('Traper', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 10, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Uczen alchemika', '', '', '{}', 0, 0, 0, 0, 0, 1, 0, 0, 10, 0, 10, 0, 0, 0);
SELECT pg_temp.addProfession('Uczen czarodzieja', '', '', '{}', 0, 0, 0, 0, 0, 1, 0, 0, 10, 0, 10, 0, 10, 0);
SELECT pg_temp.addProfession('Uczen medyka', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 0, 0, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Wedrowny kramarz', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 0, 0, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Wieszczek', '', '', '{}', 0, 0, 0, 0, 0, 1, 0, 0, 0, 10, 0, 10, 10, 10);
SELECT pg_temp.addProfession('Wojownik podziemny', '', '', '{}', 0, 10, 0, 1, 1, 2, 10, 1, 0, 10, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Woznica', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Zabijaka', '', '', '{}', 0, 10, 0, 1, 0, 2, 10, 1, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Zabojca trolli', '', '', '{}', 0, 10, 10, 1, 0, 4, 10, 1, 10, 0, 0, 20, 0, 0);
SELECT pg_temp.addProfession('Zlodziej', '', '', '{Cichy chód miasto/wieś, Ukrywanie się w mieście, Skeretny jezyk - złodziei, sekretne znaki złodziei, szacowanie}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Złodziej-wlamywacz', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Złodziej-skrawkarz', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Zlodziej-malwersant', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Zlodziej-kieszonkowiec', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 0, 10, 0, 0, 0, 0, 10);
SELECT pg_temp.addProfession('Zielarz', '', '', '{}', 0, 0, 0, 0, 0, 1, 0, 0, 10, 0, 10, 0, 0, 0);
SELECT pg_temp.addProfession('Zak', '', '', '{}', 0, 0, 0, 0, 0, 1, 10, 0, 0, 0, 10, 10, 0, 10);
SELECT pg_temp.addProfession('Zebrak', '', '', '{}', 0, 10, 10, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Zeglarz', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 1, 0, 0, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Zolnierz', '', '', '{}', 0, 10, 10, 0, 0, 2, 10, 1, 0, 10, 0, 0, 0, 0);
SELECT pg_temp.addProfession('Zolnierz okretowy', '', '', '{}', 0, 10, 10, 1, 0, 2, 10, 1, 0, 0, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Balistyk', '', '', '{Specjalna bron - katapulta, balista, Stolarstwo, Inzynieria}', 0, 10, 20, 1, 1, 2, 20, 0, 10, 10, 20, 10, 10, 0);
SELECT pg_temp.addProfession('Bakalarz', '', '', '{Astronomia, Kartografia, Historia, Rozpoznawanie roślin, Uzdolnienia jezykowe, Wykrywanie magii, Numizmatyka, Wiedza o runach, Znajomosc j. obcego}', 0, 10, 10, 0, 0, 2, 30, 0, 10, 0, 30, 10, 30, 10);
SELECT pg_temp.addProfession('Bombardier', '', '', '{Powożenie, Inzynieria, Bron specjalna: rusznica, bombarda, pistolet, bomby}', 0, 10, 20, 1, 1, 2, 20, 0, 10, 30, 10, 20, 10, 20);
SELECT pg_temp.addProfession('Demagog', '', '', '{Gadanina, Krasomówstwo, Pamflety}', 0, 10, 10, 0, 1, 3, 20, 1, 0, 30, 10, 20, 20, 40);
SELECT pg_temp.addProfession('Falszerz', '', '', '{Sztuka, Czytanie/pisanie, Sfragistyka}', 0, 20, 20, 1, 1, 3, 20, 1, 40, 10, 30, 30, 20, 20);
SELECT pg_temp.addProfession('Handlarz niewolnikow', '', '', '{Powożenie, Jeździectwo, Znajomosc j. obcego, Ogluszajacy cios}', 0, 20, 20, 2, 0, 4, 20, 0, 0, 10, 0, 20, 10, 0);
SELECT pg_temp.addProfession('Herszt banitow', '', '', '{Tropienie, Rozpoznawanie roślin, Sekretny jezy: bitewny, zlodziejski, Jeździectwo}', 0, 20, 30, 1, 3, 5, 20, 2, 10, 30, 10, 10, 0, 10);
SELECT pg_temp.addProfession('Kapitan', '', '', '{Tresura, Szkutnictwo, Numizmatyka, Znaj. J. obc., Specjalna bron - rapier, Silny Cios}', 0, 30, 20, 1, 1, 6, 20, 2, 30, 30, 20, 30, 20, 30);
SELECT pg_temp.addProfession('Kupiec', '', '', '{Szacowanie, Targowanie się, Wykrywanie magii, Numizmatyka, Czytanie/pisanie, Jeździectwo, Sekretny jezyk - gildii, Znaj. J. obc., Geniusz arytmetyczny}', 0, 10, 10, 1, 1, 2, 20, 0, 10, 30, 30, 20, 20, 20);
SELECT pg_temp.addProfession('Lowca czarownic', '', '', '{Celne strzelanie, Krasomówstwo, Cichy chód miasto/wies, Szosty zmysl, Bron specjalna: siec, lasso, pistolet strzalkowy, rzucana, Silny Cios}', 0, 30, 30, 1, 1, 6, 30, 2, 20, 20, 10, 10, 40, 10);
SELECT pg_temp.addProfession('Medyk', '', '', '{Leczenie chorob i ran, Farmacja, Warzenie trucizn, Chirurgia}', 0, 0, 0, 1, 1, 3, 10, 0, 30, 20, 30, 20, 20, 10);
SELECT pg_temp.addProfession('Nawigator', '', '', '{Astronomia, Kartografia, Orientacja}', 0, 10, 0, 1, 1, 3, 20, 0, 10, 20, 30, 10, 20, 10);
SELECT pg_temp.addProfession('Odkrywca', '', '', '{}', 0, 20, 20, 1, 1, 6, 0, 1, 20, 20, 30, 20, 20, 20);
SELECT pg_temp.addProfession('Oprawca', '', '', '{Leczenie ran, Bron specjalna - korbacz, Torturowanie}', 0, 10, 0, 2, 0, 4, 10, 0, 10, 10, 10, 10, 20, 0);
SELECT pg_temp.addProfession('Paser', '', '', '{Szacowanie, Wykrywanie magii, Zwinne palce, Geniusz arytmetyczny}', 0, 20, 20, 1, 0, 4, 20, 1, 10, 10, 0, 10, 10, 10);
SELECT pg_temp.addProfession('Podrabiacz monet', '', '', '{Sztuka - wykonywanie matryc monet, Metalurgia, Numizmatyka, Geniusz arytmetyczny}', 0, 20, 20, 1, 0, 3, 20, 0, 20, 10, 10, 10, 10, 10);
SELECT pg_temp.addProfession('Prawnik', '', '', '{Etykieta, Prawo, Krasomówstwo, Czytanie/pisanie, Sekretny jezyk: klasyczny, prawniczy}', 0, 0, 0, 0, 1, 2, 10, 0, 10, 30, 40, 30, 30, 10);
SELECT pg_temp.addProfession('Reketer', '', '', '{Uniki, Specjalna bron: uliczna, zapalajaca, Bijatyka, Silny Cios}', 0, 20, 20, 1, 1, 3, 10, 1, 0, 10, 0, 10, 0, 0);
SELECT pg_temp.addProfession('Rozbojnik', '', '', '{Opieka nad zwierzętami, Etykieta, Szacowanie, Celne strzelanie, Jeździectwo, Cichy chód miasto/wies, Bron specjalna: pistolet, rapier, Błyskotliwość, Woltyzerka}', 0, 20, 20, 1, 1, 2, 40, 1, 30, 0, 20, 20, 20, 30);
SELECT pg_temp.addProfession('Rycerz najemny', '', '', '{Rozbrojenie, Uniki, Etykieta, Heraldyka, Jeździectwo, Sekretny jezyk - bitewny, Specjalna bron: korbacz, kopia, parujaca, dwureczna, Silny Cios, Ogłuszenie, Silny Cios}', 0, 30, 0, 3, 1, 4, 20, 2, 0, 30, 10, 30, 0, 10);
SELECT pg_temp.addProfession('Rycerz zakonny', '', '', '{Rozbrojenie, Czytanie/pisanie, Jeździectwo, Sekretny jezyk - bitewny, Sekretne znaki - rycerzy zakonnych, Silny Cios, Ogłuszenie}', 0, 30, 30, 1, 2, 8, 30, 2, 20, 20, 20, 20, 20, 20);
SELECT pg_temp.addProfession('Rzemieslnik', '', '', '{Metalurgia, Kowalstwo, Piwowarstwo, Stolarstwo, Sztuka, Chemia, Jubilerstwo, Szkutnictwo, Kamieniarstwo, Krawiectwo}', 0, 0, 0, 1, 1, 2, 20, 0, 20, 10, 0, 10, 10, 10);
SELECT pg_temp.addProfession('Saper', '', '', '{Stolarstwo, Inzynieria, Bron specjalna: katapulta, bomby}', 0, 10, 10, 1, 1, 2, 0, 0, 10, 20, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Sierzant najemnikow', '', '', '{Mocna glowa, Hazard, Sekretny jezyk - bitewny, Bijatyka, Silny Cios, Ogłuszenie}', 0, 20, 20, 1, 1, 4, 20, 1, 10, 10, 10, 10, 10, 10);
SELECT pg_temp.addProfession('Kapitan najemnikow', '', '', '{Rozbrojenie, Uniki, Heraldyka, Jeździectwo, Bron specjalna: kopia, dwureczna, korbacz, parujaca, Celny cios}', 0, 30, 30, 2, 2, 6, 20, 2, 10, 40, 10, 30, 10, 20);
SELECT pg_temp.addProfession('Strzelec', '', '', '{Celne strzelanie, Bron specjalna - dlugi luk}', 0, 0, 40, 1, 1, 4, 20, 1, 30, 10, 10, 30, 10, 20);
SELECT pg_temp.addProfession('Szampierz', '', '', '{Uniki, Specjalna bron: rapier, uliczna, korbacz, lasso, siec, parujaca, dwureczna, Silny Cios}', 0, 40, 0, 1, 1, 6, 20, 2, 10, 0, 10, 10, 0, 0);
SELECT pg_temp.addProfession('Szarlatan', '', '', '{Gadanina, Błyskotliwość, Szacowanie, Urok osobisty, Charakteryzacja, Zwinne palce, Uwodzenie, Naśladownictwo, Krasomówstwo}', 0, 10, 10, 0, 1, 4, 20, 0, 20, 20, 20, 20, 20, 30);
SELECT pg_temp.addProfession('Szpieg', '', '', '{Aktorstwo, Przekupstwo, Ukrywanie się w miescie, kryptografia, Charakteryzacja, Ucieczka, Uzdolnienia jezykowe, Otwieranie zamkow, Zwinne palce, Czytanie/pisanie, Uwodzenie, Sledzenie, Cichy chód w miescie, Szosty zmysl, lyskotliwosc}', 0, 20, 20, 0, 1, 4, 20, 1, 20, 10, 20, 40, 0, 20);
SELECT pg_temp.addProfession('Zabojca', '', '', '{Ukrywanie się miasto/wies, Charakteryzacja, Celny strzal, Warzenie trucizn, Wspinaczka, Sledzenie, Cichy chód miasto/wies, Specjalna bron: dmuchawka, uliczna, korbacz, lasso, bron parujaca, noz rzucany, dwureczna}', 0, 30, 30, 1, 1, 6, 30, 3, 30, 20, 20, 20, 20, 20);
SELECT pg_temp.addProfession('Zabojca gigantow', '', '', '{Uniki, Sekretny jezyk bitewny, Bron specjalna: korbacz, dwureczna, Silny Cios}', 0, 40, 0, 3, 3, 8, 20, 2, 10, 0, 0, 30, 0, 0);
SELECT pg_temp.addProfession('Zwadzca', '', '', '{Rozbrojenie, Uniki, Etykieta, Celny strzal, Specjalna bron: rapier, pistolet, parujaca, Silny Cios, Celny cios, Ogłuszenie}', 0, 30, 30, 1, 3, 3, 20, 1, 0, 10, 30, 30, 20, 0);
SELECT pg_temp.addProfession('Zwiadowca', '', '', '{Opieka nad zwierzętami, Ukrywanie się na wsi, Tropienie, Orientacja, Jeździectwo, Sekretny jezyk - rangerów}', 0, 20, 20, 1, 1, 6, 20, 1, 10, 10, 10, 10, 10, 0);
SELECT pg_temp.addProfession('Kaplan druidzki I', '', '', '{Jezyk tajemny - druidyczny, Leczenie ran, Zielarstwo, Medytacja, Jeździectwo, Wiedza druidyczna I}', 0, 0, 0, 0, 0, 2, 10, 0, 0, 0, 0, 10, 10, 10);
SELECT pg_temp.addProfession('Kaplan druidzki II', '', '', '{}', 0, 10, 10, 1, 1, 3, 20, 0, 10, 10, 10, 10, 20, 10);
SELECT pg_temp.addProfession('Kaplan druidzki III', '', '', '{}', 0, 10, 10, 1, 1, 4, 20, 0, 20, 20, 20, 20, 30, 20);
SELECT pg_temp.addProfession('Kaplan druidzki IV', '', '', '{}', 0, 10, 10, 1, 1, 4, 30, 0, 30, 30, 30, 30, 30, 30);
SELECT pg_temp.addProfession('Czarodziej I', '', '', '{Rzucanie czarów, Rozpoznawanie Roślin, Wykrywanie magii, Rozpoznawanie runów, Wiedza o pergaminach}', 0, 0, 0, 0, 0, 2, 10, 0, 0, 0, 10, 0, 0, 0);
SELECT pg_temp.addProfession('Czarodziej II', '', '', '{Szacowanie, Zielarstwo, Wykrywanie istot magicznych, Medytacja}', 0, 10, 10, 1, 1, 3, 20, 0, 10, 10, 20, 10, 10, 0);
SELECT pg_temp.addProfession('Czarodziej III', '', '', '{Wiedza o demonach, Rozpoznawanie magicznych przedmiotów, Rozpoznawanie ożywieńców, Warzenie trucizn}', 0, 10, 10, 1, 1, 4, 30, 0, 20, 20, 30, 20, 20, 0);
SELECT pg_temp.addProfession('Czarodziej IV', '', '', '{Język tajemny - krasnoludzki lub elficki, Wytwarzanie eliksirów, Towrzenie magicznych pergaminów}', 0, 10, 10, 1, 1, 4, 40, 0, 30, 30, 30, 30, 30, 0);

DROP FUNCTION pg_temp.addExtension(extension_type VARCHAR, profession_extension_value INT, profession_id_to_insert BIGINT);
