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

### Routes

Voici les différentes routes permettant d'accéder aux différentes fonctionnalités du panel : 

Pour mettre à jour le modpack ou upload un modpack suivez simplement les indications à l'adresse : http://localhost:3000.

ATTENTION : L'upload du modpack doit se faire uniquement sous forme d'archive zip

> /launcher/download/:path : Permet de télécharger les fichiers à partir d'un chemin
> Par exemple : 
> Je veux télécharger un mods, je spécifie donc /launcher/download/mods/nomdumod.jar