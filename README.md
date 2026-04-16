# PopLove Frontend - Angular

Ce projet est développé en Angular 17.

## Lance ment Rapide

L'API Node.js doit tourner simultanément sur le port `3000`.

Pour ce frontend Angular, placez-vous dans le dossier \`Front_angular\` :

```bash
cd "c:\Master\M1\S2\DFS\Projet TP\Front_angular"
```

Installez les dépendances (si ce n'est pas déjà fait) :

```bash
npm install
```

Lancez le serveur de développement :

```bash
npm start
```

_Le site sera par défaut accessible sur `http://localhost:4200` (ou un port alternatif s'il est déjà occupé)._

## 🛠️ Stack Technique

- **Angular 17+** propulse l'application avec ses paradigmes récents :
  - **Standalone Components** (plus de `NgModules` complexes).
  - **Signals** : Pour une réactivité ultra rapide (ex: le panier et l'état de connexion de l'utilisateur).
  - **RxJS & HttpClient** : Pour l'interrogation de l'API Node.js et l'intercepteur de token JWT.
  - **Vanilla CSS** : Design intentionnellement géré avec une feuille de styles traditionnelle sans dépendance superflue.
- **jwt-decode** : La seule bibliothèque externe côté front, pour décoder la session utilisateur depuis la chaîne JWT chiffrée.
