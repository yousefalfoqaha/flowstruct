-- Academic Periods
INSERT INTO academic_period (academic_year, semester) VALUES
(2023, 'FIRST'),
(2023, 'SECOND'),
(2023, 'SUMMER'),
(2024, 'FIRST'),
(2024, 'SECOND');

-- Courses
INSERT INTO course (code, name, credit_hours, is_remedial) VALUES
('MATH101', 'Introduction to Calculus', 3, false),
('MATH102', 'Advanced Calculus', 3, false),
('COMP101', 'Introduction to Programming', 3, false),
('COMP102', 'Data Structures', 3, false),
('ENGL101', 'Academic English', 3, true),
('PHYS101', 'Physics I', 4, false),
('PHYS102', 'Physics II', 4, false),
('CHEM101', 'General Chemistry', 4, false),
('COMP201', 'Database Systems', 3, false),
('COMP301', 'Software Engineering', 3, false),
('ARAB101', 'Arabic Language', 3, false),
('HIST101', 'History of Science', 3, false),
('CULT201', 'Cultural Studies', 3, false),
('ETHC101', 'Professional Ethics', 2, false),
('INNV201', 'Innovation and Entrepreneurship', 3, false);

-- Programs
INSERT INTO program (name, degree) VALUES
('Computer Science', 'BACHELOR'),
('Computer Science', 'MASTER'),
('Physics', 'BACHELOR'),
('Mathematics', 'BACHELOR'),
('Chemistry', 'BACHELOR');

-- Course Prerequisites
INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
(2, 1, 'AND'),  -- MATH102 requires MATH101
(4, 3, 'AND'),  -- COMP102 requires COMP101
(7, 6, 'AND'),  -- PHYS102 requires PHYS101
(9, 4, 'AND'),  -- COMP201 requires COMP102
(10, 9, 'AND'); -- COMP301 requires COMP201

-- Study Plans
INSERT INTO study_plan (name, track, start_academic_year, end_academic_year, program) VALUES
('CS Bachelor', 'Regular', 2023, 2027, 1),
('CS Bachelor', 'Honors', 2024, 2028, 1),
('Physics Bachelor', 'Regular', 2023, 2027, 3),
('Math Bachelor', 'Regular', 2023, 2027, 4);

-- Sections (Updated with more realistic names)
INSERT INTO section (name, required_credit_hours, study_plan) VALUES
('University Requirements', 15, 1),
('School of Computing Requirements', 30, 1),
('CS Program Core Requirements', 45, 1),
('CS Program Electives', 15, 1),
('General Education Requirements', 18, 1),

('University Requirements', 15, 2),
('School of Computing Requirements', 33, 2),
('CS Honors Core Requirements', 48, 2),
('CS Honors Research Track', 18, 2),

('University Requirements', 15, 3),
('School of Science Requirements', 30, 3),
('Physics Core Requirements', 45, 3),
('Physics Labs and Practical', 15, 3),

('University Requirements', 15, 4),
('School of Science Requirements', 30, 4),
('Mathematics Core Requirements', 45, 4),
('Mathematics Specialization', 15, 4);

-- Section Courses (Updated to match new sections)
INSERT INTO section_course (section, course) VALUES
-- CS Regular Track University Requirements
(1, 5),  -- ENGL101 in University Requirements
(1, 11), -- ARAB101 in University Requirements
(1, 12), -- HIST101 in University Requirements
(1, 14), -- ETHC101 in University Requirements
(1, 15), -- INNV201 in University Requirements

-- CS Regular Track School Requirements
(2, 1),  -- MATH101 in School Requirements
(2, 2),  -- MATH102 in School Requirements
(2, 6),  -- PHYS101 in School Requirements

-- CS Regular Track Core Requirements
(3, 3),  -- COMP101 in Core Requirements
(3, 4),  -- COMP102 in Core Requirements
(3, 9),  -- COMP201 in Core Requirements
(3, 10), -- COMP301 in Core Requirements

-- CS Honors Track
(6, 5),  -- ENGL101 in Honors University Requirements
(6, 11), -- ARAB101 in Honors University Requirements
(7, 1),  -- MATH101 in Honors School Requirements
(8, 3),  -- COMP101 in Honors Core Requirements

-- Physics Track
(10, 1), -- MATH101 in Physics School Requirements
(11, 6), -- PHYS101 in Physics Core Requirements
(11, 7), -- PHYS102 in Physics Core Requirements

-- Mathematics Track
(14, 1), -- MATH101 in Math School Requirements
(15, 2); -- MATH102 in Math Core Requirements

-- Students
INSERT INTO student (name, program, study_plan) VALUES
('John Doe', 1, 1),
('Jane Smith', 1, 1),
('Bob Johnson', 3, 3),
('Alice Brown', 4, 4),
('Charlie Wilson', 1, 2);

-- Planned Courses
INSERT INTO planned_course (student, academic_period, course) VALUES
(1, 1, 5),  -- John takes ENGL101 in 2023 FIRST
(1, 1, 3),  -- John takes COMP101 in 2023 FIRST
(1, 2, 1),  -- John takes MATH101 in 2023 SECOND
(2, 1, 5),  -- Jane takes ENGL101 in 2023 FIRST
(2, 1, 11), -- Jane takes ARAB101 in 2023 FIRST
(3, 1, 1),  -- Bob takes MATH101 in 2023 FIRST
(3, 1, 6),  -- Bob takes PHYS101 in 2023 FIRST
(4, 1, 1),  -- Alice takes MATH101 in 2023 FIRST
(4, 1, 8),  -- Alice takes CHEM101 in 2023 FIRST
(5, 4, 1);  -- Charlie takes MATH101 in 2024 FIRST