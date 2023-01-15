

SELECT DISTINCT c.numeroclient, c.nomclient FROM CLIENT c, PLANREPAS p, ABONNER a 
WHERE a.numeroclient = c.numeroclient and a.numeroplan = p.numeroplan and p.prix BETWEEN 20.00 and 40.00; 

SELECT DISTINCT p.numeroplan from PLANREPAS p, FOURNISSEUR f 
WHERE p.numerofournisseur = f.numerofournisseur and nomfournisseur <> 'QC Transport'; 

SELECT DISTINCT f.numeroplan FROM FAMILLE f, PLANREPAS p
WHERE f.numeroplan = p.numeroplan and p.categorie = 'cétogène';

SELECT COUNT(*) FROM FOURNISSEUR 
WHERE nomfournisseur = NULL;

-- Le montant total de tt les livraisons ou d'une seule livraison a revoir
SELECT f.nomfournisseur FROM FOURNISSEUR f, PLANREPAS p
WHERE f.numerofournisseur = p.numerofournisseur 
GROUP BY f.nomfournisseur
HAVING SUM(p.prix) > (
	SELECT SUM(p.prix) FROM FOURNISSEUR f, PLANREPAS p
	WHERE f.numerofournisseur = p.numerofournisseur and f.nomfournisseur = 'AB Transport' 
); 

SELECT * FROM(
	SELECT f.nomfournisseur, f.adressefournisseur, SUM(p.prix) FROM FOURNISSEUR f, PLANREPAS p
	WHERE f.numerofournisseur = p.numerofournisseur
	GROUP BY f.nomfournisseur, f.adressefournisseur
	ORDER BY SUM(p.prix) DESC
) AS resultat LIMIT 2;

-- 4.7 a revoir
SELECT COUNT(DISTINCT nomfournisseur) FROM FOURNISSEUR 
WHERE nomfournisseur NOT IN (
	SELECT DISTINCT f.nomfournisseur FROM FOURNISSEUR f, PLANREPAS p, KITEREPAS k
	WHERE k.numeroplan = p.numeroplan and p.numerofournisseur = f.numerofournisseur
);

SELECT numeroclient, nomclient, prenomclient FROM CLIENT
WHERE villeclient IN (
	SELECT adressefournisseur as villeclient FROM Fournisseur
	WHERE nomfournisseur = 'Benjamin'
)  and LEFT(prenomclient, 1) NOT IN ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U')
GROUP BY numeroclient, nomclient, prenomclient
ORDER BY nomclient ASC;

SELECT paysingredient, COUNT(paysingredient) FROM INGREDIENT 
WHERE RIGHT(paysingredient, 3) <> 'g'
GROUP BY paysingredient
ORDER BY paysingredient DESC;

-- a revoir la vue pour ASC ORDER DES CATEGORIES
CREATE OR REPLACE VIEW V_fournisseur AS
	SELECT DISTINCT f.adressefournisseur as V_adresse, SUM(p.prix) AS V_tot FROM FOURNISSEUR f, PLANREPAS p
	WHERE f.numerofournisseur = p.numerofournisseur and p.categorie LIKE '%e%' and p.categorie LIKE '&o__'
	GROUP BY V_adresse
	HAVING SUM(p.prix) > 54.00
	ORDER BY V_tot DESC;

SELECT * FROM V_fournisseur;
