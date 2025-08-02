ALTER TABLE program
    ADD COLUMN status VARCHAR(255) DEFAULT ('DRAFT') NOT NULL,
    ADD COLUMN draft  JSONB;

ALTER TABLE study_plan
DROP
COLUMN is_published,
    ADD COLUMN status VARCHAR(255) DEFAULT ('DRAFT') NOT NULL,
    ADD COLUMN draft  JSONB;

ALTER TABLE course
    ADD COLUMN status VARCHAR(255) DEFAULT ('DRAFT') NOT NULL,
    ADD COLUMN draft  JSONB;

CREATE TABLE publish_request
(
    id           SERIAL PRIMARY KEY,
    status       VARCHAR(255),
    message      TEXT,
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW()),
    requested_by INT,
    FOREIGN KEY (requested_by) REFERENCES "user" (id)
);

CREATE TABLE publish_request_program
(
    publish_request INT NOT NULL,
    program         INT NOT NULL,
    PRIMARY KEY (publish_request, program),
    FOREIGN KEY (program) REFERENCES program (id)
);

CREATE TABLE publish_request_study_plan
(
    publish_request INT NOT NULL,
    study_plan      INT NOT NULL,
    PRIMARY KEY (publish_request, study_plan),
    FOREIGN KEY (study_plan) REFERENCES study_plan (id)
);

CREATE TABLE publish_request_course
(
    publish_request INT NOT NULL,
    course          INT NOT NULL,
    PRIMARY KEY (publish_request, course),
    FOREIGN KEY (course) REFERENCES course (id)
);
