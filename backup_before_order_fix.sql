--
-- PostgreSQL database dump
--

\restrict O9ABU3bm1aRNCwTueOh2ig5OBwrhbxDp810TRea1DkVcA1dexdGAZ22SGEmlyEz

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

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
-- Name: DayOfWeek; Type: TYPE; Schema: public; Owner: appuser
--

CREATE TYPE public."DayOfWeek" AS ENUM (
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
);


ALTER TYPE public."DayOfWeek" OWNER TO appuser;

--
-- Name: DepartureDirection; Type: TYPE; Schema: public; Owner: appuser
--

CREATE TYPE public."DepartureDirection" AS ENUM (
    'FROM_START',
    'FROM_END'
);


ALTER TYPE public."DepartureDirection" OWNER TO appuser;

--
-- Name: RouteType; Type: TYPE; Schema: public; Owner: appuser
--

CREATE TYPE public."RouteType" AS ENUM (
    'SUBURBAN',
    'CITY'
);


ALTER TYPE public."RouteType" OWNER TO appuser;

--
-- Name: SeasonType; Type: TYPE; Schema: public; Owner: appuser
--

CREATE TYPE public."SeasonType" AS ENUM (
    'SUMMER',
    'AUTUMN',
    'WINTER',
    'SPRING'
);


ALTER TYPE public."SeasonType" OWNER TO appuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CompanyInfo; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."CompanyInfo" (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    address text,
    "workingHours" text,
    "directorName" text,
    "deputyName" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CompanyInfo" OWNER TO appuser;

--
-- Name: CompanyInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."CompanyInfo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CompanyInfo_id_seq" OWNER TO appuser;

--
-- Name: CompanyInfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."CompanyInfo_id_seq" OWNED BY public."CompanyInfo".id;


--
-- Name: CompanyInsurance; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."CompanyInsurance" (
    id integer NOT NULL,
    insurer text NOT NULL,
    number text NOT NULL,
    "dateBegin" timestamp(3) without time zone NOT NULL,
    "dateEnd" timestamp(3) without time zone NOT NULL,
    "companyId" integer NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CompanyInsurance" OWNER TO appuser;

--
-- Name: CompanyInsurance_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."CompanyInsurance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CompanyInsurance_id_seq" OWNER TO appuser;

--
-- Name: CompanyInsurance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."CompanyInsurance_id_seq" OWNED BY public."CompanyInsurance".id;


--
-- Name: CompanyPhone; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."CompanyPhone" (
    id integer NOT NULL,
    phone text NOT NULL,
    label text,
    signature text,
    "companyInfoId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CompanyPhone" OWNER TO appuser;

--
-- Name: CompanyPhone_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."CompanyPhone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CompanyPhone_id_seq" OWNER TO appuser;

--
-- Name: CompanyPhone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."CompanyPhone_id_seq" OWNED BY public."CompanyPhone".id;


--
-- Name: News; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."News" (
    id integer NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    news text NOT NULL,
    "isMain" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."News" OWNER TO appuser;

--
-- Name: News_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."News_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."News_id_seq" OWNER TO appuser;

--
-- Name: News_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."News_id_seq" OWNED BY public."News".id;


--
-- Name: Route; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."Route" (
    id integer NOT NULL,
    number text NOT NULL,
    name text NOT NULL,
    type public."RouteType" NOT NULL,
    "seasonId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isCircular" boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Route" OWNER TO appuser;

--
-- Name: RouteComment; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."RouteComment" (
    id integer NOT NULL,
    "routeId" integer NOT NULL,
    text text NOT NULL,
    times text[]
);


ALTER TABLE public."RouteComment" OWNER TO appuser;

--
-- Name: RouteComment_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."RouteComment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RouteComment_id_seq" OWNER TO appuser;

--
-- Name: RouteComment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."RouteComment_id_seq" OWNED BY public."RouteComment".id;


--
-- Name: RouteDeparture; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."RouteDeparture" (
    id integer NOT NULL,
    "routeId" integer NOT NULL,
    direction public."DepartureDirection" NOT NULL,
    "time" text NOT NULL,
    comment text,
    "dayOfWeek" public."DayOfWeek"[]
);


ALTER TABLE public."RouteDeparture" OWNER TO appuser;

--
-- Name: RouteDeparture_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."RouteDeparture_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."RouteDeparture_id_seq" OWNER TO appuser;

--
-- Name: RouteDeparture_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."RouteDeparture_id_seq" OWNED BY public."RouteDeparture".id;


--
-- Name: Route_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."Route_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Route_id_seq" OWNER TO appuser;

--
-- Name: Route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."Route_id_seq" OWNED BY public."Route".id;


--
-- Name: Season; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."Season" (
    id integer NOT NULL,
    type public."SeasonType" NOT NULL
);


ALTER TABLE public."Season" OWNER TO appuser;

--
-- Name: SeasonPeriod; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public."SeasonPeriod" (
    id integer NOT NULL,
    "seasonId" integer NOT NULL,
    "startMonth" integer NOT NULL,
    "startDay" integer NOT NULL,
    "endMonth" integer NOT NULL,
    "endDay" integer NOT NULL
);


ALTER TABLE public."SeasonPeriod" OWNER TO appuser;

--
-- Name: SeasonPeriod_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."SeasonPeriod_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SeasonPeriod_id_seq" OWNER TO appuser;

--
-- Name: SeasonPeriod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."SeasonPeriod_id_seq" OWNED BY public."SeasonPeriod".id;


--
-- Name: Season_id_seq; Type: SEQUENCE; Schema: public; Owner: appuser
--

CREATE SEQUENCE public."Season_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Season_id_seq" OWNER TO appuser;

--
-- Name: Season_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: appuser
--

ALTER SEQUENCE public."Season_id_seq" OWNED BY public."Season".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: appuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO appuser;

--
-- Name: CompanyInfo id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyInfo" ALTER COLUMN id SET DEFAULT nextval('public."CompanyInfo_id_seq"'::regclass);


--
-- Name: CompanyInsurance id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyInsurance" ALTER COLUMN id SET DEFAULT nextval('public."CompanyInsurance_id_seq"'::regclass);


--
-- Name: CompanyPhone id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyPhone" ALTER COLUMN id SET DEFAULT nextval('public."CompanyPhone_id_seq"'::regclass);


--
-- Name: News id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."News" ALTER COLUMN id SET DEFAULT nextval('public."News_id_seq"'::regclass);


--
-- Name: Route id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."Route" ALTER COLUMN id SET DEFAULT nextval('public."Route_id_seq"'::regclass);


--
-- Name: RouteComment id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteComment" ALTER COLUMN id SET DEFAULT nextval('public."RouteComment_id_seq"'::regclass);


--
-- Name: RouteDeparture id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteDeparture" ALTER COLUMN id SET DEFAULT nextval('public."RouteDeparture_id_seq"'::regclass);


--
-- Name: Season id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."Season" ALTER COLUMN id SET DEFAULT nextval('public."Season_id_seq"'::regclass);


--
-- Name: SeasonPeriod id; Type: DEFAULT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."SeasonPeriod" ALTER COLUMN id SET DEFAULT nextval('public."SeasonPeriod_id_seq"'::regclass);


--
-- Data for Name: CompanyInfo; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."CompanyInfo" (id, name, email, address, "workingHours", "directorName", "deputyName", "createdAt", "updatedAt") FROM stdin;
1	OOO "АВТО"	kpap@inbox.com	Кириши	c 08:00 до 17.15 	Майоров В.М.	Горошков Н.П.	2026-06-26 10:04:26.994	2026-07-27 15:31:46.257
\.


--
-- Data for Name: CompanyInsurance; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."CompanyInsurance" (id, insurer, number, "dateBegin", "dateEnd", "companyId", "updatedAt") FROM stdin;
1	1234eww	1234	2026-01-01 00:00:00	2026-12-17 00:00:00	1	2026-07-27 15:45:34.648
\.


--
-- Data for Name: CompanyPhone; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."CompanyPhone" (id, phone, label, signature, "companyInfoId", "createdAt") FROM stdin;
1	+7(81368)434-66	диспетчер	DISP	1	2026-07-23 11:52:35.514
6	+7(81368)434-66	Домашний	DOM	1	2026-07-26 07:11:00.068
\.


--
-- Data for Name: News; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."News" (id, date, news, "isMain", "createdAt") FROM stdin;
3	2026-07-08 00:00:00	wdwdddwd\n**Жирный**\nспискок:\n\n- итем 1 \n- итем 2	f	2026-07-29 11:54:40.481
4	2026-07-13 00:00:00	С 01.09.2026 будет действовать новое расписание посмотреть [тут](http://localhost:3000/dashboard/news)	t	2026-07-29 12:48:58.943
5	2026-06-17 00:00:00	ццввцввц	f	2026-07-29 12:53:57.689
\.


--
-- Data for Name: Route; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."Route" (id, number, name, type, "seasonId", "createdAt", "updatedAt", "isCircular", "order") FROM stdin;
1	105	туда -сюда	SUBURBAN	1	2026-08-01 14:22:26.97	2026-08-07 09:16:31.227	f	0
3	7	кириши - пмк	CITY	1	2026-08-02 09:14:39.405	2026-08-07 09:16:31.232	f	0
7	1	dddddddd	SUBURBAN	2	2026-08-07 06:42:57.44	2026-08-11 11:01:32.567	f	4
9	34	eeee	SUBURBAN	2	2026-08-07 06:43:31.573	2026-08-11 11:01:33.813	f	2
6	1	ddddd	SUBURBAN	2	2026-08-07 06:42:46.567	2026-08-11 11:01:33.814	f	3
11	202	Будогощь - кириши	SUBURBAN	2	2026-08-14 13:28:15.168	2026-08-14 13:28:15.168	f	6
4	1	вувувув	SUBURBAN	2	2026-08-06 13:59:49.38	2026-08-14 16:02:36.35	t	0
8	34	4rrr	SUBURBAN	2	2026-08-07 06:43:08.682	2026-08-14 16:02:36.352	f	1
10	45	ddd	SUBURBAN	2	2026-08-07 06:43:47.19	2026-08-07 09:40:26.98	t	5
\.


--
-- Data for Name: RouteComment; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."RouteComment" (id, "routeId", text, times) FROM stdin;
1	4	следует по киришам	{01:23}
3	4	123	{01:23}
4	11	проверяем как будет выглядеть	{08:30,10:40}
\.


--
-- Data for Name: RouteDeparture; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."RouteDeparture" (id, "routeId", direction, "time", comment, "dayOfWeek") FROM stdin;
13	1	FROM_START	08:30	OOO "АВТО"	{MON,FRI}
14	1	FROM_START	15:40	\N	{TUE}
15	1	FROM_START	15:45	sss	{WED,FRI}
16	1	FROM_END	10:00	\N	{}
17	1	FROM_END	17:20	\N	{}
18	3	FROM_START	08:30	\N	{}
19	3	FROM_START	20:15	\N	{}
20	3	FROM_END	15:15	\N	{}
21	3	FROM_END	14:50	\N	{}
27	4	FROM_START	01:23	\N	{THU,WED}
28	9	FROM_START	08:30	\N	{}
29	9	FROM_END	15:20	\N	{}
30	10	FROM_START	15:00	\N	{}
31	11	FROM_START	08:30	\N	{}
32	11	FROM_START	10:40	\N	{}
33	11	FROM_START	15:30	\N	{}
34	11	FROM_END	11:00	\N	{}
35	11	FROM_END	12:00	\N	{}
36	11	FROM_END	17:00	\N	{}
\.


--
-- Data for Name: Season; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."Season" (id, type) FROM stdin;
1	SPRING
2	SUMMER
3	AUTUMN
4	WINTER
\.


--
-- Data for Name: SeasonPeriod; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public."SeasonPeriod" (id, "seasonId", "startMonth", "startDay", "endMonth", "endDay") FROM stdin;
6	1	4	1	4	30
7	2	5	1	9	30
8	3	10	1	10	31
9	4	11	1	12	31
10	4	1	1	3	31
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: appuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
50d3646f-84d1-4db4-bdaa-cf46e060776f	0e6d8bd351f0f619f80b8fc3090401eff52cfdd9374805e5f383cb0f02be9079	2026-06-23 11:23:09.317557+00	20260623112309_add_users_and_news	\N	\N	2026-06-23 11:23:09.299238+00	1
37f938c4-e605-4a31-ba95-42186625e730	2a6086042c40b3ff7b008dc50269fbff9fca91ff612e95df03fa4981cab78421	2026-08-14 15:37:52.643083+00	20260814153752_drop_user	\N	\N	2026-08-14 15:37:52.632475+00	1
7f458872-e8f8-4e8b-892c-04d735c22717	b1a098854005de9f75ec4e70bf5d4b485fc02e5a7820fd26034d40f6721a0309	2026-06-25 16:31:04.852364+00	20260625163104_add_company_info	\N	\N	2026-06-25 16:31:04.83095+00	1
0c393b6a-f66c-4587-812e-c3b4ad1ea8a9	e64fdbeed0b2494f7a11a6406807945963a2c7bd419b77fabbbb87db8cd14826	2026-07-20 09:19:42.852243+00	20260720091942_add_company_insurance	\N	\N	2026-07-20 09:19:42.83236+00	1
c47e4d30-381c-4b1a-9092-7c38478a445e	70b683d1d3d1bfd12b8fe17180c0afe646b2f821ae54c8a7fd4cf64ffa00314a	2026-07-22 08:23:09.392597+00	20260722082309_add_created_at_to_company_phone	\N	\N	2026-07-22 08:23:09.385532+00	1
1c92ba54-1653-4bda-894e-c355f53a0435	6cb0327e0aa13faf86cfc3efcf81f0fa2a48d0704b8ba0625f24361ea3e0ea0d	2026-07-31 07:28:28.793032+00	20260731072828_add_schedule_tables	\N	\N	2026-07-31 07:28:28.752019+00	1
a6ba1f33-462d-4b64-b52c-efe9a39e73ff	73a8b491060d9267b3ed4c1298b363e4bd72cfff7d608f5e27ac9dd397689dcc	2026-08-01 14:15:36.269445+00	20260801141536_rename_daysofweek_to_dayofweek	\N	\N	2026-08-01 14:15:36.263054+00	1
8f861216-f8ab-42d6-b3ef-08d33e400533	2177b8737404852b046798a104ccedeb06e907056fbe13c645307e971ebd0bc1	2026-08-02 09:35:07.153131+00	20260802093507_add_price_card	\N	\N	2026-08-02 09:35:07.134367+00	1
3d550c04-b742-4a37-9fdf-f4863fa83d75	f9a728da58025226944c24a57206d34dced539d7ec80c099fa27011c5a7a5dee	2026-08-02 09:44:10.938177+00	20260802094410_add_program	\N	\N	2026-08-02 09:44:10.909274+00	1
45d9713d-7981-4ab1-8a52-19e5cc7b10ca	af59cc59532c71248a7bdd52f6205885fc39d2d787e877e783ffe4a2b1de9409	2026-08-04 11:00:55.406325+00	20260804110055_drop_table	\N	\N	2026-08-04 11:00:55.385404+00	1
40f7e89c-d532-49cd-b898-fe7e33825edb	3d46f89adb0ee478775be84861dd334111dc173749f488b388912448f66464dd	2026-08-06 06:35:59.616249+00	20260806063559_add_is_circular_to_route	\N	\N	2026-08-06 06:35:59.607468+00	1
b7607b7a-edf0-4474-9a59-d7fe43fcc88f	7c1eb2ec55da879c4e76c7c495be7412cd672a9e50127a7199589b231eaeab96	2026-08-07 06:38:33.765446+00	20260807063833_remove_route_number_unique	\N	\N	2026-08-07 06:38:33.758782+00	1
19f5fe0f-b1cb-458f-b339-a68fc6c2a295	65490c589837c4ad5b038ce72d49bc4f4a66f23a1082c2c8c4dd00235fc32f63	2026-08-07 08:04:21.353162+00	20260807080421_add_order_to_route	\N	\N	2026-08-07 08:04:21.346106+00	1
96948c4b-ef93-4b78-bc6d-0944d537ae12	9967825c74f542d1c1e7f6957f0c14ff3f754d466aebb2c26550668730d31d3b	2026-08-09 07:28:33.281964+00	20260809072833_add_route_comment	\N	\N	2026-08-09 07:28:33.266891+00	1
\.


--
-- Name: CompanyInfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."CompanyInfo_id_seq"', 1, true);


--
-- Name: CompanyInsurance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."CompanyInsurance_id_seq"', 22, true);


--
-- Name: CompanyPhone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."CompanyPhone_id_seq"', 9, true);


--
-- Name: News_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."News_id_seq"', 5, true);


--
-- Name: RouteComment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."RouteComment_id_seq"', 4, true);


--
-- Name: RouteDeparture_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."RouteDeparture_id_seq"', 36, true);


--
-- Name: Route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."Route_id_seq"', 11, true);


--
-- Name: SeasonPeriod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."SeasonPeriod_id_seq"', 10, true);


--
-- Name: Season_id_seq; Type: SEQUENCE SET; Schema: public; Owner: appuser
--

SELECT pg_catalog.setval('public."Season_id_seq"', 4, true);


--
-- Name: CompanyInfo CompanyInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyInfo"
    ADD CONSTRAINT "CompanyInfo_pkey" PRIMARY KEY (id);


--
-- Name: CompanyInsurance CompanyInsurance_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyInsurance"
    ADD CONSTRAINT "CompanyInsurance_pkey" PRIMARY KEY (id);


--
-- Name: CompanyPhone CompanyPhone_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyPhone"
    ADD CONSTRAINT "CompanyPhone_pkey" PRIMARY KEY (id);


--
-- Name: News News_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."News"
    ADD CONSTRAINT "News_pkey" PRIMARY KEY (id);


--
-- Name: RouteComment RouteComment_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteComment"
    ADD CONSTRAINT "RouteComment_pkey" PRIMARY KEY (id);


--
-- Name: RouteDeparture RouteDeparture_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteDeparture"
    ADD CONSTRAINT "RouteDeparture_pkey" PRIMARY KEY (id);


--
-- Name: Route Route_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_pkey" PRIMARY KEY (id);


--
-- Name: SeasonPeriod SeasonPeriod_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."SeasonPeriod"
    ADD CONSTRAINT "SeasonPeriod_pkey" PRIMARY KEY (id);


--
-- Name: Season Season_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."Season"
    ADD CONSTRAINT "Season_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: CompanyInsurance_companyId_key; Type: INDEX; Schema: public; Owner: appuser
--

CREATE UNIQUE INDEX "CompanyInsurance_companyId_key" ON public."CompanyInsurance" USING btree ("companyId");


--
-- Name: Season_type_key; Type: INDEX; Schema: public; Owner: appuser
--

CREATE UNIQUE INDEX "Season_type_key" ON public."Season" USING btree (type);


--
-- Name: CompanyInsurance CompanyInsurance_companyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyInsurance"
    ADD CONSTRAINT "CompanyInsurance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."CompanyInfo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CompanyPhone CompanyPhone_companyInfoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."CompanyPhone"
    ADD CONSTRAINT "CompanyPhone_companyInfoId_fkey" FOREIGN KEY ("companyInfoId") REFERENCES public."CompanyInfo"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RouteComment RouteComment_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteComment"
    ADD CONSTRAINT "RouteComment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RouteDeparture RouteDeparture_routeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."RouteDeparture"
    ADD CONSTRAINT "RouteDeparture_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Route Route_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SeasonPeriod SeasonPeriod_seasonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: appuser
--

ALTER TABLE ONLY public."SeasonPeriod"
    ADD CONSTRAINT "SeasonPeriod_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES public."Season"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict O9ABU3bm1aRNCwTueOh2ig5OBwrhbxDp810TRea1DkVcA1dexdGAZ22SGEmlyEz

