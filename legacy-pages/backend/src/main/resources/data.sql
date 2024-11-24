-- Inserting mock data into `school` table
INSERT INTO school (name) VALUES
('School of Computer Science'),
('School of Electrical Engineering'),
('School of Business Administration');

-- Inserting mock data into `course` table
INSERT INTO course (code, name, credit_hours, is_remedial) VALUES
('CS101', 'Introduction to Computer Science', 3, FALSE),
('CS102', 'Data Structures', 3, FALSE),
('CS201', 'Algorithms', 3, FALSE),
('EE101', 'Introduction to Electrical Engineering', 3, FALSE),
('EE102', 'Circuits and Systems', 4, FALSE),
('MGT101', 'Introduction to Business', 3, FALSE),
('CS103', 'Discrete Mathematics', 3, FALSE),
('CS301', 'Operating Systems', 3, FALSE),
('CS401', 'Database Systems', 3, FALSE);

-- Inserting mock data into `program` table
INSERT INTO program (name, degree, school) VALUES
('Bachelor of Science in Computer Science', 'BACHELOR', 1),
('Bachelor of Science in Electrical Engineering', 'BACHELOR', 2),
('Master of Business Administration', 'MASTER', 3);

-- Inserting mock data into `course_prerequisite` table
INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
(2, 1, 'AND'),  -- CS102 requires CS101
(3, 2, 'AND'),  -- CS201 requires CS102
(4, 1, 'OR'),   -- EE101 OR CS101
(5, 4, 'AND'),  -- EE102 requires EE101
(7, 1, 'AND');  -- CS103 requires CS101

-- Inserting mock data into `section` table
INSERT INTO section (name, required_credit_hours, version, type, school, program) VALUES
(NULL, 12, 1, 'SCHOOL', 1, NULL),  -- School requirements for Computer Science
(NULL, 18, 1, 'PROGRAM', NULL, 1), -- Program requirements for Computer Science
(NULL, 15, 1, 'SCHOOL', 2, NULL),  -- School requirements for Electrical Engineering
(NULL, 18, 1, 'PROGRAM', NULL, 2), -- Program requirements for Electrical Engineering
(NULL, 12, 1, 'SCHOOL', 3, NULL),  -- School requirements for Business Administration
(NULL, 24, 1, 'PROGRAM', NULL, 3), -- Program requirements for Business Administration
('Remedial Section', 0, 1, 'REMEDIAL', NULL, NULL);  -- Remedial section (no credits)

-- Inserting mock data into `section_course` table
INSERT INTO section_course (section, course) VALUES
(1, 1),  -- School requirements for Computer Science includes CS101
(1, 2),  -- School requirements for Computer Science includes CS102
(2, 3),  -- Program requirements for Computer Science includes CS201
(2, 4),  -- Program requirements for Computer Science includes EE101
(3, 5),  -- School requirements for Electrical Engineering includes EE102
(4, 6),  -- Program requirements for Business Administration includes MGT101
(5, 7),  -- School requirements for Business Administration includes CS103
(6, 8);  -- Program requirements for Business Administration includes CS301

-- Inserting mock data into `study_plan` table
INSERT INTO study_plan (track, start_academic_year, duration, program) VALUES
(NULL, 2024, 4, 1),  -- 2024 Computer Science program
(NULL, 2024, 2, 2),  -- 2024 Electrical Engineering program
('Entrepreneurship', 2024, 1, 3),
('Digital Marketing', 2024, 1, 3),
('Engineering Management', 2024, 1, 3);  -- Tracks for each 2024 Business Administration program

-- Inserting mock data into `study_plan_section` table
INSERT INTO study_plan_section (study_plan, section) VALUES
(1, 2),  -- Track A includes Program requirements for Computer Science
(2, 4),  -- Track B includes Program requirements for Electrical Engineering
(3, 6);  -- Track C includes Program requirements for Business Administration

-- Inserting mock data into `student` table
INSERT INTO student (name, program, study_plan) VALUES
('Alice Johnson', 1, 1),  -- Alice Johnson is in Computer Science program, Track A
('Bob Smith', 2, 2),      -- Bob Smith is in Electrical Engineering program, Track B
('Charlie Lee', 3, 3);    -- Charlie Lee is in Business Administration program, Track C

-- Inserting mock data into `planned_course` table
INSERT INTO planned_course (student, academic_year, semester, course) VALUES
(1, 2024, 'FIRST', 1),  -- Alice Johnson plans to take CS101 in the first semester
(1, 2024, 'SECOND', 2),  -- Alice Johnson plans to take CS102 in the second semester
(2, 2024, 'FIRST', 4),  -- Bob Smith plans to take EE101 in the first semester
(2, 2024, 'SECOND', 5),  -- Bob Smith plans to take EE102 in the second semester
(3, 2024, 'FIRST', 7);  -- Charlie Lee plans to take CS103 in the first semester
