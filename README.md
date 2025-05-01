# Fil Rouge

## Dependences
```bash
npm install tailwindcss @tailwindcss/postcss postcss
npm i json-server  
npm i react-router-dom
npm install axios 
npm install animate.css --save
npm i swiper
npm install react-icons
npm install react-toastify
npm install zustand
npm install @tanstack/react-query
npm install framer-motion
npm install react-awesome-reveal
npm install react-lazy-load-image-component
npm i -D daisyui@latest
```

- react-icons → Bibliothèque d'icônes (Font Awesome, Material Icons, etc.)
- react-toastify → Notifications élégantes
- zustand → Léger et simple (alternative à Redux)
- react-query → Gestion des requêtes API (cache, mutations, etc.)
- framer-motion → Animations fluides
- react-awesome-reveal → Animations au scroll
- react-lazy-load-image-component → Chargement différé des images
- daisyUI (pour Tailwind CSS) → Composants UI prêts à l'emploi

## Lancement
```bash
npx json-server db.json
npm run dev
```

Fonctionnalités clés :
Validation robuste : Utilisation de Zod pour des schémas de validation complets

Gestion d'état optimisée : Context API avec useCallback pour éviter les rendus inutiles

UI moderne : Intégration de Tailwind CSS et DaisyUI

Sécurité : Protection des routes et stockage sécurisé du token

Expérience utilisateur : Feedback visuel pendant le chargement et pour les erreurs

Optimisation : Mémoïsation des fonctions et gestion propre des effets

Extensibilité : Architecture facile à étendre pour des besoins futurs

Fonctionnalités clés :
Affichage des projets sous forme de cartes responsive

Modales animées pour créer/modifier des projets

Validation des formulaires intégrée

Animations fluides avec Framer Motion

Design moderne avec Tailwind et DaisyUI

Statuts visuels avec badges colorés

Responsive design pour tous les appareils

Gestion des produits :

Affichage sous forme de cartes avec image

Tous les champs du schéma sont pris en compte

Gestion des images (affichage et upload)

Modale de formulaire :

Formulaire complet avec tous les champs

Sélecteurs pour les unités, catégories et statuts

Case à cocher pour le statut bio

Upload d'image

UI/UX :

Animations fluides avec Framer Motion

Design responsive avec Tailwind

Icônes pertinentes avec react-icons

Badges colorés pour le statut

Fonctionnalités :

Création, modification et suppression

Liaison avec les projets

Gestion des quantités et prix