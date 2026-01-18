---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
workflowType: 'epics-and-stories'
project_name: 'karaoke-landing-page'
user_name: 'Guillaume'
date: '2026-01-18'
lastStep: 4
status: 'complete'
completedAt: '2026-01-18'
totalEpics: 7
totalStories: 33
frCoverage: '62/62 (100%)'
---

# karaoke-landing-page - Epic Breakdown

## Overview

Ce document fournit la décomposition complète en epics et stories pour karaoke-landing-page, transformant les exigences du PRD, de l'Architecture et du Design UX en stories implémentables.

## Requirements Inventory

### Functional Requirements

**Navigation & Structure (FR1-FR4)**
- FR1: Landing page single-page avec scroll fluide
- FR2: Anchor links via menu sticky
- FR3: Sélecteur de langue visible (FR/EN/ES)
- FR4: Détection automatique langue selon localisation/navigateur

**Hero Section (FR5-FR9)**
- FR5: Vidéo autoplay silencieux
- FR6: Accroche "Chantez. Jouez. Vibrez." (traduite)
- FR7: Ticker défilant de titres du catalogue
- FR8: CTA primaire "Essayer gratuitement" → redirect app
- FR9: CTA secondaire "Voir les offres" → scroll pricing

**Proposition de Valeur (FR10-FR11)**
- FR10: Présentation des 3 modes (Karaoké, Blind Test, Quiz)
- FR11: Message "plateforme multi-jeux, pas juste karaoké"

**Catalogue Preview (FR12-FR21)**
- FR12: Parcours 3 étapes "Comment ça marche"
- FR13: Aperçu interactif du catalogue
- FR14: Recherche par titre de chanson
- FR15: Recherche par artiste
- FR16: Affichage disponibilité après recherche
- FR17: Navigation playlists thématiques
- FR18: Affichage contenu des playlists
- FR19: Filtre par genre musical
- FR20: Filtre par décennie
- FR21: Filtre par langue

**Social Proof (FR22-FR24)**
- FR22: Témoignages avec citations et résultats chiffrés
- FR23: Logos établissements clients
- FR24: Témoignages identifiables par segment (bar/RH/particulier)

**Pricing (FR25-FR28)**
- FR25: 3 offres distinctes (Soirée, Régulier, Établissement)
- FR26: Max 5 features par offre
- FR27: Prix en devise locale (€/£)
- FR28: Clic offre → inscription/paiement

**FAQ (FR29-FR31)**
- FR29: 5-6 questions fréquentes
- FR30: Accordion déplier/replier
- FR31: Mention "sans carte bancaire" près CTAs

**Conversion (FR32-FR34)**
- FR32: CTA final en bas de page
- FR33: Clic CTA → app freemium
- FR34: Redirection vers app SPA existante

**Newsletter (FR35-FR38)**
- FR35: Formulaire inscription newsletter
- FR36: Champ newsletter dans footer
- FR37: Section newsletter dédiée fin de page
- FR38: Confirmation après inscription

**Internationalisation (FR39-FR47)**
- FR39: Contenu disponible en français
- FR40: Contenu disponible en anglais
- FR41: Contenu disponible en espagnol
- FR42: URLs localisées (/fr/, /en/, /es/)
- FR43: Changement langue sans perdre position
- FR44: Balises meta par version linguistique
- FR45: Structured data Schema.org (Organization, Product, FAQ)
- FR46: Sitemap XML multi-langue
- FR47: Balises hreflang inter-versions

**Contact & RDV Landing (FR48-FR52)**
- FR48: Choix réserver créneau OU demander rappel
- FR49: Calendrier RDV intégré (Calendly/Cal.com)
- FR50: Formulaire rappel (nom, email, téléphone, message)
- FR51: Confirmation après réservation
- FR52: Confirmation après soumission formulaire

**Page Contact (FR53-FR62)**
- FR53: Page contact accessible via navigation et footer
- FR54: Formulaire de contact complet (Nom, Email, Téléphone, Type de demande, Message)
- FR55: Dropdown "Type de demande" (Question générale, Devis B2B, Support technique, Partenariat, Autre)
- FR56: Validation des champs obligatoires (Nom, Email, Message)
- FR57: Confirmation visuelle après envoi du formulaire
- FR58: Calendrier RDV intégré (même que landing)
- FR59: FAQ rapide avec 3-4 questions fréquentes (accordion)
- FR60: Liens vers réseaux sociaux (Instagram, LinkedIn, Facebook, etc.)
- FR61: Page disponible en 3 langues (FR/EN/ES)
- FR62: Balises meta SEO spécifiques à la page contact

### Non-Functional Requirements

**Performance (NFR1-NFR11)**
- NFR1: LCP < 2.5s
- NFR2: FID < 100ms
- NFR3: CLS < 0.1
- NFR4: PageSpeed Mobile > 90
- NFR5: PageSpeed Desktop > 95
- NFR6: Time to Interactive < 3s
- NFR7: Temps serveur < 200ms
- NFR8: Vidéo Hero < 2MB avec poster image
- NFR9: Images WebP/AVIF, lazy loading
- NFR10: CSS Critical inline < 14KB
- NFR11: JS minimal, defer/async

**SEO Technique (NFR12-NFR15)**
- NFR12: Title + meta description optimisés
- NFR13: Structure Hn sémantique (H1 unique)
- NFR14: URLs canoniques
- NFR15: Sitemap XML + robots.txt

**Accessibilité WCAG AA (NFR16-NFR22)**
- NFR16: Contraste texte ≥ 4.5:1
- NFR17: Contraste grands textes ≥ 3:1
- NFR18: Navigation clavier 100%
- NFR19: Focus visible tous éléments
- NFR20: Alt text images informatives
- NFR21: Formulaires avec labels explicites
- NFR22: Zoom fonctionnel à 200%

**Sécurité & GDPR (NFR23-NFR27)**
- NFR23: HTTPS TLS 1.2+ obligatoire
- NFR24: Anti-spam honeypot ou reCAPTCHA invisible
- NFR25: Newsletter avec consentement explicite GDPR
- NFR26: Bannière consentement cookies
- NFR27: Transmission données sécurisée

**Browser Support (NFR28-NFR31)**
- NFR28: Chrome (2 dernières versions)
- NFR29: Firefox (2 dernières versions)
- NFR30: Safari (2 dernières versions)
- NFR31: Edge (2 dernières versions)

### Additional Requirements

**Architecture - Starter Template**
- ARCH1: Initialisation Astro 5 avec template "one" (shadcn/ui)
- ARCH2: Configuration TypeScript 5 strict mode
- ARCH3: Configuration Tailwind CSS 4

**Architecture - Infrastructure**
- ARCH4: Hébergement Vercel avec CI/CD automatique
- ARCH5: Variables d'environnement (CATALOGUE_API_URL, BACKEND_API_URL, GA_MEASUREMENT_ID)
- ARCH6: Preview deployments sur Pull Requests

**Architecture - Intégrations**
- ARCH7: Build-time fetch catalogue → JSON statique
- ARCH8: Client-side search avec Fuse.js
- ARCH9: POST formulaires vers backend SPA existant
- ARCH10: Analytics GA4 avec consent mode
- ARCH11: Cookie consent avec CookieConsent by Orestbida
- ARCH12: Embed Calendly/Cal.com pour RDV

**UX Design - Design System**
- UX1: Tailwind CSS + shadcn/ui components
- UX2: Design tokens custom (colors, fonts, spacing)
- UX3: Direction visuelle "Playful Balance"

**UX Design - Components Custom**
- UX4: SongTicker (défilement infini)
- UX5: CatalogueSearch (autocomplete accessible)
- UX6: TestimonialCard (badge segment)
- UX7: PricingCard (highlight offre recommandée)
- UX8: SectionWrapper (conteneur réutilisable)
- UX9: LanguageSwitcher (dropdown/segmented)

**UX Design - Responsive & Accessibilité**
- UX10: Mobile-first approach
- UX11: Breakpoints sm/md/lg/xl/2xl
- UX12: Touch targets minimum 44px
- UX13: Support prefers-reduced-motion
- UX14: Skip link navigation
- UX15: Focus ring 2px sur tous les interactifs

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Landing page single-page avec scroll fluide |
| FR2 | Epic 1 | Anchor links via menu sticky |
| FR3 | Epic 1 | Sélecteur de langue visible (FR/EN/ES) |
| FR4 | Epic 1 | Détection automatique langue |
| FR5 | Epic 2 | Vidéo autoplay silencieux |
| FR6 | Epic 2 | Accroche "Chantez. Jouez. Vibrez." |
| FR7 | Epic 2 | Ticker défilant de titres |
| FR8 | Epic 2 | CTA primaire "Essayer gratuitement" |
| FR9 | Epic 2 | CTA secondaire "Voir les offres" |
| FR10 | Epic 2 | Présentation des 3 modes |
| FR11 | Epic 2 | Message "plateforme multi-jeux" |
| FR12 | Epic 3 | Parcours 3 étapes "Comment ça marche" |
| FR13 | Epic 3 | Aperçu interactif du catalogue |
| FR14 | Epic 3 | Recherche par titre de chanson |
| FR15 | Epic 3 | Recherche par artiste |
| FR16 | Epic 3 | Affichage disponibilité après recherche |
| FR17 | Epic 3 | Navigation playlists thématiques |
| FR18 | Epic 3 | Affichage contenu des playlists |
| FR19 | Epic 3 | Filtre par genre musical |
| FR20 | Epic 3 | Filtre par décennie |
| FR21 | Epic 3 | Filtre par langue |
| FR22 | Epic 4 | Témoignages avec citations |
| FR23 | Epic 4 | Logos établissements clients |
| FR24 | Epic 4 | Témoignages par segment |
| FR25 | Epic 4 | 3 offres distinctes |
| FR26 | Epic 4 | Max 5 features par offre |
| FR27 | Epic 4 | Prix en devise locale |
| FR28 | Epic 4 | Clic offre → inscription |
| FR29 | Epic 5 | 5-6 questions FAQ |
| FR30 | Epic 5 | Accordion déplier/replier |
| FR31 | Epic 5 | Mention "sans carte bancaire" |
| FR32 | Epic 2 | CTA final en bas de page |
| FR33 | Epic 2 | Clic CTA → app freemium |
| FR34 | Epic 2 | Redirection vers app SPA |
| FR35 | Epic 5 | Formulaire inscription newsletter |
| FR36 | Epic 5 | Champ newsletter dans footer |
| FR37 | Epic 5 | Section newsletter dédiée |
| FR38 | Epic 5 | Confirmation après inscription |
| FR39 | Epic 1 | Contenu disponible en français |
| FR40 | Epic 1 | Contenu disponible en anglais |
| FR41 | Epic 1 | Contenu disponible en espagnol |
| FR42 | Epic 1 | URLs localisées (/fr/, /en/, /es/) |
| FR43 | Epic 1 | Changement langue sans perdre position |
| FR44 | Epic 7 | Balises meta par version linguistique |
| FR45 | Epic 7 | Structured data Schema.org |
| FR46 | Epic 7 | Sitemap XML multi-langue |
| FR47 | Epic 7 | Balises hreflang inter-versions |
| FR48 | Epic 6 | Choix réserver créneau OU rappel |
| FR49 | Epic 6 | Calendrier RDV intégré |
| FR50 | Epic 6 | Formulaire rappel |
| FR51 | Epic 6 | Confirmation après réservation |
| FR52 | Epic 6 | Confirmation après soumission |
| FR53 | Epic 6 | Page contact accessible |
| FR54 | Epic 6 | Formulaire contact complet |
| FR55 | Epic 6 | Dropdown "Type de demande" |
| FR56 | Epic 6 | Validation champs obligatoires |
| FR57 | Epic 6 | Confirmation visuelle après envoi |
| FR58 | Epic 6 | Calendrier RDV (page contact) |
| FR59 | Epic 6 | FAQ rapide accordion |
| FR60 | Epic 6 | Liens réseaux sociaux |
| FR61 | Epic 6 | Page contact en 3 langues |
| FR62 | Epic 6 | Balises meta SEO page contact |

---

## Epic List

### Epic 1: Fondation & Navigation Core

Les utilisateurs peuvent naviguer sur une structure de landing page fonctionnelle en 3 langues avec un header sticky, des anchor links et un language switcher.

**FRs couverts:** FR1, FR2, FR3, FR4, FR39, FR40, FR41, FR42, FR43
**Requirements additionnels:** ARCH1, ARCH2, ARCH3, ARCH4, ARCH5, ARCH6, UX1, UX2, UX8, UX9, UX10, UX11

---

### Epic 2: Hero & Proposition de Valeur

Les utilisateurs atterrissent sur la page, comprennent l'offre en moins de 30 secondes grâce au Hero impactant et peuvent cliquer pour essayer l'application freemium.

**FRs couverts:** FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR32, FR33, FR34
**Requirements additionnels:** UX3, UX4, NFR1, NFR8

---

### Epic 3: Découverte du Catalogue

Les utilisateurs peuvent rechercher et valider que leurs chansons préférées sont disponibles via une recherche instantanée avec filtres.

**FRs couverts:** FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21
**Requirements additionnels:** ARCH7, ARCH8, UX5

---

### Epic 4: Preuve Sociale & Pricing

Les utilisateurs voient des témoignages de leur segment (bar, RH, particulier) et comprennent le pricing avec les 3 offres clairement différenciées.

**FRs couverts:** FR22, FR23, FR24, FR25, FR26, FR27, FR28
**Requirements additionnels:** UX6, UX7

---

### Epic 5: FAQ & Newsletter

Les utilisateurs trouvent des réponses à leurs questions fréquentes et peuvent s'inscrire à la newsletter pour rester informés.

**FRs couverts:** FR29, FR30, FR31, FR35, FR36, FR37, FR38
**Requirements additionnels:** ARCH9, NFR24, NFR25

---

### Epic 6: Contact & Réservation

Les utilisateurs B2B peuvent contacter l'équipe via formulaire ou réserver un RDV démo via le calendrier intégré.

**FRs couverts:** FR48, FR49, FR50, FR51, FR52, FR53, FR54, FR55, FR56, FR57, FR58, FR59, FR60, FR61, FR62
**Requirements additionnels:** ARCH9, ARCH12

---

### Epic 7: SEO & Analytics

Le site est optimisé pour le référencement multi-langue et le tracking des conversions avec GDPR compliance.

**FRs couverts:** FR44, FR45, FR46, FR47
**Requirements additionnels:** ARCH10, ARCH11, NFR12, NFR13, NFR14, NFR15, NFR23, NFR26

---

## Epic 1: Fondation & Navigation Core

Les utilisateurs peuvent naviguer sur une structure de landing page fonctionnelle en 3 langues avec un header sticky, des anchor links et un language switcher.

### Story 1.1: Project Setup Astro 5

**As a** développeur,
**I want** un projet Astro 5 configuré avec Tailwind CSS 4 et shadcn/ui,
**So that** je peux commencer le développement avec une base solide et un déploiement fonctionnel.

**Acceptance Criteria:**

**Given** aucun projet n'existe
**When** j'exécute la commande d'initialisation Astro 5
**Then** le projet est créé avec la structure de base
**And** TypeScript 5 est configuré en mode strict
**And** Tailwind CSS 4 est installé et fonctionnel
**And** shadcn/ui est initialisé avec les composants Button, Card, Input, Accordion
**And** les design tokens (couleurs, fonts) sont configurés selon le UX spec
**And** le projet se build sans erreur
**And** le déploiement Vercel est fonctionnel avec preview deployments

---

### Story 1.2: Layout Core Components

**As a** utilisateur,
**I want** une page avec un header, un contenu principal et un footer,
**So that** je peux naviguer sur une structure claire et cohérente.

**Acceptance Criteria:**

**Given** le projet Astro est configuré
**When** j'accède à la page d'accueil
**Then** le Layout.astro principal est appliqué
**And** le Header.astro affiche un logo et un espace pour la navigation
**And** le Footer.astro affiche les liens légaux et réseaux sociaux
**And** le Container.astro centre le contenu avec les marges responsive
**And** le SectionWrapper.astro permet d'envelopper chaque section avec variantes de fond
**And** la structure est responsive (mobile/tablet/desktop)
**And** le skip link "Aller au contenu" est présent pour l'accessibilité (UX14)

---

### Story 1.3: Configuration i18n

**As a** utilisateur francophone, anglophone ou hispanophone,
**I want** accéder au contenu dans ma langue via des URLs dédiées,
**So that** je peux lire le contenu dans ma langue préférée.

**Acceptance Criteria:**

**Given** le layout est en place
**When** j'accède à /fr/, /en/ ou /es/
**Then** le contenu s'affiche dans la langue correspondante
**And** les URLs sont localisées (/fr/, /en/, /es/)
**And** le fichier de traductions est structuré avec dot notation (hero.title, hero.cta.primary)
**And** la fonction useTranslations() est disponible pour les composants
**And** la page index.astro redirige vers /fr/ par défaut
**And** la détection automatique de langue est configurée (FR4)

---

### Story 1.4: Navigation Sticky avec Anchor Links

**As a** utilisateur,
**I want** un menu de navigation fixe avec des liens vers les sections,
**So that** je peux naviguer rapidement entre les sections de la page.

**Acceptance Criteria:**

**Given** je suis sur la landing page
**When** je scroll la page
**Then** le header reste visible en position sticky
**And** le header devient compact avec une ombre au scroll
**And** les anchor links (#hero, #pricing, #faq, etc.) sont présents
**And** le clic sur un anchor link scrolle smoothly vers la section
**And** l'offset de scroll compense la hauteur du header (80px)
**And** le lien actif est visuellement différencié
**And** la navigation fonctionne au clavier (NFR18)
**And** les focus states sont visibles (UX15)

---

### Story 1.5: Language Switcher

**As a** utilisateur,
**I want** changer de langue depuis le header,
**So that** je peux consulter le contenu dans ma langue préférée sans perdre ma position.

**Acceptance Criteria:**

**Given** je suis sur une section de la landing page
**When** je clique sur le language switcher dans le header
**Then** un dropdown affiche les 3 langues (FR/EN/ES)
**And** je peux sélectionner une autre langue
**And** la page se recharge dans la nouvelle langue
**And** ma position de scroll est préservée (FR43)
**And** l'URL change vers le bon préfixe de langue
**And** le composant est accessible au clavier avec ARIA
**And** le touch target est de minimum 44px (UX12)

---

## Epic 2: Hero & Proposition de Valeur

Les utilisateurs atterrissent sur la page, comprennent l'offre en moins de 30 secondes grâce au Hero impactant et peuvent cliquer pour essayer l'application freemium.

### Story 2.1: Hero Section Base

**As a** visiteur,
**I want** voir une vidéo immersive avec l'accroche principale dès mon arrivée,
**So that** je comprends immédiatement l'ambiance et le positionnement du produit.

**Acceptance Criteria:**

**Given** j'accède à la landing page
**When** la page se charge
**Then** la section Hero s'affiche en plein écran (above the fold)
**And** une vidéo en autoplay silencieux se lance (muted)
**And** la vidéo fait moins de 2MB avec une image poster de fallback
**And** l'accroche "Chantez. Jouez. Vibrez." s'affiche (traduite selon la langue)
**And** le LCP est inférieur à 2.5s (NFR1)
**And** si prefers-reduced-motion, l'image poster statique est affichée à la place de la vidéo

---

### Story 2.2: Song Ticker Component

**As a** visiteur,
**I want** voir défiler les titres de chansons populaires,
**So that** je comprends immédiatement la richesse du catalogue.

**Acceptance Criteria:**

**Given** la section Hero est affichée
**When** je regarde le ticker de chansons
**Then** les titres défilent horizontalement en boucle infinie
**And** la vitesse est d'environ 50px/sec
**And** le défilement se met en pause au hover
**And** le composant a `aria-live="polite"` pour les lecteurs d'écran
**And** si prefers-reduced-motion, le ticker est statique avec scroll horizontal
**And** les données sont chargées depuis un fichier JSON statique

---

### Story 2.3: Hero CTAs

**As a** visiteur,
**I want** voir des boutons d'action clairs dans le Hero,
**So that** je peux essayer gratuitement ou voir les offres.

**Acceptance Criteria:**

**Given** je suis dans la section Hero
**When** je regarde les CTAs
**Then** le CTA primaire "Essayer gratuitement" est visible et prominent
**And** le CTA secondaire "Voir les offres" est visible en style secondaire
**And** le clic sur le CTA primaire redirige vers l'app SPA externe (FR34)
**And** le clic sur le CTA secondaire scrolle vers la section Pricing
**And** les boutons ont des touch targets de minimum 44px
**And** les focus states sont visibles pour l'accessibilité
**And** les textes des CTAs sont traduits selon la langue

---

### Story 2.4: Proposition de Valeur Section

**As a** visiteur,
**I want** comprendre que c'est plus qu'un simple karaoké,
**So that** je perçois la valeur complète de la plateforme.

**Acceptance Criteria:**

**Given** je scroll après le Hero
**When** j'arrive sur la section Proposition
**Then** les 3 modes sont présentés visuellement (Karaoké, Blind Test, Quiz)
**And** chaque mode a une icône distinctive et un titre clair
**And** le message "plateforme multi-jeux, pas juste karaoké" est communiqué
**And** la section utilise le SectionWrapper avec fond approprié
**And** le layout est responsive (stack mobile, 3 colonnes desktop)
**And** le contenu est traduit dans les 3 langues

---

### Story 2.5: CTA Final Section

**As a** visiteur ayant scrollé la page,
**I want** avoir un dernier appel à l'action clair,
**So that** je peux convertir après avoir consulté tout le contenu.

**Acceptance Criteria:**

**Given** j'ai scrollé jusqu'en bas de la landing page
**When** j'arrive à la section CTA finale
**Then** un CTA "Essayer gratuitement" est visible
**And** le message "sans carte bancaire" est affiché près du CTA
**And** le fond est en couleur primaire (gradient) pour attirer l'attention
**And** le clic redirige vers l'app SPA freemium
**And** le texte est traduit dans les 3 langues

---

## Epic 3: Découverte du Catalogue

Les utilisateurs peuvent rechercher et valider que leurs chansons préférées sont disponibles via une recherche instantanée avec filtres.

### Story 3.1: Section Comment ça marche

**As a** visiteur,
**I want** comprendre en 3 étapes simples comment utiliser le service,
**So that** je suis rassuré sur la facilité d'utilisation.

**Acceptance Criteria:**

**Given** je scroll après la Proposition de Valeur
**When** j'arrive sur la section "Comment ça marche"
**Then** 3 étapes visuelles sont présentées clairement
**And** chaque étape a un numéro, une icône et une description concise
**And** le parcours est : Connectez → Choisissez → Chantez (ou équivalent)
**And** le layout est responsive (vertical mobile, horizontal desktop)
**And** le contenu est traduit dans les 3 langues

---

### Story 3.2: Catalogue Data Integration

**As a** développeur,
**I want** les données du catalogue disponibles au build-time,
**So that** la recherche soit instantanée sans appels API runtime.

**Acceptance Criteria:**

**Given** le build Astro s'exécute
**When** le script de fetch catalogue est appelé
**Then** les données sont récupérées depuis l'API catalogue (CATALOGUE_API_URL)
**And** les données sont transformées en JSON statique (catalogue.json)
**And** le fichier inclut : titre, artiste, genre, décennie, langue
**And** un fallback avec données statiques existe si l'API échoue
**And** les types TypeScript sont définis (Song, Artist, Playlist)

---

### Story 3.3: Catalogue Search Component

**As a** visiteur,
**I want** rechercher une chanson ou un artiste instantanément,
**So that** je valide que mes chansons préférées sont disponibles.

**Acceptance Criteria:**

**Given** je suis sur la section Catalogue
**When** je tape dans le champ de recherche
**Then** les résultats apparaissent après 2 caractères
**And** la recherche utilise Fuse.js en client-side
**And** le debounce est de 200ms pour éviter les requêtes excessives
**And** max 5-8 résultats sont affichés
**And** chaque résultat affiche : titre + artiste + langue
**And** le composant a `role="combobox"` avec navigation clavier
**And** le message "Pas de résultat" s'affiche si aucun match
**And** le placeholder "Recherchez votre chanson..." est traduit

---

### Story 3.4: Catalogue Filters

**As a** visiteur,
**I want** filtrer le catalogue par genre, décennie ou langue,
**So that** je découvre des chansons selon mes préférences.

**Acceptance Criteria:**

**Given** je suis sur la section Catalogue
**When** je sélectionne un filtre (genre, décennie, langue)
**Then** les résultats de recherche sont filtrés en conséquence
**And** les filtres sont combinables (ET logique)
**And** un bouton "Réinitialiser" efface tous les filtres
**And** les options de filtre sont traduites
**And** les filtres sont accessibles au clavier
**And** le count de résultats est affiché après filtrage

---

### Story 3.5: Playlists Navigation

**As a** visiteur,
**I want** explorer des playlists thématiques prédéfinies,
**So that** je découvre des idées de chansons par thème.

**Acceptance Criteria:**

**Given** je suis sur la section Catalogue
**When** je regarde les playlists disponibles
**Then** des playlists thématiques sont affichées (ex: "Années 80", "Hits FR", "Disney")
**And** le clic sur une playlist affiche son contenu
**And** le contenu affiche la liste des chansons de la playlist
**And** un bouton permet de revenir à la vue principale
**And** les noms de playlists sont traduits
**And** le layout est responsive (scroll horizontal mobile, grille desktop)

---

## Epic 4: Preuve Sociale & Pricing

Les utilisateurs voient des témoignages de leur segment (bar, RH, particulier) et comprennent le pricing avec les 3 offres clairement différenciées.

### Story 4.1: Testimonials Section

**As a** visiteur,
**I want** voir des témoignages de personnes comme moi,
**So that** je suis rassuré que le produit fonctionne pour mon cas d'usage.

**Acceptance Criteria:**

**Given** je scroll vers la section Témoignages
**When** j'arrive sur la section
**Then** 3-4 témoignages sont affichés avec photo, nom, rôle et citation
**And** chaque témoignage a un badge identifiant le segment (Bar, RH, Particulier)
**And** les citations incluent des résultats chiffrés quand disponibles
**And** le composant TestimonialCard est utilisé
**And** le layout est responsive (stack mobile, grille desktop)
**And** les témoignages sont traduits selon la langue
**And** les photos ont des alt texts descriptifs

---

### Story 4.2: Client Logos

**As a** visiteur B2B,
**I want** voir les logos d'établissements qui utilisent le service,
**So that** je suis rassuré par la crédibilité et l'adoption professionnelle.

**Acceptance Criteria:**

**Given** je suis sur la section Témoignages
**When** je regarde sous les témoignages
**Then** une rangée de logos d'établissements clients est affichée
**And** les logos sont en niveaux de gris (cohérence visuelle)
**And** les logos ont un effet hover (couleur ou opacité)
**And** les logos ont des alt texts avec le nom de l'établissement
**And** le layout défile horizontalement sur mobile si nécessaire
**And** minimum 4-6 logos sont affichés

---

### Story 4.3: Pricing Section

**As a** visiteur,
**I want** comprendre les offres et leurs prix rapidement,
**So that** je peux choisir le plan adapté à mon besoin.

**Acceptance Criteria:**

**Given** je scroll vers la section Pricing
**When** j'arrive sur la section
**Then** les 3 offres sont présentées côte à côte (Soirée, Régulier, Établissement)
**And** chaque offre affiche son nom, prix et liste de features (max 5)
**And** les prix sont en devise locale (€ pour FR/ES, £ pour UK)
**And** l'offre recommandée "Régulier" est visuellement mise en avant
**And** un CTA "Choisir" est présent sur chaque offre
**And** le clic sur le CTA redirige vers l'inscription/paiement
**And** le layout stack verticalement sur mobile
**And** le contenu est traduit dans les 3 langues

---

### Story 4.4: Pricing Card Component

**As a** développeur,
**I want** un composant PricingCard réutilisable,
**So that** les 3 offres sont présentées de manière cohérente.

**Acceptance Criteria:**

**Given** le composant PricingCard est utilisé
**When** je passe les props (name, price, features, isRecommended, ctaUrl)
**Then** la card affiche le nom de l'offre en header
**And** le prix est affiché avec le symbole de devise
**And** les features sont listées avec des checkmarks
**And** si isRecommended=true, un badge "Recommandé" est affiché
**And** si isRecommended=true, la card a un style différencié (border, shadow)
**And** le CTA utilise le composant Button shadcn/ui
**And** le composant est accessible avec focus states visibles

---

## Epic 5: FAQ & Newsletter

Les utilisateurs trouvent des réponses à leurs questions fréquentes et peuvent s'inscrire à la newsletter pour rester informés.

### Story 5.1: FAQ Section

**As a** visiteur,
**I want** trouver rapidement les réponses à mes questions,
**So that** je suis rassuré avant de m'engager.

**Acceptance Criteria:**

**Given** je scroll vers la section FAQ
**When** j'arrive sur la section
**Then** 5-6 questions fréquentes sont affichées en accordion
**And** chaque question est cliquable pour afficher/masquer la réponse
**And** une seule question est ouverte à la fois (ou toutes peuvent être ouvertes)
**And** le composant Accordion shadcn/ui est utilisé
**And** les questions couvrent : installation, matériel, annulation, CB, catalogue, participants
**And** la mention "sans carte bancaire" est présente dans une réponse FAQ
**And** le contenu est traduit dans les 3 langues
**And** l'accordion est accessible au clavier (Tab, Enter, Space)

---

### Story 5.2: Newsletter Form Component

**As a** développeur,
**I want** un composant NewsletterForm réutilisable,
**So that** je peux l'intégrer dans le footer et dans une section dédiée.

**Acceptance Criteria:**

**Given** le composant NewsletterForm est utilisé
**When** l'utilisateur soumet son email
**Then** le champ email est validé (format email)
**And** un champ honeypot invisible est présent pour anti-spam (NFR24)
**And** une checkbox de consentement GDPR est présente (NFR25)
**And** le formulaire utilise le pattern FormStatus ('idle'|'submitting'|'success'|'error')
**And** le POST est envoyé vers l'API backend (BACKEND_API_URL/api/newsletter)
**And** un message de succès s'affiche après inscription
**And** un message d'erreur s'affiche si échec
**And** le bouton affiche un spinner pendant l'envoi
**And** le composant est traduit selon la langue

---

### Story 5.3: Newsletter Footer Integration

**As a** visiteur,
**I want** pouvoir m'inscrire à la newsletter depuis le footer,
**So that** je peux rester informé sans remonter la page.

**Acceptance Criteria:**

**Given** je suis n'importe où sur la page
**When** je regarde le footer
**Then** un champ email "Inscrivez-vous à notre newsletter" est présent
**And** le composant NewsletterForm est intégré en version compacte
**And** le layout est adapté au footer (horizontal desktop, vertical mobile)
**And** le feedback de succès/erreur s'affiche inline

---

### Story 5.4: Newsletter Section

**As a** visiteur,
**I want** une section dédiée à la newsletter avant le footer,
**So that** je suis incité à m'inscrire après avoir lu le contenu.

**Acceptance Criteria:**

**Given** je scroll vers la fin de la landing page (avant le footer)
**When** j'arrive sur la section Newsletter
**Then** un titre accrocheur invite à s'inscrire
**And** une description courte explique les bénéfices (actus, offres exclusives)
**And** le composant NewsletterForm est intégré en version complète
**And** le fond de section est différencié (muted ou légèrement coloré)
**And** le contenu est traduit dans les 3 langues

---

## Epic 6: Contact & Réservation

Les utilisateurs B2B peuvent contacter l'équipe via formulaire ou réserver un RDV démo via le calendrier intégré.

### Story 6.1: Contact Section Landing

**As a** visiteur B2B,
**I want** une section contact sur la landing page,
**So that** je peux choisir de réserver un RDV ou demander un rappel.

**Acceptance Criteria:**

**Given** je scroll vers la section Contact sur la landing
**When** j'arrive sur la section
**Then** deux options sont présentées : "Réserver un créneau" et "Demander un rappel"
**And** le widget Calendly est visible pour la réservation
**And** un formulaire de rappel est accessible
**And** le layout est responsive (stack mobile, côte à côte desktop)
**And** le contenu est traduit dans les 3 langues

---

### Story 6.2: Contact Form Component

**As a** visiteur,
**I want** remplir un formulaire de contact complet,
**So that** je peux poser une question ou demander un devis.

**Acceptance Criteria:**

**Given** je suis sur le formulaire de contact
**When** je remplis et soumets le formulaire
**Then** les champs Nom, Email, Téléphone, Message sont disponibles
**And** un dropdown "Type de demande" propose : Question générale, Devis B2B, Support technique, Partenariat, Autre
**And** les champs Nom, Email, Message sont obligatoires
**And** la validation affiche les erreurs inline
**And** un champ honeypot invisible est présent (anti-spam)
**And** le formulaire utilise le pattern FormStatus
**And** le POST est envoyé vers BACKEND_API_URL/api/contact
**And** une confirmation visuelle s'affiche après envoi réussi
**And** le formulaire est traduit selon la langue

---

### Story 6.3: Calendly Integration

**As a** visiteur B2B,
**I want** réserver un créneau de RDV directement depuis la page,
**So that** je peux planifier un appel avec l'équipe commerciale.

**Acceptance Criteria:**

**Given** je suis sur la section Contact (landing ou page contact)
**When** je regarde le widget de réservation
**Then** le widget Calendly/Cal.com est intégré en embed
**And** le widget affiche les créneaux disponibles
**And** je peux sélectionner un créneau et confirmer
**And** une confirmation s'affiche après réservation
**And** le widget respecte la langue de la page
**And** le fallback affiche un lien vers le calendrier externe si embed échoue

---

### Story 6.4: Contact Page

**As a** visiteur,
**I want** accéder à une page contact dédiée,
**So that** j'ai toutes les options de contact centralisées.

**Acceptance Criteria:**

**Given** je clique sur "Contact" dans la navigation ou le footer
**When** j'arrive sur /fr/contact (ou /en/contact, /es/contact)
**Then** la page affiche le formulaire de contact complet
**And** le widget Calendly est intégré
**And** une FAQ rapide de 3-4 questions est présente
**And** les liens vers les réseaux sociaux sont affichés
**And** la page utilise le Layout principal avec Header et Footer
**And** la page est disponible en 3 langues (FR61)
**And** les balises meta SEO sont spécifiques à la page contact (FR62)

---

### Story 6.5: Contact Page FAQ

**As a** visiteur sur la page contact,
**I want** voir une FAQ rapide avec les questions fréquentes,
**So that** je trouve peut-être ma réponse sans avoir à contacter.

**Acceptance Criteria:**

**Given** je suis sur la page /contact
**When** je regarde la section FAQ
**Then** 3-4 questions fréquentes sont affichées en accordion
**And** les questions sont différentes (ou un sous-ensemble) de la FAQ principale
**And** le composant Accordion shadcn/ui est utilisé
**And** le contenu est traduit selon la langue

---

### Story 6.6: Social Links Component

**As a** visiteur,
**I want** accéder aux réseaux sociaux de l'entreprise,
**So that** je peux suivre l'actualité et voir la communauté.

**Acceptance Criteria:**

**Given** je suis sur la page contact ou le footer
**When** je regarde les liens sociaux
**Then** les icônes Instagram, LinkedIn, Facebook (etc.) sont affichées
**And** chaque icône est un lien vers le réseau social correspondant
**And** les liens s'ouvrent dans un nouvel onglet (target="_blank")
**And** les liens ont rel="noopener noreferrer" pour la sécurité
**And** les icônes ont des aria-labels descriptifs
**And** le touch target est de minimum 44px

---

## Epic 7: SEO & Analytics

Le site est optimisé pour le référencement multi-langue et le tracking des conversions avec GDPR compliance.

### Story 7.1: SEO Meta Tags

**As a** moteur de recherche,
**I want** des meta tags optimisés par langue,
**So that** les pages sont correctement indexées et affichées dans les résultats.

**Acceptance Criteria:**

**Given** je suis une page du site
**When** le HTML est rendu
**Then** chaque page a un `<title>` unique et optimisé par langue
**And** chaque page a une `<meta name="description">` unique par langue
**And** les URLs canoniques sont présentes avec `<link rel="canonical">`
**And** les balises hreflang sont présentes pour les 3 langues
**And** le format hreflang est correct : `<link rel="alternate" hreflang="fr" href="...">`
**And** une balise `hreflang="x-default"` pointe vers /fr/
**And** la structure Hn est sémantique (H1 unique par page)
**And** les meta tags sont gérés dans Layout.astro

---

### Story 7.2: Structured Data

**As a** moteur de recherche,
**I want** des données structurées JSON-LD,
**So that** le site bénéficie de rich snippets dans les résultats.

**Acceptance Criteria:**

**Given** je suis sur une page du site
**When** le HTML est rendu
**Then** un script JSON-LD Organization est présent avec nom, logo, URL
**And** un script JSON-LD Product est présent pour chaque offre pricing
**And** un script JSON-LD FAQPage est présent sur les pages avec FAQ
**And** les données structurées sont validées avec Google Rich Results Test
**And** les scripts JSON-LD sont insérés dans le `<head>`
**And** le contenu JSON-LD est traduit selon la langue

---

### Story 7.3: Sitemap & Robots

**As a** moteur de recherche,
**I want** un sitemap XML et un robots.txt,
**So that** toutes les pages sont découvertes et indexées correctement.

**Acceptance Criteria:**

**Given** le site est buildé
**When** je demande /sitemap.xml
**Then** un sitemap XML multi-langue est généré au build
**And** le sitemap inclut toutes les URLs localisées (/fr/, /en/, /es/)
**And** chaque URL a une date de dernière modification
**And** le robots.txt est présent à la racine
**And** le robots.txt référence le sitemap
**And** le robots.txt autorise tous les crawlers (User-agent: *)
**And** le sitemap est automatiquement généré par Astro

---

### Story 7.4: Cookie Consent Banner

**As a** visiteur européen,
**I want** voir une bannière de consentement cookies,
**So that** je peux choisir d'accepter ou refuser les cookies analytics.

**Acceptance Criteria:**

**Given** j'arrive sur le site pour la première fois
**When** la page se charge
**Then** la bannière CookieConsent (vanilla-cookieconsent) s'affiche
**And** je peux choisir "Accepter tout", "Refuser", ou "Personnaliser"
**And** les catégories sont : Nécessaires (obligatoire), Analytics (optionnel)
**And** mon choix est sauvegardé en cookie
**And** la bannière ne réapparaît pas si j'ai déjà fait un choix
**And** la bannière est traduite selon la langue de la page
**And** le layout de la bannière est "box" (non intrusif)
**And** GA4 ne charge PAS si le consentement analytics n'est pas donné

---

### Story 7.5: GA4 Integration

**As a** propriétaire du site,
**I want** tracker les conversions avec Google Analytics 4,
**So that** je peux mesurer l'efficacité de la landing page.

**Acceptance Criteria:**

**Given** le visiteur a accepté les cookies analytics
**When** il navigue sur le site
**Then** GA4 est chargé avec le GA_MEASUREMENT_ID
**And** GA4 utilise le consent mode (respecte le choix cookie)
**And** les events suivants sont trackés :
- `cta_click` avec location et texte du CTA
- `search_catalogue` avec terme et nombre de résultats
- `form_submit` avec type de formulaire (newsletter/contact)
- `pricing_view` quand la section pricing est visible
- `language_switch` avec from_locale et to_locale
**And** le script gtag.js est chargé en defer
**And** aucune donnée n'est envoyée si le consentement est refusé

