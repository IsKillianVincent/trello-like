# Trello-rn-v2

Projet de gestion de tâches et de projets, développé en React Native avec Expo. Inspiré de Trello, cette application offre des fonctionnalités de base pour la gestion de projets.

## Table des matières
- [Installation](#installation)
- [Dépendances](#dépendances)
- [Scripts](#scripts)
- [Lancer le projet](#lancer-le-projet)
- [Contributeur](#contributeur)

## Installation

1. **Clone le dépôt** :
   ```bash
   git clone https://github.com/IsKillianVincent/trello-like.git
   ```
2. **Accède au dossier du projet** :
  ```bash
  cd trello-rn-v2
  ```
3. **Installe les dépendances** : Assure-toi d'avoir installé [Node.js](https://nodejs.org/) (et Expo CLI) sur ton système.
```bash
npm install
```

## Dépendances
Le projet utilise les bibliothèques suivantes :
- Expo - ~51.0.28
- Firebase - ^11.0.1
- React Navigation pour la navigation
- React Native Elements pour les composants UI
- Async Storage pour le stockage local
- Autres dépendances (picker, shimmer, drax pour le drag and drop, etc.)
Pour plus de détails, voir le fichier package.json.

## Scripts
Les scripts suivants sont définis dans le fichier package.json pour démarrer l'application sur différentes plateformes :
- npm run start : Démarre Expo et lance l'application avec le tunnel Metro.
- npm run android : Démarre Expo et ouvre l'application dans un émulateur Android.
- npm run ios : Démarre Expo et ouvre l'application dans un émulateur iOS.
- npm run web : Démarre Expo et ouvre l'application dans le navigateur pour le développement web.


## Lancer le projet
Pour lancer le projet, utilise l'une des commandes suivantes selon ta plateforme de développement préférée :

```bash
# Lancer Expo et choisir une option de plateforme dans le menu
npm run start
# Lancer directement sur un émulateur Android
npm run android

# Lancer directement sur un émulateur iOS
npm run ios

# Lancer sur le web
npm run web
```
Important
Assure-toi d'avoir Expo Go (disponible sur Android et iOS) si tu veux tester l'application sur un appareil physique en scannant le QR code généré par Expo.

## Contributeur
Ce projet est développé et (maintenu) uniquement par **Killian Vincent**.
