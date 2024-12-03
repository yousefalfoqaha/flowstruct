DROP TABLE IF EXISTS study_plan CASCADE;
DROP TABLE IF EXISTS section_course CASCADE;
DROP TABLE IF EXISTS section CASCADE;
DROP TABLE IF EXISTS course_prerequisite CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS program CASCADE;
DROP TABLE IF EXISTS guide CASCADE;
DROP TABLE IF EXISTS guide_course CASCADE;

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
    degree VARCHAR(255),
    UNIQUE (name, degree)
);

CREATE TABLE course_prerequisite (
    course INT NOT NULL,
    prerequisite INT NOT NULL,
    relation VARCHAR(255),
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
    FOREIGN KEY (program) REFERENCES program(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    level section_level_enum NOT NULL,
    type section_type_enum NOT NULL,
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

CREATE TABLE guide (
    id SERIAL PRIMARY KEY,
    study_plan INT NOT NULL,
    FOREIGN KEY (study_plan) REFERENCES study_plan(id)
);

CREATE TABLE guide_course (
    course INT NOT NULL,
    year INT NOT NULL,
    semester VARCHAR(255) NOT NULL,
    guide INT NOT NULL,
    FOREIGN KEY (guide) REFERENCES guide(id)
);