-- ************************************************************
-- Antares - SQL Client
-- Version 0.7.35
-- 
-- https://antares-sql.app/
-- https://github.com/antares-sql/antares
-- 
-- Host: 127.0.0.1 (PostgreSQL 17.4)
-- Database: public
-- Generation time: 2025-06-27T15:52:22+02:00
-- ************************************************************


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


-- Dump of types
-- ------------------------------------------------------------

CREATE TYPE "public"."enum_users_role" AS ENUM (
   'jury',
	'participant',
	'organizer'
);


-- Dump of table hackathons
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."hackathons";

CREATE SEQUENCE "public"."hackathons_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."hackathons"(
   "id" integer DEFAULT nextval('public.hackathons_id_seq'::regclass) NOT NULL,
   "name" character varying(255) NOT NULL,
   "description" text,
   "start_date" timestamp with time zone NOT NULL,
   "end_date" timestamp with time zone NOT NULL,
   "created_by" integer NOT NULL,
   "createdAt" timestamp with time zone NOT NULL,
   "updatedAt" timestamp with time zone NOT NULL,
   CONSTRAINT "hackathons_pkey" PRIMARY KEY ("id")
);



INSERT INTO "public"."hackathons" ("id", "name", "description", "start_date", "end_date", "created_by", "createdAt", "updatedAt") VALUES (1, 'Nom du Hackathon', 'Description détaillée du hackathon', '2023-10-01 11:00:00.000000', '2023-10-02 20:00:00.000000', 1, '2025-06-27 13:26:16.325000', '2025-06-27 13:26:16.325000');
INSERT INTO "public"."hackathons" ("id", "name", "description", "start_date", "end_date", "created_by", "createdAt", "updatedAt") VALUES (2, 'TestHackaton1', 'TestHackaton1TestHackaton1', '2025-06-28 02:00:00.000000', '2025-07-31 02:00:00.000000', 3, '2025-06-27 14:38:38.561000', '2025-06-27 14:38:38.561000');
INSERT INTO "public"."hackathons" ("id", "name", "description", "start_date", "end_date", "created_by", "createdAt", "updatedAt") VALUES (3, 'TEstHackaton2', 'TEstHackaton2', '2025-06-25 02:00:00.000000', '2025-06-27 02:00:00.000000', 3, '2025-06-27 14:42:06.157000', '2025-06-27 14:42:06.157000');




-- Dump of table projects
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."projects";

CREATE SEQUENCE "public"."projects_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."projects"(
   "id" integer DEFAULT nextval('public.projects_id_seq'::regclass) NOT NULL,
   "title" character varying(255) NOT NULL,
   "description" text,
   "hackathon_id" integer NOT NULL,
   "created_by" integer NOT NULL,
   "createdAt" timestamp with time zone NOT NULL,
   "updatedAt" timestamp with time zone NOT NULL,
   CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);



INSERT INTO "public"."projects" ("id", "title", "description", "hackathon_id", "created_by", "createdAt", "updatedAt") VALUES (1, 'Projet1Test', 'Testtttttttttt', 1, 3, '2025-06-27 14:29:02.497000', '2025-06-27 14:29:02.497000');
INSERT INTO "public"."projects" ("id", "title", "description", "hackathon_id", "created_by", "createdAt", "updatedAt") VALUES (2, 'TEstProjet111111111111', 'TEstProjet111111111111', 3, 3, '2025-06-27 14:42:55.554000', '2025-06-27 14:42:55.554000');




-- Dump of table scores
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."scores";

CREATE SEQUENCE "public"."scores_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."scores"(
   "id" integer DEFAULT nextval('public.scores_id_seq'::regclass) NOT NULL,
   "jury_id" integer NOT NULL,
   "team_id" integer NOT NULL,
   "score" double precision NOT NULL,
   "comment" text,
   "createdAt" timestamp with time zone NOT NULL,
   "updatedAt" timestamp with time zone NOT NULL,
   CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "scores_jury_id_team_id" ON "public"."scores" ("jury_id", "team_id");






-- Dump of table team_members
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."team_members";

CREATE SEQUENCE "public"."team_members_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."team_members"(
   "id" integer DEFAULT nextval('public.team_members_id_seq'::regclass) NOT NULL,
   "user_id" integer NOT NULL,
   "team_id" integer NOT NULL,
   "joined_at" timestamp with time zone NOT NULL,
   CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "team_members_user_id_team_id_key" ON "public"."team_members" ("user_id", "team_id");
CREATE UNIQUE INDEX "team_members_user_id_team_id" ON "public"."team_members" ("user_id", "team_id");


INSERT INTO "public"."team_members" ("id", "user_id", "team_id", "joined_at") VALUES (1, 2, 1, '2025-06-27 14:44:34.348000');
INSERT INTO "public"."team_members" ("id", "user_id", "team_id", "joined_at") VALUES (2, 4, 1, '2025-06-27 15:27:10.709000');




-- Dump of table teams
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."teams";

CREATE SEQUENCE "public"."teams_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."teams"(
   "id" integer DEFAULT nextval('public.teams_id_seq'::regclass) NOT NULL,
   "project_id" integer NOT NULL,
   "team_name" character varying(255) NOT NULL,
   "createdAt" timestamp with time zone NOT NULL,
   "updatedAt" timestamp with time zone NOT NULL,
   CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "teams_project_id_key" ON "public"."teams" ("project_id");


INSERT INTO "public"."teams" ("id", "project_id", "team_name", "createdAt", "updatedAt") VALUES (1, 2, 'Équipe TEstProjet111111111111', '2025-06-27 14:44:34.314000', '2025-06-27 14:44:34.314000');




-- Dump of table users
-- ------------------------------------------------------------

DROP TABLE IF EXISTS "public"."users";

CREATE SEQUENCE "public"."users_id_seq"
   START WITH 1
   INCREMENT BY 1
   MINVALUE 1
   MAXVALUE 2147483647
   CACHE 1;

CREATE TABLE "public"."users"(
   "id" integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
   "email" character varying(255) NOT NULL,
   "password_hash" character varying(255) NOT NULL,
   "first_name" character varying(255),
   "last_name" character varying(255),
   "role" "public".enum_users_role DEFAULT 'participant'::public.enum_users_role NOT NULL,
   "createdAt" timestamp with time zone NOT NULL,
   "updatedAt" timestamp with time zone NOT NULL,
   CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "public"."users" ("email");


INSERT INTO "public"."users" ("id", "email", "password_hash", "first_name", "last_name", "role", "createdAt", "updatedAt") VALUES (1, 'jane.doe@example.com', '$2b$10$ldYIpt5xFvnnzOTUGquRmu1cuPxHEEcbHlMCriF5vwt/NCWIJTxdG', 'Jane', 'Doe', 'organizer', '2025-06-27 10:04:27.801000', '2025-06-27 10:04:27.801000');
INSERT INTO "public"."users" ("id", "email", "password_hash", "first_name", "last_name", "role", "createdAt", "updatedAt") VALUES (2, 'stroskanisation@gmail.com', '$2b$10$TmFo4xhX68A95L9BuoGUw.5rngdqolOnnFR97M6PGnWQkb9O8roF6', 'Benoit', 'MATHIEZ', 'participant', '2025-06-27 13:38:21.149000', '2025-06-27 13:38:21.149000');
INSERT INTO "public"."users" ("id", "email", "password_hash", "first_name", "last_name", "role", "createdAt", "updatedAt") VALUES (3, 'test@test.com', '$2b$10$NozFb03UnE1/gOHfKmk0jOALZ0TfmcKc9kzAcqq5ceNh3/kIGDQGW', 'Admin', 'Orga', 'organizer', '2025-06-27 14:28:13.268000', '2025-06-27 14:28:13.268000');
INSERT INTO "public"."users" ("id", "email", "password_hash", "first_name", "last_name", "role", "createdAt", "updatedAt") VALUES (4, 'test2@test.test', '$2b$10$WfgtdsBVwuf/fsP0MmpxkOZWFr35f2JzB.6AWh.X3KecbwCCHaM5y', 'test', 'test', 'participant', '2025-06-27 15:05:49.591000', '2025-06-27 15:05:49.591000');
INSERT INTO "public"."users" ("id", "email", "password_hash", "first_name", "last_name", "role", "createdAt", "updatedAt") VALUES (5, 'test3@test.test', '$2b$10$J488S6jF0nwibL1m7AHERe.ge6C8LvGQ9zv5yRw6p91QFx3C0Y65y', 'test', 'tet', 'jury', '2025-06-27 15:33:23.956000', '2025-06-27 15:33:23.956000');





ALTER TABLE ONLY "public"."hackathons"
   ADD CONSTRAINT "hackathons_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON UPDATE CASCADE ON DELETE NO ACTION;

ALTER TABLE ONLY "public"."projects"
   ADD CONSTRAINT "projects_hackathon_id_fkey" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons" ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."projects"
   ADD CONSTRAINT "projects_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON UPDATE CASCADE ON DELETE NO ACTION;

ALTER TABLE ONLY "public"."scores"
   ADD CONSTRAINT "scores_jury_id_fkey" FOREIGN KEY ("jury_id") REFERENCES "public"."users" ("id") ON UPDATE CASCADE ON DELETE NO ACTION;

ALTER TABLE ONLY "public"."scores"
   ADD CONSTRAINT "scores_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams" ("id") ON UPDATE CASCADE ON DELETE NO ACTION;

ALTER TABLE ONLY "public"."team_members"
   ADD CONSTRAINT "team_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."team_members"
   ADD CONSTRAINT "team_members_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams" ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."teams"
   ADD CONSTRAINT "teams_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects" ("id") ON UPDATE CASCADE ON DELETE CASCADE;


-- Dump of functions
-- ------------------------------------------------------------






-- Dump completed on 2025-06-27T15:52:22+02:00