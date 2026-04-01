# Audit Juridique Complet — Solorah.com

_Date : 1er avril 2026_
_Statut : Site NON INDEXE, aucun revenu, aucune societe creee_
_Methode : Deep Research — benchmark concurrents (Tirage.net, Voyance.fr, Tarroti.com) + droit francais (LCEN, RGPD, Code conso, Code penal)_

---

## CONTEXTE

Le site n'est **pas encore indexe** et ne genere **aucun revenu**. L'objectif est de tout mettre en conformite **AVANT** l'indexation et le lancement public. On a le temps de faire les choses bien.

Remi n'a pas encore cree de societe / micro-entreprise. On utilise donc la solution "particulier" pour les mentions legales (mise a jour plus tard quand le SIRET sera cree).

---

## CADRE LEGAL (pour reference)

| Loi | Ce qu'elle impose | Sanction max |
|-----|-------------------|--------------|
| **LCEN** (2004, art. 6-III) | Mentions legales obligatoires sur tout site | 75 000 EUR + 1 an prison |
| **RGPD** (2016, art. 13-14) | Politique de confidentialite des la collecte de donnees perso | 20M EUR ou 4% CA |
| **RGPD** (art. 6) | Base legale pour chaque traitement de donnees | Idem |
| **RGPD** (art. 17) | Droit a l'effacement des donnees | Idem |
| **Code conso** (art. L121-1) | Interdiction pratiques commerciales trompeuses | Variable |
| **Code penal** (art. 223-15-2) | Abus de faiblesse (exploitation vulnerabilite) | 3 ans + 375 000 EUR |
| **AI Act UE** (2024) | Transparence sur le contenu genere par IA | En vigueur progressivement |

**Precedent voyance** : CNIL a sanctionne Cosmospace/Telemaque (sites de voyance) de **400 000 EUR** en 2021 pour collecte de donnees sensibles sans consentement.

Sources :
- [economie.gouv.fr — Mentions obligatoires](https://www.economie.gouv.fr/entreprises/developper-son-entreprise/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations-respecter)
- [service-public.fr — Mentions entrepreneur](https://entreprendre.service-public.gouv.fr/vosdroits/F31228)
- [Aide Juridique — Voyance en France](https://www.aide-juridique.net/la-voyance-en-france-est-ce-legale/)
- [Tirage.net — CGU](https://www.tirage.net/cgu.php)
- [Voyance.fr — CGV](https://www.voyance.fr/infos/cgv)
- [Tarroti.com — Politique confidentialite](https://tarroti.com/en/politique-de-confidentialite/)

---

## BENCHMARK CONCURRENTS (ce qu'ils ont, ce que Solorah n'a pas)

| Element | Tirage.net | Voyance.fr | Tarroti.com | **Solorah** |
|---------|------------|------------|-------------|-------------|
| Mentions legales completes | Oui | Oui | Oui | **NON** |
| Politique confidentialite | Oui | Oui | Oui | **NON** |
| CGU | Oui | Oui | Oui | **NON** |
| Disclaimer "divertissement" | Oui | Oui | Oui | **Partiel** |
| Age minimum 18+ | Oui | Oui | Non precise | **NON** |
| Checkbox consentement | Oui | Oui | Oui | **NON** |
| DPO / contact RGPD | Oui | Oui (dpo@) | Oui | **NON** |
| Bandeau cookies | Oui | Oui | Oui | **NON** |
| Mention "pas une science exacte" | Oui | Oui | Non | **NON** |
| Mention "contenu genere par IA" | Non | Non | Non | **NON** |

---

## CE QUI EST DEJA BIEN FAIT

- [x] Disclaimer present en footer sur toutes les pages
- [x] Disclaimer repete sur la page consultation
- [x] Aucun tracking / analytics (pas de GA, pas de Facebook Pixel)
- [x] Aucune promesse de resultats
- [x] Ton "divertissement + developpement personnel" bien calibre
- [x] RLS active sur Supabase (chaque user ne voit que ses donnees)
- [x] Pas de collecte bancaire
- [x] .env dans le .gitignore
- [x] Pas de numero surtaxe / audiotel

---

## ETAPES A FAIRE — PAS A PAS

---

### ETAPE 1 — Enrichir le disclaimer footer
_Temps estime : 20 min | Difficulte : facile_

Le disclaimer actuel est trop court par rapport aux concurrents. Tous les sites de tarot mentionnent "pas une science exacte" + "majeurs" + "pas de substitution".

**Texte actuel** (dans `src/i18n/fr.json`, cle `footer.disclaimer`) :
```
Les tirages sont proposés à titre de divertissement et de développement personnel. Ils ne remplacent en aucun cas un avis médical, juridique ou financier.
```

**Texte recommande** (inspire Tirage.net + Voyance.fr) :
```
Les tirages sont proposés à titre de divertissement et de développement personnel. Ils revêtent un caractère purement culturel, récréatif et ludique. La voyance et les tirages de cartes ne constituent pas une science exacte. Les interprétations sont générées automatiquement à titre indicatif et ne peuvent en aucun cas se substituer à un avis médical, psychologique, juridique ou financier. Service réservé aux personnes majeures.
```

**Fichiers a modifier** :
| Fichier | Cle a modifier |
|---------|---------------|
| `src/i18n/fr.json` | `footer.disclaimer` |
| `src/i18n/en.json` | `footer.disclaimer` |
| `src/i18n/es.json` | `footer.disclaimer` |
| `src/i18n/de.json` | `footer.disclaimer` |
| `src/i18n/hi.json` | `footer.disclaimer` |
| `src/i18n/ja.json` | `footer.disclaimer` |
| `src/i18n/zh.json` | `footer.disclaimer` |

**Aucun fichier de code a toucher** — le footer (`src/components/layout/Footer.astro`) lit deja `t('footer.disclaimer')`.

**Statut** : [ ]

---

### ETAPE 2 — Completer les mentions legales
_Temps estime : 30 min | Difficulte : facile_

**Fichier principal** : `src/pages/fr/mentions-legales.astro`
**Fichiers equivalents** : `en/legal.astro`, `es/avisos-legales.astro`, `de/impressum.astro`, `hi/vidhi-suchna.astro`, `ja/houki-jouhou.astro`, `zh/fa-lv-sheng-ming.astro`

**Solution "particulier" (pas de SIRET pour l'instant) :**

Remplacer le contenu actuel par :

```
Editeur du site
---------------
Solorah — site edite par une personne physique.
Coordonnees de l'editeur communiquees a l'hebergeur
conformement a l'article 6-III-2 de la loi n°2004-575
du 21 juin 2004 (LCEN).
Email : contact@solorah.com
Directeur de la publication : Remi Pradere

Hebergement
-----------
Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
https://vercel.com

Propriete intellectuelle
------------------------
L'ensemble des contenus presents sur ce site (textes, images,
illustrations, cartes, code source) sont proteges par le droit
d'auteur. Toute reproduction, meme partielle, est interdite
sans autorisation prealable et expose a des poursuites judiciaires.

Protection des donnees personnelles
------------------------------------
Conformement au RGPD, vous disposez d'un droit d'acces, de
rectification, d'effacement et de portabilite de vos donnees.
Pour exercer ces droits : contact@solorah.com
Voir notre Politique de Confidentialite pour plus de details.

Avertissement
-------------
[Disclaimer enrichi de l'etape 1]
```

**A mettre a jour plus tard** : quand Remi aura son SIRET, remplacer "personne physique + coordonnees hebergeur" par nom + adresse + SIRET + mention "Entrepreneur individuel".

**Statut** : [ ]

---

### ETAPE 3 — Creer la page Politique de Confidentialite
_Temps estime : 1-2h | Difficulte : moyenne_

**Fichier a creer** : `src/pages/fr/politique-confidentialite.astro`
**Fichiers equivalents** : creer dans les 6 autres langues aussi

**Modele de contenu** :

```
POLITIQUE DE CONFIDENTIALITE — Solorah.com
Derniere mise a jour : [date]

1. RESPONSABLE DE TRAITEMENT
   Solorah — personne physique
   Email : contact@solorah.com

2. DONNEES COLLECTEES

   a) Formulaire de contact
      - Donnees : nom, email, message
      - Finalite : repondre a votre demande
      - Base legale : consentement (RGPD art. 6.1.a)
      - Duree : 12 mois apres traitement de la demande

   b) Compte utilisateur (inscription via magic link)
      - Donnees : adresse email
      - Finalite : acces aux fonctionnalites (sauvegarde des tirages)
      - Base legale : execution du contrat (RGPD art. 6.1.b)
      - Duree : jusqu'a suppression du compte par l'utilisateur

   c) Tirages sauvegardes
      - Donnees : type de tirage, cartes tirees, question posee, date
      - Finalite : permettre la consultation de l'historique personnel
      - Base legale : execution du contrat (RGPD art. 6.1.b)
      - Duree : jusqu'a suppression du compte
      - Note : les questions posees peuvent contenir des donnees
        a caractere personnel sensible (sante, vie sentimentale).
        En sauvegardant un tirage, vous consentez au traitement
        de ces informations.

   d) Profil utilisateur
      - Donnees : nom d'affichage (optionnel), langue preferee
      - Finalite : personnalisation de l'experience
      - Base legale : execution du contrat (RGPD art. 6.1.b)
      - Duree : jusqu'a suppression du compte

   e) Donnees techniques
      - Donnees : adresse IP, tokens de session
      - Finalite : securite et bon fonctionnement du site
      - Base legale : interet legitime (RGPD art. 6.1.f)
      - Duree : duree de la session

3. COOKIES ET STOCKAGE LOCAL

   Ce site utilise uniquement :
   - Cookies de session Supabase Auth (strictement necessaires,
     exemptes de consentement selon la directive ePrivacy)
   - Stockage local (localStorage) pour les preferences
     d'affichage : theme (clair/sombre) et volume audio.
     Ces donnees ne sont pas des donnees personnelles.

   Aucun cookie publicitaire, de tracking ou d'analyse
   n'est utilise sur ce site.

4. SOUS-TRAITANTS

   Vos donnees sont traitees par les sous-traitants suivants :

   | Sous-traitant | Role | Localisation | Politique |
   |---------------|------|-------------|-----------|
   | Supabase Inc. | Base de donnees, authentification | USA | https://supabase.com/privacy |
   | Resend Inc. | Envoi d'emails transactionnels | USA | https://resend.com/legal/privacy-policy |
   | Vercel Inc. | Hebergement du site web | USA | https://vercel.com/legal/privacy-policy |

   Ces sous-traitants sont couverts par le EU-US Data Privacy
   Framework ou des clauses contractuelles types (CCT) conformes
   au RGPD pour les transferts hors Union Europeenne.

5. VOS DROITS (RGPD art. 15 a 21)

   Vous disposez des droits suivants :
   - Droit d'acces a vos donnees
   - Droit de rectification
   - Droit a l'effacement ("droit a l'oubli")
   - Droit a la portabilite
   - Droit d'opposition au traitement
   - Droit a la limitation du traitement

   Pour exercer ces droits :
   Email : contact@solorah.com
   Delai de reponse : 30 jours maximum.

6. RECLAMATION

   Si vous estimez que le traitement de vos donnees ne respecte
   pas la reglementation, vous pouvez deposer une reclamation
   aupres de la CNIL : https://www.cnil.fr
```

**Liens a ajouter dans le footer** :
- Le footer (`src/components/layout/Footer.astro`) n'affiche pas le lien "Politique de confidentialite" — il faut l'ajouter
- La cle `footer.privacy` existe deja dans fr.json ("Politique de confidentialité") mais n'est pas utilisee dans Footer.astro

**Cles i18n a ajouter** dans les 7 fichiers JSON :
- `pages.privacy.title`
- `pages.privacy.metaDescription`

**Statut** : [ ]

---

### ETAPE 4 — Creer la page CGU
_Temps estime : 1-2h | Difficulte : moyenne_

**Fichier a creer** : `src/pages/fr/cgu.astro`
**Fichiers equivalents** : creer dans les 6 autres langues

**Modele de contenu** :

```
CONDITIONS GENERALES D'UTILISATION — Solorah.com
Derniere mise a jour : [date]

ARTICLE 1 — OBJET
Le site solorah.com propose des tirages de tarot et d'oracle
en ligne a titre de divertissement et de developpement personnel.
Le contenu fourni revet un caractere purement culturel,
recreatif et ludique.

ARTICLE 2 — ACCES AU SERVICE
L'acces aux tirages gratuits est libre et sans inscription.
La sauvegarde des tirages necessite la creation d'un compte
via un lien de connexion envoye par email (magic link).
Le service est strictement reserve aux personnes majeures
(18 ans revolus).
En utilisant ce site, vous confirmez avoir au moins 18 ans.

ARTICLE 3 — AVERTISSEMENT IMPORTANT
La voyance et les tirages de cartes ne constituent pas
une science exacte. Ce site ne propose pas de voyance
au sens reglementaire du terme.
Les interpretations fournies sont generees automatiquement
par un systeme d'intelligence artificielle a titre purement
indicatif. L'editeur ne peut garantir la veracite d'un
resultat ni l'exactitude des interpretations donnees.
Les tirages ne doivent en aucun cas se substituer a :
- un avis medical ou psychologique
- un conseil juridique
- un conseil financier
- une prise de decision personnelle ou professionnelle
En cas de difficulte, consultez un professionnel qualifie.

ARTICLE 4 — CONTENU GENERE PAR IA
Les interpretations des tirages sont generees par des
systemes d'intelligence artificielle. Ce contenu est
fourni a titre indicatif et ne constitue en aucun cas
un avis professionnel. L'editeur ne saurait etre tenu
responsable du contenu genere.

ARTICLE 5 — PROPRIETE INTELLECTUELLE
L'ensemble des contenus (textes, images, illustrations,
cartes, code source) est protege par le droit d'auteur.
Toute reproduction sans autorisation prealable est interdite
et expose a des poursuites judiciaires.

ARTICLE 6 — COMPTE UTILISATEUR
L'utilisateur est responsable de la confidentialite de
son compte. L'editeur se reserve le droit de suspendre
ou supprimer un compte en cas d'utilisation abusive.
L'utilisateur peut supprimer son compte et ses donnees
a tout moment en ecrivant a contact@solorah.com.

ARTICLE 7 — LIMITATION DE RESPONSABILITE
L'editeur ne saurait etre tenu responsable :
- des decisions prises sur la base des tirages
- de l'indisponibilite temporaire du service
- des dommages lies a l'utilisation du site
La responsabilite de l'editeur est limitee aux dommages
directs et previsibles.

ARTICLE 8 — DONNEES PERSONNELLES
Le traitement des donnees personnelles est decrit dans
notre Politique de Confidentialite.

ARTICLE 9 — MODIFICATION DES CGU
L'editeur se reserve le droit de modifier les presentes
CGU. Les utilisateurs seront informes des modifications
par affichage sur le site. L'utilisation continue du site
vaut acceptation des CGU modifiees.

ARTICLE 10 — LOI APPLICABLE
Les presentes CGU sont regies par le droit francais.
Tout litige sera soumis aux tribunaux competents de
Toulouse, France.
```

**Liens a ajouter** :
- Footer : ajouter lien vers `/fr/cgu` (la cle `footer.terms` "CGV" existe deja — la renommer en "CGU")

**Cles i18n a ajouter/modifier** dans les 7 fichiers JSON :
- `footer.terms` : "CGV" → "CGU" (pas de vente pour l'instant)
- `pages.terms.title`
- `pages.terms.metaDescription`

**Statut** : [ ]

---

### ETAPE 5 — Ajouter la checkbox consentement au formulaire contact
_Temps estime : 30 min | Difficulte : facile_

**Fichier** : `src/components/ContactForm.tsx`

**A ajouter avant le bouton "Envoyer"** :
```tsx
<label className="flex items-start gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={consent}
    onChange={(e) => setConsent(e.target.checked)}
    className="mt-1"
    required
  />
  <span className="text-sm text-sol-ash">
    J'accepte que mes données soient traitées conformément à la{' '}
    <a href={`/${lang}/politique-confidentialite`} className="text-sol-gold underline">
      politique de confidentialité
    </a>.
  </span>
</label>
```

**Logique** :
- Ajouter `const [consent, setConsent] = useState(false)` dans le composant
- Desactiver le bouton "Envoyer" si `!consent`

**Cles i18n a ajouter** :
- `pages.contact.consent` : "J'accepte que mes données soient traitées conformément à la"
- `pages.contact.privacyLink` : "politique de confidentialité"

**Statut** : [ ]

---

### ETAPE 6 — Renommer "Consultation" en "Lecture approfondie"
_Temps estime : 30 min | Difficulte : facile_

Le terme "consultation" est reglemente en France. Pour un site de tarot automatise par IA, c'est risque. Les concurrents (Tirage.net, Voyance.fr) l'utilisent mais ils ont de vrais voyants humains.

**Fichiers a renommer** :
| Ancien | Nouveau |
|--------|---------|
| `src/pages/fr/consultation.astro` | `src/pages/fr/lecture-approfondie.astro` |
| `src/pages/en/consultation.astro` | `src/pages/en/deep-reading.astro` |
| `src/pages/es/consulta.astro` | `src/pages/es/lectura-profunda.astro` |
| `src/pages/de/beratung.astro` | `src/pages/de/tiefenlesung.astro` |
| `src/pages/hi/paramarsh.astro` | `src/pages/hi/gehri-paath.astro` |
| `src/pages/ja/soudan.astro` | `src/pages/ja/fukayomi.astro` |
| `src/pages/zh/zi-xun.astro` | `src/pages/zh/shen-du-jie-du.astro` |

**Cles i18n a modifier** dans les 7 fichiers JSON :
- `nav.consultation` : "Consultation" → "Lecture approfondie"
- `consultation.sectionTitle` : "Aller plus loin" (peut rester)
- `consultation.cta` : "Découvrir les consultations" → "Découvrir la lecture approfondie"
- `pages.consultation.title` : "Consultation" → "Lecture approfondie"
- `pages.consultation.metaDescription` : remplacer "consultation" partout

**Composant a modifier** :
- `src/components/home/ConsultationCTA.astro` ligne 33 : `href={`/${lang}/consultation`}` → `href={`/${lang}/lecture-approfondie`}`

**Statut** : [ ]

---

### ETAPE 7 — Ajouter les liens manquants dans le footer
_Temps estime : 20 min | Difficulte : facile_

Le footer (`src/components/layout/Footer.astro`) n'affiche que 2 liens : Mentions legales + Contact. Il faut ajouter Politique de confidentialite + CGU.

**Fichier** : `src/components/layout/Footer.astro`

**Bloc liens actuel** (lignes 33-41) → ajouter 2 liens :
- Politique de confidentialite → `/{lang}/politique-confidentialite`
- CGU → `/{lang}/cgu`

**Statut** : [ ]

---

### ETAPE 8 — Self-host Google Fonts
_Temps estime : 1h | Difficulte : moyenne_

Jurisprudence allemande (AG Munchen, 2022) : amende pour transfert d'IP vers Google sans consentement. Solorah a une version `/de/`, donc le risque est reel.

**Fichier** : `src/layouts/BaseLayout.astro`

**A faire** :
1. Identifier les polices Google utilisees dans le `<head>` (preconnect googleapis)
2. Telecharger les fichiers .woff2 depuis https://gwfh.mranftl.com/fonts (Google Webfonts Helper)
3. Les placer dans `public/fonts/`
4. Creer des `@font-face` dans le CSS global
5. Supprimer les `<link rel="preconnect" href="https://fonts.googleapis.com">` et `<link rel="preconnect" href="https://fonts.gstatic.com">`
6. Supprimer le `<link href="https://fonts.googleapis.com/css2?...">`

**Statut** : [ ]

---

### ETAPE 9 — Bandeau d'information cookies
_Temps estime : 30 min | Difficulte : facile_

Solorah n'utilise PAS de cookies de tracking. Un simple bandeau informatif suffit (pas besoin d'un systeme opt-in complexe).

**Composant a creer** : `src/components/ui/CookieBanner.tsx` (React, client:load)

**Logique** :
- Si `localStorage.getItem('solorah-cookie-ok')` n'existe pas → afficher le bandeau
- Au clic "OK" → `localStorage.setItem('solorah-cookie-ok', 'true')` + masquer
- Texte : "Ce site utilise uniquement des cookies nécessaires au fonctionnement. Aucun cookie publicitaire ou de tracking. [En savoir plus]"
- Lien "En savoir plus" → `/fr/politique-confidentialite`

**Fichier a modifier** : `src/layouts/BaseLayout.astro` — ajouter `<CookieBanner client:load />` avant `</body>`

**Statut** : [ ]

---

### ETAPE 10 — Mecanisme de suppression de donnees
_Temps estime : 2-3h | Difficulte : moyenne_

RGPD art. 17 : droit a l'effacement. Deux options :

**Option A (rapide, suffisante pour le lancement)** :
- Documenter dans la politique de confidentialite : "Pour supprimer votre compte et toutes vos donnees, ecrivez a contact@solorah.com. Suppression effectuee sous 30 jours."
- Pas de dev necessaire

**Option B (mieux, a faire plus tard)** :
- Bouton "Supprimer mon compte" dans la page `/fr/mes-tirages`
- Appel API Supabase : suppression cascade profil + tirages + messages contact
- Confirmation avant suppression ("Etes-vous sur ? Cette action est irreversible.")

**Recommandation** : Option A pour le lancement, Option B ensuite.

**Statut** : [ ]

---

### ETAPE 11 — Revoir la page A propos
_Temps estime : 20 min | Difficulte : facile_

**Fichier** : `src/pages/fr/a-propos.astro`

**Texte actuel problematique** :
- "passion pour les arts divinatoires" → risque avec la loi About-Picard si service payant
- "recevoir les messages que les cartes portent pour lui" → trop mystique, flirte avec la promesse de voyance

**Remplacements suggeres** :
| Avant | Apres |
|-------|-------|
| "arts divinatoires" | "arts symboliques et de la lecture intuitive" |
| "recevoir les messages que les cartes portent pour lui" | "explorer les symboles des cartes et enrichir sa reflexion personnelle" |
| "espace sacre en ligne" | "espace de reflexion en ligne" |

**Statut** : [ ]

---

### ETAPE 12 — Mention age minimum visible
_Temps estime : 10 min | Difficulte : facile_

Benchmark : Tirage.net et Voyance.fr exigent 18 ans.

**Option A** : Deja inclus dans le disclaimer enrichi (etape 1) — "Service reserve aux personnes majeures"
**Option B** : Ajouter une mention en haut de la page de tirage `/fr/tirage/index.astro`

Si l'etape 1 est faite, cette etape est automatiquement cochee.

**Statut** : [ ]

---

### ETAPE 13 — Retention des donnees Supabase
_Temps estime : 30 min | Difficulte : facile_

**Option A (suffisante)** : Documenter les durees dans la politique de confidentialite (deja fait dans l'etape 3).

**Option B (bonus)** : CRON Supabase pour purger `contact_messages` apres 12 mois.

```sql
-- A executer dans Supabase SQL Editor comme scheduled function
DELETE FROM contact_messages
WHERE created_at < NOW() - INTERVAL '12 months';
```

**Statut** : [ ]

---

### ETAPE 14 — Preparer les CGV (QUAND le service payant sera lance)
_A faire UNIQUEMENT quand Remi lancera un service payant_

Obligatoire des qu'il y a vente a des particuliers (Code de la consommation, art. L111-1).

**Clauses a prevoir** :
- Prix TTC + conditions de paiement
- Droit de retractation 14 jours
- Modalites de livraison du service
- Mediateur de la consommation (obligatoire depuis 2016)
- Clause de non-garantie de resultats (specifique voyance)

**Statut** : [ ] (pas prioritaire)

---

## RISQUES SPECIFIQUES TAROT EN LIGNE (a connaitre)

### Abus de faiblesse
Les utilisateurs de sites de voyance sont souvent vulnerables (rupture, deuil, stress). La DGCCRF a constate des anomalies dans **65% des sites de voyance** controles en 2021. Ne JAMAIS :
- Inciter a des tirages repetes / addictifs
- Exploiter l'angoisse pour vendre
- Promettre des solutions a des problemes reels

### Donnees sensibles (RGPD art. 9)
Les questions de tirage peuvent reveler : sante, orientation sexuelle, convictions. La CNIL a sanctionne Cosmospace pour ce motif. → L'etape 3 (politique confidentialite) couvre ce point avec le consentement explicite lors de la sauvegarde.

### Contenu genere par IA (AI Act UE)
Les interpretations generees par IA devront a terme etre identifiees comme telles. → L'etape 4 (CGU, article 4) couvre ce point.

---

## CHECKLIST COMPLETE

| # | Action | Temps | Statut |
|---|--------|-------|--------|
| 1 | Enrichir disclaimer footer (7 fichiers i18n) | 20 min | [ ] |
| 2 | Completer mentions legales (7 pages Astro) | 30 min | [ ] |
| 3 | Creer politique de confidentialite (7 pages Astro + i18n) | 1-2h | [ ] |
| 4 | Creer CGU (7 pages Astro + i18n) | 1-2h | [ ] |
| 5 | Checkbox consentement formulaire contact (1 composant) | 30 min | [ ] |
| 6 | Renommer "Consultation" → "Lecture approfondie" (7 pages + i18n + liens) | 30 min | [ ] |
| 7 | Ajouter liens manquants dans le footer (1 composant) | 20 min | [ ] |
| 8 | Self-host Google Fonts (BaseLayout + public/fonts/) | 1h | [ ] |
| 9 | Bandeau info cookies (1 composant + BaseLayout) | 30 min | [ ] |
| 10 | Mecanisme suppression donnees (Option A = juste documenter) | 10 min | [ ] |
| 11 | Revoir page A propos (1 page Astro) | 20 min | [ ] |
| 12 | Mention age minimum (couvert par etape 1) | 0 min | [ ] |
| 13 | Retention donnees Supabase (couvert par etape 3) | 0 min | [ ] |
| 14 | CGV — quand service payant | Plus tard | [ ] |

**Temps total estime** : ~6-8h de travail (qu'on peut faire ensemble pas a pas)

---

## PROCHAINE ACTION DE REMI

Rien a fournir pour l'instant (pas besoin de SIRET, on utilise la solution "particulier"). On peut commencer l'etape 1 des maintenant. Dis "go etape 1" et on y va.
