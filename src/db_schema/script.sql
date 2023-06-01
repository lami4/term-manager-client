--users
CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    email character varying(128) NOT NULL,
    full_name character varying(128) NOT NULL,
    password character varying(128) NOT NULL,
    enabled smallint DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
    );

ALTER TABLE public.users
    OWNER to termbase_admin;


--roles
CREATE TABLE IF NOT EXISTS public.roles
(
    id serial NOT NULL,
    name character varying(128) NOT NULL,
    PRIMARY KEY (id)
    );

ALTER TABLE public.roles
    OWNER to termbase_admin;

--roles_to_users
CREATE TABLE IF NOT EXISTS public.users_to_roles
(
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT user_fk FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
    CONSTRAINT role_fk FOREIGN KEY (role_id)
    REFERENCES public.roles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
    );

ALTER TABLE public.users_to_roles
    OWNER to termbase_admin;

--insert roles and users
INSERT INTO roles (name) VALUES ('USER');
INSERT INTO roles (name) VALUES ('CREATOR');
INSERT INTO roles (name) VALUES ('EDITOR');
INSERT INTO roles (name) VALUES ('ADMIN');

INSERT INTO users (email, username, password, enabled) VALUES ('svetlana@khan@gmail.ru', 'sveta', '$2a$10$cTUErxQqYVyU2qmQGIktpup5chLEdhD2zpzNEyYqmxrHHJbSNDOG.', '1');
INSERT INTO users (email, username, password, enabled) VALUES ('igorpetrov@gmail.com', 'igor', '$2a$10$.tP2OH3dEG0zms7vek4ated5AiQ.EGkncii0OpCcGq4bckS9NOULu', '1');
INSERT INTO users (email, username, password, enabled) VALUES ('selyutosergey@bpcbt.com', 'sergey', '$2a$10$E2UPv7arXmp3q0LzVzCBNeb4B4AtbTAGjkefVDnSztOwE7Gix6kea', '1');
INSERT INTO users (email, username, password, enabled) VALUES ('johndoe@gmail.com', 'john', '$2a$10$GQT8bfLMaLYwlyUysnGwDu6HMB5G.tin5MKT/uduv2Nez0.DmhnOq', '1');
INSERT INTO users (email, username, password, enabled) VALUES ('karpenko@gmail.com','roman', '$2a$10$IqTJTjn39IU5.7sSCDQxzu3xug6z/LPU6IF0azE/8CkHCwYEnwBX.', '1');

INSERT INTO users_to_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO users_to_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO users_to_roles (user_id, role_id) VALUES (3, 3);
INSERT INTO users_to_roles (user_id, role_id) VALUES (4, 2);
INSERT INTO users_to_roles (user_id, role_id) VALUES (4, 3);
INSERT INTO users_to_roles (user_id, role_id) VALUES (5, 4);