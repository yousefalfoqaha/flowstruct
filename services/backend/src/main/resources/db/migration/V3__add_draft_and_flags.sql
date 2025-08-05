ALTER TABLE study_plan
    DROP
        COLUMN is_published,
    ADD COLUMN is_pending          BOOLEAN DEFAULT (FALSE),
    ADD COLUMN approved_study_plan JSONB;