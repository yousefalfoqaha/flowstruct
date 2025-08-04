ALTER TABLE program
    ADD COLUMN is_pending BOOLEAN DEFAULT (FALSE),
    ADD COLUMN approved_program  JSONB;

ALTER TABLE study_plan
DROP
COLUMN is_published,
    ADD COLUMN is_pending BOOLEAN DEFAULT (FALSE),
    ADD COLUMN approved_study_plan  JSONB;

ALTER TABLE course
    ADD COLUMN is_pending BOOLEAN DEFAULT (FALSE),
    ADD COLUMN approved_course  JSONB;