INSERT INTO security."user" (username,
                             password,
                             one_time_password,
                             account_non_expired,
                             account_non_locked,
                             credentials_non_expired,
                             enabled)
VALUES ('admin',
        '$2a$10$PvTBhGi0xjIvDOQI3drkX.TMjpWFJMYxwxPpJk.sqO0yzDWJpjNlq',
        TRUE,
        TRUE,
        TRUE,
        TRUE,
        TRUE);

WITH role_to_add AS (SELECT id role_id
                     FROM security.role
                     WHERE authority IN (
                                         'ROLE_USER',
                                         'ROLE_ADMIN',
                                         'ROLE_PLAYER',
                                         'ROLE_GAMEMASTER',
                                         'ROLE_ARMOR',
                                         'ROLE_AMMUNITION',
                                         'ROLE_ARMORPATTERN',
                                         'ROLE_JEWELRY',
                                         'ROLE_MELEEWEAPON',
                                         'ROLE_MISCITEM',
                                         'ROLE_RANGEDWEAPON',
                                         'ROLE_ARMORBLUEPRINT',
                                         'ROLE_MELEEWEAPONBLUEPRINT',
                                         'ROLE_RANGEDWEAPONBLUEPRINT',
                                         'ROLE_RESOURCE',
                                         'ROLE_ANIMAL',
                                         'ROLE_ANIMALKIND',
                                         'ROLE_CHARACTER',
                                         'ROLE_EYECOLOR',
                                         'ROLE_HAIRCOLOR',
                                         'ROLE_PERSON',
                                         'ROLE_PHYSICALFEATURE',
                                         'ROLE_SKILL',
                                         'ROLE_SPELL',
                                         'ROLE_SPELLSCHOOL',
                                         'ROLE_CURRENCY',
                                         'ROLE_PROFESSION',
                                         'ROLE_PROFESSIONCLASS',
                                         'ROLE_NATION',
                                         'ROLE_PLACE',
                                         'ROLE_RACE',
                                         'ROLE_REALM',
                                         'ROLE_RELIGION',
                                         'ROLE_SCENARIO',
                                         'ROLE_PICTURE',
                                         'ROLE_WORLDLANGUAGE'))
INSERT
INTO security.user_roles (user_id, roles_id)
SELECT (SELECT id FROM security."user" WHERE username = 'admin'), role_to_add.role_id
FROM role_to_add;

