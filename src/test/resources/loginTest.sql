BEGIN;

DO $$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM security."user" WHERE id = -1)
    THEN

      INSERT INTO security."user" (id, name, password, one_time_password, deleted)
      VALUES (-1, 'user', '\$2a\$04$mXPGLR77yJLV/SUmdMCWFuTuVSDL2YjfEvFdp5mPmxws2ZSXDjd1a', false, false);

      INSERT INTO security.user_roles (user_id, roles_id)
      VALUES (-1, (SELECT id FROM security.role WHERE name = 'ROLE_USER'));

  END IF;

END;
$$ LANGUAGE plpgsql;

COMMIT;