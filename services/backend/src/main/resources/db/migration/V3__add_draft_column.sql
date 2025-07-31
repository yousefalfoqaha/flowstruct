ALTER TABLE program
    ADD COLUMN draft JSONB;

ALTER TABLE study_plan
DROP
COLUMN is_published
    ADD COLUMN draft JSONB;

ALTER TABLE course
    ADD COLUMN draft JSONB;