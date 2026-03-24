# Plan SEO — 20 pages Solorah
_Date : 24 mars 2026_

---

## Etat actuel du site

### Pages existantes (9 par langue, 7 langues = 63 pages)
| Page | URL (FR) | Composant |
|------|----------|-----------|
| Homepage | `/fr/` | Hero + OraclePreview + HowItWorks + ConsultationCTA |
| A propos | `/fr/a-propos` | Contenu statique |
| Consultation | `/fr/consultation` | Contenu statique |
| Contact | `/fr/contact` | Contenu statique |
| Mentions legales | `/fr/mentions-legales` | Contenu statique |
| Tirage (index) | `/fr/tirage/` | Liste des 3 decks |
| Oracle Amour | `/fr/tirage/oracle-amour` | OracleReading (React) — 1 carte |
| Oracle Shiva | `/fr/tirage/oracle-shiva` | ShivaReading (React) — 1 carte |
| Tarot Marseille | `/fr/tirage/tarot-marseille` | TarotReading (React) — 3 cartes |

### Decks disponibles
| Deck | Cartes | Donnees | Images |
|------|--------|---------|--------|
| Oracle Amour | 20 | `src/data/oracle-amour.ts` (nom, message, interpretation x7 langues) | `/images/cards/oracle/` |
| Oracle Shiva | 20 | `src/data/oracle-shiva.ts` (idem) | `/images/cards/shiva/` |
| Tarot Marseille | 22 arcanes majeurs | `src/data/tarot-marseille.ts` (nom, message endroit/inverse x7 langues) | `/images/cards/tarot/` |

### Architecture technique
- **Framework** : Astro 5.18 (SSG statique) + React 19 (composants interactifs)
- **Styling** : Tailwind CSS 4 (config via `@theme` dans global.css)
- **Animations** : Framer Motion (flip 3D, particules, stagger)
- **i18n** : Systeme custom (`src/i18n/utils.ts` + JSON par langue)
- **Flux de tirage** : Machine a etats → intro → selection → flip → reveal

### Manques SEO identifies
- ~~Pas de sitemap.xml (aucun plugin astro-sitemap)~~ FAIT
- ~~Pas de robots.txt~~ FAIT
- ~~Pas de JSON-LD / structured data~~ FAIT
- Pas de pages de contenu editorial (blog/guide)
- Pas de pages individuelles par carte (signification)
- Pas de maillage interne entre pages

---

## Les 20 pages a creer

### Vue d'ensemble

| # | Type | Page | Difficulte | Priorite |
|---|------|------|------------|----------|
| **Bloc 1 — Signification arcanes (8 pages)** ||||
| 1 | Carte | `/fr/signification/le-mat` | Facile | Haute |
| 2 | Carte | `/fr/signification/le-bateleur` | Facile | Haute |
| 3 | Carte | `/fr/signification/la-papesse` | Facile | Haute |
| 4 | Carte | `/fr/signification/limperatrice` | Facile | Haute |
| 5 | Carte | `/fr/signification/lamoureux` | Facile | Haute |
| 6 | Carte | `/fr/signification/la-roue-de-fortune` | Facile | Haute |
| 7 | Carte | `/fr/signification/la-lune` | Facile | Haute |
| 8 | Carte | `/fr/signification/le-soleil` | Facile | Haute |
| **Bloc 2 — Nouveaux tirages (5 pages)** ||||
| 9 | Tirage | `/fr/tirage/tirage-du-jour` | Moyen | Haute |
| 10 | Tirage | `/fr/tirage/tirage-oui-non` | Moyen | Haute |
| 11 | Tirage | `/fr/tirage/tirage-3-cartes` | Facile | Moyenne |
| 12 | Tirage | `/fr/tirage/tirage-en-croix` | Difficile | Moyenne |
| 13 | Tirage | `/fr/tirage/tirage-amour` | Facile | Haute |
| **Bloc 3 — Pages guides (5 pages)** ||||
| 14 | Guide | `/fr/guide/apprendre-tarot-marseille` | Moyen | Moyenne |
| 15 | Guide | `/fr/guide/difference-tarot-oracle` | Moyen | Moyenne |
| 16 | Guide | `/fr/guide/signification-arcanes-majeurs` | Moyen | Haute |
| 17 | Guide | `/fr/guide/comment-tirer-les-cartes` | Moyen | Moyenne |
| 18 | Guide | `/fr/guide/tarot-amour-signification` | Moyen | Moyenne |
| **Bloc 4 — Landing pages SEO (2 pages)** ||||
| 19 | Landing | `/fr/tarot-gratuit` | Facile | Haute |
| 20 | Landing | `/fr/oracle-gratuit` | Facile | Haute |

---

## Phase 0 — Infrastructure (prerequis) ✅ TERMINEE

_Completee le 24 mars 2026. Build OK (64 pages, 0 erreur)._

### 0.1 — Sitemap XML ✅
- [x] `@astrojs/sitemap` installe + configure dans `astro.config.mjs`
- [x] `site: 'https://solorah.com'` ajoute
- [x] Sitemap genere : `dist/sitemap-index.xml`

### 0.2 — Robots.txt ✅
- [x] `public/robots.txt` cree (Allow: /, Sitemap pointe vers sitemap-index.xml)

### 0.3 — JSON-LD structured data ✅
- [x] Prop `structuredData` ajoutee a `BaseLayout.astro`
- [x] Schema `WebSite` par defaut sur toutes les pages
- [x] Schema `Article` auto dans `GuideLayout` et `CardMeaningLayout`
- [ ] Schema `FAQPage` (sera ajoute sur les landing pages en Phase 4)

### 0.4 — Layout Guide/Article ✅
- [x] `src/layouts/GuideLayout.astro` cree
  - Breadcrumb, titre, description, prose styling, sidebar TOC, CTA, JSON-LD Article

### 0.5 — Layout Signification Carte ✅
- [x] `src/layouts/CardMeaningLayout.astro` cree
  - Image carte + glow, numero arcane, keywords, navigation prev/next, CTA tirage, JSON-LD

### 0.6 — Donnees etendues pour les arcanes ✅
- [x] `src/data/tarot-meanings.ts` cree (8 arcanes, FR + EN)
  - Le Mat, Le Bateleur, La Papesse, L'Imperatrice, L'Amoureux, La Roue de Fortune, La Lune, Le Soleil
  - Chaque carte : signification generale + amour + carriere (endroit + inverse)
  - Helpers : `getMeaning(slug)`, `getMeaningNavigation(slug)`
- [x] Type `TarotMeaning` ajoute dans `src/types/card.ts`

### 0.7 — Mise a jour i18n ✅
- [x] Routes ajoutees dans `src/i18n/utils.ts` (FR + EN + 5 autres langues)
  - 5 nouveaux tirages, signification, guide, tarot-gratuit, oracle-gratuit
- [x] Traductions ajoutees dans `fr.json` et `en.json`
  - 10 nouvelles cles : dailyReading, yesNo, threeCards, crossSpread, loveReading, cardMeaning, guide, freeTarot, freeOracle

---

## Phase 1 — Pages signification des arcanes (8 pages)

**Pourquoi en premier** : les donnees existent deja, haut volume SEO ("signification Le Mat tarot"), et ces pages servent de base pour le maillage interne.

### Pour chaque carte :

#### Structure de page
```
[Breadcrumb] Accueil > Signification > Le Mat

[Image carte — grande, centree, avec glow]

# Le Mat — Arcane 0

## Signification a l'endroit
[Paragraphe detaille — signification generale]

### En amour
[Interpretation amoureuse]

### Au travail
[Interpretation professionnelle]

## Signification inversee
[Meme structure]

## Mots-cles
[Tags cliquables : liberte, voyage, innocence...]

---

[Navigation] ← La Papesse | Le Bateleur →

[CTA] Tire tes cartes du Tarot de Marseille →
```

#### Les 8 arcanes choisis (les plus recherches)
| # | Arcane | Slug | Mot-cle cible |
|---|--------|------|---------------|
| 1 | Le Mat (0) | `le-mat` | signification le mat tarot |
| 2 | Le Bateleur (I) | `le-bateleur` | signification le bateleur |
| 3 | La Papesse (II) | `la-papesse` | signification la papesse tarot |
| 4 | L'Imperatrice (III) | `limperatrice` | signification l'imperatrice |
| 5 | L'Amoureux (VI) | `lamoureux` | signification l'amoureux tarot |
| 6 | La Roue de Fortune (X) | `la-roue-de-fortune` | signification roue de fortune |
| 7 | La Lune (XVIII) | `la-lune` | signification la lune tarot |
| 8 | Le Soleil (XIX) | `le-soleil` | signification le soleil tarot |

#### Fichiers a creer (par carte)
- `src/pages/fr/signification/[slug].astro` (+ 6 autres langues)
- Donnees dans `src/data/tarot-meanings.ts`

#### Maillage interne
- Chaque carte → page pilier "Tous les arcanes majeurs" (guide #16)
- Chaque carte → tirage tarot-marseille
- Chaque carte → cartes precedente/suivante

---

## Phase 2 — Nouveaux types de tirages (5 pages)

### Page 9 — Tirage du jour (`/fr/tirage/tirage-du-jour`)

**Concept** : un tirage automatique base sur la date du jour. Pas de selection manuelle — la carte est "revealee" directement.

**Mecanique** :
- Seed base sur la date (`YYYY-MM-DD`) → deterministic card selection
- Meme carte pour tout le monde pendant 24h
- Deck utilise : Tarot de Marseille (arcanes majeurs)
- Possibilite inversee/endroit (seed-based)

**Composant React** : `DailyReading.tsx`
- Phase 1 : intro "Voici ta carte du jour..."
- Phase 2 : flip automatique (pas de selection)
- Phase 3 : reveal avec interpretation + "reviens demain"

**SEO** :
- Title : "Tirage du jour gratuit — Votre carte du jour | Solorah"
- Meta : "Decouvrez votre carte du tarot du jour gratuitement. Un tirage quotidien pour guider votre journee."
- Contenu statique au-dessus/dessous du tirage pour le SEO

**Fichiers** :
- [ ] `src/components/cards/DailyReading.tsx` (nouveau)
- [ ] `src/components/cards/DailyIntroScreen.tsx` (nouveau)
- [ ] `src/pages/fr/tirage/tirage-du-jour.astro` (+ 6 langues)
- [ ] Mise a jour i18n

---

### Page 10 — Tirage Oui/Non (`/fr/tirage/tirage-oui-non`)

**Concept** : l'utilisateur pose une question, tire 1 carte. Endroit = tendance "oui", inverse = tendance "non". Interpretation nuancee.

**Mecanique** :
- Deck : Tarot de Marseille
- Selection : 1 carte
- Inversee/endroit : random 50/50
- Interpretation : "Oui, mais..." ou "Non, cependant..." + message de la carte

**Composant React** : `YesNoReading.tsx`
- Phase 1 : intro + champ texte pour poser sa question
- Phase 2 : selection 1 carte (CardDeck existant)
- Phase 3 : flip avec effet special (flash vert=oui / rouge=non)
- Phase 4 : reveal "OUI ✓" ou "NON ✗" + interpretation

**Fichiers** :
- [ ] `src/components/cards/YesNoReading.tsx` (nouveau)
- [ ] `src/components/cards/YesNoIntroScreen.tsx` (nouveau)
- [ ] `src/components/cards/YesNoReveal.tsx` (nouveau)
- [ ] `src/pages/fr/tirage/tirage-oui-non.astro` (+ 6 langues)
- [ ] Mise a jour i18n

---

### Page 11 — Tirage 3 cartes passe-present-futur (`/fr/tirage/tirage-3-cartes`)

**Concept** : identique au tirage Tarot Marseille existant MAIS avec le deck Oracle Amour (plus accessible).

**Mecanique** :
- Deck : Oracle Amour (20 cartes)
- Selection : 3 cartes
- Pas d'inverse (oracle = pas d'orientation)
- Positions : passe / present / futur

**Composant React** : reutiliser `TarotReading.tsx` adapte → `ThreeCardReading.tsx`
- Meme flow que TarotReading
- Mais sans gestion inversee
- SlotIndicator avec les 3 positions
- Reveal adapte (pas de mention "inversee")

**Fichiers** :
- [ ] `src/components/cards/ThreeCardReading.tsx` (adapte de TarotReading)
- [ ] `src/components/cards/ThreeCardReveal.tsx` (adapte de TarotCardReveal)
- [ ] `src/pages/fr/tirage/tirage-3-cartes.astro` (+ 6 langues)
- [ ] Mise a jour i18n

---

### Page 12 — Tirage en croix celtique (`/fr/tirage/tirage-en-croix`)

**Concept** : tirage avance a 5 cartes en forme de croix. Positions : situation, obstacle, passe, futur, synthese.

**Mecanique** :
- Deck : Tarot de Marseille
- Selection : 5 cartes
- Inversee/endroit : random
- Positions : Situation (centre), Obstacle (croise), Passe (gauche), Futur (droite), Synthese (dessus)

**Composant React** : `CrossReading.tsx` (nouveau, le plus complexe)
- Phase 1 : intro
- Phase 2 : selection 5 cartes (SlotIndicator adapte a 5 positions)
- Phase 3 : reveal en croix visuelle (layout CSS grid special)
  - Disposition en croix :
  ```
       [Synthese]
  [Passe] [Situation/Obstacle] [Futur]
  ```
- Phase 4 : interpretation position par position

**Fichiers** :
- [ ] `src/components/cards/CrossReading.tsx` (nouveau)
- [ ] `src/components/cards/CrossSlotIndicator.tsx` (nouveau)
- [ ] `src/components/cards/CrossCardReveal.tsx` (nouveau)
- [ ] `src/pages/fr/tirage/tirage-en-croix.astro` (+ 6 langues)
- [ ] Mise a jour i18n

---

### Page 13 — Tirage amour (`/fr/tirage/tirage-amour`)

**Concept** : landing page SEO dediee a l'amour. Contenu editorial + CTA vers le tirage Oracle Amour.

**Mecanique** : page hybride (contenu statique + composant interactif)
- Section 1 : contenu SEO (qu'est-ce que le tirage amour, comment ca marche)
- Section 2 : composant OracleReading directement integre (Oracle Amour)
- Section 3 : FAQ + liens vers guides

**Pas de nouveau composant React** — on reutilise OracleReading tel quel.

**Fichiers** :
- [ ] `src/pages/fr/tirage/tirage-amour.astro` (+ 6 langues) — page hybride avec contenu SEO
- [ ] Mise a jour i18n

---

## Phase 3 — Pages guides (5 pages)

Toutes utilisent le `GuideLayout.astro` cree en Phase 0.

### Page 14 — Apprendre le tarot de Marseille (`/fr/guide/apprendre-tarot-marseille`)

**Contenu** :
- Introduction au tarot de Marseille
- Les 22 arcanes majeurs (avec liens vers les 8 pages signification)
- Les arcanes mineurs (explication)
- Comment commencer
- Erreurs de debutant
- CTA vers tirage

**Maillage** : liens vers chaque page signification + tirage tarot

---

### Page 15 — Difference tarot et oracle (`/fr/guide/difference-tarot-oracle`)

**Contenu** :
- Definition du tarot
- Definition de l'oracle
- Tableau comparatif (structure, nombre de cartes, utilisation)
- Lequel choisir selon ta question
- CTA vers les 3 tirages disponibles

**Maillage** : liens vers les 3 pages tirage + page "apprendre tarot"

---

### Page 16 — Signification arcanes majeurs — PAGE PILIER (`/fr/guide/signification-arcanes-majeurs`)

**Contenu** :
- Introduction aux 22 arcanes majeurs
- Liste des 22 arcanes avec :
  - Image miniature
  - Nom + numero
  - Resume en 1-2 phrases
  - Lien vers la page dediee (pour les 8 qu'on a creees)
- Organisation par themes (spiritualite, amour, defi...)
- CTA vers tirage

**Maillage** : c'est la PAGE HUB qui lie toutes les pages signification. Cruciale pour le SEO.

---

### Page 17 — Comment tirer les cartes soi-meme (`/fr/guide/comment-tirer-les-cartes`)

**Contenu** :
- Preparer son espace
- Formuler sa question
- Melanger et couper le jeu
- Les differents tirages (1 carte, 3 cartes, en croix)
- Interpreter les cartes
- CTA vers chaque type de tirage

**Maillage** : liens vers les 5 pages tirage

---

### Page 18 — Tarot amour signification (`/fr/guide/tarot-amour-signification`)

**Contenu** :
- Le tarot au service de l'amour
- Les cartes les plus importantes en amour (L'Amoureux, L'Imperatrice, Le Soleil, La Lune)
- Comment interpreter un tirage amour
- Les questions a poser au tarot
- CTA vers tirage amour + oracle amour

**Maillage** : liens vers pages signification (Amoureux, Imperatrice, Lune, Soleil) + tirages

---

## Phase 4 — Landing pages SEO (2 pages)

### Page 19 — Tarot gratuit en ligne (`/fr/tarot-gratuit`)

**Objectif** : capter "tirage tarot gratuit", "tarot en ligne gratuit", "tarot de marseille gratuit"

**Structure** :
- H1 : "Tirage de Tarot Gratuit en Ligne"
- Section 1 : intro (pourquoi Solorah, 100% gratuit, pas d'inscription)
- Section 2 : les 3 types de tirages disponibles (cartes visuelles + CTA)
  - Tarot de Marseille (3 cartes)
  - Tirage du jour (1 carte)
  - Tirage en croix (5 cartes)
- Section 3 : comment ca marche (3 etapes)
- Section 4 : FAQ ("Est-ce vraiment gratuit ?", "Combien de fois puis-je tirer ?", etc.)
- Section 5 : liens vers guides

**Schema** : FAQPage JSON-LD

---

### Page 20 — Oracle gratuit en ligne (`/fr/oracle-gratuit`)

**Objectif** : capter "oracle gratuit", "oracle amour gratuit", "tirage oracle en ligne"

**Structure** :
- H1 : "Oracle Gratuit en Ligne"
- Section 1 : intro
- Section 2 : les oracles disponibles (cartes visuelles + CTA)
  - Oracle de l'Amour (20 cartes)
  - Oracle de Shiva (20 cartes)
  - Tirage Oui/Non
- Section 3 : difference tarot vs oracle (lien vers guide)
- Section 4 : FAQ
- Section 5 : liens vers guides

**Schema** : FAQPage JSON-LD

---

## Ordre d'execution

```
Phase 0 — Infrastructure
│
├── 0.1 Sitemap XML
├── 0.2 Robots.txt
├── 0.3 JSON-LD dans BaseLayout
├── 0.4 GuideLayout.astro
├── 0.5 CardMeaningLayout.astro
├── 0.6 tarot-meanings.ts (donnees)
└── 0.7 i18n routes + traductions
│
Phase 1 — Signification arcanes (8 pages)
│
├── 1.1 Le Mat
├── 1.2 Le Bateleur
├── 1.3 La Papesse
├── 1.4 L'Imperatrice
├── 1.5 L'Amoureux
├── 1.6 La Roue de Fortune
├── 1.7 La Lune
└── 1.8 Le Soleil
│
Phase 2 — Nouveaux tirages (5 pages)
│
├── 2.1 Tirage du jour (DailyReading — nouveau composant)
├── 2.2 Tirage Oui/Non (YesNoReading — nouveau composant)
├── 2.3 Tirage 3 cartes (ThreeCardReading — adapte)
├── 2.4 Tirage en croix (CrossReading — nouveau, complexe)
└── 2.5 Tirage amour (page hybride, reutilise OracleReading)
│
Phase 3 — Guides (5 pages)
│
├── 3.1 Page pilier : Signification arcanes majeurs (HUB)
├── 3.2 Apprendre le tarot de Marseille
├── 3.3 Difference tarot et oracle
├── 3.4 Comment tirer les cartes soi-meme
└── 3.5 Tarot amour signification
│
Phase 4 — Landing pages (2 pages)
│
├── 4.1 Tarot gratuit en ligne
└── 4.2 Oracle gratuit en ligne
```

---

## Strategie multilangue

**Approche** : FR d'abord, puis deployer en 6 langues.

| Etape | Action |
|-------|--------|
| 1 | Creer TOUTES les pages en FR |
| 2 | Traduire les i18n keys (titres, meta, labels) |
| 3 | Traduire le contenu editorial des guides (EN prioritaire) |
| 4 | Dupliquer les pages Astro pour chaque langue |
| 5 | Les pages signification utilisent deja les donnees multilingues |

**Les pages signification et tirages** sont quasi-automatiques en multilangue car les donnees de cartes sont deja en 7 langues. Seul le contenu editorial (guides, landings) necessite une traduction manuelle.

---

## Maillage interne (plan de liens)

```
Homepage
├── /tirage/ (index)
│   ├── /tirage/oracle-amour
│   ├── /tirage/oracle-shiva
│   ├── /tirage/tarot-marseille
│   ├── /tirage/tirage-du-jour      ← NOUVEAU
│   ├── /tirage/tirage-oui-non      ← NOUVEAU
│   ├── /tirage/tirage-3-cartes     ← NOUVEAU
│   ├── /tirage/tirage-en-croix     ← NOUVEAU
│   └── /tirage/tirage-amour        ← NOUVEAU
│
├── /signification/                  ← via page pilier
│   ├── /signification/le-mat
│   ├── /signification/le-bateleur
│   ├── /signification/la-papesse
│   ├── /signification/limperatrice
│   ├── /signification/lamoureux
│   ├── /signification/la-roue-de-fortune
│   ├── /signification/la-lune
│   └── /signification/le-soleil
│
├── /guide/
│   ├── /guide/signification-arcanes-majeurs  ← PAGE HUB
│   ├── /guide/apprendre-tarot-marseille
│   ├── /guide/difference-tarot-oracle
│   ├── /guide/comment-tirer-les-cartes
│   └── /guide/tarot-amour-signification
│
├── /tarot-gratuit                   ← LANDING SEO
└── /oracle-gratuit                  ← LANDING SEO
```

**Regles de maillage** :
- Chaque page signification → page pilier + tirage tarot + carte prev/next
- Chaque guide → au moins 2 tirages + 2 significations
- Chaque landing → tous les tirages du type concerne + guide principal
- Chaque tirage (reveal) → page signification de la carte tiree
- Homepage → tarot-gratuit + oracle-gratuit (dans le footer ou section dediee)

---

## Fichiers a creer (resume)

### Layouts (2)
```
src/layouts/GuideLayout.astro
src/layouts/CardMeaningLayout.astro
```

### Donnees (1)
```
src/data/tarot-meanings.ts
```

### Composants React (7)
```
src/components/cards/DailyReading.tsx
src/components/cards/DailyIntroScreen.tsx
src/components/cards/YesNoReading.tsx
src/components/cards/YesNoIntroScreen.tsx
src/components/cards/YesNoReveal.tsx
src/components/cards/ThreeCardReading.tsx
src/components/cards/ThreeCardReveal.tsx
src/components/cards/CrossReading.tsx
src/components/cards/CrossSlotIndicator.tsx
src/components/cards/CrossCardReveal.tsx
```

### Pages Astro FR (20)
```
src/pages/fr/signification/le-mat.astro
src/pages/fr/signification/le-bateleur.astro
src/pages/fr/signification/la-papesse.astro
src/pages/fr/signification/limperatrice.astro
src/pages/fr/signification/lamoureux.astro
src/pages/fr/signification/la-roue-de-fortune.astro
src/pages/fr/signification/la-lune.astro
src/pages/fr/signification/le-soleil.astro
src/pages/fr/tirage/tirage-du-jour.astro
src/pages/fr/tirage/tirage-oui-non.astro
src/pages/fr/tirage/tirage-3-cartes.astro
src/pages/fr/tirage/tirage-en-croix.astro
src/pages/fr/tirage/tirage-amour.astro
src/pages/fr/guide/apprendre-tarot-marseille.astro
src/pages/fr/guide/difference-tarot-oracle.astro
src/pages/fr/guide/signification-arcanes-majeurs.astro
src/pages/fr/guide/comment-tirer-les-cartes.astro
src/pages/fr/guide/tarot-amour-signification.astro
src/pages/fr/tarot-gratuit.astro
src/pages/fr/oracle-gratuit.astro
```

### Infra (3)
```
public/robots.txt
astro.config.mjs (modifie — ajout sitemap)
src/layouts/BaseLayout.astro (modifie — ajout slot JSON-LD)
```

### i18n (modifies)
```
src/i18n/utils.ts (nouvelles routes)
src/i18n/fr.json (nouvelles cles)
src/i18n/en.json (nouvelles cles)
src/i18n/es.json (nouvelles cles)
src/i18n/de.json (nouvelles cles)
src/i18n/zh.json (nouvelles cles)
src/i18n/hi.json (nouvelles cles)
src/i18n/ja.json (nouvelles cles)
```

---

## Estimation par phase

| Phase | Pages | Complexite | Quoi |
|-------|-------|------------|------|
| Phase 0 | 0 | Infrastructure | Sitemap, robots, JSON-LD, layouts, donnees, i18n |
| Phase 1 | 8 | Facile | 8 pages signification (template + donnees) |
| Phase 2 | 5 | Moyen-Difficile | 5 nouveaux tirages (React components) |
| Phase 3 | 5 | Moyen | 5 guides editoriaux (contenu a rediger) |
| Phase 4 | 2 | Facile | 2 landing pages SEO |

---

## Checklist de validation

Avant de deployer chaque page :
- [ ] Title unique et optimise (< 60 car)
- [ ] Meta description unique (< 155 car)
- [ ] H1 unique contenant le mot-cle principal
- [ ] JSON-LD valide
- [ ] hreflang correct (7 langues)
- [ ] Au moins 3 liens internes sortants
- [ ] Au moins 1 CTA vers un tirage
- [ ] Responsive mobile OK
- [ ] Dark mode + light mode OK
- [ ] Performance : pas de layout shift, images optimisees
