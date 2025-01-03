PGDMP                       }            arkpz-pzpi-22-5-rykush-bohdan    17.2    17.2 6    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            3           1262    16557    arkpz-pzpi-22-5-rykush-bohdan    DATABASE     �   CREATE DATABASE "arkpz-pzpi-22-5-rykush-bohdan" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
 /   DROP DATABASE "arkpz-pzpi-22-5-rykush-bohdan";
                     postgres    false            �            1259    16641    alerts_data_id_seq    SEQUENCE     {   CREATE SEQUENCE public.alerts_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.alerts_data_id_seq;
       public               postgres    false            �            1259    16604    alerts    TABLE       CREATE TABLE public.alerts (
    alert_id integer NOT NULL,
    user_id integer,
    data_id integer DEFAULT nextval('public.alerts_data_id_seq'::regclass),
    alert_type character varying(100) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.alerts;
       public         heap r       postgres    false    229            �            1259    16603    alerts_alert_id_seq    SEQUENCE     �   CREATE SEQUENCE public.alerts_alert_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.alerts_alert_id_seq;
       public               postgres    false    226            4           0    0    alerts_alert_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.alerts_alert_id_seq OWNED BY public.alerts.alert_id;
          public               postgres    false    225            �            1259    16591    environmental_data    TABLE     �   CREATE TABLE public.environmental_data (
    data_id integer NOT NULL,
    device_id integer,
    data_type character varying(50) NOT NULL,
    value numeric(10,2) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 &   DROP TABLE public.environmental_data;
       public         heap r       postgres    false            �            1259    16590    environmental_data_data_id_seq    SEQUENCE     �   CREATE SEQUENCE public.environmental_data_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.environmental_data_data_id_seq;
       public               postgres    false    224            5           0    0    environmental_data_data_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.environmental_data_data_id_seq OWNED BY public.environmental_data.data_id;
          public               postgres    false    223            �            1259    16578    iot_devices    TABLE        CREATE TABLE public.iot_devices (
    device_id integer NOT NULL,
    location_id integer,
    device_type character varying(50) NOT NULL,
    status character varying(20) NOT NULL,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.iot_devices;
       public         heap r       postgres    false            �            1259    16577    iot_devices_device_id_seq    SEQUENCE     �   CREATE SEQUENCE public.iot_devices_device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.iot_devices_device_id_seq;
       public               postgres    false    222            6           0    0    iot_devices_device_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.iot_devices_device_id_seq OWNED BY public.iot_devices.device_id;
          public               postgres    false    221            �            1259    16571 	   locations    TABLE     �   CREATE TABLE public.locations (
    location_id integer NOT NULL,
    name character varying(100) NOT NULL,
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL
);
    DROP TABLE public.locations;
       public         heap r       postgres    false            �            1259    16570    locations_location_id_seq    SEQUENCE     �   CREATE SEQUENCE public.locations_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.locations_location_id_seq;
       public               postgres    false    220            7           0    0    locations_location_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.locations_location_id_seq OWNED BY public.locations.location_id;
          public               postgres    false    219            �            1259    16622    reports    TABLE     �   CREATE TABLE public.reports (
    report_id integer NOT NULL,
    user_id integer,
    location_id integer,
    report_data text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reports;
       public         heap r       postgres    false            �            1259    16621    reports_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reports_report_id_seq;
       public               postgres    false    228            8           0    0    reports_report_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reports_report_id_seq OWNED BY public.reports.report_id;
          public               postgres    false    227            �            1259    16559    users    TABLE     .  CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16558    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public               postgres    false    218            9           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public               postgres    false    217            x           2604    16607    alerts alert_id    DEFAULT     r   ALTER TABLE ONLY public.alerts ALTER COLUMN alert_id SET DEFAULT nextval('public.alerts_alert_id_seq'::regclass);
 >   ALTER TABLE public.alerts ALTER COLUMN alert_id DROP DEFAULT;
       public               postgres    false    225    226    226            v           2604    16594    environmental_data data_id    DEFAULT     �   ALTER TABLE ONLY public.environmental_data ALTER COLUMN data_id SET DEFAULT nextval('public.environmental_data_data_id_seq'::regclass);
 I   ALTER TABLE public.environmental_data ALTER COLUMN data_id DROP DEFAULT;
       public               postgres    false    224    223    224            t           2604    16581    iot_devices device_id    DEFAULT     ~   ALTER TABLE ONLY public.iot_devices ALTER COLUMN device_id SET DEFAULT nextval('public.iot_devices_device_id_seq'::regclass);
 D   ALTER TABLE public.iot_devices ALTER COLUMN device_id DROP DEFAULT;
       public               postgres    false    221    222    222            s           2604    16574    locations location_id    DEFAULT     ~   ALTER TABLE ONLY public.locations ALTER COLUMN location_id SET DEFAULT nextval('public.locations_location_id_seq'::regclass);
 D   ALTER TABLE public.locations ALTER COLUMN location_id DROP DEFAULT;
       public               postgres    false    220    219    220            {           2604    16625    reports report_id    DEFAULT     v   ALTER TABLE ONLY public.reports ALTER COLUMN report_id SET DEFAULT nextval('public.reports_report_id_seq'::regclass);
 @   ALTER TABLE public.reports ALTER COLUMN report_id DROP DEFAULT;
       public               postgres    false    228    227    228            q           2604    16562    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    217    218    218            *          0    16604    alerts 
   TABLE DATA           U   COPY public.alerts (alert_id, user_id, data_id, alert_type, "timestamp") FROM stdin;
    public               postgres    false    226   �A       (          0    16591    environmental_data 
   TABLE DATA           _   COPY public.environmental_data (data_id, device_id, data_type, value, "timestamp") FROM stdin;
    public               postgres    false    224   )B       &          0    16578    iot_devices 
   TABLE DATA           `   COPY public.iot_devices (device_id, location_id, device_type, status, last_updated) FROM stdin;
    public               postgres    false    222   �B       $          0    16571 	   locations 
   TABLE DATA           K   COPY public.locations (location_id, name, latitude, longitude) FROM stdin;
    public               postgres    false    220   .C       ,          0    16622    reports 
   TABLE DATA           [   COPY public.reports (report_id, user_id, location_id, report_data, created_at) FROM stdin;
    public               postgres    false    228   �C       "          0    16559    users 
   TABLE DATA           Q   COPY public.users (user_id, name, email, password, role, created_at) FROM stdin;
    public               postgres    false    218   XD       :           0    0    alerts_alert_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.alerts_alert_id_seq', 10, true);
          public               postgres    false    225            ;           0    0    alerts_data_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.alerts_data_id_seq', 14, true);
          public               postgres    false    229            <           0    0    environmental_data_data_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.environmental_data_data_id_seq', 11, true);
          public               postgres    false    223            =           0    0    iot_devices_device_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.iot_devices_device_id_seq', 7, true);
          public               postgres    false    221            >           0    0    locations_location_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.locations_location_id_seq', 4, true);
          public               postgres    false    219            ?           0    0    reports_report_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.reports_report_id_seq', 4, true);
          public               postgres    false    227            @           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);
          public               postgres    false    217            �           2606    16610    alerts alerts_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (alert_id);
 <   ALTER TABLE ONLY public.alerts DROP CONSTRAINT alerts_pkey;
       public                 postgres    false    226            �           2606    16597 *   environmental_data environmental_data_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.environmental_data
    ADD CONSTRAINT environmental_data_pkey PRIMARY KEY (data_id);
 T   ALTER TABLE ONLY public.environmental_data DROP CONSTRAINT environmental_data_pkey;
       public                 postgres    false    224            �           2606    16584    iot_devices iot_devices_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.iot_devices
    ADD CONSTRAINT iot_devices_pkey PRIMARY KEY (device_id);
 F   ALTER TABLE ONLY public.iot_devices DROP CONSTRAINT iot_devices_pkey;
       public                 postgres    false    222            �           2606    16576    locations locations_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public                 postgres    false    220            �           2606    16630    reports reports_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (report_id);
 >   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_pkey;
       public                 postgres    false    228            ~           2606    16569    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            �           2606    16567    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    16611    alerts alerts_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.alerts DROP CONSTRAINT alerts_user_id_fkey;
       public               postgres    false    226    218    4736            �           2606    16598 4   environmental_data environmental_data_device_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.environmental_data
    ADD CONSTRAINT environmental_data_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.iot_devices(device_id);
 ^   ALTER TABLE ONLY public.environmental_data DROP CONSTRAINT environmental_data_device_id_fkey;
       public               postgres    false    222    4740    224            �           2606    16585 (   iot_devices iot_devices_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.iot_devices
    ADD CONSTRAINT iot_devices_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(location_id);
 R   ALTER TABLE ONLY public.iot_devices DROP CONSTRAINT iot_devices_location_id_fkey;
       public               postgres    false    220    222    4738            �           2606    16636     reports reports_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(location_id);
 J   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_location_id_fkey;
       public               postgres    false    220    228    4738            �           2606    16631    reports reports_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.reports DROP CONSTRAINT reports_user_id_fkey;
       public               postgres    false    228    4736    218            *   �   x���A
�0����s���ɶ\�n�q#ejR�Q��X���������N�N $UA\� W����
{oJ��.�i��V��xޣ�2#��CS��b;Ǥ��\n�ۣ�:�$��S��Ƙ��0�      (   z   x�}�;�@E��yl ��<Ɠiih�,���
$�/�2RD��{��Rh��|2<���L�ti\߯���w��q��Ls%c#�������ZQ���Ot���1��ln��m���Ҩ:�"�
w/      &   k   x���K
�0 ���)��a~A�Y
J%Ro�U��O@�ʽ����/���Jm�^��Y@H�H<���(�l�

u�V��7a`��ǦO�8E�L����g�/�      $   t   x�5�=�0@��9E.�e;���	F�Hx@�"�r��I��ޖ���Z�A$,��2�J��UF�8]����պ}]R���4q��L��b���f�g(Xr�B�"5ǁ��{2>T      ,   �   x�}�;�0k�{�X���C4TP��,Ɛ��$�PnO>}4��7N��u��I�Y��	~$d�W%��>J�BM��j8^�Q��PXWX.�vWn��>�}�^M\QR�i��" #=(��7j��PN��8vK���1�vIdz��U��h��0�?�      "     x����N�0���S�����6�Ӯ\�8��vZ�i��B������g�e�ۇ�Ź���M��~��@���J����2��8Thw
v
[��
�QbP�7(�4s�8�σ8�(�-ށ��P-���vs]�Yж���v���ʷ{d'�2d���9g�؈� ��x6�y.�7%R���R
R�c\��zb��/�z��Vm㿯��@U��?M4^>,����bc�	�`s�8���f:�&$���ޤT�BRL%����Pu���B�'�4�;����     