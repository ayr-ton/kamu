SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

INSERT INTO library (id, name, slug) VALUES (1,	'Recife', 'rec');

INSERT INTO users (id, email, name) VALUES (1, 'sometwer@thoughtworks.com',	'Um Thoughtworker humilde');

INSERT INTO book (id, author, description, imageurl, isbn, numberofpages, publicationdate, publisher, subtitle, title) VALUES 
(1, 'Robert C. Martin', 'Presents practical advice on the disciplines, techniques, tools, and practices of computer programming and how to approach software development with a sense of pride, honor, and self-respect.', 'http://books.google.com.br/books/content?id=VQlvAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 9780137081073, 210, '2011', 'Pearson Education', 'A Code of Conduct for Professional Programmers', 'The Clean Coder'),
(2, 'Kent Beck', 'About software development through constant testing.', 'http://books.google.com.br/books/content?id=gFgnde_vwMAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 9780321146533, 220, '2003', 'Addison-Wesley Professional' ,'By Example', 'Test-driven Development');

INSERT INTO copy (id, status, book_id, library_id) VALUES 
(1, 0, 1, 1),
(2, 1, 2, 1),
(3, 0, 1, 1);

INSERT INTO loan (id, end_date, start_date, copy_id, user_id) VALUES 
(1, null, '2016-03-22', 2, 1);

SELECT setval('users_gen', 2, true);
SELECT setval('library_gen', 2, true);
SELECT setval('book_gen', 3, true);
SELECT setval('copy_gen', 4, true);
SELECT setval('loan_gen', 2, true);
