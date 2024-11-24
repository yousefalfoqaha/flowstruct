DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS academic_period CASCADE;
DROP TABLE IF EXISTS course_prerequisite CASCADE;
DROP TABLE IF EXISTS study_plan CASCADE;
DROP TABLE IF EXISTS remedial_section CASCADE;
DROP TABLE IF EXISTS university_section CASCADE;
DROP TABLE IF EXISTS school_section CASCADE;
DROP TABLE IF EXISTS program_section CASCADE;
DROP TABLE IF EXISTS remedial_section_course CASCADE;
DROP TABLE IF EXISTS university_section_course CASCADE;
DROP TABLE IF EXISTS school_section_course CASCADE;
DROP TABLE IF EXISTS program_section_course CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS planned_course CASCADE;

DROP TYPE IF EXISTS semester_enum;
DROP TYPE IF EXISTS degree_enum;
DROP TYPE IF EXISTS prerequisite_enum;
DROP TYPE IF EXISTS section_type_enum;

CREATE TYPE semester_enum AS ENUM ('FIRST', 'SECOND', 'SUMMER');
CREATE TYPE degree_enum AS ENUM ('BACHELOR', 'MASTER', 'PHD');
CREATE TYPE prerequisite_enum AS ENUM ('AND', 'OR');
CREATE TYPE section_type_enum AS ENUM ('REMEDIAL', 'UNIVERSITY', 'SCHOOL', 'PROGRAM');

CREATE TABLE school (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)

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
    school INT NOT NULL,
    UNIQUE (name, degree, school),
    FOREIGN KEY school REFERENCES school(id)
);

CREATE TABLE course_prerequisite (
    course INT NOT NULL,
    prerequisite INT NOT NULL,
    relation prerequisite_enum,
    PRIMARY KEY (course, prerequisite),
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE study_plan (
    id SERIAL PRIMARY KEY,
    track VARCHAR(255),
    start_academic_year INT NOT NULL,
    duration INT NOT NULL,
    program INT NOT NULL,
    UNIQUE (track, start_academic_year, program),
    FOREIGN KEY (year) REFERENCES year(id) ON DELETE CASCADE,
    FOREIGN KEY (program) REFERENCES program(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    required_credit_hours INT NOT NULL,
    version INT NOT NULL,
    type section_type_enum NOT NULL,
    school INT,
    program INT,
    FOREIGN KEY (school) REFERENCES school(id) ON DELETE CASCADE,
    FOREIGN KEY (program) REFERENCES program(id) ON DELETE CASCADE,
    CONSTRAINT CHECK (
        (
            (school IS NOT NULL AND program IS NULL AND type = 'SCHOOL') OR
            (program IS NOT NULL AND school IS NULL AND type = 'PROGRAM') OR
            (school IS NULL AND program IS NULL)
        )
    ),
    CONSTRAINT CHECK (
        type = 'REMEDIAL' AND required_credit_hours = 0
    )
);

CREATE TABLE section_course (
    section INT NOT NULL,
    course INT NOT NULL,
    PRIMARY KEY (section, course),
    FOREIGN KEY (section) REFERENCES section(id) ON DELETE CASCADE,
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    program INT,
    study_plan INT,
    FOREIGN KEY (program) REFERENCES program(id) ON DELETE SET NULL,
    FOREIGN KEY (study_plan) REFERENCES study_plan(id) ON DELETE SET NULL
);

CREATE TABLE planned_course (
    student INT NOT NULL,
    academic_year INT NOT NULL,
    semester semester_enum NOT NULL,
    course INT NOT NULL,
    FOREIGN KEY (student) REFERENCES student(id) ON DELETE CASCADE,
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE
);
