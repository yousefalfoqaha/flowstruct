ALTER TABLE section_course DROP CONSTRAINT IF EXISTS section_course_course_fkey;

ALTER TABLE section_course
    ADD CONSTRAINT section_course_course_fkey
        FOREIGN KEY (course)
            REFERENCES course (id)
            ON DELETE CASCADE;

ALTER TABLE course_prerequisite DROP CONSTRAINT IF EXISTS course_prerequisite_course_fkey;

ALTER TABLE course_prerequisite
    ADD CONSTRAINT course_prerequisite_course_fkey
        FOREIGN KEY (course)
            REFERENCES course (id)
            ON DELETE CASCADE;

ALTER TABLE course_prerequisite DROP CONSTRAINT IF EXISTS course_prerequisite_prerequisite_fkey;

ALTER TABLE course_prerequisite
    ADD CONSTRAINT course_prerequisite_prerequisite_fkey
        FOREIGN KEY (prerequisite)
            REFERENCES course (id)
            ON DELETE CASCADE;

ALTER TABLE course_corequisite DROP CONSTRAINT IF EXISTS course_corequisite_course_fkey;

ALTER TABLE course_corequisite
    ADD CONSTRAINT course_corequisite_course_fkey
        FOREIGN KEY (course)
            REFERENCES course (id)
            ON DELETE CASCADE;

ALTER TABLE course_corequisite DROP CONSTRAINT IF EXISTS course_corequisite_corequisite_fkey;

ALTER TABLE course_corequisite
    ADD CONSTRAINT course_corequisite_corequisite_fkey
        FOREIGN KEY (corequisite)
            REFERENCES course (id)
            ON DELETE CASCADE;

ALTER TABLE course_placement DROP CONSTRAINT IF EXISTS course_placement_course_fkey;

ALTER TABLE course_placement
    ADD CONSTRAINT course_placement_course_fkey
        FOREIGN KEY (course)
            REFERENCES course (id)
            ON DELETE CASCADE;