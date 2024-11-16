CREATE TYPE prerequisite_relation AS ENUM ('AND', 'OR');

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    credit_hours INT,
    is_remedial BOOLEAN DEFAULT FALSE
);

CREATE TABLE course_prerequisite (
    course_id INT,
    prerequisite_id INT,
    relation prerequisite_relation,
    PRIMARY KEY (course_id, prerequisite_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE study_plan (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE semester (
    id SERIAL PRIMARY KEY,
    column_index INT,
    credit_hour_limit INT,
    study_plan_id INT,
    UNIQUE (column_index, study_plan_id),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    required_credit_hours INT,
    study_plan_id INT,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE section_course (
    id SERIAL PRIMARY KEY,
    section_id INT,
    course_id INT,
    UNIQUE (section_id, course_id),
    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE suggested_mapping (
    semester_id INT,
    section_course_id INT,
    row_index INT,
    UNIQUE (section_id, course_id),
    FOREIGN KEY (semester_id) REFERENCES semester(id) ON DELETE CASCADE,
    FOREIGN KEY (section_course_id) REFERENCES section_course(id) ON DELETE CASCADE
)

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    study_plan_id INT,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE SET NULL
);

CREATE TABLE student_mapping (
    student_id INT,
    semester_id INT,
    section_course_id INT,
    row_index INT,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
    FOREIGN KEY (semester_id) REFERENCES semester(id) ON DELETE CASCADE,
    FOREIGN KEY (section_course_id) REFERENCES section_course(id) ON DELETE CASCADE
);
