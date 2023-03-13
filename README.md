# ModpackManager

ModpackManager est un gestionnaire de modpack minecraft permettant la mise à jour et le téléchargement d'un modpack minecraft pour launcher.
Celui-ci est une version simplifiée et subira de grandes modifications tout au long de ça vie :)

## Documentation

Installation du projet : 

```
git clone https://github.com/NelsonPhilippe/ModpackManager.git
cd ModpackManager
npm install
```
Avant de pouvoir lancer le projet créer un fichier `.env`, un fichier `.env.exemple` correspond à la structure correcte du fichier.
Ce fichier `.env` s'occupe d'initialiser en premier lieu la clé de cryptage d'authentification.
Il s'occupe aussi de créer les identifiants pour accéder au panel.

> TOKEN : Identifiant aléatoire pour encoder les tokens authentication (à générer aléatoirement)
> ADMIN_USERNAME: Correspond au username du panel
> ADMIN_PASSWORD: Correspond au mot de passe du panel


### Fonctionnement

Le fonctionnement du projet est simple, il s'occupe de télécharger les fichiers du modpack et de les mettre à jour.
Le modpack manager propose différentes routes permettant de recuperer sous forme de JSON les informations du modpack.
En passant par ce JSON, vous pourrez télécharger les fichiers du modpack, celui ci est composé de 3 parties :
- Le nom du fichier à télécharger
- Le chemin du fichier à télécharger
- Le hash du fichier à télécharger

Le hash vous permettra de verifier si le launcher possède la dernière version du fichier, si ce n'est pas le cas, vous pourrez decider de télécharger la dernière version du modpack.

Il est important de comprendre que le modpack manager ne s'occupe que de la mise à jour du modpack, il ne s'occupe pas de la mise à jour du launcher.
C'est à vous de gérer la mise à jour du launcher.

Il faut faire aussi attention au fichier compressé que vous allez utilisé, le modpack manager s'occupe de decompresser l'archive tel quelle, donc si un sous dossier est présent il le sera aussi dans le modpack manager.


### Routes

Voici les différentes routes permettant d'accéder aux différentes fonctionnalités du panel : 

Pour mettre à jour le modpack ou upload un modpack suivez simplement les indications à l'adresse : http://localhost:3000.

ATTENTION : L'upload du modpack doit se faire uniquement sous forme d'archive zip

- GET launcher/request/modpack : Permet de récupérer les informations du modpack
- GET launcher/download/:filename : Permet de télécharger un fichier du modpack, remplacer ":filename" par le chemin du fichier à télécharger