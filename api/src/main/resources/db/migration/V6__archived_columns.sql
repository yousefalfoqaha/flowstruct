ALTER TABLE program
    ADD COLUMN outdated_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN outdated_by INT,
    ADD CONSTRAINT program_outdated_by_fkey FOREIGN KEY (outdated_by) REFERENCES "user"(id);

ALTER TABLE course
    ADD COLUMN outdated_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN outdated_by INT,
    ADD CONSTRAINT course_outdated_by_fkey FOREIGN KEY (outdated_by) REFERENCES "user"(id);

ALTER TABLE study_plan
    ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN archived_by INT,
    ADD CONSTRAINT study_plan_archived_by_fkey FOREIGN KEY (archived_by) REFERENCES "user"(id);
