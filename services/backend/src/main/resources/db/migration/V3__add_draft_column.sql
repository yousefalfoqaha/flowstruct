ALTER TABLE program
    ADD COLUMN draft JSONB;

ALTER TABLE study_plan
    ADD COLUMN draft JSONB;

ALTER TABLE course
    ADD COLUMN draft JSONB;