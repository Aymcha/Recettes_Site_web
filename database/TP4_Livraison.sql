CREATE TABLE CLIENT (
	numeroclient SERIAL PRIMARY KEY,
	nomclient VARCHAR(30),
	prenomclient VARCHAR(30),
	adressecourrielclient VARCHAR(100),
	rueclient VARCHAR(25),
	villeclient VARCHAR(25),
	codepostalclient CHAR(6)
);

CREATE TABLE TELEPHONE (
	numerodetelephone bigint,
	numeroclient int,
	CONSTRAINT telephone_pk PRIMARY KEY (numerodetelephone, numeroclient),
	CONSTRAINT fk_numeroclient FOREIGN KEY (numeroclient) REFERENCES CLIENT ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE FOURNISSEUR (
	numerofournisseur SERIAL PRIMARY KEY,
	nomfournisseur VARCHAR(30),
	adressefournisseur VARCHAR(25)
);

CREATE TABLE PLANREPAS (
	numeroplan SERIAL PRIMARY KEY,
	categorie VARCHAR(20) NOT NULL,
	frequence int NOT NULL,
	nbrpersonnes int CONSTRAINT check_nbrpersonnes CHECK(nbrpersonnes > 0) NOT NULL,
	nbrcalories int CONSTRAINT check_nbrcalories CHECK(nbrcalories > 0) NOT NULL,
	prix float(2) CONSTRAINT check_prix CHECK(prix > 0.0) NOT NULL,
	numerofournisseur int NOT NULL REFERENCES FOURNISSEUR ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ABONNER (
	numeroclient int,
	numeroplan int,
	duree int NOT NULL CONSTRAINT check_duree_mois CHECK(duree > 0),
	CONSTRAINT abonner_pk PRIMARY KEY (numeroclient, numeroplan),
	CONSTRAINT fk_numeroclient FOREIGN KEY (numeroclient) REFERENCES CLIENT ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PESCETARIEN (
	numeroplan int PRIMARY KEY,
	typepoisson VARCHAR(15),
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VEGETARIEN (
	numeroplan int PRIMARY KEY,
	typederepas VARCHAR(30),
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE FAMILLE (
	numeroplan int PRIMARY KEY,
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE RAPIDE (
	numeroplan int PRIMARY KEY,
	tempsdepreparation float(2) CONSTRAINT check_tempsdepreparation CHECK(tempsdepreparation > 0.0), --a revoir
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE FACILE (
	numeroplan int PRIMARY KEY,
	nbringredients int CONSTRAINT check_nbringredients CHECK(nbringredients > 0),
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE KITEREPAS (
	numerokiterepas SERIAL PRIMARY KEY,
	description VARCHAR (100),
	numeroplan int NOT NULL,
	CONSTRAINT fk_numeroplan FOREIGN KEY (numeroplan) REFERENCES PLANREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IMAGE (
	numeroimage SERIAL PRIMARY KEY,
	donnees BYTEA,
	numerokiterepas int NOT NULL,
	CONSTRAINT fk_numerokiterepas FOREIGN KEY (numerokiterepas) REFERENCES KITEREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE INGREDIENT (
	numeroingredient SERIAL PRIMARY KEY,
	nomingredient VARCHAR(30),
	paysingredient VARCHAR(20)
);

CREATE TABLE CONTENIR (
	numerokiterepas int,
	numeroingredient int,
	CONSTRAINT contenir_pk PRIMARY KEY (numerokiterepas, numeroingredient),
	CONSTRAINT fk_numerokiterepas FOREIGN KEY (numerokiterepas) REFERENCES KITEREPAS ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_numeroingredient FOREIGN KEY (numeroingredient) REFERENCES INGREDIENT ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ETAPE (
	numerokiterepas int PRIMARY KEY,
	descriptionetape VARCHAR(100),
	dureeetape int CONSTRAINT check_dureeetape CHECK(dureeetape > 0),
	etrecomposeede SERIAL,
	CONSTRAINT fk_numerokiterepas FOREIGN KEY (numerokiterepas) REFERENCES KITEREPAS ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO CLIENT VALUES(0,'Doe', 'John', 'JohnDoe@gmail.com', 'rue lavoborelle', 'Paris', 'CCCCCC');
INSERT INTO CLIENT VALUES(1, 'Doe', 'Jane', 'JaneDoe@gmail.com', 'rue inconnue', 'Sao-Paolo', 'HHHHHH');
INSERT INTO CLIENT VALUES(2, 'Carlsen', 'Adam', 'adamCarlsen@gmail.com', 'rue unknown2', 'Austin, TX', 'WWWWWW');
INSERT INTO CLIENT VALUES(3, 'Duarte', 'Jude', 'judeDuarte@hotmail.com', 'rue unknown3', 'Austin, TX', 'WWWWWW');

INSERT INTO TELEPHONE VALUES (2158889876, 0);
INSERT INTO TELEPHONE VALUES (4389876545, 0);

INSERT INTO FOURNISSEUR VALUES (0, 'Fournisseur1','Montreal, QC');
INSERT INTO FOURNISSEUR VALUES (1, 'Fournisseur2','Philedelphia, PA');
INSERT INTO FOURNISSEUR VALUES (2, 'Benjamin', 'Austin, TX');

INSERT INTO PLANREPAS VALUES (0, 'Pescetarien', 5, 6, 650, 30.00, 0);
INSERT INTO PLANREPAS VALUES (1, 'Pescetarien', 2, 5, 500, 20.00, 0);
INSERT INTO PLANREPAS VALUES (2, 'Familliale', 10, 8, 700, 23.00, 1);
INSERT INTO PLANREPAS VALUES (3, 'Vegetarien', 20, 4, 450, 15.00, 0);
INSERT INTO PLANREPAS VALUES (4, 'Vegetarien', 25, 5, 390, 28.00, 0);
INSERT INTO PLANREPAS VALUES (5, 'Familliale', 2, 4, 630, 16.00, 1);
INSERT INTO PLANREPAS VALUES (6, 'Familliale Facile', 1, 5, 500, 19.90, 1);
INSERT INTO PLANREPAS VALUES (7, 'NomCategoie', 1, 1, 300, 67.00, 2);

INSERT INTO ABONNER VALUES (0, 4, 4);
INSERT INTO ABONNER VALUES (1, 3, 1);

INSERT INTO PESCETARIEN VALUES (0, 'Saumon');
INSERT INTO PESCETARIEN VALUES (1, 'Thon');

INSERT INTO VEGETARIEN VALUES (3, 'Poke Bowl');
INSERT INTO VEGETARIEN VALUES (4, 'Sushi vegetarien');

INSERT INTO FAMILLE VALUES (2);
INSERT INTO FAMILLE VALUES (5);
INSERT INTO FAMILLE VALUES (6);

Insert Into FACILE VALUES(6, 5);
Insert Into FACILE VALUES(5, 4);

Insert Into RAPIDE VALUES(2, 10);
Insert Into RAPIDE VALUES(5, 15);

INSERT INTO KITEREPAS VALUES(0, 'Contient du bon saumon fume', 0);
INSERT INTO KITEREPAS VALUES(1, 'Meuilleure choix pour un repas complet', 3);

INSERT INTO INGREDIENT VALUES(0, 'Saumon fume', 'Canada');
INSERT INTO INGREDIENT VALUES(1, 'Sel', 'Inde');
INSERT INTO INGREDIENT VALUES(2, 'Turmuric', 'Inde');

INSERT INTO IMAGE VALUES(0, 'C:\Users\ayman\Downloads\poulet', 0);
INSERT INTO IMAGE VALUES(1, 'C:\Users\ayman\Downloads\poulet\viande' , 1);

INSERT INTO CONTENIR VALUES(0, 0);
INSERT INTO CONTENIR VALUES(1, 1);

INSERT INTO ETAPE VALUES(1,'ajouter du sel', 1, 0);
INSERT INTO ETAPE VALUES(0,'laisser reposer', 30, 0);

