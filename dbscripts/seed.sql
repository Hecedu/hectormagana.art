\connect portfoliodb

CREATE USER wireguard_admin WITH ENCRYPTED PASSWORD 'wireguard_admin';

CREATE TABLE blogposts
(
 id serial PRIMARY KEY,
 title VARCHAR (150) NOT NULL,
 content TEXT NOT NULL
);
CREATE TABLE clientinformation
(
    id serial PRIMARY KEY,
    client_name VARCHAR (150) NOT NULL,
    ip_address VARCHAR (150) NOT NULL,
    date_added TIMESTAMP NOT NULL,
    allowed_ip_range VARCHAR (150) NOT NULL,
    client_public_key VARCHAR (150) NOT NULL,
    client_private_key VARCHAR (150) NOT NULL
);
CREATE TABLE userdata
(
    id serial PRIMARY KEY,
    username VARCHAR (150) UNIQUE NOT NULL,
    password VARCHAR (150) NOT NULL,
    salt BYTEA
);

ALTER TABLE blogposts OWNER TO wireguard_admin;
ALTER TABLE clientinformation OWNER TO wireguard_admin;
ALTER TABLE userdata OWNER TO wireguard_admin;
