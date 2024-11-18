DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS academic_period CASCADE;
DROP TABLE IF EXISTS course_prerequisite CASCADE;
DROP TABLE IF EXISTS section_course CASCADE;
DROP TABLE IF EXISTS study_plan CASCADE;
DROP TABLE IF EXISTS section CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS planned_course CASCADE;

DROP TYPE IF EXISTS semester_enum;
DROP TYPE IF EXISTS degree_enum;
DROP TYPE IF EXISTS prerequisite_enum;

CREATE TYPE semester_enum AS ENUM ('FIRST', 'SECOND', 'SUMMER');
CREATE TYPE degree_enum AS ENUM ('BACHELOR', 'MASTER', 'PHD');
CREATE TYPE prerequisite_enum AS ENUM ('AND', 'OR');

CREATE TABLE academic_period (
    id SERIAL PRIMARY KEY,
    academic_year INT NOT NULL,
    semester semester_enum NOT NULL,
    UNIQUE (academic_year, semester)
);

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    credit_hours INT,
    is_remedial BOOLEAN DEFAULT FALSE
);

CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    degree degree_enum,
    UNIQUE (name, degree)
);

CREATE TABLE course_prerequisite (
    course_id INT NOT NULL,
    prerequisite_id INT NOT NULL,
    relation prerequisite_enum,
    PRIMARY KEY (course_id, prerequisite_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE study_plan (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    track VARCHAR(255),
    start_academic_year INT NOT NULL,
    end_academic_year INT NOT NULL,
    program_id INT NOT NULL,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    required_credit_hours INT,
    study_plan_id INT NOT NULL,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE section_course (
    section_id INT NOT NULL,
    course_id INT NOT NULL,
    PRIMARY KEY (section_id, course_id),
    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    study_plan_id INT,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE SET NULL
);

CREATE TABLE planned_course (
    student_id INT NOT NULL,
    academic_period_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_period_id) REFERENCES academic_period(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
