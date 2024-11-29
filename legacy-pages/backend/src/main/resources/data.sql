-- Insert some programs
INSERT INTO program (name, degree) VALUES
('Computer Engineering', 'BSc'),
('Software Engineering', 'BSc'),
('Business Administration', 'MBA'),
('Data Science', 'MSc');

-- Insert some courses
INSERT INTO course (code, name, credit_hours, is_remedial) VALUES
('CS101', 'Introduction to Computer Science', 3, FALSE),
('CS102', 'Data Structures and Algorithms', 3, FALSE),
('CS103', 'Discrete Mathematics', 3, FALSE),
('CS201', 'Computer Networks', 4, FALSE),
('CS202', 'Database Systems', 4, FALSE),
('CS301', 'Operating Systems', 4, FALSE),
('BUS101', 'Introduction to Business', 3, FALSE),
('BUS102', 'Business Communication', 3, FALSE),
('DS101', 'Introduction to Data Science', 3, FALSE),
('DS102', 'Machine Learning', 4, FALSE),
('DS201', 'Data Visualization', 3, FALSE),
('GERL101', 'German Language I', 3, TRUE),
('GERL102', 'German Language II', 3, TRUE);

-- Insert course prerequisites
INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
((SELECT id FROM course WHERE code = 'CS102'), (SELECT id FROM course WHERE code = 'CS101'), 'AND'),
((SELECT id FROM course WHERE code = 'CS201'), (SELECT id FROM course WHERE code = 'CS102'), 'AND'),
((SELECT id FROM course WHERE code = 'CS202'), (SELECT id FROM course WHERE code = 'CS101'), 'AND'),
((SELECT id FROM course WHERE code = 'CS301'), (SELECT id FROM course WHERE code = 'CS202'), 'AND'),
((SELECT id FROM course WHERE code = 'DS102'), (SELECT id FROM course WHERE code = 'DS101'), 'AND');

-- Insert some study plans
INSERT INTO study_plan (track, start_academic_year, duration, program) VALUES
('Engineering Track', 2024, 4, (SELECT id FROM program WHERE name = 'Computer Engineering' AND degree = 'BSc')),
('Software Engineering Track', 2024, 4, (SELECT id FROM program WHERE name = 'Software Engineering' AND degree = 'BSc')),
('Business Admin Track', 2024, 2, (SELECT id FROM program WHERE name = 'Business Administration' AND degree = 'MBA')),
('Data Science Track', 2024, 2, (SELECT id FROM program WHERE name = 'Data Science' AND degree = 'MSc'));

-- Insert sections for study plans
INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('PROGRAM', 'REQUIREMENT', 18, 'Computer Science Core Courses', (SELECT id FROM study_plan WHERE track = 'Engineering Track' AND start_academic_year = 2024)),
('PROGRAM', 'REQUIREMENT', 12, 'Data Science Core Courses', (SELECT id FROM study_plan WHERE track = 'Data Science Track' AND start_academic_year = 2024)),
('UNIVERSITY', 'REQUIREMENT', 6, 'University General Requirements', (SELECT id FROM study_plan WHERE track = 'Engineering Track' AND start_academic_year = 2024)),
('SCHOOL', 'REQUIREMENT', 6, 'School Requirements', (SELECT id FROM study_plan WHERE track = 'Software Engineering Track' AND start_academic_year = 2024));

-- Insert courses for sections
INSERT INTO section_course (section, course) VALUES
((SELECT id FROM section WHERE name = 'Computer Science Core Courses'), (SELECT id FROM course WHERE code = 'CS101')),
((SELECT id FROM section WHERE name = 'Computer Science Core Courses'), (SELECT id FROM course WHERE code = 'CS102')),
((SELECT id FROM section WHERE name = 'Computer Science Core Courses'), (SELECT id FROM course WHERE code = 'CS201')),
((SELECT id FROM section WHERE name = 'Data Science Core Courses'), (SELECT id FROM course WHERE code = 'DS101')),
((SELECT id FROM section WHERE name = 'Data Science Core Courses'), (SELECT id FROM course WHERE code = 'DS102')),
((SELECT id FROM section WHERE name = 'University General Requirements'), (SELECT id FROM course WHERE code = 'BUS101')),
((SELECT id FROM section WHERE name = 'University General Requirements'), (SELECT id FROM course WHERE code = 'GERL101')),
((SELECT id FROM section WHERE name = 'School Requirements'), (SELECT id FROM course WHERE code = 'BUS102')),
((SELECT id FROM section WHERE name = 'School Requirements'), (SELECT id FROM course WHERE code = 'GERL102'));

-- Insert electives
INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('PROGRAM', 'ELECTIVE', 6, 'Engineering Electives', (SELECT id FROM study_plan WHERE track = 'Engineering Track' AND start_academic_year = 2024)),
('PROGRAM', 'ELECTIVE', 6, 'Software Engineering Electives', (SELECT id FROM study_plan WHERE track = 'Software Engineering Track' AND start_academic_year = 2024));

-- Insert courses for electives
INSERT INTO section_course (section, course) VALUES
((SELECT id FROM section WHERE name = 'Engineering Electives'), (SELECT id FROM course WHERE code = 'CS301')),
((SELECT id FROM section WHERE name = 'Software Engineering Electives'), (SELECT id FROM course WHERE code = 'CS202'));

-- Insert remedial courses (e.g., German courses)
INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('PROGRAM', 'REMEDIAL', 3, 'German Language Remedial', (SELECT id FROM study_plan WHERE track = 'Engineering Track' AND start_academic_year = 2024));

INSERT INTO section_course (section, course) VALUES
((SELECT id FROM section WHERE name = 'German Language Remedial'), (SELECT id FROM course WHERE code = 'GERL101'));
