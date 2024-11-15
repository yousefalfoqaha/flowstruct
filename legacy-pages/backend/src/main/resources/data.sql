INSERT INTO study_plan(id, name) VALUES
(1, 'Computer Science 2023/2024 - General Track');

INSERT INTO section (id, name, required_credit_hours, study_plan_id) VALUES
(1, 'University Requirements', 16, 1),
(2, 'School requirements', 21, 1);

INSERT INTO course (id, code, name, credit_hours) VALUES
(1, 'ENGL1001', 'Upper-Intermediate English', 3),
(2, 'CS116', 'Computing Fundamentals', 3);

INSERT INTO section_course (course_id, section_id) VALUES
(1, 1),
(2, 2);

INSERT INTO semester (id, column_index, study_plan_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1);

INSERT INTO flowsheet (uuid, study_plan_id) VALUES
('a1bdb173-b30a-4baa-9dbe-bdf3108f4d76', 1);

INSERT INTO course_mapping (id, flowsheet_uuid, course_id, semester_id) VALUES
(1, 'a1bdb173-b30a-4baa-9dbe-bdf3108f4d76', 2, 1),
(2, 'a1bdb173-b30a-4baa-9dbe-bdf3108f4d76', 1, 2);