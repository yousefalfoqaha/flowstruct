ALTER TABLE study_plan
    DROP
        COLUMN is_published,
    ADD COLUMN approved_study_plan JSONB;

ALTER TABLE "user"
    ADD COLUMN role VARCHAR(255) NOT NULL DEFAULT('GUEST');