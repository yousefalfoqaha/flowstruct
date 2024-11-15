CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE prerequisite_relation AS ENUM ('AND', 'OR');

CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    credit_hours INT,
    is_remedial BOOLEAN DEFAULT FALSE
);

CREATE TABLE prerequisite (
    course_id INT,
    requisite_id INT,
    relation prerequisite_relation,
    PRIMARY KEY (course_id, requisite_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (requisite_id) REFERENCES course(id) ON DELETE CASCADE
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
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE semester_whitelist (
    semester_id INT,
    course_id INT,
    PRIMARY KEY (semester_id, course_id),
    FOREIGN KEY (semester_id) REFERENCES semester(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
)

CREATE TABLE section (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    required_credit_hours INT,
    study_plan_id INT,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE section_course (
    section_id INT,
    course_id INT,
    whitelisted_semester_id INT
    PRIMARY KEY (section_id, course_id),
    FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (whitelisted_semester_id) REFERENCES semester(id) ON DELETE CASCADE
);

CREATE TABLE flowsheet (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_suggested BOOLEAN DEFAULT FALSE,
    study_plan_id INT,
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(id) ON DELETE CASCADE
);

CREATE TABLE course_mapping (
    id SERIAL PRIMARY KEY,
    flowsheet_uuid UUID,
    semester_id INT,
    course_id INT,
    FOREIGN KEY (flowsheet_uuid) REFERENCES flowsheet(uuid) ON DELETE CASCADE,
    FOREIGN KEY (semester_id) REFERENCES semester(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);
