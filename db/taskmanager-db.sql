PGDMP         -                 {            taskmanager    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    taskmanager    DATABASE     ?   CREATE DATABASE taskmanager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE taskmanager;
                postgres    false            O           1247    16420    Role    TYPE     T   CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN',
    'NORMAL'
);
    DROP TYPE public."Role";
       public          postgres    false            L           1247    16413    Status    TYPE     [   CREATE TYPE public."Status" AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
);
    DROP TYPE public."Status";
       public          postgres    false            ?            1259    16439    Task    TABLE     ?   CREATE TABLE public."Task" (
    id integer NOT NULL,
    "assignorId" integer NOT NULL,
    "assigneeId" integer,
    title text NOT NULL,
    description text,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL
);
    DROP TABLE public."Task";
       public         heap    postgres    false    844    844            ?            1259    16438    Task_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Task_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Task_id_seq";
       public          postgres    false    218                       0    0    Task_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Task_id_seq" OWNED BY public."Task".id;
          public          postgres    false    217            ?            1259    16428    User    TABLE     @  CREATE TABLE public."User" (
    id integer NOT NULL,
    "userType" public."Role" DEFAULT 'NORMAL'::public."Role" NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    847    847            ?            1259    16427    User_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    216                       0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            ?            1259    16401    _prisma_migrations    TABLE     ?  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            y           2604    16442    Task id    DEFAULT     f   ALTER TABLE ONLY public."Task" ALTER COLUMN id SET DEFAULT nextval('public."Task_id_seq"'::regclass);
 8   ALTER TABLE public."Task" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            v           2604    16431    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    16439    Task 
   TABLE DATA           \   COPY public."Task" (id, "assignorId", "assigneeId", title, description, status) FROM stdin;
    public          postgres    false    218   ?                 0    16428    User 
   TABLE DATA           [   COPY public."User" (id, "userType", email, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   ?                 0    16401    _prisma_migrations 
   TABLE DATA           ?   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   z                   0    0    Task_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Task_id_seq"', 23, true);
          public          postgres    false    217                        0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 39, true);
          public          postgres    false    215            ?           2606    16447    Task Task_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_pkey";
       public            postgres    false    218                       2606    16437    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            |           2606    16409 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            }           1259    16448    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    216            ?           2606    16454    Task Task_assigneeId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_assigneeId_fkey";
       public          postgres    false    3199    216    218            ?           2606    16449    Task Task_assignorId_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_assignorId_fkey" FOREIGN KEY ("assignorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_assignorId_fkey";
       public          postgres    false    218    216    3199               ?   x?m??
?0?볧?????E?Y?ҕ???D??7-eg?n????6Z	??Wm:}Q?:U?i?z?ݮPf2-dN|`???Q?5U??R=hs?s1?W?g߫?E?M&^?CY??*?k">Y?>}{ ?\3?C?????r?8p9A?,G.????8C??<?Q?F}???ɽ??pf??B?`??D         ?  x?m?Ms?PF??+\???~r??*?? Bp:ӹ `bQ#"?__3m'5v{6ϙ??X	?3{????_?Ȫ??oE)_~?t_*]?t??yh???H??+?k???*^?m?tuL????? 	?V??ؓ?$??`??D?v?.?!??o?!?p)?t??'4&?&?skr?&yc{?????7Y<???bnE?Wy?
G2??"O??&?@?}rցP&??ENYu?????????L??Wkn? \???'k?4?۞??&M?6???,??:	J????ǂp??9VT~_????)&l?K????PǺ??;?????bO?n?X???"5???^?u?ǯk?h??s? 5T???>L?Er`??q,??C4??߼5???4??5?<??w?5;Nj'?ߵ?????L@?m.?&Lc?w???/"(??         ?   x?m?K
?0??)?/.O?bY9DO?C?PzJ?.?j?z#p??b?Nb(μ,?ˢڸ??<)#ׂ,׆?M???y?M??-?Ŭ	?s??Yc?)u?ub?w 9???+?E<?>*B?H?????t???N??zN??ǿI0????<?_~2?     