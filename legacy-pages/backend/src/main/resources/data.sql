-- Insert academic periods
INSERT INTO academic_period (academic_year, semester) 
VALUES 
(2023, 'FIRST'),
(2023, 'SECOND'),
(2023, 'SUMMER'),
(2024, 'FIRST'),
(2024, 'SECOND');

-- Insert courses
INSERT INTO course (code, name, credit_hours, is_remedial) 
VALUES 
('CS101', 'Introduction to Computer Science', 3, FALSE),
('CS102', 'Data Structures', 4, FALSE),
('CS201', 'Algorithms', 3, FALSE),
('MATH101', 'Calculus I', 3, FALSE),
('MATH102', 'Calculus II', 3, FALSE),
('CS301', 'Operating Systems', 3, FALSE),
('CS302', 'Database Systems', 3, FALSE),
('ENG101', 'English Composition', 3, FALSE),
('PHYS101', 'Physics I', 4, FALSE);

-- Insert programs
INSERT INTO program (name, degree) 
VALUES 
('Computer Science', 'BACHELOR'),
('Computer Science', 'MASTER'),
('Mechanical Engineering', 'BACHELOR'),
('Business Administration', 'MASTER');

-- Insert course prerequisites
INSERT INTO course_prerequisite (course_id, prerequisite_id, relation) 
VALUES 
(3, 2, 'AND'), -- Algorithms requires Data Structures
(5, 4, 'AND'), -- Calculus II requires Calculus I
(7, 6, 'AND'); -- Database Systems requires Operating Systems

-- Insert study plans
INSERT INTO study_plan (name, track, start_academic_year, end_academic_year, program_id) 
VALUES 
('Bachelor Computer Science Plan', 'Track A', 2023, 2027, 1),
('Master Computer Science Plan', 'Track B', 2023, 2025, 2),
('Mechanical Engineering Plan', 'Track A', 2023, 2027, 3),
('MBA Plan', 'Business Track', 2023, 2025, 4);

-- Insert sections
INSERT INTO section (name, required_credit_hours, study_plan_id) 
VALUES 
('Core Courses Section', 15, 1),
('Advanced Courses Section', 12, 2),
('Mechanical Engineering Section', 18, 3),
('MBA Section', 18, 4);

-- Insert section_course relationships
INSERT INTO section_course (section_id, course_id) 
VALUES 
(1, 1), -- Core Courses Section includes CS101
(1, 2), -- Core Courses Section includes CS102
(1, 4), -- Core Courses Section includes MATH101
(2, 6), -- Advanced Courses Section includes CS301
(2, 7), -- Advanced Courses Section includes CS302
(2, 5), -- Advanced Courses Section includes MATH102
(3, 8), -- Mechanical Engineering Section includes ENG101
(3, 9); -- Mechanical Engineering Section includes PHYS101

-- Insert students
INSERT INTO student (name, study_plan_id) 
VALUES 
('John Doe', 1),
('Jane Smith', 2),
('Mark Lee', 3),
('Alice Johnson', 4);

-- Insert planned courses for students
INSERT INTO planned_course (student_id, academic_period_id, course_id) 
VALUES 
(1, 1, 1), -- John Doe plans to take CS101 in 2023, FIRST semester
(1, 1, 2), -- John Doe plans to take CS102 in 2023, FIRST semester
(2, 2, 6), -- Jane Smith plans to take CS301 in 2023, SECOND semester
(2, 2, 7), -- Jane Smith plans to take CS302 in 2023, SECOND semester
(3, 1, 4), -- Mark Lee plans to take MATH101 in 2023, FIRST semester
(3, 2, 8), -- Mark Lee plans to take ENG101 in 2023, SECOND semester
(4, 1, 5), -- Alice Johnson plans to take MATH102 in 2023, FIRST semester
(4, 2, 9); -- Alice Johnson plans to take PHYS101 in 2023, SECOND semester
