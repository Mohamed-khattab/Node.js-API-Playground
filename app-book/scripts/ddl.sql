

CREATE SCHEMA bmg AUTHORIZATION postgres;

CREATE TABLE bmg.books (
  book_id SERIAL PRIMARY KEY,
  book_title VARCHAR(300) NOT NULL,
  book_author VARCHAR(255) NOT NULL,
  book_publisher VARCHAR(50) NOT null ,
  book_pages int null ,
  store_code VARCHAR(5) not null , 
  book_description  VARCHAR(1000) not null ,
  creates_by   VARCHAR(50) NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- bmg.store definition

-- Drop table

-- DROP TABLE bmg.store;

CREATE TABLE bmg.store (
	store_id serial4 NOT NULL,
	store_code varchar(300) NOT NULL,
	store_name varchar(50) NOT NULL,
	creates_by varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	store_address varchar NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);