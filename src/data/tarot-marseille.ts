import type { TarotCard, TarotDeck } from '../types/card';

const cards: TarotCard[] = [
  {
    id: 0,
    slug: 'le-mat',
    image: '/images/cards/tarot/00-le-mat.jpeg',
    name: { fr: 'Le Mat', en: 'The Fool' },
    message: {
      upright: {
        fr: "Fais confiance à l'inconnu. Un voyage commence.",
        en: 'Trust the unknown. A journey begins.',
      },
      reversed: {
        fr: 'Tu hésites trop. Ose le premier pas.',
        en: 'You hesitate too much. Dare to take the first step.',
      },
    },
  },
  {
    id: 1,
    slug: 'le-bateleur',
    image: '/images/cards/tarot/01-le-bateleur.jpeg',
    name: { fr: 'Le Bateleur', en: 'The Magician' },
    message: {
      upright: {
        fr: 'Tu as tous les outils en main. Crée ta réalité.',
        en: 'You have all the tools. Create your reality.',
      },
      reversed: {
        fr: 'Tes talents sont dispersés. Recentre-toi.',
        en: 'Your talents are scattered. Refocus.',
      },
    },
  },
  {
    id: 2,
    slug: 'la-papesse',
    image: '/images/cards/tarot/02-la-papesse.jpeg',
    name: { fr: 'La Papesse', en: 'The High Priestess' },
    message: {
      upright: {
        fr: 'Écoute ton intuition. La réponse est en toi.',
        en: 'Listen to your intuition. The answer is within.',
      },
      reversed: {
        fr: 'Tu ignores ta voix intérieure. Fais silence.',
        en: "You're ignoring your inner voice. Be still.",
      },
    },
  },
  {
    id: 3,
    slug: 'l-imperatrice',
    image: '/images/cards/tarot/03-l-imperatrice.jpeg',
    name: { fr: "L'Impératrice", en: 'The Empress' },
    message: {
      upright: {
        fr: "L'abondance arrive. Accueille la fertilité de la vie.",
        en: "Abundance is coming. Welcome life's fertility.",
      },
      reversed: {
        fr: 'Tu négliges ta créativité. Reconnecte-toi à la nature.',
        en: "You're neglecting your creativity. Reconnect with nature.",
      },
    },
  },
  {
    id: 4,
    slug: 'l-empereur',
    image: '/images/cards/tarot/04-l-empereur.jpeg',
    name: { fr: "L'Empereur", en: 'The Emperor' },
    message: {
      upright: {
        fr: 'Structure et stabilité te protègent. Affirme ton autorité.',
        en: 'Structure and stability protect you. Assert your authority.',
      },
      reversed: {
        fr: 'Trop de contrôle étouffe. Lâche prise sur le pouvoir.',
        en: 'Too much control suffocates. Let go of power.',
      },
    },
  },
  {
    id: 5,
    slug: 'le-pape',
    image: '/images/cards/tarot/05-le-pape.jpeg',
    name: { fr: 'Le Pape', en: 'The Hierophant' },
    message: {
      upright: {
        fr: 'Un enseignement précieux arrive. Ouvre-toi à la sagesse.',
        en: 'A precious teaching is coming. Open yourself to wisdom.',
      },
      reversed: {
        fr: 'Les conventions te limitent. Trouve ton propre chemin.',
        en: 'Conventions limit you. Find your own path.',
      },
    },
  },
  {
    id: 6,
    slug: 'l-amoureux',
    image: '/images/cards/tarot/06-l-amoureux.jpeg',
    name: { fr: "L'Amoureux", en: 'The Lovers' },
    message: {
      upright: {
        fr: "Un choix d'amour se présente. Suis ton cœur.",
        en: 'A choice of love presents itself. Follow your heart.',
      },
      reversed: {
        fr: "L'indécision te paralyse. Choisis avec courage.",
        en: 'Indecision paralyzes you. Choose with courage.',
      },
    },
  },
  {
    id: 7,
    slug: 'le-chariot',
    image: '/images/cards/tarot/07-le-chariot.jpeg',
    name: { fr: 'Le Chariot', en: 'The Chariot' },
    message: {
      upright: {
        fr: 'La victoire est proche. Avance avec détermination.',
        en: 'Victory is near. Move forward with determination.',
      },
      reversed: {
        fr: 'Tu forces trop. La vraie force est dans la maîtrise de soi.',
        en: "You're forcing too much. True strength is self-mastery.",
      },
    },
  },
  {
    id: 8,
    slug: 'la-justice',
    image: '/images/cards/tarot/08-la-justice.jpeg',
    name: { fr: 'La Justice', en: 'Justice' },
    message: {
      upright: {
        fr: "L'équilibre se rétablit. La vérité triomphe.",
        en: 'Balance is restored. Truth prevails.',
      },
      reversed: {
        fr: 'Un déséquilibre persiste. Sois honnête avec toi-même.',
        en: 'An imbalance persists. Be honest with yourself.',
      },
    },
  },
  {
    id: 9,
    slug: 'l-hermite',
    image: '/images/cards/tarot/09-l-hermite.jpeg',
    name: { fr: "L'Hermite", en: 'The Hermit' },
    message: {
      upright: {
        fr: "La solitude t'éclaire. Cherche la lumière intérieure.",
        en: 'Solitude enlightens you. Seek your inner light.',
      },
      reversed: {
        fr: "Tu t'isoles trop. Partage ta sagesse avec le monde.",
        en: "You're isolating too much. Share your wisdom with the world.",
      },
    },
  },
  {
    id: 10,
    slug: 'la-roue-de-fortune',
    image: '/images/cards/tarot/10-la-roue-de-fortune.jpeg',
    name: { fr: 'La Roue de Fortune', en: 'Wheel of Fortune' },
    message: {
      upright: {
        fr: 'Le destin tourne en ta faveur. Saisis cette chance.',
        en: 'Destiny turns in your favor. Seize this opportunity.',
      },
      reversed: {
        fr: 'Un cycle se répète. Apprends la leçon pour avancer.',
        en: 'A cycle repeats. Learn the lesson to move forward.',
      },
    },
  },
  {
    id: 11,
    slug: 'la-force',
    image: '/images/cards/tarot/11-la-force.jpeg',
    name: { fr: 'La Force', en: 'Strength' },
    message: {
      upright: {
        fr: 'Ta douceur est ta plus grande puissance.',
        en: 'Your gentleness is your greatest power.',
      },
      reversed: {
        fr: 'La peur te domine. Apprivoise tes instincts.',
        en: 'Fear dominates you. Tame your instincts.',
      },
    },
  },
  {
    id: 12,
    slug: 'le-pendu',
    image: '/images/cards/tarot/12-le-pendu.jpeg',
    name: { fr: 'Le Pendu', en: 'The Hanged Man' },
    message: {
      upright: {
        fr: "Lâcher prise t'apporte l'illumination.",
        en: 'Letting go brings you illumination.',
      },
      reversed: {
        fr: 'Tu résistes au changement. Accepte de voir autrement.',
        en: 'You resist change. Accept seeing differently.',
      },
    },
  },
  {
    id: 13,
    slug: 'l-arcane-sans-nom',
    image: '/images/cards/tarot/13-l-arcane-sans-nom.jpeg',
    name: { fr: "L'Arcane Sans Nom", en: 'The Nameless Arcana' },
    message: {
      upright: {
        fr: 'Une transformation profonde est en cours. Renaissance.',
        en: 'A deep transformation is underway. Rebirth.',
      },
      reversed: {
        fr: "Tu t'accroches au passé. Laisse mourir ce qui doit partir.",
        en: 'You cling to the past. Let go of what must leave.',
      },
    },
  },
  {
    id: 14,
    slug: 'temperance',
    image: '/images/cards/tarot/14-temperance.jpeg',
    name: { fr: 'Tempérance', en: 'Temperance' },
    message: {
      upright: {
        fr: "L'harmonie revient. Patience et équilibre portent leurs fruits.",
        en: 'Harmony returns. Patience and balance bear fruit.',
      },
      reversed: {
        fr: "Tu es dans l'excès. Retrouve la mesure.",
        en: 'You are in excess. Find moderation again.',
      },
    },
  },
  {
    id: 15,
    slug: 'le-diable',
    image: '/images/cards/tarot/15-le-diable.jpeg',
    name: { fr: 'Le Diable', en: 'The Devil' },
    message: {
      upright: {
        fr: "Reconnais tes chaînes pour t'en libérer.",
        en: 'Recognize your chains to free yourself.',
      },
      reversed: {
        fr: 'Une dépendance te retient. Tu as le pouvoir de la briser.',
        en: 'An addiction holds you. You have the power to break it.',
      },
    },
  },
  {
    id: 16,
    slug: 'la-maison-dieu',
    image: '/images/cards/tarot/16-la-maison-dieu.jpeg',
    name: { fr: 'La Maison Dieu', en: 'The Tower' },
    message: {
      upright: {
        fr: "L'effondrement libère. Après la tempête, la clarté.",
        en: 'Collapse liberates. After the storm, clarity.',
      },
      reversed: {
        fr: 'Tu résistes à une vérité nécessaire. Laisse les murs tomber.',
        en: 'You resist a necessary truth. Let the walls fall.',
      },
    },
  },
  {
    id: 17,
    slug: 'l-etoile',
    image: '/images/cards/tarot/17-l-etoile.jpeg',
    name: { fr: "L'Étoile", en: 'The Star' },
    message: {
      upright: {
        fr: "L'espoir renaît. Tu es guidé(e) par la grâce.",
        en: 'Hope is reborn. You are guided by grace.',
      },
      reversed: {
        fr: 'Tu as perdu foi en toi. Rappelle-toi ta lumière.',
        en: "You've lost faith in yourself. Remember your light.",
      },
    },
  },
  {
    id: 18,
    slug: 'la-lune',
    image: '/images/cards/tarot/18-la-lune.jpeg',
    name: { fr: 'La Lune', en: 'The Moon' },
    message: {
      upright: {
        fr: 'Tes rêves portent des messages. Explore ton inconscient.',
        en: 'Your dreams carry messages. Explore your unconscious.',
      },
      reversed: {
        fr: 'Les illusions te trompent. Cherche la vérité derrière les ombres.',
        en: 'Illusions deceive you. Seek truth behind the shadows.',
      },
    },
  },
  {
    id: 19,
    slug: 'le-soleil',
    image: '/images/cards/tarot/19-le-soleil.jpeg',
    name: { fr: 'Le Soleil', en: 'The Sun' },
    message: {
      upright: {
        fr: 'Joie pure et réussite. La lumière est avec toi.',
        en: 'Pure joy and success. The light is with you.',
      },
      reversed: {
        fr: 'Une joie te semble inaccessible. Elle est plus proche que tu ne crois.',
        en: "A joy seems unreachable. It's closer than you think.",
      },
    },
  },
  {
    id: 20,
    slug: 'le-jugement',
    image: '/images/cards/tarot/20-le-jugement.jpeg',
    name: { fr: 'Le Jugement', en: 'Judgement' },
    message: {
      upright: {
        fr: 'Un appel intérieur te réveille. Réponds à ta vocation.',
        en: 'An inner calling awakens you. Answer your vocation.',
      },
      reversed: {
        fr: "Tu ignores un appel important. Écoute avant qu'il ne soit trop tard.",
        en: "You ignore an important calling. Listen before it's too late.",
      },
    },
  },
  {
    id: 21,
    slug: 'le-monde',
    image: '/images/cards/tarot/21-le-monde.jpeg',
    name: { fr: 'Le Monde', en: 'The World' },
    message: {
      upright: {
        fr: "L'accomplissement est là. Tu as bouclé le cycle.",
        en: "Accomplishment is here. You've completed the cycle.",
      },
      reversed: {
        fr: "Quelque chose reste inachevé. La dernière étape t'attend.",
        en: 'Something remains unfinished. The last step awaits you.',
      },
    },
  },
];

export const tarotMarseilleDeck: TarotDeck = {
  id: 'tarot-marseille',
  name: {
    fr: 'Tarot de Marseille Remastered',
    en: 'Marseille Tarot Remastered',
  },
  description: {
    fr: 'Les 22 arcanes majeurs du Tarot de Marseille. Tire 3 cartes pour révéler ton passé, ton présent et ton futur.',
    en: 'The 22 major arcana of the Marseille Tarot. Draw 3 cards to reveal your past, present and future.',
  },
  cards,
};
