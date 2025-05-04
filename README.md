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

2. Points clés de l'implémentation
Design moderne :

Utilisation de DaisyUI pour les composants (cartes, boutons, modales)

Icônes React-icons pour une meilleure visibilité

Animations fluides avec Framer Motion

Fonctionnalités :

CRUD complet avec modales popup

Sélecteur de catégories prédéfinies

Gestion des états de chargement

Validation de formulaire intégrée

Optimisations :

Affichage responsive (grille sur 3 colonnes en grand écran)

Limitation de la description à 3 lignes avec line-clamp-3

Animation lors de l'apparition des éléments

Fonctionnalités implémentées :
Système de panier complet :

Ajout/retrait d'articles

Modification des quantités

Calcul automatique du total

Panneau Offcanvas :

Affichage responsive

Animation d'ouverture/fermeture

Récapitulatif clair des articles

Page de commande :

Formulaire de livraison complet

Choix de méthode de paiement

Récapitulatif de la commande

Confirmation de commande

Expérience utilisateur :

Indicateur visuel du nombre d'articles

Feedback visuel lors des interactions

Validation de formulaire

États de chargement

Système de panier complet :

Ajout/retrait d'articles

Modification des quantités

Calcul automatique du total

Panneau Offcanvas :

Affichage responsive

Animation d'ouverture/fermeture

Récapitulatif clair des articles

Page de commande :

Formulaire de livraison complet

Choix de méthode de paiement

Récapitulatif de la commande

Confirmation de commande

Expérience utilisateur :

Indicateur visuel du nombre d'articles

Feedback visuel lors des interactions

Validation de formulaire

États de chargement

. Adaptations pour votre schéma d'API
Farmer_id : J'ai supposé que tous les produits du panier venaient du même fermier. Si ce n'est pas le cas, vous devrez :

Soit gérer les commandes multi-fermiers

Soit regrouper les produits par fermier avant de passer commande

Statut : Mis par défaut à "pending" comme requis

Items : Formaté exactement comme demandé avec :

product_id

quantity

unit_price

total_price

Validation : Tous les champs requis sont inclus :

buyer_id (récupéré de l'utilisateur connecté)

farmer_id

total_amount

delivery_type

status

items

Fonctionnalités clés :
Expérience utilisateur complète :

Modal propre avec états de chargement

Retour visuel en cas de succès/échec

Panier vidé après commande réussie

Adapté à votre API :

Structure de données conforme

Tous les champs requis inclus

Gestion des erreurs

UI professionnelle :

Icônes pour une meilleure lisibilité

Options de livraison claires

Récapitulatif visible pendant la commande

Responsive :

Adapté aux mobiles et desktop