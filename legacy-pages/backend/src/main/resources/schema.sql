DROP TABLE IF EXISTS study_plan CASCADE;
DROP TABLE IF EXISTS track CASCADE;
DROP TABLE IF EXISTS section_course CASCADE;
DROP TABLE IF EXISTS section CASCADE;
DROP TABLE IF EXISTS course_prerequisite CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS guide_course CASCADE;

DROP TYPE IF EXISTS enum_degree CASCADE;
DROP TYPE IF EXISTS enum_section_level CASCADE;
DROP TYPE IF EXISTS enum_section_type CASCADE;
DROP TYPE IF EXISTS enum_semester CASCADE;
DROP TYPE IF EXISTS enum_relation CASCADE;

CREATE TYPE enum_degree AS ENUM ('BACHELOR', 'MASTER');
CREATE TYPE enum_section_level AS ENUM ('UNIVERSITY', 'SCHOOL', 'PROGRAM');
CREATE TYPE enum_section_type AS ENUM ('REQUIREMENT', 'ELECTIVE', 'REMEDIAL');
CREATE TYPE enum_semester AS ENUM ('FIRST', 'SECOND', 'SUMMER');
CREATE TYPE enum_relation AS ENUM ('AND', 'OR');

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    credit_hours INT NOT NULL
);

CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    degree enum_degree NOT NULL,
    UNIQUE (code, degree)
);

CREATE TABLE course_prerequisite (
    course INT NOT NULL,
    prerequisite INT NOT NULL,
    relation enum_relation NOT NULL,
    PRIMARY KEY (course, prerequisite),
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE study_plan (
    id SERIAL PRIMARY KEY,
    start_academic_year INT NOT NULL,
    duration INT NOT NULL,
    program INT NOT NULL,
    FOREIGN KEY (program) REFERENCES program(id) ON DELETE CASCADE
);

CREATE TABLE track (
    study_plan INT PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (study_plan) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    level enum_section_level NOT NULL,
    type enum_section_type NOT NULL,
    required_credit_hours INT NOT NULL,
    name VARCHAR(255),
    study_plan INT NOT NULL,
    FOREIGN KEY (study_plan) REFERENCES study_plan(id)
);

CREATE TABLE section_course (
    section INT NOT NULL,
    course INT NOT NULL,
    PRIMARY KEY (section, course),
    FOREIGN KEY (section) REFERENCES section(id) ON DELETE CASCADE,
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE guide_course (
    course INT NOT NULL,
    year INT NOT NULL,
    semester enum_semester NOT NULL,
    study_plan INT NOT NULL,
    FOREIGN KEY (study_plan) REFERENCES study_plan(id)
);