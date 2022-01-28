\connect portfoliodb

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
ALTER TABLE blogposts OWNER TO postgres;
ALTER TABLE clientinformation OWNER TO postgres;