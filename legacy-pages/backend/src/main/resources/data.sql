INSERT INTO study_plan(id, name, years) VALUES
(1, 'Computer Science 2023/2024 - General Track', 4);

INSERT INTO section (id, name, required_credit_hours, study_plan_id) VALUES
(1, 'University Requirements', 16, 1),
(2, 'School requirements', 21, 1);

INSERT INTO course (id, code, name, credit_hours) VALUES
(1, 'ENGL1001', 'Upper-Intermediate English', 3),
(2, 'CS116', 'Computing Fundamentals', 3);

INSERT INTO section_course (course_id, section_id) VALUES
(1, 1),
(2, 2);