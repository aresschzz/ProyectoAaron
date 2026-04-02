-- BRUNO
-- ES UNA TABLA RANDOM PARA HACER EL DOCKER, 

CREATE TABLE vinilos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    artista VARCHAR(150) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL
);

INSERT INTO vinilos (titulo, artista, precio) VALUES ('Prográmaton', 'Zoé', 600.00);
INSERT INTO vinilos (titulo, artista, precio) VALUES ('A Rush of Blood to the Head', 'Coldplay', 850.00);