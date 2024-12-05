-- Insert programs
INSERT INTO program (code, name, degree) VALUES
('CS', 'Bachelor of Science in Computer Science', 'BACHELOR'),
('CS', 'Master of Science in Computer Science', 'MASTER');

-- Insert courses
INSERT INTO course (code, name, credit_hours) VALUES
('CS101', 'Introduction to Computer Science', 3),
('CS102', 'Data Structures', 4),
('CS201', 'Algorithms', 3),
('CS301', 'Database Systems', 3),
('CS302', 'Operating Systems', 4);

-- Insert course prerequisites
INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
(2, 1, 'AND'), -- Data Structures requires Introduction to Computer Science
(3, 2, 'AND'), -- Algorithms requires Data Structures
(4, 2, 'AND'), -- Database Systems requires Data Structures
(5, 2, 'AND'); -- Operating Systems requires Data Structures

-- Insert study plan
INSERT INTO study_plan (start_academic_year, duration, program) VALUES
(2023, 4, 1),  -- Program ID 1: BSc in CS, start academic year 2023, duration 4 years
(2023, 2, 2);  -- Program ID 2: MSc in CS, start academic year 2023, duration 2 years

-- Insert tracks
INSERT INTO track (study_plan, code, name) VALUES
(1, 'A', 'Software Engineering Track'),
(2, 'B', 'Artificial Intelligence Track');

-- Insert sections
INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('PROGRAM', 'REQUIREMENT', 3, 'Core Computer Science Courses', 1),
('PROGRAM', 'ELECTIVE', 3, 'Elective Courses', 1),
('PROGRAM', 'REQUIREMENT', 4, 'Core AI Courses', 2),
('PROGRAM', 'ELECTIVE', 3, 'Elective Courses', 2);

-- Insert section courses
INSERT INTO section_course (section, course) VALUES
(1, 2), -- Data Structures is part of Core Computer Science Courses
(1, 3), -- Algorithms is part of Core Computer Science Courses
(2, 4), -- Database Systems is part of Elective Courses
(3, 5), -- Operating Systems is part of Core AI Courses
(4, 1); -- Introduction to Computer Science is part of Elective Courses

-- Insert guide courses
INSERT INTO guide_course (course, year, semester, study_plan) VALUES
(2, 1, 'FIRST', 1), -- Data Structures, Year 1, First Semester
(3, 1, 'SECOND', 1), -- Algorithms, Year 1, Second Semester
(4, 1, 'FIRST', 2), -- Database Systems, Year 1, First Semester
(5, 2, 'SECOND', 2); -- Operating Systems, Year 2, Second Semester
