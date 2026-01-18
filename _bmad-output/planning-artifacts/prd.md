---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain-skipped', 'step-06-innovation-skipped', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
workflowStatus: 'complete'
completedAt: '2026-01-17'
inputDocuments: ['_bmad-output/analysis/brainstorming-session-2026-01-17.md']
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 1
  projectDocs: 0
classification:
  projectType: 'web_app_landing_page'
  domain: 'general_entertainment'
  complexity: 'low'
  projectContext: 'greenfield'
  scope: 'Landing page de conversion pour SaaS karaoké existant'
---

# Product Requirements Document - karaoke-landing-page

**Author:** Guillaume
**Date:** 2026-01-17
**Version:** 1.0

---

## Executive Summary

### Product Overview

Landing page de conversion multi-langue pour un SaaS karaoké existant, permettant le passage d'une vente commerciale manuelle à une acquisition digitale self-serve.

**Accroche :** "Chantez. Jouez. Vibrez."

### Target Markets

| Marché | Langue | Segment prioritaire |
|--------|--------|---------------------|
| France | 🇫🇷 Français | B2B (70%) + B2C (30%) |
| UK | 🇬🇧 Anglais | B2B (70%) + B2C (30%) |
| Espagne | 🇪🇸 Espagnol | B2B (70%) + B2C (30%) |

### Key Metrics (3 mois post-lancement)

| Métrique | Cible |
|----------|-------|
| Visites mensuelles | 1 000 |
| Taux de conversion | 5% |
| SEO Ranking | Top 10 |

### Scope Summary

**MVP :** 2 pages en 3 langues
- **Landing page (/)** : 8 sections (Hero, Proposition, How it works, Catalogue preview, Social proof, Pricing, FAQ, CTA) + Newsletter + Contact
- **Page Contact (/contact)** : Formulaire complet + Calendrier RDV + FAQ rapide + Réseaux sociaux

---

## Success Criteria

### User Success

**Moment de vérité :** L'utilisateur accède à l'app freemium sans friction et ressent immédiatement la valeur.

**Parcours cible :**
1. Atterrit sur la landing (SEO/direct)
2. Parcourt la page (< 30 sec pour comprendre l'offre)
3. Clique "Essayer gratuitement"
4. Accède à l'app freemium **sans créer de compte**
5. Se fait "hook" par l'expérience
6. Crée un compte pour sauvegarder/débloquer
7. Convertit en payant

**Indicateurs :**
- Temps moyen sur page > 1 min
- Scroll depth > 60%
- Clic CTA "Essayer" = conversion primaire

### Business Success

| Métrique | Cible | Timeline |
|----------|-------|----------|
| Visites mensuelles | 1 000 | 3 mois |
| Taux de conversion (visite → essai) | 5% | 3 mois |
| Ratio acquisition B2B / B2C | 70% / 30% | Ongoing |
| Ranking SEO mots-clés cibles | Top 10 | 3 mois |
| Ranking SEO mots-clés cibles | Top 3 | 6-12 mois |

**Note :** Mots-clés SEO à définir avant lancement (prérequis marketing).

### Measurable Outcomes

- [ ] 1 000 visites/mois atteintes
- [ ] 50 essais freemium/mois (5% de 1000)
- [ ] Premiers clients payants B2B acquis via landing
- [ ] Page indexée et positionnée sur mots-clés cibles
- [ ] Newsletter : base d'abonnés constituée

---

## User Journeys

### Journey 1 : Marc - "Le gérant qui veut animer sans se prendre la tête"

**Persona :** Marc, 42 ans, gérant de bar-pub à Lyon. Soirées karaoké actuelles galères (PC qui plante, catalogue limité).

**Point d'entrée :** Recherche Google "logiciel karaoké bar"

**Parcours landing :**
1. **Hero** → Voit vidéo bar animé + "Chantez. Jouez. Vibrez." → "Ça ressemble à ce que je veux"
2. **Proposition** → Découvre "Karaoké + Blind Test + Quiz" → "Plus qu'un karaoké"
3. **Comment ça marche** → "Tablette + TV, QR code clients" → "Clients autonomes"
4. **Catalogue preview** → Cherche Johnny, Céline, PNL → Tout y est
5. **Témoignages** → Autre gérant : "+40% fréquentation"
6. **Pricing** → "Établissement 49€/mois" → Moins cher que l'actuel
7. **CTA** → Clique "Essayer gratuitement"

**Moment de vérité :** Les clients gèrent eux-mêmes via QR code pendant qu'il sert.

**Conversion :** Essai → Test jeudi soir → Abonnement Établissement

---

### Journey 2 : Sophie - "La RH qui doit convaincre son boss"

**Persona :** Sophie, 35 ans, RH dans PME 80 personnes. Séminaire dans 3 semaines, budget serré.

**Point d'entrée :** Recherche "animation team building originale"

**Parcours landing :**
1. **Hero** → Ambiance conviviale → "Ça a l'air fun"
2. **Proposition** → "Karaoké + Blind Test + Quiz" → "Options pour non-chanteurs"
3. **Témoignages** → Autre RH : "Même les timides ont participé"
4. **Comment ça marche** → Simple à installer
5. **Pricing** → "Soirée 5€" ou "Régulier 29€" → Moins cher qu'escape game
6. **FAQ** → "Pas de matériel spécial ?" → Rassurée
7. **CTA** → "Sans carte bancaire" → Teste avant de présenter au boss

**Moment de vérité :** TOUT LE MONDE peut participer (chanteurs, voteurs, joueurs).

**Conversion :** Essai → Présentation interne → Achat séminaire → Repeat events

---

### Journey 3 : Lucas - "L'impulsif du samedi soir"

**Persona :** Lucas, 28 ans, dev web. Samedi 21h, potes chez lui, soirée s'essouffle.

**Point d'entrée :** Google "karaoké en ligne gratuit"

**Parcours landing :**
1. **Hero** → Voit "Essayer gratuitement" → Mode "je veux ça maintenant"
2. **Scroll rapide** → Ticker chansons → Reconnaît des hits
3. **Ignore le reste** → Direct au CTA
4. **Clique** → App freemium → Cast sur TV → Première chanson en 2 min

**Temps sur landing : < 45 secondes**

**Moment de vérité :** Première chanson lancée, potes applaudissent.

**Conversion :** Essai → Limites atteintes → "5€ ? Allez." → Paiement immédiat

---

### Journey 4 : Parent - "Le dimanche pluvieux"

**Persona :** Marie, 38 ans, mère de 2 enfants (6 et 9 ans). Dimanche pluvieux.

**Point d'entrée :** Recherche "karaoké enfant maison"

**Parcours landing :**
1. **Hero** → Ambiance familiale
2. **Catalogue preview** → "Reine des Neiges", "Encanto" → Trouve
3. **Comment ça marche** → Marche sur TV du salon
4. **Pricing** → "Soirée 5€" → Prix d'un magazine
5. **FAQ** → "100% web, pas de téléchargement"
6. **CTA** → Clique → Enfants occupés en 5 min

**Moment de vérité :** Enfants chantent "Libérée, Délivrée", 45 min de tranquillité.

**Conversion :** Essai → "On refait la semaine prochaine !" → Abonnement Régulier

---

### Journey Requirements Summary

| Capability | Marc (B2B) | Sophie (B2B) | Lucas (B2C) | Parent (B2C) |
|------------|------------|--------------|-------------|--------------|
| Vidéo Hero impactante | ✓ | ✓ | — | ✓ |
| Ticker chansons | ✓ | — | ✓ | — |
| Catalogue preview | ✓ | — | ✓ | ✓ |
| Témoignages segmentés | ✓ | ✓ | — | — |
| Pricing clair | ✓ | ✓ | ✓ | ✓ |
| CTA "sans carte bancaire" | — | ✓ | ✓ | ✓ |
| FAQ rassurante | — | ✓ | — | ✓ |
| Temps de conversion | 3-5 min | 5-10 min | < 1 min | 2-3 min |

**Pattern clé :** Lucas et Parent veulent de la vitesse. Marc et Sophie veulent être rassurés.

---

## Project Scope

### MVP (Phase 1)

**Marchés :** France, UK, Espagne (3 langues dès MVP)

**Pages MVP :**

| Page | Contenu |
|------|---------|
| **Landing (/)** | Page principale de conversion |
| **Contact (/contact)** | Formulaire + Calendrier RDV + FAQ + Réseaux sociaux |

**Sections landing :**

| Section | Contenu |
|---------|---------|
| Hero | Vidéo 5-10s + "Chantez. Jouez. Vibrez." + Ticker chansons + Double CTA |
| Proposition | 3 icônes (Karaoké + Blind Test + Quiz) |
| Comment ça marche | 3 étapes visuelles |
| Catalogue preview | Recherche interactive + Playlists + Filtres |
| Social proof | 3-4 témoignages + Logos clients |
| Pricing | 3 offres (Soirée 5€ / Régulier 29€ / Établissement 49€) |
| FAQ | 5-6 questions (accordion) |
| CTA final | Bouton + "sans carte bancaire" |
| Newsletter | Footer + Section dédiée |
| Contact | Calendrier RDV + Formulaire rappel |

**Page Contact (/contact) :**

| Élément | Contenu |
|---------|---------|
| Formulaire | Nom, Email, Téléphone, Type de demande (dropdown), Message |
| Calendrier RDV | Intégration Calendly/Cal.com |
| FAQ rapide | 3-4 questions fréquentes |
| Réseaux sociaux | Liens vers pages sociales |

**Journeys supportés :** Marc (B2B Bar), Sophie (B2B RH), Lucas (B2C), Parent (B2C)

### Post-MVP (Phase 2 - Growth)

- Calculateur d'économies B2B
- Compteur de soirées en cours (social proof live)
- Kit présentation RH téléchargeable
- A/B tests CTAs et pricing
- Landing pages dédiées par segment

### Future (Phase 3 - Expansion)

- Chatbot/assistant qualification leads
- Personnalisation dynamique B2B vs B2C
- Nouvelles langues (DE, IT, PT...)

### Risk Mitigation

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Vidéo Hero non disponible | Élevé | Fallback : image statique + animation CSS |
| Témoignages insuffisants | Moyen | Démarrer avec 2-3 FR, ajouter UK/ES progressivement |
| Catalogue preview complexe | Moyen | V1 données statiques, V2 API avancée |
| Performance < 90 PageSpeed | Élevé | Audit Lighthouse continu, optimisation assets |
| SEO lent à démarrer | Moyen | Contenu qualité J1, patience 3-6 mois |
| Traductions qualité | Élevé | Traduction pro ou révision native obligatoire |

---

## Functional Requirements

### Navigation & Structure

- **FR1:** Landing page single-page avec scroll fluide
- **FR2:** Anchor links via menu sticky
- **FR3:** Sélecteur de langue visible (FR/EN/ES)
- **FR4:** Détection automatique langue selon localisation/navigateur

### Hero Section

- **FR5:** Vidéo autoplay silencieux
- **FR6:** Accroche "Chantez. Jouez. Vibrez." (traduite)
- **FR7:** Ticker défilant de titres du catalogue
- **FR8:** CTA primaire "Essayer gratuitement" → redirect app
- **FR9:** CTA secondaire "Voir les offres" → scroll pricing

### Proposition de Valeur

- **FR10:** Présentation des 3 modes (Karaoké, Blind Test, Quiz)
- **FR11:** Message "plateforme multi-jeux, pas juste karaoké"

### Catalogue Preview

- **FR12:** Parcours 3 étapes "Comment ça marche"
- **FR13:** Aperçu interactif du catalogue
- **FR14:** Recherche par titre de chanson
- **FR15:** Recherche par artiste
- **FR16:** Affichage disponibilité après recherche
- **FR17:** Navigation playlists thématiques
- **FR18:** Affichage contenu des playlists
- **FR19:** Filtre par genre musical
- **FR20:** Filtre par décennie
- **FR21:** Filtre par langue

### Social Proof

- **FR22:** Témoignages avec citations et résultats chiffrés
- **FR23:** Logos établissements clients
- **FR24:** Témoignages identifiables par segment (bar/RH/particulier)

### Pricing

- **FR25:** 3 offres distinctes (Soirée, Régulier, Établissement)
- **FR26:** Max 5 features par offre
- **FR27:** Prix en devise locale (€/£)
- **FR28:** Clic offre → inscription/paiement

### FAQ

- **FR29:** 5-6 questions fréquentes
- **FR30:** Accordion déplier/replier
- **FR31:** Mention "sans carte bancaire" près CTAs

### Conversion

- **FR32:** CTA final en bas de page
- **FR33:** Clic CTA → app freemium
- **FR34:** Redirection vers app SPA existante

### Newsletter

- **FR35:** Formulaire inscription newsletter
- **FR36:** Champ newsletter dans footer
- **FR37:** Section newsletter dédiée fin de page
- **FR38:** Confirmation après inscription

### Internationalisation

- **FR39:** Contenu disponible en français
- **FR40:** Contenu disponible en anglais
- **FR41:** Contenu disponible en espagnol
- **FR42:** URLs localisées (/fr/, /en/, /es/)
- **FR43:** Changement langue sans perdre position

### SEO

- **FR44:** Balises meta par version linguistique
- **FR45:** Structured data Schema.org (Organization, Product, FAQ)
- **FR46:** Sitemap XML multi-langue
- **FR47:** Balises hreflang inter-versions

### Contact & RDV (Section Landing)

- **FR48:** Choix réserver créneau OU demander rappel
- **FR49:** Calendrier RDV intégré (Calendly/Cal.com)
- **FR50:** Formulaire rappel (nom, email, téléphone, message)
- **FR51:** Confirmation après réservation
- **FR52:** Confirmation après soumission formulaire

### Page Contact (/contact)

- **FR53:** Page contact accessible via navigation et footer
- **FR54:** Formulaire de contact complet (Nom, Email, Téléphone, Type de demande, Message)
- **FR55:** Dropdown "Type de demande" (Question générale, Devis B2B, Support technique, Partenariat, Autre)
- **FR56:** Validation des champs obligatoires (Nom, Email, Message)
- **FR57:** Confirmation visuelle après envoi du formulaire
- **FR58:** Calendrier RDV intégré (même que landing)
- **FR59:** FAQ rapide avec 3-4 questions fréquentes (accordion)
- **FR60:** Liens vers réseaux sociaux (Instagram, LinkedIn, Facebook, etc.)
- **FR61:** Page disponible en 3 langues (FR/EN/ES)
- **FR62:** Balises meta SEO spécifiques à la page contact

---

## Technical Requirements

### Architecture

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Landing Page | MPA / Statique | SEO optimisé |
| Application | SPA existante | Hors scope |
| Connexion | Redirection CTA | Landing → App |

**Flux :** `Landing (MPA) → Clic CTA → Redirect → App (SPA)`

### Browser Support

| Navigateur | Support |
|------------|---------|
| Chrome (2 dernières) | ✅ Full |
| Firefox (2 dernières) | ✅ Full |
| Safari (2 dernières) | ✅ Full |
| Edge (2 dernières) | ✅ Full |
| IE11 | ❌ Non |

### Responsive Design

| Breakpoint | Largeur |
|------------|---------|
| Mobile | < 768px |
| Tablet | 768px - 1024px |
| Desktop | > 1024px |

**Approche :** Mobile-first, touch-friendly (boutons min 44px)

### Performance (Core Web Vitals)

| Métrique | Cible |
|----------|-------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| PageSpeed Mobile | > 90 |
| PageSpeed Desktop | > 95 |
| Time to Interactive | < 3s |
| Temps serveur | < 200ms |

**Optimisations :**
- Vidéo Hero : < 2MB, poster image
- Images : WebP/AVIF, lazy loading
- CSS : Critical inline (< 14KB)
- JS : Minimal, defer/async

### SEO Technique

**On-Page :**
- Title + meta description optimisés
- Structure Hn sémantique (H1 unique)
- URLs canoniques
- Sitemap XML + robots.txt

**Structured Data :**
- Organization
- Product
- FAQ
- Review/AggregateRating

### Accessibilité (WCAG AA)

| Critère | Exigence |
|---------|----------|
| Contraste texte | ≥ 4.5:1 |
| Contraste grands textes | ≥ 3:1 |
| Navigation clavier | 100% |
| Focus visible | Tous éléments |
| Alt text | Images informatives |
| Formulaires | Labels explicites |
| Zoom | Fonctionnel à 200% |

**Validation :** Lighthouse > 90, axe DevTools zero critical

### Sécurité & GDPR

| Exigence | Cible |
|----------|-------|
| HTTPS | TLS 1.2+ obligatoire |
| Anti-spam | Honeypot ou reCAPTCHA invisible |
| Newsletter | Consentement explicite GDPR |
| Cookies | Bannière consentement |
| Données | Transmission sécurisée |

### Intégrations

| Système | Type | Criticité |
|---------|------|-----------|
| App SPA | Redirection | Critique |
| API Catalogue | Lecture seule | Important |
| Newsletter | API email marketing | Important |
| Calendrier RDV | Embed Calendly/Cal.com | Important |
| Analytics | GA4 + Search Console | Important |

**Fallbacks :**
- API catalogue indisponible → données statiques
- Calendrier indisponible → formulaire contact seul

### Hébergement

| Métrique | Cible |
|----------|-------|
| Uptime | 99.5% |
| CDN | Mondial (Vercel/Netlify/Cloudflare) |
| Cache assets | 1 an |

### Stack Recommandé

- Framework : Next.js (SSG), Astro, ou HTML statique
- CSS : Tailwind CSS
- Hébergement : Vercel / Netlify
- Analytics : GA4 + Search Console

---

## Appendix

### Pricing Details

| Offre | Prix | Cible | Features max |
|-------|------|-------|--------------|
| Soirée | 5€ | B2C occasionnel | 5 |
| Régulier | 29€/mois | Petit pro / Gros particulier | 5 |
| Établissement | 49€/mois | B2B (bars, hôtels, entreprises) | 5 |

### Content Requirements

**Témoignages (minimum MVP) :**
- 1 gérant de bar (FR)
- 1 responsable RH (FR)
- 1 particulier (FR)
- UK/ES : à ajouter progressivement

**FAQ Questions suggérées :**
1. Faut-il télécharger une application ?
2. Faut-il du matériel spécial ?
3. Puis-je annuler à tout moment ?
4. Faut-il une carte bancaire pour essayer ?
5. Combien de chansons dans le catalogue ?
6. Comment ça marche avec plusieurs participants ?

---

*Document généré le 2026-01-17 via BMAD PRD Workflow*
