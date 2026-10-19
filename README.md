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
   `index.html`, `manifest.webmanifest`, `sw.js`, `catalogue.json`, `README.md` et le dossier `icons`.
5. Cliquez sur **Commit changes**.
6. Allez dans **Settings → Pages** :
   - Source : **Deploy from a branch**
   - Branch : **main**, dossier **/ (root)**
   - Cliquez sur **Save**
7. Attendez 1 à 2 minutes. L'adresse s'affiche en haut de la page Pages :
   `https://scraper147.github.io/sapin/`

⚠️ Une fois les appareils installés, ne renommez plus le dépôt : l'adresse changerait et les apps installées ne s'ouvriraient plus.

## Installation sur une tablette ou un smartphone

1. Connectez la tablette à internet (wifi ou partage de connexion).
2. Ouvrez l'adresse dans **Chrome**.
3. Menu **⋮ → Installer l'application** (ou **Ajouter à l'écran d'accueil**).
4. Lancez l'app depuis l'icône **« Caisse Sapins »**.
5. Le catalogue se charge tout seul. Dans **Paramètres de la tablette**, choisissez le **point de vente** de la tablette, puis **Enregistrer**.

À partir de là, l'app fonctionne sans internet.

## Articles du catalogue

La caisse sapins n'ajoute pas d'articles depuis l'app (`OPTIONS.ajoutArticles = false` dans `index.html`) : le catalogue vient uniquement de `catalogue.json`, préparé avec l'app admin. Sur chaque appareil, on peut seulement désactiver des articles ou changer un prix (voir plus bas).

## Modifier catalogue.json à la main

- L'ordre d'affichage suit l'attribut `ordre` : celui des catégories pour les onglets, celui des articles dans chaque catégorie (du plus petit au plus grand).
- Après avoir déposé le fichier, chaque caisse ouverte avec du réseau propose « Nouveau catalogue disponible » → **Installer**, même si le numéro de `version` n'a pas changé (la caisse compare aussi le contenu). Augmenter la `version` reste conseillé, pour savoir quelle version est installée sur chaque appareil.

## Envoyer les ventes sur GitHub (facultatif, uniquement sur demande)

**Activé pour la caisse sapins** : dépôt privé `scraper147/ventes`, dossier `sapin/`, même jeton chiffré et même phrase de passe que la Caisse Bar.

Fonction **masquée tant qu'elle n'est pas configurée** dans `index.html` (bloc « Options de cette caisse ») :
- `GH_REPO` : dépôt **privé** dédié aux ventes (ex. `scraper147/ventes`) ; `GH_DOSSIER` : dossier de cette caisse dans ce dépôt (ex. `sapin`).
- `CLE_CHIFFREE` : jeton GitHub des caisses (fine-grained, limité au dépôt des ventes, *Contents : Read and write*) **chiffré** avec la phrase de passe des caisses, préparé dans l'app admin (Paramètres → Préparer la clé chiffrée). Le jeton en clair ne doit jamais apparaître dans le code.

Une fois configurée :
- **Déverrouiller une tablette (une seule fois)** : Paramètres de la tablette → **Envoi des ventes sur GitHub → Déverrouiller**, saisir la phrase de passe (majuscules et espaces sans importance). La phrase n'est jamais enregistrée ; **Verrouiller cet appareil** efface le jeton de la tablette.
- **Envoyer** (jamais automatiquement) : **⋮ → Envoyer les ventes du jour sur GitHub**, ou **Envoyer sur GitHub / Renvoyer sur GitHub** dans « Ventes des jours précédents » (à côté de **Télécharger** ; si la tablette est verrouillée, la phrase est demandée puis le jour est envoyé).
- Fichier : `<GH_DOSSIER>/AAAA-MM-JJ_<point de vente>_<nom>_<appareil>.json` (même contenu que l'export) ; l'identifiant de l'appareil évite que deux tablettes du même point de vente s'écrasent ; un renvoi remplace le fichier de cette tablette pour ce jour.

## Annuler une vente

Onglet **Historique** : choisir le jour (aujourd'hui ou l'un des 6 jours précédents), puis **Annuler** sur la vente concernée, avec un motif facultatif.
- La vente n'est pas effacée : elle reste affichée barrée avec l'heure et le motif de l'annulation, et figure dans l'export avec un champ `annulation`. Elle n'est plus comptée dans les totaux (`totalJournee`, `totalCash`, `totalBancontact`, `nombreVentes` ; `nombreAnnulations` en plus).
- Si le jour avait déjà été exporté, il faut le télécharger à nouveau (l'app le signale).
- Une annulation ne peut pas être défaite. Le remboursement éventuel (cash ou terminal Bancontact) se fait à part.

## Activer / désactiver des articles, changer un prix

Menu **⋮ → Gérer le catalogue** : liste de tous les articles par catégorie, avec un interrupteur par article et un « Tout activer / Tout désactiver » par catégorie.
- Un article désactivé n'apparaît plus dans la caisse ; une catégorie sans article actif est masquée.
- Le réglage est propre à chaque appareil et reste valable après les mises à jour de `catalogue.json`. Le catalogue lui-même n'est pas modifié.
- **Changer un prix** : toucher le prix de l'article, saisir le nouveau prix, **Enregistrer**. Le prix d'origine reste affiché (« catalogue : … ») et le bouton **Revenir au prix du catalogue** annule la modification. Le nouveau prix vaut pour les prochaines ventes de cet appareil ; les ventes déjà faites ne changent pas.

## Tablette ou smartphone

L'app choisit seule sa présentation au démarrage, selon la taille de l'écran :
- **Tablette** : panier sur le côté, affichage en paysage.
- **Smartphone** (plus petit côté de l'écran < 600 px) : affichage en portrait, produits sur deux colonnes, panier ouvert par la barre « Voir le panier » en bas.

Les ventes, l'export et le catalogue fonctionnent de la même façon sur les deux.

## Mettre à jour l'app

Remplacez les fichiers sur GitHub (**Add file → Upload files**, puis **Commit**).
Les tablettes prennent la nouvelle version la prochaine fois qu'elles ouvrent l'app avec du réseau.
**À chaque nouvelle version, augmentez le numéro de cache dans `sw.js`** (`var CACHE = PREFIX + 'v9';` → `'v10'`…), sans changer le préfixe.

## Mettre à jour les prix ou les produits

Le catalogue est le fichier `catalogue.json` du dépôt.

1. Modifiez `catalogue.json` (ou remplacez-le par celui exporté de l'app admin).
2. **Augmentez le numéro `version`** (par exemple de 2 à 3), sinon les tablettes ne verront pas le changement.
3. Déposez-le sur GitHub (**Add file → Upload files**, puis **Commit**).

À la prochaine ouverture avec du réseau, chaque tablette affiche « Nouveau catalogue disponible » et propose de l'installer.
Le bouton **Paramètres de la tablette → Vérifier les mises à jour** force la vérification.

## Bonnes pratiques

- Exportez les ventes au moins **deux fois par jour** (midi et soir) : menu **⋮ → Exporter les ventes du jour**.
- Pour retélécharger le fichier d'un jour précédent : menu **⋮ → Ventes des jours précédents → Télécharger**.
- N'effacez jamais les données de Chrome sur les tablettes de caisse.
- **Mémoire de l'appareil** (environ 5 Mo, partagés avec les autres caisses du même compte GitHub) : la jauge est dans **⋮ → Ventes des jours précédents**. Au-delà de 80 %, un bandeau orange s'affiche : effacez alors les anciens jours. Un jour ne peut être effacé qu'après avoir été téléchargé, et jamais le jour en cours.
- Si l'enregistrement échoue (mémoire pleine), une alerte rouge s'affiche : **exportez immédiatement** les ventes du jour, sans fermer l'app.
- Une tablette = un point de vente.

## Cohabitation avec la Caisse Bar (même compte GitHub)

La caisse sapins (`/sapin/`) et la Caisse Bar (`/bar/`) partagent l'adresse `scraper147.github.io`, donc la même mémoire navigateur et le même espace de caches. Caisse sapins : clés `agrigarden-caisse` et `agrigarden-caisse-catalogue`, cache `caisse-agri-garden-v9`, icône « Caisse Sapins ». Chaque caisse doit avoir :
- ses propres clés de stockage (`STORE_KEY`, `CAT_KEY` dans `index.html`) ;
- son propre préfixe de cache (`PREFIX` dans `sw.js`) : une mise à jour ne supprime que les anciens caches de son préfixe ;
- son propre `short_name` dans `manifest.webmanifest`, pour ne pas confondre les icônes.
