--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: course_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.course_type AS ENUM (
    'F2F',
    'BLD',
    'OL'
);


ALTER TYPE public.course_type OWNER TO postgres;

--
-- Name: degree; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.degree AS ENUM (
    'Bachelor',
    'Master',
    'BSc',
    'BA'
);


ALTER TYPE public.degree OWNER TO postgres;

--
-- Name: german_track; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.german_track AS ENUM (
    'B1',
    'B2'
);


ALTER TYPE public.german_track OWNER TO postgres;

--
-- Name: relation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.relation AS ENUM (
    'AND',
    'OR'
);


ALTER TYPE public.relation OWNER TO postgres;

--
-- Name: section_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.section_level AS ENUM (
    'University',
    'School',
    'Program'
);


ALTER TYPE public.section_level OWNER TO postgres;

--
-- Name: section_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.section_type AS ENUM (
    'Requirement',
    'Elective',
    'Remedial'
);


ALTER TYPE public.section_type OWNER TO postgres;

--
-- Name: CAST (character varying AS public.course_type); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.course_type) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.degree); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.degree) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.relation); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.relation) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.section_level); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.section_level) WITH INOUT AS IMPLICIT;


--
-- Name: CAST (character varying AS public.section_type); Type: CAST; Schema: -; Owner: -
--

CREATE CAST (character varying AS public.section_type) WITH INOUT AS IMPLICIT;


--
-- Name: add_corequisite(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_corequisite(course_code character varying, corequisite_code character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    course_id INT;
    corequisite_id INT;
BEGIN
    SELECT id INTO course_id
    FROM course
    WHERE code = course_code;

    SELECT id INTO corequisite_id
    FROM course
    WHERE code = corequisite_code;

    IF course_id IS NULL THEN
        RAISE EXCEPTION 'Course with code % does not exist.', course_code;
    END IF;

    IF corequisite_id IS NULL THEN
        RAISE EXCEPTION 'Corequisite course with code % does not exist.', corequisite_code;
    END IF;

    BEGIN
        INSERT INTO course_corequisite (course, corequisite)
        VALUES (course_id, corequisite_id);
    EXCEPTION WHEN unique_violation THEN
        RAISE NOTICE 'Corequisite % for course % already exists.', corequisite_code, course_code;
    END;
END;
$$;


ALTER FUNCTION public.add_corequisite(course_code character varying, corequisite_code character varying) OWNER TO postgres;

--
-- Name: add_prerequisite(character varying, character varying, public.relation); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_prerequisite(course_code character varying, prerequisite_code character varying, relation public.relation) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    course_id INT;
    prerequisite_id INT;
BEGIN
    SELECT id INTO course_id
    FROM course
    WHERE code = course_code;

    SELECT id INTO prerequisite_id
    FROM course
    WHERE code = prerequisite_code;

    IF course_id IS NULL THEN
        RAISE EXCEPTION 'Course with code % does not exist.', course_code;
    END IF;

    IF prerequisite_id IS NULL THEN
        RAISE EXCEPTION 'Prerequisite course with code % does not exist.', prerequisite_code;
    END IF;

    BEGIN
        INSERT INTO course_prerequisite (course, prerequisite, relation)
        VALUES (course_id, prerequisite_id, relation);
    EXCEPTION WHEN unique_violation THEN
        RAISE NOTICE 'Prerequisite % for course % already exists.', prerequisite_code, course_code;
    END;
END;
$$;


ALTER FUNCTION public.add_prerequisite(course_code character varying, prerequisite_code character varying, relation public.relation) OWNER TO postgres;

--
-- Name: add_section_course(integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_section_course(section_id integer, course_code character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    course_id INT;
BEGIN
    SELECT id INTO course_id FROM course WHERE code = course_code;

    INSERT INTO section_course (section, course)
    VALUES (section_id, course_id);
END;
$$;


ALTER FUNCTION public.add_section_course(section_id integer, course_code character varying) OWNER TO postgres;

--
-- Name: create_course(character varying, character varying, integer, integer, integer, integer, public.course_type); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_course(p_code character varying, p_name character varying, p_credit_hours integer, p_ects integer, p_lecture_hours integer, p_practical_hours integer, p_type public.course_type) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    course_id INT;
BEGIN
    SELECT id INTO course_id
    FROM course
    WHERE code = p_code;

    IF course_id IS NOT NULL THEN
        RAISE NOTICE 'Course with code % already exists, skipping.', p_code;
        RETURN;
    END IF;

    INSERT INTO course (code, name, credit_hours, ects, lecture_hours, practical_hours, type) 
    VALUES (p_code, p_name, p_credit_hours, p_ects, p_lecture_hours, p_practical_hours, p_type);

END;
$$;


ALTER FUNCTION public.create_course(p_code character varying, p_name character varying, p_credit_hours integer, p_ects integer, p_lecture_hours integer, p_practical_hours integer, p_type public.course_type) OWNER TO postgres;

--
-- Name: get_section_courses(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_section_courses(section_id integer) RETURNS TABLE(course_code character varying, course_name character varying)
    LANGUAGE sql
    AS $$
    SELECT
        c.code AS course_code,
        c.name AS course_name
    FROM
        section_course sc
    INNER JOIN
        course c ON sc.course = c.id
    WHERE
        sc.section = section_id;
$$;


ALTER FUNCTION public.get_section_courses(section_id integer) OWNER TO postgres;

--
-- Name: import_courses(text); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.import_courses(IN csv_path text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    course_record RECORD;
BEGIN
    CREATE TEMP TABLE temp_courses (
        code VARCHAR(255),
        name VARCHAR(255),
        credit_hours INT,
		ects INT,
        lecture_hours INT,
        practical_hours INT,
        type course_type
    );
    
    EXECUTE 'COPY temp_courses FROM ' || quote_literal(csv_path) || ' WITH (FORMAT csv, HEADER true)';

    FOR course_record IN SELECT * FROM temp_courses
    LOOP
        PERFORM create_course(
            course_record.code,
            course_record.name,
            course_record.credit_hours,
			course_record.ects,
            course_record.lecture_hours,
            course_record.practical_hours,
            course_record.type::course_type
        );
    END LOOP;
    
    DROP TABLE temp_courses;
    
    RAISE NOTICE 'Course import completed successfully';
EXCEPTION
    WHEN OTHERS THEN
        DROP TABLE IF EXISTS temp_courses;
        RAISE EXCEPTION 'Error importing courses: %', SQLERRM;
END;
$$;


ALTER PROCEDURE public.import_courses(IN csv_path text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    credit_hours integer NOT NULL,
    ects integer NOT NULL,
    lecture_hours integer NOT NULL,
    practical_hours integer NOT NULL,
    type public.course_type NOT NULL,
    is_remedial boolean DEFAULT false,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: course_corequisite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_corequisite (
    study_plan integer NOT NULL,
    course integer NOT NULL,
    corequisite integer NOT NULL
);


ALTER TABLE public.course_corequisite OWNER TO postgres;

--
-- Name: course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_id_seq OWNER TO postgres;

--
-- Name: course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_id_seq OWNED BY public.course.id;


--
-- Name: course_placement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_placement (
    study_plan integer NOT NULL,
    course integer NOT NULL,
    year integer NOT NULL,
    semester integer NOT NULL,
    "position" integer DEFAULT 1 NOT NULL,
    span integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.course_placement OWNER TO postgres;

--
-- Name: course_prerequisite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_prerequisite (
    study_plan integer NOT NULL,
    course integer NOT NULL,
    prerequisite integer NOT NULL,
    relation public.relation
);


ALTER TABLE public.course_prerequisite OWNER TO postgres;

--
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    id integer NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    degree public.degree NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.program OWNER TO postgres;

--
-- Name: program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_id_seq OWNER TO postgres;

--
-- Name: program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.program_id_seq OWNED BY public.program.id;


--
-- Name: section; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section (
    id integer NOT NULL,
    level public.section_level NOT NULL,
    type public.section_type NOT NULL,
    required_credit_hours integer NOT NULL,
    name character varying(255),
    "position" integer DEFAULT 0,
    study_plan integer NOT NULL
);


ALTER TABLE public.section OWNER TO postgres;

--
-- Name: section_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_course (
    section integer NOT NULL,
    course integer NOT NULL
);


ALTER TABLE public.section_course OWNER TO postgres;

--
-- Name: section_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.section_id_seq OWNER TO postgres;

--
-- Name: section_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.section_id_seq OWNED BY public.section.id;


--
-- Name: study_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.study_plan (
    id integer NOT NULL,
    year integer NOT NULL,
    track character varying(255),
    program integer NOT NULL,
    is_published boolean DEFAULT false,
    duration integer DEFAULT 1,
    version bigint DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.study_plan OWNER TO postgres;

--
-- Name: study_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.study_plan_id_seq OWNER TO postgres;

--
-- Name: study_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_plan_id_seq OWNED BY public.study_plan.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course ALTER COLUMN id SET DEFAULT nextval('public.course_id_seq'::regclass);


--
-- Name: program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program ALTER COLUMN id SET DEFAULT nextval('public.program_id_seq'::regclass);


--
-- Name: section id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section ALTER COLUMN id SET DEFAULT nextval('public.section_id_seq'::regclass);


--
-- Name: study_plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plan ALTER COLUMN id SET DEFAULT nextval('public.study_plan_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, code, name, credit_hours, ects, lecture_hours, practical_hours, type, is_remedial, version, created_at, updated_at) FROM stdin;
19	SFTS101	Soft Skills	3	3	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
20	BE302	Business Entrepreneurship	3	3	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
21	TW303	Technical and Workplace Writing	3	3	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
23	GERL201B2	German III B2-Track	3	4	6	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
24	GERL202B1	German IV B1-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
25	GERL202B2	German IV B2-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
27	MATH102	Calculus II	3	5	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
39	IE0121	Probability and Statistics	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
40	CS201	Discrete Structures	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
41	CE201	Computer Architecture and Organization	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
42	CS222	Theory of Algorithms	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
43	CS223	Data Structures	3	0	2	2	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
44	CS264	Visual Programming	3	0	2	2	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
45	CS263	Database Management Systems	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
46	CS323	Computational Theory	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
47	CS342	Software Engineering	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
48	CE352	Computer Networks	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
49	CS355	Web Technologies	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
50	CS356	Information Security	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
51	CE357	Operating Systems	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
52	CE3570	Operating Systems Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
54	CS416	Systems Programming	3	0	2	2	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
55	CS451	Artificial Intelligence	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
58	CS330	Image Understanding	3	0	2	2	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
59	CS332	Computer Graphics	3	0	2	2	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
60	CS419	Compiler Construction	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
61	CS477	Mobile Computing	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
62	CS333	Game Programming	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
63	CS357	Cybersecurity	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
64	CS358	Multimedia Systems Design	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
65	CS359	Internet of Things	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
66	CS364	Information Retrieval	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
67	CS365	Systems Analysis and Design	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
68	CS371	Bioinformatics	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
69	CS430	Virtual and Augmented Reality	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
70	CS432	Scientific Visualization	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
71	CS439	Computer Animation	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
72	CS450	Operations Optimization	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
73	CS457	Decision Support Systems and Intelligent Systems	3	0	2	2	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
74	CS458	Wireless Networks	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
75	CS460	Data Mining	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
76	CS462	Database Design	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
77	CS481	Special Topics in Computer Graphics	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
78	CS482	Special Topics in Software Engineering	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
79	CS484	Special Topics in Database Technologies and Applications	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
80	CS489	Special Topics in Algorithms	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
81	CS4512	Natural Language Processing	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
82	CS4811	Special Topics in Data Science Technologies and Applications	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
83	CS4831	Special Topics in Applied Computer Science	1	0	1	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
84	CS4832	Special Topics in Applied Computer Science	2	0	2	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
85	CS4833	Special Topics in Applied Computer Science	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
32	CE212	Digital Systems	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
8	GERL101B1	German I B1-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
9	GERL102B1	German II B1-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
10	GERL102B2	German II B2-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
11	MILS100	Military Science	3	2	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
12	NE101	National Education	3	2	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
13	NEE101	National Education in English	3	2	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
28	CS116	Computing Fundamentals	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
29	CS1160	Computing Fundamentals Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
30	CS117	Object-Oriented Programming	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
33	CE2120	Digital Systems Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
34	EE317	Linear Algebra	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
35	GERL301B1	German V B1-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
36	GERL301B2	German V B2-Track	3	6	9	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
37	GERL302B1	German VI B1-Track	3	6	6	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
38	GERL302B2	German VI B2-Track	3	6	6	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
2	ENGL0098	Elementary English	3	3	3	0	F2F	t	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
3	ENGL0099	Intermediate English	3	3	3	0	F2F	t	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
4	MATH0099	Pre-Math	3	3	3	0	OL	t	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
31	CS1170	Object-Oriented Programming Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
86	CE4208	Aerial Drones	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
87	CE331	Signals and Systems	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
88	CE342	Microprocesser and Microcomputer Systems	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
89	CE3420	Microprocessor and Microcomputer Systems Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
90	CE354	Computer Security	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
91	CE355	Data Communication	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
92	CE3561	Computer Networks Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
93	CE377	Machine Learning	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
22	GERL201B1	German III B1-Track	3	4	6	0	F2F	f	1	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
6	ENGL1001	Upper-Intermediate English	3	3	3	0	F2F	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
7	ENGL1002	Advanced English	3	3	3	0	F2F	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
14	DES101	Arts' Appreciation	3	3	3	0	OL	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
16	IC101	Intercultural Communications	3	3	3	0	F2F	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
17	PE101	Sports and Health	3	3	3	0	F2F	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
26	MATH101	Calculus I	3	5	3	0	BLD	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
18	SE301	Social Entrepreneurship and Enterprises	3	3	3	0	F2F	f	1	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
1	ARB0099	Elementary Arabic	3	3	3	0	OL	t	2	2025-06-02 18:03:12.007097+03	2025-06-03 07:36:23.308111+03
94	MATH203	Applied Mathematics for Engineers	3	5	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
95	EE343	Digital Electronics	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
96	CE461	Image Processing	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
97	EE570	Cloud Computing and Big Data	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
98	MATH205	Differential Equations	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
99	ENE2111	Fundamentals of Electrical Circuits	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
100	PHYS104	Physics II	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
101	PHYS103	Physics I	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
102	EE241	Electronics I	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
103	EE2410	Electronics I Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
104	EE315	Probability, Statistics, and Random Processes	3	0	3	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
105	IE0141	Engineering Workshop	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
106	ENE213	Electrical Circuits Lab	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
107	CE452	Network Protocols	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
108	CE561	Deep Learning	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
109	DS101	Dual Study Practical I	3	3	0	40	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
110	DS201	Dual Study Practical II	3	3	0	40	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
111	DS301	Dual Study Practical III	0	6	0	40	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
112	COURSE101	Course I	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
113	BM371	Numerical Methods for Engineers	3	0	2	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
114	BM3710	Numerical Methods for Engineers Lab	0	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
115	CS491	International Internship (20 weeks)	12	0	40	40	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
116	CS391	Field Training	0	0	0	40	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
119	ME0577	Automation and Industry 4,0	3	7	2	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
5	ARB100	Arabic	3	3	3	0	OL	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
15	EI101	Leadership and Emotional Intelligence	3	3	3	0	F2F	f	2	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
129	GYM101	Gymnastics	1	0	0	6	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
130	WAR101	Warhammer	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
131	CE367	Operating Systems (Cousin)	3	0	3	0	F2F	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
132	NOTFOUND101	Not Found I	1	0	0	3	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
133	CS492	Senior Project	3	0	0	9	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
134	CS355-DS	Web Technologies	3	0	2	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
135	CS263-DS	Database Management Systems	3	0	2	0	BLD	f	0	2025-06-02 18:03:12.007097+03	2025-06-02 18:03:12.007097+03
\.


--
-- Data for Name: course_corequisite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_corequisite (study_plan, course, corequisite) FROM stdin;
1	33	32
1	34	27
1	52	51
1	31	30
\.


--
-- Data for Name: course_placement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_placement (study_plan, course, year, semester, "position", span) FROM stdin;
1	5	1	1	5	1
1	133	3	2	2	1
1	6	1	1	1	1
1	134	2	3	2	1
1	7	3	2	3	1
1	135	1	3	2	1
1	8	1	1	2	1
1	9	1	2	1	1
1	11	2	2	3	1
1	12	1	2	2	1
1	22	2	1	3	1
1	24	2	2	1	1
1	26	1	1	6	1
1	27	1	2	6	1
1	28	1	1	3	1
1	29	1	1	4	1
1	30	1	2	3	1
1	31	1	2	4	1
1	32	1	2	7	1
1	33	1	2	8	1
1	34	2	1	5	1
1	35	3	1	1	1
1	37	3	2	1	1
1	39	2	2	2	1
1	40	1	2	5	1
1	41	2	1	4	1
1	42	2	1	2	1
1	43	2	1	1	1
1	44	2	2	4	1
1	109	1	3	1	3
1	46	3	1	2	1
1	110	2	3	1	3
1	47	2	2	5	1
1	111	3	3	1	3
1	48	3	1	4	1
1	50	3	2	5	1
1	51	3	1	5	1
1	115	4	2	1	5
1	116	3	2	6	1
1	52	3	1	6	1
1	54	3	2	7	1
1	55	2	2	6	1
1	58	3	2	4	1
1	59	3	1	3	1
1	60	3	1	7	1
1	61	3	2	8	1
\.


--
-- Data for Name: course_prerequisite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_prerequisite (study_plan, course, prerequisite, relation) FROM stdin;
1	44	30	AND
1	46	42	AND
1	46	43	AND
1	47	30	AND
1	48	41	AND
1	51	41	AND
1	52	41	AND
1	54	43	AND
1	55	42	AND
1	55	43	AND
1	58	43	AND
1	58	34	AND
1	59	43	AND
1	59	34	AND
1	60	42	AND
1	60	43	AND
1	61	30	AND
1	110	109	AND
1	111	110	AND
1	134	30	AND
1	134	135	AND
1	135	30	AND
1	30	28	AND
1	31	28	AND
1	41	32	AND
1	7	6	AND
1	9	8	AND
1	32	28	AND
1	33	28	AND
1	34	26	AND
1	22	9	AND
1	24	22	AND
1	27	26	AND
1	35	24	AND
1	37	35	AND
1	39	26	AND
1	42	28	AND
1	42	40	AND
1	43	28	AND
\.


--
-- Data for Name: program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program (id, code, name, degree, version, created_at, updated_at) FROM stdin;
1	CS	Computer Science	BSc	7	2025-06-02 18:03:07.71742+03	2025-06-02 20:31:41.112788+03
\.


--
-- Data for Name: section; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section (id, level, type, required_credit_hours, name, "position", study_plan) FROM stdin;
58	University	Requirement	9	Dual Studies	2	1
11	Program	Requirement	12	Special Courses for the General Track	2	1
7	Program	Requirement	81	\N	1	1
4	School	Requirement	27	\N	0	1
2	University	Requirement	21	\N	1	1
\.


--
-- Data for Name: section_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_course (section, course) FROM stdin;
58	109
58	110
58	111
11	58
11	59
11	60
11	61
7	35
7	133
7	37
7	134
7	39
7	135
7	40
7	41
7	42
7	43
7	44
7	46
7	47
7	48
7	50
7	51
7	115
7	52
7	116
7	54
7	55
4	32
4	33
4	34
4	22
4	24
4	26
4	27
4	28
4	29
4	30
4	31
2	5
2	6
2	7
2	8
2	9
2	11
2	12
2	13
\.


--
-- Data for Name: study_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.study_plan (id, year, track, program, is_published, duration, version, created_at, updated_at) FROM stdin;
1	2023	General Track (Dual Studies)	1	f	4	2230	2025-06-02 18:03:00.950125+03	2025-06-04 15:21:15.504428+03
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password) FROM stdin;
1	admin	$2a$10$G53D6YBcp8ZLhr8yuxGGOuTVRe3FrjzG.WwtDd40d7XYBN0o01W2y
\.


--
-- Name: course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_id_seq', 136, true);


--
-- Name: program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_id_seq', 102, true);


--
-- Name: section_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.section_id_seq', 58, true);


--
-- Name: study_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.study_plan_id_seq', 84, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: course course_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_code_key UNIQUE (code);


--
-- Name: course_corequisite course_corequisite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_corequisite
    ADD CONSTRAINT course_corequisite_pkey PRIMARY KEY (study_plan, course, corequisite);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);


--
-- Name: course_placement course_placement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_placement
    ADD CONSTRAINT course_placement_pkey PRIMARY KEY (study_plan, course);


--
-- Name: course_prerequisite course_prerequisite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisite
    ADD CONSTRAINT course_prerequisite_pkey PRIMARY KEY (study_plan, course, prerequisite);


--
-- Name: program program_code_degree_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_code_degree_key UNIQUE (code, degree);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);


--
-- Name: section_course section_course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course
    ADD CONSTRAINT section_course_pkey PRIMARY KEY (section, course);


--
-- Name: section section_level_type_position_study_plan_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section
    ADD CONSTRAINT section_level_type_position_study_plan_key UNIQUE (level, type, "position", study_plan);


--
-- Name: section section_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section
    ADD CONSTRAINT section_pkey PRIMARY KEY (id);


--
-- Name: study_plan study_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plan
    ADD CONSTRAINT study_plan_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: course_corequisite course_corequisite_corequisite_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_corequisite
    ADD CONSTRAINT course_corequisite_corequisite_fkey FOREIGN KEY (corequisite) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: course_corequisite course_corequisite_course_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_corequisite
    ADD CONSTRAINT course_corequisite_course_fkey FOREIGN KEY (course) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: course_placement course_placement_course_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_placement
    ADD CONSTRAINT course_placement_course_fkey FOREIGN KEY (course) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: course_prerequisite course_prerequisite_course_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisite
    ADD CONSTRAINT course_prerequisite_course_fkey FOREIGN KEY (course) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: course_prerequisite course_prerequisite_prerequisite_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisite
    ADD CONSTRAINT course_prerequisite_prerequisite_fkey FOREIGN KEY (prerequisite) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: section_course section_course_course_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course
    ADD CONSTRAINT section_course_course_fkey FOREIGN KEY (course) REFERENCES public.course(id) ON DELETE CASCADE;


--
-- Name: study_plan study_plan_program_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.study_plan
    ADD CONSTRAINT study_plan_program_fkey FOREIGN KEY (program) REFERENCES public.program(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

