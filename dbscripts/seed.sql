\connect portfoliodb

CREATE TABLE BlogPosts
(
 id serial PRIMARY KEY,
 title VARCHAR (150) NOT NULL,
 content TEXT NOT NULL
);

ALTER TABLE BlogPosts OWNER TO postgres;