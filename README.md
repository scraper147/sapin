# Caisse Sapins Agri-Garden

Caisse de vente de sapins pour tablette ou smartphone Android.
Adresse : https://scraper147.github.io/sapin/ (dépôt `scraper147/sapin`). Elle fonctionne hors ligne une fois installée.

## Mise en ligne sur GitHub Pages (une seule fois)

1. Connectez-vous sur https://github.com.
2. Cliquez sur **New** (nouveau dépôt) :
   - Repository name : `sapin`
   - Cochez **Public**
   - Cliquez sur **Create repository**
3. Sur la page du dépôt, cliquez sur **uploading an existing file** (ou **Add file → Upload files**).
4. Dézippez `caisse-sapins-github.zip` sur votre PC, puis glissez **tout le contenu** dans la page :
   `index.html`, `manifest.webmanifest`, `sw.js`, `README.md` et le dossier `icons`.
   Le `catalogue.json` ne fait **pas** partie du paquet de l'app : il est publié dans le dépôt par l'**app Admin** (ne pas le déposer à la main).
5. Cliquez sur **Commit changes**.
6. Allez dans **Settings → Pages** :
   - Source : **Deploy from a branch**
   - Branch : **main**, dossier **/ (root)**
   - Cliquez sur **Save**
7. Attendez 1 à 2 minutes. L'adresse s'affiche en haut de la page Pages :
   `https://scraper147.github.io/sapin/`
8. Dans l'**app Admin**, publiez le catalogue de cette caisse dans le dépôt (fichier `catalogue.json` à la racine).

⚠️ Une fois les appareils installés, ne renommez plus le dépôt : l'adresse changerait et les apps installées ne s'ouvriraient plus.

## Installation sur une tablette ou un smartphone

1. Connectez la tablette à internet (wifi ou partage de connexion).
2. Ouvrez l'adresse dans **Chrome**.
3. Menu **⋮ → Installer l'application** (ou **Ajouter à l'écran d'accueil**).
4. Lancez l'app depuis l'icône **« Caisse Sapins »**.
5. Le catalogue publié par l'app Admin se charge tout seul. Dans **Paramètres de la tablette**, choisissez le **point de vente** de la tablette, puis **Enregistrer**.
6. Si l'envoi des ventes sur GitHub est configuré : touchez le bandeau **☁** de l'accueil et saisissez la phrase de passe des caisses (une seule fois).

À partir de là, l'app fonctionne sans internet.

## Catalogue (publié par l'app Admin)

Le catalogue (points de vente, catégories, articles, prix) est **géré et publié par l'app Admin** dans le dépôt de la caisse (`catalogue.json` à la racine). Il ne fait pas partie du paquet de l'app et ne se modifie pas ici.

- À chaque ouverture avec du réseau, la caisse compare le `catalogue.json` en ligne avec le sien. S'il est différent (numéro de `version` **ou contenu**), la fenêtre « Nouveau catalogue disponible » s'ouvre (**Installer** ou **Plus tard** ; le panier en cours est vidé à l'installation). Pendant le service, elle ne propose l'installation que sur demande.
- **Vérifier le catalogue à la demande** : **⋮ → Vérifier le catalogue** (la tuile indique la version installée, ou « Mise à jour disponible »). Sinon : « Le catalogue est à jour », ou « Pas de réseau ».
- Le catalogue est gardé sur la tablette : sans réseau, la caisse continue avec le dernier catalogue installé. À la toute première ouverture, la tablette doit avoir du réseau et le catalogue doit avoir été publié (sinon : « Catalogue introuvable »).
- L'ordre d'affichage suit l'attribut `ordre` : celui des catégories pour les onglets, celui des articles dans chaque catégorie.
- Les IDs des articles ne doivent plus changer une fois des ventes faites.

## Articles du catalogue

La caisse sapins n'ajoute pas d'articles depuis l'app (`OPTIONS.ajoutArticles = false`) : les articles viennent uniquement du catalogue publié par l'app Admin. Le menu « Gérer le catalogue » est retiré (`GESTION_CATALOGUE = false` en haut du script) : pas de désactivation d'article ni de prix modifié sur une tablette, les réglages faits auparavant sur un appareil sont ignorés. Pour retirer un article ou changer un prix : app Admin, puis publier le catalogue.

## Envoi des ventes sur GitHub (automatique)

**Configurée pour la caisse sapins** : dépôt privé `scraper147/ventes`, dossier `sapin/`, même clé chiffrée et même phrase de passe que les autres caisses (clé renouvelée le 03/11 après expiration de l'ancienne le 27/10 : chaque tablette doit être déverrouillée à nouveau).

Fonction **masquée tant qu'elle n'est pas configurée** dans `index.html` (bloc « Options de cette caisse ») :
- `GH_REPO` : dépôt **privé** dédié aux ventes (ex. `scraper147/ventes`) ; `GH_DOSSIER` : dossier de cette caisse dans ce dépôt (ex. `sapin`).
- `CLE_CHIFFREE` : jeton GitHub des caisses (fine-grained, limité au dépôt des ventes, *Contents : Read and write*) **chiffré** avec la phrase de passe des caisses, préparé dans l'app admin (Paramètres → Préparer la clé chiffrée). Le jeton en clair ne doit jamais apparaître dans le code.

Une fois configurée :
- **Déverrouiller une tablette (une seule fois)** : toucher le bandeau **☁** de l'accueil (ou Paramètres de la tablette → **Envoi des ventes sur GitHub → Déverrouiller**), saisir la phrase de passe (majuscules et espaces sans importance). La phrase n'est jamais enregistrée ; **Verrouiller cet appareil** efface le jeton de la tablette.
- **Envoi automatique** : dès que la tablette a internet, chaque jour modifié depuis son dernier envoi part tout seul, sans message (environ 15 s après une vente ou une annulation, au plus une fois par minute ; aussi au démarrage, au déverrouillage, au retour du réseau et au retour de l'app au premier plan, puis vérification chaque minute). Sans réseau, les envois attendent et partent dès le retour d'internet.
- **État de l'envoi** :
  - **bandeau ☁ sur l'accueil** : « Envoi automatique actif : rien à envoyer », « à jour (dernier envoi le JJ/MM à HH:MM) », « dans quelques instants », « Pas de réseau : N jours à envoyer dès le retour d'internet » (orange), « Envoi automatique inactif : touchez pour déverrouiller » (rouge) ;
  - **mention ☁ dans l'en-tête de la caisse**, sous le point de vente et la date (« À jour 14:32 », « Envoi prévu », « En attente de réseau », « Envoi auto inactif ») ;
  - toucher le bandeau ou la mention ouvre la fenêtre GitHub.
- **Envoyer à la main** : **⋮ → Envoyer maintenant** (ventes du jour, la tuile rappelle l'état de l'envoi), ou **Envoyer sur GitHub / Renvoyer sur GitHub** dans « Ventes des jours précédents » (à côté de **Télécharger** ; si la tablette est verrouillée, la phrase est demandée puis le jour est envoyé).
- **Jeton refusé** (expiré ou révoqué) : la tablette oublie le jeton, le bandeau devient rouge. Installer une nouvelle version de la caisse avec la nouvelle clé, puis déverrouiller à nouveau.
- Fichier : `<GH_DOSSIER>/AAAA-MM-JJ_<point de vente>_<nom>_<appareil>.json` (même contenu que l'export) ; l'identifiant de l'appareil évite que deux tablettes du même point de vente s'écrasent ; chaque envoi remplace le fichier de cette tablette pour ce jour. Si le point de vente de la tablette change, l'ancien fichier du jour est supprimé.
- Un jour envoyé compte comme exporté : il peut ensuite être effacé de la tablette.

## Imprimante de tickets et tiroir-caisse

Matériel : imprimante **Epson TM-m30III** (version Wi-Fi ou réseau) et tiroir **BYPOS C35** (24 V, câble RJ12 branché sur la prise « DK » de l'imprimante). Le tiroir ne s'ouvre que sur ordre de la caisse, ou avec sa clé (à garder sur le stand en cas de panne).

**Installation (une fois par tablette)**
1. Imprimante allumée et connectée au même Wi-Fi que la tablette (routeur du stand ou partage de connexion ; internet n'est pas nécessaire pour imprimer).
2. Relever l'adresse IP de l'imprimante (feuille d'état : maintenir le bouton FEED en allumant l'imprimante).
3. Caisse → **Paramètres de la tablette → Imprimante de tickets et tiroir-caisse** : saisir l'adresse.
4. Toucher **Accepter le certificat** : Chrome affiche un avertissement → **Paramètres avancés → Continuer**. Revenir dans la caisse. (La caisse est en HTTPS : la tablette doit accepter une fois le certificat de l'imprimante.) Si Chrome demande l'accès aux appareils du réseau local, autoriser.
5. **Ticket test**, puis **Tester le tiroir**, puis **Enregistrer**.

Sans adresse d'imprimante, la caisse fonctionne comme avant (pas de tiroir, pas de ticket).

**À l'usage**
- **Encaisser** : choisir d'abord le mode de paiement ; il peut être changé jusqu'à la validation si le client change d'avis. Le tiroir s'ouvre quand le vendeur indique l'argent reçu (billet rapide ou **Montant exact**), une fois par encaissement ; si le montant est tapé au clavier, le tiroir s'ouvre à la validation. Après **Valider la vente** : « Imprimer le ticket ? » (Non / Imprimer), avec le montant à rendre.
- **Historique** : bouton **Ticket** sur chaque vente non annulée → réimpression marquée **DUPLICATA**.
- **⋮ → Ouvrir le tiroir** : ouverture sans vente, motif obligatoire (Faire de la monnaie, Comptage, Erreur de manipulation, Autre + précision).
- **État de l'imprimante** dans l'en-tête de la caisse (🖨 Prête, Papier bientôt fini, Plus de papier, Capot ouvert, Imprimante injoignable), vérifié toutes les 30 s ; le toucher relance la vérification.
- **Une vente n'est jamais bloquée par l'imprimante** : si le ticket ne sort pas, la vente reste enregistrée, la fenêtre « Ticket non imprimé » propose **Réessayer** (ou réimprimer plus tard depuis l'Historique). Si le tiroir ne s'ouvre pas : utiliser la clé.
- **Journal du tiroir** : chaque ouverture est enregistrée avec l'heure et le motif (« Vente » + numéro de vente, « Encaissement abandonné », « Test du tiroir », ou le motif choisi). Il est inclus dans le fichier du jour (`ouverturesTiroir`, `nombreOuverturesSansVente`) et envoyé sur GitHub avec les ventes.
- **Ticket** (proposition 1, à valider avec le gérant) : logo Agri-Garden en noir et blanc, activité, adresse / téléphone / TVA / site (bloc `TICKET` en haut du module « Ticket » dans `index.html` ; un champ vide n'est pas imprimé), n° de ticket, date, point de vente, articles (quantité × prix, remises), TOTAL en grand, nombre d'articles, paiement (cash reçu / rendu), conseil d'entretien du sapin, « Merci et joyeuses fêtes ! », « Ce ticket n'est pas une facture. », référence complète. 48 caractères par ligne, montants sans symbole (« EUR » au total).
- **⋮ → Aperçu du ticket** (sans imprimante) : choisir un jour et une vente pour voir le ticket tel qu'il sera imprimé, en version Ticket ou Duplicata ; sans vente, une vente d'exemple est utilisée. Les champs vides y apparaissent comme « [… à compléter] ». Avec imprimante : bouton **Imprimer** (duplicata).

## Annuler une vente

Onglet **Historique** : choisir le jour (aujourd'hui ou l'un des 6 jours précédents), puis **Annuler** sur la vente concernée, avec un motif facultatif.
- La vente n'est pas effacée : elle reste affichée barrée avec l'heure et le motif de l'annulation, et figure dans l'export avec un champ `annulation`. Elle n'est plus comptée dans les totaux (`totalJournee`, `totalCash`, `totalBancontact`, `nombreVentes` ; `nombreAnnulations` en plus).
- Si l'envoi automatique est actif, le jour est renvoyé tout seul. Sinon, si le jour avait déjà été exporté, il faut le télécharger à nouveau (l'app le signale).
- Une annulation ne peut pas être défaite. Le remboursement éventuel (cash ou terminal Bancontact) se fait à part.

## Tablette ou smartphone

L'app choisit seule sa présentation au démarrage, selon la taille de l'écran :
- **Tablette** : panier sur le côté, affichage en paysage.
- **Smartphone** (plus petit côté de l'écran < 600 px) : affichage en portrait, produits sur deux colonnes, panier ouvert par la barre « Voir le panier » en bas.

Les ventes, l'export et le catalogue fonctionnent de la même façon sur les deux.

## Mettre à jour l'app

Remplacez les fichiers sur GitHub (**Add file → Upload files**, puis **Commit**) : `index.html`, `sw.js`, `README.md` (et `manifest.webmanifest` / `icons` s'ils ont changé). **Jamais `catalogue.json`** : il appartient à l'app Admin.
Les tablettes prennent la nouvelle version la prochaine fois qu'elles ouvrent l'app avec du réseau.
**À chaque nouvelle version, augmentez le numéro de cache dans `sw.js`** (actuellement `var CACHE = PREFIX + 'v15';` → `'v16'`…), ainsi que `APP_VERSION` en haut de `index.html` (affichée sur l'accueil), sans changer le préfixe.

## Bonnes pratiques

- Avec l'envoi automatique actif, vérifiez de temps en temps le bandeau ☁ (pas orange ni rouge). Sans envoi GitHub, exportez les ventes au moins **deux fois par jour** (midi et soir) : menu **⋮ → Exporter les ventes du jour**.
- Pour retélécharger le fichier d'un jour précédent : menu **⋮ → Ventes des jours précédents → Télécharger**.
- N'effacez jamais les données de Chrome sur les tablettes de caisse.
- **Mémoire de l'appareil** (environ 5 Mo, partagés avec les autres caisses du même compte GitHub) : la jauge est dans **⋮ → Ventes des jours précédents**. Au-delà de 80 %, un bandeau orange s'affiche : effacez alors les anciens jours. Un jour ne peut être effacé qu'après avoir été téléchargé ou envoyé, et jamais le jour en cours.
- Si l'enregistrement échoue (mémoire pleine), une alerte rouge s'affiche : **exportez immédiatement** les ventes du jour, sans fermer l'app.
- Une tablette = un point de vente.

## Plusieurs caisses sur le même compte GitHub

Caisse sapins (`/sapin/`), Caisse Bar (`/bar/`) et Caisse Soirée (`/soiree/`) partagent l'adresse `<compte>.github.io`, donc la même mémoire navigateur et le même espace de caches. Chaque caisse doit avoir :
- ses propres clés de stockage (`STORE_KEY`, `CAT_KEY` dans `index.html`) ;
- son propre préfixe de cache (`PREFIX` dans `sw.js`) : une mise à jour ne supprime que les anciens caches de son préfixe ;
- son propre `short_name` dans `manifest.webmanifest`, pour ne pas confondre les icônes.
