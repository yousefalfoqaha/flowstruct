ALTER TABLE study_plan
    DROP
        COLUMN is_published,
    ADD COLUMN approved_study_plan JSONB;

