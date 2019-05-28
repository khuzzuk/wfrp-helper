DO $$
  DECLARE
    realm_id BIGINT;

  BEGIN
    INSERT INTO realm.realm ("name") VALUES ('Warhammer') RETURNING id INTO realm_id;

    WITH wfrp_nations AS (SELECT n.id AS n_id FROM world.nation n)
      INSERT INTO realm.realm_nations (realm_id, nation_id)
        SELECT realm_id, wfrp_nations.n_id
        FROM wfrp_nations;

  END;
  $$ LANGUAGE plpgsql;
