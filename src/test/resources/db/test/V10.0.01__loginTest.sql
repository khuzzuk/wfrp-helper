BEGIN;

INSERT INTO security."user" (id, name, password, one_time_password, deleted)
VALUES (-1, 'user', '$2a$10$lUs0B2B4/7LNmlb2h.gEOujfEHx3.WvlT8UZsuNdxDyv8N4Jw3yAW', false, false);

INSERT INTO security.user_roles (user_id, roles_id)
VALUES (-1, (SELECT id FROM security.role WHERE name = 'ROLE_USER'));

COMMIT;