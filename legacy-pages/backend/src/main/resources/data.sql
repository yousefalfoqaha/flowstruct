INSERT INTO program (code, name, degree) VALUES
('MECH', 'Mechanical and Maintenance Engineering', 'BACHELOR');

INSERT INTO course (code, name, credit_hours) VALUES
('MECH5502', 'Building Automation', 3), -- 1
('MECH3202', 'Computer Aided Thermal Engineering', 2), -- 2
('ME0212', 'Electrical Circuits and Machines', 3), -- 3
('PHYS104', 'Physics II', 3), -- 4
('PHYS103', 'Physics I', 3), -- 5
('MECH2202', 'Fluid Flow and Heat Transfer', 3), -- 6
('MECH2201', 'Applied Thermodynamics', 3), -- 7
('MATH205', 'Differential Equations', 3), -- 8
('MATH102', 'Calculus II', 3), -- 9
('MATH101', 'Calculus I', 3); -- 10

INSERT INTO course_prerequisite (course, prerequisite, relation) VALUES
(1, 2, 'AND'),
(1, 3, 'AND'),
(2, 6, 'AND'),
(3, 4, 'AND'),
(4, 5, 'AND'),
(6, 8, 'AND'),
(6, 7, 'AND'),
(7, 9, 'AND'),
(8, 9, 'AND'),
(9, 10, 'AND');

INSERT INTO study_plan (start_academic_year, duration, program) VALUES
(2023, 5, 1);

INSERT INTO track (study_plan, code, name) VALUES
(1, 'THERMAL', 'Thermal Systems Track');

INSERT INTO section (level, type, required_credit_hours, name, study_plan) VALUES
('PROGRAM', 'REQUIREMENT', 15, 'Thermal Systems Track', 1), -- 1
('PROGRAM', 'REQUIREMENT', 71, NULL, 1), -- 2
('SCHOOL', 'REQUIREMENT', 46, NULL, 1); -- 3

INSERT INTO section_course (section, course) VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 6),
(2, 7),
(3, 4),
(3, 5),
(3, 8),
(3, 9),
(3, 10);
