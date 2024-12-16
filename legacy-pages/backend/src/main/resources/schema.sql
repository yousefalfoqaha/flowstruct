DROP TABLE IF EXISTS study_plan CASCADE;
DROP TABLE IF EXISTS track CASCADE;
DROP TABLE IF EXISTS section_course CASCADE;
DROP TABLE IF EXISTS section CASCADE;
DROP TABLE IF EXISTS course_prerequisite CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS course_details CASCADE;
DROP TABLE IF EXISTS course_corequisite CASCADE;

DROP TYPE IF EXISTS degree CASCADE;
DROP TYPE IF EXISTS section_level CASCADE;
DROP TYPE IF EXISTS section_type CASCADE;
DROP TYPE IF EXISTS relation CASCADE;
DROP TYPE IF EXISTS teaching_method CASCADE;

CREATE TYPE degree AS ENUM ('BACHELOR', 'MASTER');
CREATE TYPE section_level AS ENUM ('UNIVERSITY', 'SCHOOL', 'PROGRAM');
CREATE TYPE section_type AS ENUM ('REQUIREMENT', 'ELECTIVE', 'REMEDIAL');
CREATE TYPE relation AS ENUM ('AND', 'OR');
CREATE TYPE teaching_method AS ENUM ('Face-to-face', 'Blended', 'Online');

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    credit_hours INT NOT NULL
);

CREATE TABLE course_details (
    course INT PRIMARY KEY,
    lecture_hours INT NOT NULL,
    practical_hours INT NOT NULL,
    teaching_method teaching_method NOT NULL,
    ects INT NOT NULL,
    description TEXT,
    FOREIGN KEY (course) REFERENCES course(id)
);

CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    degree degree NOT NULL,
    UNIQUE (code, degree)
);

CREATE TABLE course_prerequisite (
    course INT NOT NULL,
    prerequisite INT NOT NULL,
    relation relation NOT NULL,
    PRIMARY KEY (course, prerequisite),
    FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE course_corequisite (
	course INT NOT NULL,
	corequisite INT NOT NULL,
	PRIMARY KEY (course, corequisite),
	FOREIGN KEY (course) REFERENCES course(id) ON DELETE CASCADE,
	FOREIGN KEY (corequisite) REFERENCES course(id) ON DELETE CASCADE
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
    level section_level NOT NULL,
    type section_type NOT NULL,
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