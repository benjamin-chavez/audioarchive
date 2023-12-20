--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cart_status_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cart_status_type AS ENUM (
    'active',
    'purchased',
    'archived',
    'abandoned'
);


ALTER TYPE public.cart_status_type OWNER TO postgres;

--
-- Name: eventstatustype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.eventstatustype AS ENUM (
    'pending',
    'processing',
    'processed',
    'failed'
);


ALTER TYPE public.eventstatustype OWNER TO postgres;

--
-- Name: key; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.key AS ENUM (
    'B Major',
    'F♯/G♭ Major',
    'D♭ Major',
    'A♭ Major',
    'E♭ Major',
    'B♭ Major',
    'F Major',
    'C Major',
    'G Major',
    'D Major',
    'A Major',
    'E Major',
    'A♭ Minor',
    'E♭ Minor',
    'B♭ Minor',
    'F Minor',
    'C Minor',
    'G Minor',
    'D Minor',
    'A Minor',
    'E Minor',
    'B Minor',
    'F♯/G♭ Minor',
    'D♭ Minor'
);


ALTER TYPE public.key OWNER TO postgres;

--
-- Name: productstatustype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.productstatustype AS ENUM (
    'draft',
    'published',
    'archived'
);


ALTER TYPE public.productstatustype OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    stripe_account_id character varying(255) NOT NULL,
    charges_enabled boolean DEFAULT false,
    payouts_enabled boolean DEFAULT false,
    details_submitted boolean DEFAULT false,
    default_account boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: app_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_users (
    id integer NOT NULL,
    auth_id character varying(255) NOT NULL,
    display_name character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    username character varying(255),
    email character varying(255),
    avatar_s3_key character varying(512) DEFAULT 'default-avatar-seed.webp'::character varying,
    avatar_s3_url character varying(512),
    spotify_id character varying(255),
    spotify_url character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.app_users OWNER TO postgres;

--
-- Name: app_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.app_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_users_id_seq OWNER TO postgres;

--
-- Name: app_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.app_users_id_seq OWNED BY public.app_users.id;


--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_items_id_seq OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    status public.cart_status_type DEFAULT 'active'::public.cart_status_type NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_id_seq OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    stripe_customer_id character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: daws; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daws (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.daws OWNER TO postgres;

--
-- Name: daws_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.daws_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.daws_id_seq OWNER TO postgres;

--
-- Name: daws_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.daws_id_seq OWNED BY public.daws.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    data json,
    source character varying(255),
    type character varying(255),
    processing_errors text,
    status public.eventstatustype NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genre_id_seq OWNER TO postgres;

--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    stripe_payment_intent_id character varying(255),
    payment_status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    stripe_checkout_session_id character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    app_user_id integer NOT NULL,
    account_id integer NOT NULL,
    genre_id integer,
    genre_name character varying(255),
    name character varying(255) NOT NULL,
    daw character varying(255) NOT NULL,
    bpm integer NOT NULL,
    price numeric(8,2) NOT NULL,
    status public.productstatustype DEFAULT 'draft'::public.productstatustype NOT NULL,
    img_s3_key character varying(512) DEFAULT 'default-album-artwork-seed.webp'::character varying,
    img_s3_url character varying(512),
    digital_file_s3_key character varying(512) DEFAULT 'ableton-audio-archive-demo-file-project-seed.zip'::character varying,
    digital_file_s3_url character varying(512),
    key character varying(255),
    label character varying(255),
    description text,
    stripe_product_id character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT products_bpm_check CHECK (((bpm >= 20) AND (bpm <= 999))),
    CONSTRAINT products_price_check CHECK ((price > (0)::numeric))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: app_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users ALTER COLUMN id SET DEFAULT nextval('public.app_users_id_seq'::regclass);


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: daws id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daws ALTER COLUMN id SET DEFAULT nextval('public.daws_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, app_user_id, stripe_account_id, charges_enabled, payouts_enabled, details_submitted, default_account, created_at, updated_at) FROM stdin;
1	2	acct_1OBsdHR8QsErjyla	t	t	t	t	2023-12-18 10:41:46.48-06	2023-12-18 10:41:46.48-06
2	3	acct_1OBsoPQvZQFMaerv	t	t	t	t	2023-12-18 10:41:46.48-06	2023-12-18 10:41:46.48-06
3	4	acct_1OBstLQpzpp1vjpb	t	t	t	t	2023-12-18 10:41:46.48-06	2023-12-18 10:41:46.48-06
\.


--
-- Data for Name: app_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_users (id, auth_id, display_name, first_name, last_name, username, email, avatar_s3_key, avatar_s3_url, spotify_id, spotify_url, created_at, updated_at) FROM stdin;
1	google-oauth2|100469702973978516051	Ben Chavez	Ben	Chavez	benjamin-chavez	ben.m.chavez@gmail.com	default-avatar-seed.webp	\N	6ip8Xbrp3hNeUxYd1T11j0	https://open.spotify.com/artist/6ip8Xbrp3hNeUxYd1T11j0	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
2	auth0|650caf196371a502e0233912	Amin Chavez	Amin	Chavez	amin-chavez	aminchavez.music@gmail.com	amin-chavez-avatar-seed.jpeg	\N	1HBoMknv2KI9eI7tTnb6vZ	https://open.spotify.com/artist/1HBoMknv2KI9eI7tTnb6vZ	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
3	auth0|6519fd529745d9c63c2975ae	KEEFE	Evan	Keefe	keefe	keefe.music@keefe.com	keefe-avatar-seed.webp	\N	4hXPtXUp0fPQZ2xpq3v8oU	https://open.spotify.com/artist/4hXPtXUp0fPQZ2xpq3v8oU	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
4	auth0|6519fe7fe51e9baa2524460d	Safety or Numbers	Nate	Pawelczyk	safety-or-numbers	router.music@router.com	default-avatar-seed.webp	\N	1QNgopvt8ILfNVIXGU8k6g	https://open.spotify.com/artist/1QNgopvt8ILfNVIXGU8k6g	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
5	auth0|6519fe7fe51e9baa2514460d	Nathaniel Pavel	Nathaniel	Pavel	nathaniel_pavel	router1.music@router.com	nathaniel_pavel-avatar-seed.jpg	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
6	auth0|15bc5778036ff1ddd3670124	AC Slater	AC	Slater	ac-slater	ac-slater@faker-mail.dev	ac-slater-avatar-seed.webp	\N	6EqFMCnVGBRNmwPlk2f3Uc	https://open.spotify.com/artist/6EqFMCnVGBRNmwPlk2f3Uc	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
7	auth0|d419ef8f8b97b027e13adefa	Aluna	Aluna		aluna	aluna@faker-mail.dev	aluna-avatar-seed.webp	\N	5ITI6SEoUZMIXXkzCfr4oE	https://open.spotify.com/artist/5ITI6SEoUZMIXXkzCfr4oE	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
8	auth0|926c18935acc534e5c0aaa22	Bassjackers	Bassjackers		bassjackers	bassjackers@faker-mail.dev	bassjackers-avatar-seed.webp	\N	6xQvQwZQQuq9R3TdPNbcR8	https://open.spotify.com/artist/6xQvQwZQQuq9R3TdPNbcR8	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
9	auth0|eaf3b0df387a1e36b7b407c4	Ben Miller (Aus)	Ben	Miller (Aus)	ben-miller-(aus)	ben-miller-(aus)@faker-mail.dev	ben-miller-(aus)-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
10	auth0|510a47a6d4e1bd0ca45e1c8e	Big Gigantic	Big	Gigantic	big-gigantic	big-gigantic@faker-mail.dev	big-gigantic-avatar-seed.webp	\N	7o7mC95EDbJKTcPAAs8C3r	https://open.spotify.com/artist/7o7mC95EDbJKTcPAAs8C3r	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
11	auth0|50dc989902800168a70b1131	Bleu Clair	Bleu	Clair	bleu-clair	bleu-clair@faker-mail.dev	bleu-clair-avatar-seed.webp	\N	7kA4sEagpoNK91I7wr9tYr	https://open.spotify.com/artist/7kA4sEagpoNK91I7wr9tYr	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
12	auth0|991fa169427748ec8126c2e5	Bondax	Bondax		bondax	bondax@faker-mail.dev	bondax-avatar-seed.webp	\N	4qobOrZpdUri80gScwsHfs	https://open.spotify.com/artist/4qobOrZpdUri80gScwsHfs	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
13	auth0|7cf7bcab8d5e475635a7f4d8	Borgore	Borgore		borgore	borgore@faker-mail.dev	borgore-avatar-seed.webp	\N	7u160I5qtBYZTQMLEIJmyz	https://open.spotify.com/artist/7u160I5qtBYZTQMLEIJmyz	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
14	auth0|18aa44482e736c130830a907	Carlos Pineda	Carlos	Pineda	carlos-pineda	carlos-pineda@faker-mail.dev	carlos-pineda-avatar-seed.webp	\N	4BZjuzM6DAcX8vXIZmQzrm	https://open.spotify.com/artist/4BZjuzM6DAcX8vXIZmQzrm	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
15	auth0|66565e43a28d76a430bbfa62	Cazztek	Cazztek		cazztek	cazztek@faker-mail.dev	cazztek-avatar-seed.webp	\N	3wRQD6UZWlaWEnbgpIEPPX	https://open.spotify.com/artist/3wRQD6UZWlaWEnbgpIEPPX	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
16	auth0|1faeeaaf1404628d35c5b134	Chet Porter	Chet	Porter	chet-porter	chet-porter@faker-mail.dev	chet-porter-avatar-seed.jpg	\N	1BjaGDkxwa2fb2pSCXlFXb	https://open.spotify.com/artist/1BjaGDkxwa2fb2pSCXlFXb	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
17	auth0|04aeb7dabc41508c50c33ecc	Chris Lake	Chris	Lake	chris-lake	chris-lake@faker-mail.dev	chris-lake-avatar-seed.webp	\N	5Igpc9iLZ3YGtKeYfSrrOE	https://open.spotify.com/artist/5Igpc9iLZ3YGtKeYfSrrOE	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
18	auth0|926ecf774777437776e2eb39	Christian Nielsen	Christian	Nielsen	christian-nielsen	christian-nielsen@faker-mail.dev	christian-nielsen-avatar-seed.webp	\N	482tFoPyYAl3JDPXHKGAQr	https://open.spotify.com/artist/482tFoPyYAl3JDPXHKGAQr	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
19	auth0|e05ca3bd8959dbf24bd014b7	Claude VonStroke	Claude	VonStroke	claude-vonstroke	claude-vonstroke@faker-mail.dev	claude-vonstroke-avatar-seed.webp	\N	5CYAFhywQTXdZmppCp0ukd	https://open.spotify.com/artist/5CYAFhywQTXdZmppCp0ukd	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
20	auth0|f6fb9703fe8b27b18f0ebf3c	Cloverdale	Cloverdale		cloverdale	cloverdale@faker-mail.dev	cloverdale-avatar-seed.webp	\N	27RdRVoIwtB1CAhLwuPrbB	https://open.spotify.com/artist/27RdRVoIwtB1CAhLwuPrbB	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
21	auth0|5a96977f7f6b7ea7207aa314	COLOR.LOVE	COLOR.LOVE		color.love	color.love@faker-mail.dev	color.love-avatar-seed.webp	\N	7hgwystBentJsSi5OwDTzh	https://open.spotify.com/artist/7hgwystBentJsSi5OwDTzh	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
22	auth0|2d0377391020d2b47f562e93	Curbi	Curbi		curbi	curbi@faker-mail.dev	curbi-avatar-seed.webp	\N	2XiiUuK68XNdHaHOAF5hnT	https://open.spotify.com/artist/2XiiUuK68XNdHaHOAF5hnT	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
23	auth0|722b7d4430b92a1643eec83b	Daniel Lesden	Daniel	Lesden	daniel-lesden	daniel-lesden@faker-mail.dev	daniel-lesden-avatar-seed.webp	\N	32iIlSWFsOBxdq5BaVHL8g	https://open.spotify.com/artist/32iIlSWFsOBxdq5BaVHL8g	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
24	auth0|8ef1c033d04f6a71548bfaa1	Darius (FR)	Darius	(FR)	darius-(fr)	darius-(fr)@faker-mail.dev	darius-(fr)-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
25	auth0|1a51700588a3a4a766ac2811	Denis Horvat	Denis	Horvat	denis-horvat	denis-horvat@faker-mail.dev	denis-horvat-avatar-seed.webp	\N	5eJJoSS6weFQeI9AtNFLee	https://open.spotify.com/artist/5eJJoSS6weFQeI9AtNFLee	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
26	auth0|c1c1bf57afebce0bd319b32a	Dillon Francis	Dillon	Francis	dillon-francis	dillon-francis@faker-mail.dev	dillon-francis-avatar-seed.webp	\N	5R3Hr2cnCCjt220Jmt2xLf	https://open.spotify.com/artist/5R3Hr2cnCCjt220Jmt2xLf	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
27	auth0|cec7599b0d5033ba893139ce	Disclosure	Disclosure		disclosure	disclosure@faker-mail.dev	disclosure-avatar-seed.webp	\N	6nS5roXSAGhTGr34W6n7Et	https://open.spotify.com/artist/6nS5roXSAGhTGr34W6n7Et	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
28	auth0|61f2daa1094935eea7c40ff4	DJ Rae	DJ	Rae	dj-rae	dj-rae@faker-mail.dev	dj-rae-avatar-seed.webp	\N	746LyYgFU6Gni4CMVPlFNa	https://open.spotify.com/artist/746LyYgFU6Gni4CMVPlFNa	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
29	auth0|477e7d60273c83a450659296	Dogma	Dogma		dogma	dogma@faker-mail.dev	dogma-avatar-seed.webp	\N	4R6XPuqGShFESRVkCePaxj	https://open.spotify.com/artist/4R6XPuqGShFESRVkCePaxj	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
30	auth0|3359fdfc2b8cf916c3f7f56c	Dom Dolla	Dom	Dolla	dom-dolla	dom-dolla@faker-mail.dev	dom-dolla-avatar-seed.webp	\N	205i7E8fNVfojowcQSfK9m	https://open.spotify.com/artist/205i7E8fNVfojowcQSfK9m	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
31	auth0|6e5ade55dfe5477c0be21bbe	Dr. Fresch	Dr.	Fresch	dr.-fresch	dr.-fresch@faker-mail.dev	dr.-fresch-avatar-seed.webp	\N	1htHgbGwgCWJBfGiQwcRqC	https://open.spotify.com/artist/1htHgbGwgCWJBfGiQwcRqC	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
32	auth0|d77f81c209fdafc427c238a9	DROELOE	DROELOE		droeloe	droeloe@faker-mail.dev	droeloe-avatar-seed.jpg	\N	0u18Cq5stIQLUoIaULzDmA	https://open.spotify.com/artist/0u18Cq5stIQLUoIaULzDmA	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
33	auth0|7d34920a23525e787350e47b	Dua Lipa	Dua	Lipa	dua-lipa	dua-lipa@faker-mail.dev	dua-lipa-avatar-seed.webp	\N	6M2wZ9GZgrQXHCFfjv46we	https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
34	auth0|32d0e7a433815511a1febb45	Echonomist	Echonomist		echonomist	echonomist@faker-mail.dev	echonomist-avatar-seed.webp	\N	3ujc8l2JVYwGgAPU7KRRl3	https://open.spotify.com/artist/3ujc8l2JVYwGgAPU7KRRl3	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
35	auth0|75e5494ff385956a3ad10433	Eleganto	Eleganto		eleganto	eleganto@faker-mail.dev	eleganto-avatar-seed.webp	\N	0MMdZHo4Jeldyg5awD2w5V	https://open.spotify.com/artist/0MMdZHo4Jeldyg5awD2w5V	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
36	auth0|dc01243e3e28fd7e54981244	Flume	Flume		flume	flume@faker-mail.dev	flume-avatar-seed.webp	\N	6nxWCVXbOlEVRexSbLsTer	https://open.spotify.com/artist/6nxWCVXbOlEVRexSbLsTer	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
37	auth0|71c97e24751538068748fafc	Four Tet	Four	Tet	four-tet	four-tet@faker-mail.dev	four-tet-avatar-seed.webp	\N	7Eu1txygG6nJttLHbZdQOh	https://open.spotify.com/artist/7Eu1txygG6nJttLHbZdQOh	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
38	auth0|f48cf655f578b74ed7da740b	Fred again..	Fred	again..	fred-again..	fred-again..@faker-mail.dev	fred-again..-avatar-seed.webp	\N	4oLeXFyACqeem2VImYeBFe	https://open.spotify.com/artist/4oLeXFyACqeem2VImYeBFe	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
39	auth0|c9dcf4ed19e28441a0e5d387	Georgie Riot	Georgie	Riot	georgie-riot	georgie-riot@faker-mail.dev	georgie-riot-avatar-seed.webp	\N	658we9fIJkrorlUIcDzsHi	https://open.spotify.com/artist/658we9fIJkrorlUIcDzsHi	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
40	auth0|ebb79126f743db04ddb7d64c	Ghedi	Ghedi		ghedi	ghedi@faker-mail.dev	ghedi-avatar-seed.webp	\N	0Lyny0hbx38TM6ZoXSCONO	https://open.spotify.com/artist/0Lyny0hbx38TM6ZoXSCONO	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
41	auth0|8430f213a0f43b48baa1c349	Green Velvet	Green	Velvet	green-velvet	green-velvet@faker-mail.dev	green-velvet-avatar-seed.webp	\N	3ABaec4jjl95VqmG1iD4k2	https://open.spotify.com/artist/3ABaec4jjl95VqmG1iD4k2	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
42	auth0|983420c8da8b4cbb22464ac8	G-Rex	G-Rex		g-rex	g-rex@faker-mail.dev	g-rex-avatar-seed.webp	\N	0ZpPLGn0OkRMl2Y9Twn16K	https://open.spotify.com/artist/0ZpPLGn0OkRMl2Y9Twn16K	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
43	auth0|38ef3f8dae1565b692c645a3	GRiZ	GRiZ		griz	griz@faker-mail.dev	griz-avatar-seed.webp	\N	25oLRSUjJk4YHNUsQXk7Ut	https://open.spotify.com/artist/25oLRSUjJk4YHNUsQXk7Ut	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
44	auth0|3a188af7443e7a24ba3ee995	Habstrakt	Habstrakt		habstrakt	habstrakt@faker-mail.dev	habstrakt-avatar-seed.webp	\N	1YYJxpOXYk1z1WtqdeLMkn	https://open.spotify.com/artist/1YYJxpOXYk1z1WtqdeLMkn	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
45	auth0|d713d46c84db8ef57b405f55	Hugel	Hugel		hugel	hugel@faker-mail.dev	hugel-avatar-seed.webp	\N	5PlfkPxwCpRRWQJBxCa0By	https://open.spotify.com/artist/5PlfkPxwCpRRWQJBxCa0By	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
46	auth0|f4c9fae5a9acade792e3de28	Ibranovski2	Ibranovski2		ibranovski2	ibranovski2@faker-mail.dev	ibranovski2-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
47	auth0|2ae31ad802e451355b224df3	Ibranovski	Ibranovski		ibranovski	ibranovski@faker-mail.dev	ibranovski-avatar-seed.webp	\N	5ASWBtbVe1yfxjrCuREQ4p	https://open.spotify.com/artist/5ASWBtbVe1yfxjrCuREQ4p	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
48	auth0|c18287c83a6c119e292da851	Jai Wolf	Jai	Wolf	jai-wolf	jai-wolf@faker-mail.dev	jai-wolf-avatar-seed.webp	\N	24V5UY0nChKpnb1TBPJhCw	https://open.spotify.com/artist/24V5UY0nChKpnb1TBPJhCw	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
49	auth0|63897d7c7a5bbde9d00e150b	Jauz	Jauz		jauz	jauz@faker-mail.dev	jauz-avatar-seed.webp	\N	5ttgIeUVka6FLyi00Uu5h8	https://open.spotify.com/artist/5ttgIeUVka6FLyi00Uu5h8	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
50	auth0|1b4bb1e4b3fb5cf1862184c7	Josh Butler	Josh	Butler	josh-butler	josh-butler@faker-mail.dev	josh-butler-avatar-seed.webp	\N	0EAlTKO2HfATH766bVH1rX	https://open.spotify.com/artist/0EAlTKO2HfATH766bVH1rX	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
51	auth0|5157f4011f87fd130aaf8c68	Julian Jordan	Julian	Jordan	julian-jordan	julian-jordan@faker-mail.dev	julian-jordan-avatar-seed.webp	\N	2vUCVkeZjzDcaoX4gagHdV	https://open.spotify.com/artist/2vUCVkeZjzDcaoX4gagHdV	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
52	auth0|65ce5ccb0221799c61b62085	Juliet Sikora	Juliet	Sikora	juliet-sikora	juliet-sikora@faker-mail.dev	juliet-sikora-avatar-seed.webp	\N	27dP6YOr1pGNXLpHRLjvYx	https://open.spotify.com/artist/27dP6YOr1pGNXLpHRLjvYx	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
53	auth0|e31fdda456402dcf9d6d4a0a	justin jay	justin	jay	justin-jay	justin-jay@faker-mail.dev	justin-jay-avatar-seed.jpg	\N	5k5eiijuHxrGwXp2Pz37GZ	https://open.spotify.com/artist/5k5eiijuHxrGwXp2Pz37GZ	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
54	auth0|6b89b4b2c13f42b65f6f4e8d	J. Worra	J.	Worra	j.-worra	j.-worra@faker-mail.dev	j.-worra-avatar-seed.webp	\N	4q0N3EI67tVnAeeaXbNQIj	https://open.spotify.com/artist/4q0N3EI67tVnAeeaXbNQIj	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
55	auth0|d9037cd13225936a77e675d3	Kasbo	Kasbo		kasbo	kasbo@faker-mail.dev	kasbo-avatar-seed.webp	\N	1ikID9RZZMvkuBGDWrqajq	https://open.spotify.com/artist/1ikID9RZZMvkuBGDWrqajq	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
56	auth0|cb62b5bdf8697ff7b162de4b	Kellie Allen	Kellie	Allen	kellie-allen	kellie-allen@faker-mail.dev	kellie-allen-avatar-seed.webp	\N	0ITmVPvWLd1t4emVerjKAt	https://open.spotify.com/artist/0ITmVPvWLd1t4emVerjKAt	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
57	auth0|a96bed71d217ce41b9e0f1cd	KREAM	KREAM		kream	kream@faker-mail.dev	kream-avatar-seed.webp	\N	0DdDnziut7wOo6cAYWVZC5	https://open.spotify.com/artist/0DdDnziut7wOo6cAYWVZC5	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
58	auth0|dc468265fe8d1a4465f5d14e	Kuzey	Kuzey		kuzey	kuzey@faker-mail.dev	kuzey-avatar-seed.webp	\N	5127XqkoJOqMOCAaJ3iSbz	https://open.spotify.com/artist/5127XqkoJOqMOCAaJ3iSbz	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
59	auth0|f777ada2edee893e6cced04f	Lady Bee	Lady	Bee	lady-bee	lady-bee@faker-mail.dev	lady-bee-avatar-seed.webp	\N	5WuoHUDzojO8oto22ahnwN	https://open.spotify.com/artist/5WuoHUDzojO8oto22ahnwN	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
60	auth0|7911ba642d18155f5517a350	Luxxury	Luxxury		luxxury	luxxury@faker-mail.dev	luxxury-avatar-seed.webp	\N	4Sq9t37DlFCE8XHF1brRCI	https://open.spotify.com/artist/4Sq9t37DlFCE8XHF1brRCI	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
61	auth0|c6658ef9430ccac2fd311540	MADVILLA	MADVILLA		madvilla	madvilla@faker-mail.dev	madvilla-avatar-seed.webp	\N	63zifEaDmILf5PAGyW0piG	https://open.spotify.com/artist/63zifEaDmILf5PAGyW0piG	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
62	auth0|d500da7169c08a557123e19c	Mall Grab	Mall	Grab	mall-grab	mall-grab@faker-mail.dev	mall-grab-avatar-seed.webp	\N	7yF6JnFPDzgml2Ytkyl5D7	https://open.spotify.com/artist/7yF6JnFPDzgml2Ytkyl5D7	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
63	auth0|18be995869a19eb69cc4ae06	manimal	manimal		manimal	manimal@faker-mail.dev	manimal-avatar-seed.jpg	\N	7goOwP4vH811Qt4yjmGMPM	https://open.spotify.com/artist/7goOwP4vH811Qt4yjmGMPM	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
64	auth0|ccbd164fe28a211d512624be	Marie Vaunt	Marie	Vaunt	marie-vaunt	marie-vaunt@faker-mail.dev	marie-vaunt-avatar-seed.webp	\N	50KydUSYhBFGorhAgUcrL5	https://open.spotify.com/artist/50KydUSYhBFGorhAgUcrL5	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
65	auth0|04a674b8d76e3e66feee81e0	MARTEN HØRGER	MARTEN	HØRGER	marten-hØrger	marten-hØrger@faker-mail.dev	marten-hØrger-avatar-seed.webp	\N	0EdUwJSqkMmsH6Agg3G8Ls	https://open.spotify.com/artist/0EdUwJSqkMmsH6Agg3G8Ls	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
66	auth0|54bc9d398256903160cf6802	Masteria	Masteria		masteria	masteria@faker-mail.dev	masteria-avatar-seed.webp	\N	5ydROmtpv230XlmkZI6LSD	https://open.spotify.com/artist/5ydROmtpv230XlmkZI6LSD	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
67	auth0|712b8c2ee4938241867437a5	Matroda	Matroda		matroda	matroda@faker-mail.dev	matroda-avatar-seed.webp	\N	45lcbTsX07JWzmTIjcdyBz	https://open.spotify.com/artist/45lcbTsX07JWzmTIjcdyBz	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
68	auth0|b8335feadb29f7bf4414373e	Meduza	Meduza		meduza	meduza@faker-mail.dev	meduza-avatar-seed.webp	\N	0xRXCcSX89eobfrshSVdyu	https://open.spotify.com/artist/0xRXCcSX89eobfrshSVdyu	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
69	auth0|c88488c5ef6e46d38ffb2b5c	Mija	Mija		mija	mija@faker-mail.dev	mija-avatar-seed.jpg	\N	1NpKmfDYMhw1KJIIUCsX4O	https://open.spotify.com/artist/1NpKmfDYMhw1KJIIUCsX4O	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
70	auth0|869adff5f9b595f69d90304e	Mike Williams	Mike	Williams	mike-williams	mike-williams@faker-mail.dev	mike-williams-avatar-seed.webp	\N	3IpvVrP3VLhruTmnququq7	https://open.spotify.com/artist/3IpvVrP3VLhruTmnququq7	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
71	auth0|a9ff33e5a3d355cbe6167b44	Miss Monique	Miss	Monique	miss-monique	miss-monique@faker-mail.dev	miss-monique-avatar-seed.webp	\N	29TpNOsTNYbLb6Xa10H0PR	https://open.spotify.com/artist/29TpNOsTNYbLb6Xa10H0PR	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
72	auth0|7ba1d2dd9bc27a70b5205047	MK	MK		mk	mk@faker-mail.dev	mk-avatar-seed.webp	\N	1yqxFtPHKcGcv6SXZNdyT9	https://open.spotify.com/artist/1yqxFtPHKcGcv6SXZNdyT9	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
73	auth0|abebd9def4bd698d3352d573	Moksi	Moksi		moksi	moksi@faker-mail.dev	moksi-avatar-seed.webp	\N	5jm3x1qIibWdKSEMw2G011	https://open.spotify.com/artist/5jm3x1qIibWdKSEMw2G011	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
74	auth0|6f5856047d62032401429cc5	Moore Kismet	Moore	Kismet	moore-kismet	moore-kismet@faker-mail.dev	moore-kismet-avatar-seed.jpg	\N	50uPj85gZxHFuFOlNBnnr5	https://open.spotify.com/artist/50uPj85gZxHFuFOlNBnnr5	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
75	auth0|1465eea54aa124978964d80c	Moxi	Moxi		moxi	moxi@faker-mail.dev	moxi-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
76	auth0|0391a86888d12c1c9547701b	Musumeci	Musumeci		musumeci	musumeci@faker-mail.dev	musumeci-avatar-seed.webp	\N	5AezOTggHnFTiQ5AiowFBf	https://open.spotify.com/artist/5AezOTggHnFTiQ5AiowFBf	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
77	auth0|d1940f20ecd6d0888d076ef9	Natty Lou	Natty	Lou	natty-lou	natty-lou@faker-mail.dev	natty-lou-avatar-seed.webp	\N	01iBGqeIP82ClBsWKXEW1O	https://open.spotify.com/artist/01iBGqeIP82ClBsWKXEW1O	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
78	auth0|c3b130af537a36d57dd637a2	Nikki Nair	Nikki	Nair	nikki-nair	nikki-nair@faker-mail.dev	nikki-nair-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
79	auth0|0fa370c988dd691170874250	NUZB	NUZB		nuzb	nuzb@faker-mail.dev	nuzb-avatar-seed.webp	\N	1whPdBCsbQv270FMoML1fa	https://open.spotify.com/artist/1whPdBCsbQv270FMoML1fa	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
80	auth0|55ffe71e486a517156d1ebdf	ODESZA	ODESZA		odesza	odesza@faker-mail.dev	odesza-avatar-seed.jpeg	\N	21mKp7DqtSNHhCAU2ugvUw	https://open.spotify.com/artist/21mKp7DqtSNHhCAU2ugvUw	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
81	auth0|3d84244e3fc32d4d310f27ee	peekaboo 3	peekaboo	3	peekaboo-3	peekaboo-3@faker-mail.dev	peekaboo-3-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
82	auth0|a314b98ef30182fdb00a12b5	PEEKABOO 	PEEKABOO		peekaboo-	peekaboo-@faker-mail.dev	peekaboo--avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
83	auth0|189fc663547b8c39aeef064e	PEEKABOO	PEEKABOO		peekaboo	peekaboo@faker-mail.dev	peekaboo-avatar-seed.webp	\N	4Ok1Cm5YX5StCQZgH0r2xF	https://open.spotify.com/artist/4Ok1Cm5YX5StCQZgH0r2xF	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
84	auth0|41e4e96f98aa8cd5c6d65e66	Phlegmatic Dogs	Phlegmatic	Dogs	phlegmatic-dogs	phlegmatic-dogs@faker-mail.dev	phlegmatic-dogs-avatar-seed.webp	\N	3g5Lhsq7cSJEK39BzKgIUe	https://open.spotify.com/artist/3g5Lhsq7cSJEK39BzKgIUe	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
85	auth0|dd58c35522044c17837abe74	Purple Disco Machine	Purple	Disco Machine	purple-disco-machine	purple-disco-machine@faker-mail.dev	purple-disco-machine-avatar-seed.jpg	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
86	auth0|1934b0fbf88af3d46772726a	Qlank	Qlank		qlank	qlank@faker-mail.dev	qlank-avatar-seed.jpg	\N	0oQ4s2gqzSvD7G1t97kO2y	https://open.spotify.com/artist/0oQ4s2gqzSvD7G1t97kO2y	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
87	auth0|46f329bfe65bcfc46965da6f	RL Grime	RL	Grime	rl-grime	rl-grime@faker-mail.dev	rl-grime-avatar-seed.jpeg	\N	5eIbEEQnDM8yuDVB0bimSP	https://open.spotify.com/artist/5eIbEEQnDM8yuDVB0bimSP	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
88	auth0|c66db7632034b85fd36e89e4	SAACHI	SAACHI		saachi	saachi@faker-mail.dev	saachi-avatar-seed.jpg	\N	4Gbsv1WfhPA5JxVdu1b4R7	https://open.spotify.com/artist/4Gbsv1WfhPA5JxVdu1b4R7	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
89	auth0|3142fa64e51e5bbc45852b9c	Sammy Porter	Sammy	Porter	sammy-porter	sammy-porter@faker-mail.dev	sammy-porter-avatar-seed.webp	\N	2D51qkOmTNsNQj3C4LIvH7	https://open.spotify.com/artist/2D51qkOmTNsNQj3C4LIvH7	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
90	auth0|6ca6e53d3179310fd2ac3398	San Holo	San	Holo	san-holo	san-holo@faker-mail.dev	san-holo-avatar-seed.webp	\N	0jNDKefhfSbLR9sFvcPLHo	https://open.spotify.com/artist/0jNDKefhfSbLR9sFvcPLHo	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
91	auth0|98c28634188a98bc4d45bc29	San Pacho	San	Pacho	san-pacho	san-pacho@faker-mail.dev	san-pacho-avatar-seed.jpg	\N	5jBerZvTAajwYvdxt3UhgU	https://open.spotify.com/artist/5jBerZvTAajwYvdxt3UhgU	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
92	auth0|b95495289077e6db5da39e73	Seleck	Seleck		seleck	seleck@faker-mail.dev	seleck-avatar-seed.webp	\N	1vEBgIDF0B0IpJMbUvLJzY	https://open.spotify.com/artist/1vEBgIDF0B0IpJMbUvLJzY	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
93	auth0|2c7c6da410002061a94b8476	SHELLS	SHELLS		shells	shells@faker-mail.dev	shells-avatar-seed.webp	\N	1ZwuShKjJItDJez0aDCsxN	https://open.spotify.com/artist/1ZwuShKjJItDJez0aDCsxN	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
94	auth0|ecb4d8838f990f95313f6956	Ship Wrek	Ship	Wrek	ship-wrek	ship-wrek@faker-mail.dev	ship-wrek-avatar-seed.webp	\N	1ic0FHNGIjXZAWH6O6Reif	https://open.spotify.com/artist/1ic0FHNGIjXZAWH6O6Reif	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
95	auth0|f655b45e102d2e2566949281	Slow Magic	Slow	Magic	slow-magic	slow-magic@faker-mail.dev	slow-magic-avatar-seed.webp	\N	3htNAy3vYWWYV8RZFeyRMT	https://open.spotify.com/artist/3htNAy3vYWWYV8RZFeyRMT	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
96	auth0|e1d7d875bc06e0f15b04699c	SMACK	SMACK		smack	smack@faker-mail.dev	smack-avatar-seed.webp	\N	5uJw4WCX5nYj4FHky9r1Ug	https://open.spotify.com/artist/5uJw4WCX5nYj4FHky9r1Ug	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
97	auth0|d1b6a62dcddff3b2cff254f7	Snakehips	Snakehips		snakehips	snakehips@faker-mail.dev	snakehips-avatar-seed.webp	\N	2FwJwEswyIUAljqgjNSHgP	https://open.spotify.com/artist/2FwJwEswyIUAljqgjNSHgP	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
98	auth0|77d0aa7034e5183f3993fe7d	Sonny Fodera	Sonny	Fodera	sonny-fodera	sonny-fodera@faker-mail.dev	sonny-fodera-avatar-seed.jpg	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
99	auth0|8046d2483d60f24392c74914	Space Motion	Space	Motion	space-motion	space-motion@faker-mail.dev	space-motion-avatar-seed.webp	\N	1k7iyyK6j5IJzF0cUMcaGY	https://open.spotify.com/artist/1k7iyyK6j5IJzF0cUMcaGY	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
100	auth0|7440ec6b7eb15a568fe33ae1	Subtronics	Subtronics		subtronics	subtronics@faker-mail.dev	subtronics-avatar-seed.webp	\N	3NJ94iuAmmMjbszODYT6pO	https://open.spotify.com/artist/3NJ94iuAmmMjbszODYT6pO	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
101	auth0|0c89f253089550e1c1396b8f	Sully	Sully		sully	sully@faker-mail.dev	sully-avatar-seed.webp	\N	1bFUHThVEOIixkg7pKJ6VK	https://open.spotify.com/artist/1bFUHThVEOIixkg7pKJ6VK	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
102	auth0|e18df22582c30f12c7ea2bc8	Taiki Nulight	Taiki	Nulight	taiki-nulight	taiki-nulight@faker-mail.dev	taiki-nulight-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
103	auth0|791cacf48ae08339a1a41314	Tchami	Tchami		tchami	tchami@faker-mail.dev	tchami-avatar-seed.webp	\N	1KpCi9BOfviCVhmpI4G2sY	https://open.spotify.com/artist/1KpCi9BOfviCVhmpI4G2sY	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
104	auth0|6e06a5836a43b84932c92098	The Chainsmokers	The	Chainsmokers	the-chainsmokers	the-chainsmokers@faker-mail.dev	the-chainsmokers-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
105	auth0|abc25280a7046f82326de3fe	The PDC	The	PDC	the-pdc	the-pdc@faker-mail.dev	the-pdc-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
106	auth0|2690c39004d50426f288dc62	Third Son	Third	Son	third-son	third-son@faker-mail.dev	third-son-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
107	auth0|9cdea42bdf1ddd3d6d4f7fbb	Tujamo	Tujamo		tujamo	tujamo@faker-mail.dev	tujamo-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
108	auth0|cf39674902dbb242c22928c0	Wax Motif	Wax	Motif	wax-motif	wax-motif@faker-mail.dev	wax-motif-avatar-seed.webp	\N	7zm3aSdmGiOkTt0aZFSO8R	https://open.spotify.com/artist/7zm3aSdmGiOkTt0aZFSO8R	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
109	auth0|69738c38cffb8725d7e846ab	What So Not	What	So Not	what-so-not	what-so-not@faker-mail.dev	what-so-not-avatar-seed.webp	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
110	auth0|cdbcae58e79417615933d9cb	Wuki	Wuki		wuki	wuki@faker-mail.dev	wuki-avatar-seed.webp	\N	6Se1y4vDcu9fVHLqdj1N3q	https://open.spotify.com/artist/6Se1y4vDcu9fVHLqdj1N3q	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
111	auth0|e7f7e8b2cccb03decb01c0ba	Zeds Dead	Zeds	Dead	zeds-dead	zeds-dead@faker-mail.dev	zeds-dead-avatar-seed.jpg	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
112	auth0|a2a265fb021c287ead6d9a77	ZHU	ZHU		zhu	zhu@faker-mail.dev	zhu-avatar-seed.jpg	\N	\N	\N	2023-12-18 10:41:46.475973-06	2023-12-18 10:41:46.475973-06
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, quantity, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, app_user_id, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, app_user_id, stripe_customer_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: daws; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daws (id, name) FROM stdin;
1	Ableton
2	FL_Studio
3	Logic
4	Bitwig
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, data, source, type, processing_errors, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name) FROM stdin;
1	Bass House
2	Breakbeat
3	Breaks
4	Deep House
5	UK Bass
6	dubstep
7	House
8	Pop
9	Techno
10	Trap
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20230902000000_create_daw_lookup_table.ts	1	2023-12-18 10:41:45.644-06
2	20230902000001_create_genre_enum.ts	1	2023-12-18 10:41:45.648-06
3	20230902000002_create-app-users-table.ts	1	2023-12-18 10:41:45.654-06
4	20231001000000_create_key_enum_type.ts	1	2023-12-18 10:41:45.655-06
5	20231001000001_create_accounts.ts	1	2023-12-18 10:41:45.66-06
6	20231001000002_create_products_table.ts	1	2023-12-18 10:41:45.666-06
7	20231106003352_create_events_table.ts	1	2023-12-18 10:41:45.668-06
8	20231107000000_create_carts.ts	1	2023-12-18 10:41:45.673-06
9	20231107000001_create_cart_items.ts	1	2023-12-18 10:41:45.676-06
10	20231111000000_create_orders.ts	1	2023-12-18 10:41:45.682-06
11	20231111000001_create_order_items.ts	1	2023-12-18 10:41:45.684-06
12	20231111000002_create_customers.ts	1	2023-12-18 10:41:45.688-06
13	20231218000000_create_text_search_vectors.ts	1	2023-12-18 10:41:45.688-06
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, app_user_id, stripe_payment_intent_id, payment_status, stripe_checkout_session_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, app_user_id, account_id, genre_id, genre_name, name, daw, bpm, price, status, img_s3_key, img_s3_url, digital_file_s3_key, digital_file_s3_url, key, label, description, stripe_product_id, created_at, updated_at) FROM stdin;
1	2	1	1	Bass House	The Look	Ableton	126	29.99	draft	amin-chavez-the-look-seed.jpg	\N	ableton-audio-archive-demo-file-project-seed.zip	\N		Seasonal Frequency	product description	\N	2023-12-18 10:41:46.482892-06	2023-12-18 10:41:46.482892-06
2	2	1	1	Bass House	Booty	Ableton	127	29.99	draft	amin-chavez-Booty-seed.png	\N	ableton-audio-archive-demo-file-project-seed.zip	\N			product description	\N	2023-12-18 10:41:46.484016-06	2023-12-18 10:41:46.484016-06
3	3	2	3	Breaks	Dred 84	Ableton	99	29.99	draft	keefe-dred-84-seed.webp	\N	ableton-audio-archive-demo-file-project-seed.zip	\N	F Minor	Hardcore Energy	product description	\N	2023-12-18 10:41:46.484892-06	2023-12-18 10:41:46.484892-06
4	3	2	9	Techno	Friction	Ableton	145	29.99	draft	keefe-friction-seed.webp	\N	ableton-audio-archive-demo-file-project-seed.zip	\N	F Major	Fantastic Voyage	product description	\N	2023-12-18 10:41:46.485938-06	2023-12-18 10:41:46.485938-06
5	3	2	7	House	Let Me - KEEFE Roller Mix	Ableton	135	29.99	draft	Keefe-let-me-seed.webp	\N	ableton-audio-archive-demo-file-project-seed.zip	\N	F Major	Vassnova	product description	\N	2023-12-18 10:41:46.486962-06	2023-12-18 10:41:46.486962-06
6	4	3	4	Deep House	Translation	Ableton	117	29.99	draft	safety-or-numbers-cohesionep-seed.jpg	\N	ableton-audio-archive-demo-file-project-seed.zip	\N	F Major	Vassnova	product description	\N	2023-12-18 10:41:46.487836-06	2023-12-18 10:41:46.487836-06
7	4	3	4	Deep House	Division	Ableton	120	29.99	draft	safety-or-numbers-cohesionep-seed.jpg	\N	ableton-audio-archive-demo-file-project-seed.zip	\N	F Major		product description	\N	2023-12-18 10:41:46.488707-06	2023-12-18 10:41:46.488707-06
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 3, true);


--
-- Name: app_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.app_users_id_seq', 112, true);


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, false);


--
-- Name: daws_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.daws_id_seq', 4, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 10, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 13, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 7, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_stripeaccountid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_stripeaccountid_unique UNIQUE (stripe_account_id);


--
-- Name: app_users app_users_auth_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_auth_id_unique UNIQUE (auth_id);


--
-- Name: app_users app_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_email_unique UNIQUE (email);


--
-- Name: app_users app_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_pkey PRIMARY KEY (id);


--
-- Name: app_users app_users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT app_users_username_unique UNIQUE (username);


--
-- Name: cart_items cart_items_cartid_productid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cartid_productid_unique UNIQUE (cart_id, product_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: customers customers_stripecustomerid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_stripecustomerid_unique UNIQUE (stripe_customer_id);


--
-- Name: daws daws_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daws
    ADD CONSTRAINT daws_name_unique UNIQUE (name);


--
-- Name: daws daws_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daws
    ADD CONSTRAINT daws_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: genre genre_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_name_unique UNIQUE (name);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_appuserid_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_appuserid_name_unique UNIQUE (app_user_id, name);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: accounts_appuserid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_appuserid_index ON public.accounts USING btree (app_user_id);


--
-- Name: accounts_defaultaccount_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX accounts_defaultaccount_index ON public.accounts USING btree (default_account);


--
-- Name: carts_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX carts_id_index ON public.carts USING btree (id);


--
-- Name: customers_stripecustomerid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX customers_stripecustomerid_index ON public.customers USING btree (stripe_customer_id);


--
-- Name: daws_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX daws_name_index ON public.daws USING btree (name);


--
-- Name: genre_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX genre_name_index ON public.genre USING btree (name);


--
-- Name: idx_unique_active_cart; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_unique_active_cart ON public.carts USING btree (app_user_id) WHERE (status = 'active'::public.cart_status_type);


--
-- Name: orders_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_id_index ON public.orders USING btree (id);


--
-- Name: orders_stripecheckoutsessionid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_stripecheckoutsessionid_index ON public.orders USING btree (stripe_checkout_session_id);


--
-- Name: orders_stripepaymentintentid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_stripepaymentintentid_index ON public.orders USING btree (stripe_payment_intent_id);


--
-- Name: accounts accounts_appuserid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_appuserid_foreign FOREIGN KEY (app_user_id) REFERENCES public.app_users(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_cartid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cartid_foreign FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- Name: cart_items cart_items_productid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_productid_foreign FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: carts carts_app_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_app_user_id_foreign FOREIGN KEY (app_user_id) REFERENCES public.app_users(id) ON DELETE CASCADE;


--
-- Name: customers customers_appuserid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_appuserid_foreign FOREIGN KEY (app_user_id) REFERENCES public.app_users(id);


--
-- Name: order_items order_items_orderid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_orderid_foreign FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_productid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_productid_foreign FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_appuserid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_appuserid_foreign FOREIGN KEY (app_user_id) REFERENCES public.app_users(id);


--
-- Name: products products_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_account_id_foreign FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE RESTRICT;


--
-- Name: products products_appuserid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_appuserid_foreign FOREIGN KEY (app_user_id) REFERENCES public.app_users(id) ON DELETE CASCADE;


--
-- Name: products products_genre_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_genre_id_foreign FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE SET NULL;


--
-- Name: products products_genre_name_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_genre_name_foreign FOREIGN KEY (genre_name) REFERENCES public.genre(name) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

