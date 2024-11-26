-- Insert mock data for ENUM types
-- ENUMs don't need direct inserts, but we use them in other tables.

-- Insert mock data for the course table
INSERT INTO course (code, name, credit_hours, is_remedial) VALUES
('CS101', 'Introduction to Computer Science', 3, FALSE),
('MATH101', 'Calculus I', 4, FALSE),
('ENG101', 'English Composition', 3, FALSE),
('PHY101', 'Physics I', 4, FALSE),
('CS102', 'Data Structures', 3, FALSE),
('MATH102', 'Calculus II', 4, FALSE),
('CS103', 'Algorithms', 3, FALSE),
('REM101', 'Basic Math Skills', 3, TRUE);

-- Insert mock data for the program table
INSERT INTO program (name, degree) VALUES
('Computer Science', 'BACHELOR'),
('Electrical Engineering', 'BACHELOR'),
('Mechanical Engineering', 'BACHELOR'),
('Data Science', 'MASTER');

-- Insert mock data for the course_prerequisite table
INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
(5, 1, 'AND'), -- CS102 requires CS101
(6, 2, 'AND'), -- MATH102 requires MATH101
(7, 5, 'AND'); -- CS103 requires CS102

-- Insert mock data for the study_plan table
INSERT INTO study_plan (track, start_academic_year, duration, program) VALUES
('General Track', 2023, 4, 1), -- Computer Science
('Cybersecurity Track', 2023, 4, 1),
('Data Engineering Track', 2023, 2, 4); -- Data Science Master's

-- Insert mock data for the section table
INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('UNIVERSITY', 'REQUIREMENT', 9, 'General Education', 1),
('SCHOOL', 'REQUIREMENT', 6, 'Core Science Courses', 1),
('PROGRAM', 'ELECTIVE', 12, 'CS Electives', 1),
('UNIVERSITY', 'REQUIREMENT', 9, 'General Education', 2),
('PROGRAM', 'REQUIREMENT', 18, 'Cybersecurity Core', 2);

-- Insert mock data for the section_course table
INSERT INTO section_course (section, course, year, semester) VALUES
(1, 3, 2023, 'FIRST'), -- ENG101 in General Education (2023, Semester 1)
(1, 2, 2023, 'SECOND'), -- MATH101 in General Education (2023, Semester 2)
(2, 4, 2023, 'SECOND'), -- PHY101 in Core Science Courses (2023, Semester 2)
(3, 5, 2024, 'FIRST'), -- CS102 in CS Electives (2024, Semester 1)
(5, 7, 2024, 'SECOND'); -- CS103 in Cybersecurity Core (2024, Semester 2)
