DO
$$
    DECLARE
        realm_id BIGINT;

    BEGIN
        INSERT INTO realm.realm ("name") VALUES ('Warhammer') RETURNING id INTO realm_id;

        WITH wfrp_nations AS (SELECT n.id n_id FROM world.nation n)
        INSERT
        INTO realm.realm_nations (realm_id, nation_id)
        SELECT realm_id, wfrp_nations.n_id
        FROM wfrp_nations;

        WITH wfrp_races AS (SELECT r.id r_id FROM world.race r)
        INSERT
        INTO realm.realm_races (realm_id, race_id)
        SELECT realm_id, wfrp_races.r_id
        FROM wfrp_races;

        WITH wfrp_spell_schools AS (SELECT ss.id s_id FROM magic.spell_school ss)
        INSERT
        INTO realm.realm_spell_schools (realm_id, spell_school_id)
        SELECT realm_id, wfrp_spell_schools.s_id
        FROM wfrp_spell_schools;

    END;
$$ LANGUAGE plpgsql;
