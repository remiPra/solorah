import type { Card, Deck } from '../types/card';

const cards: Card[] = [
  {
    id: 1,
    slug: 'le-troisieme-oeil',
    image: '/images/cards/shiva/01-le-troisieme-oeil.png',
    name: { fr: 'Le Troisième Œil', en: 'The Third Eye' },
    message: {
      fr: 'Regarde au-delà des apparences. La vérité est devant toi.',
      en: 'Look beyond appearances. The truth is before you.',
    },
    interpretation: {
      fr: "Ton intuition te guide vers la bonne décision. Ce que tes yeux ne voient pas, ton âme le perçoit. Cesse d'analyser et laisse ta vision intérieure t'éclairer.",
      en: "Your intuition guides you toward the right decision. What your eyes cannot see, your soul perceives. Stop analyzing and let your inner vision illuminate the way.",
    },
  },
  {
    id: 2,
    slug: 'le-feu-sacre',
    image: '/images/cards/shiva/02-le-feu-sacre.jpeg',
    name: { fr: 'Le Feu Sacré', en: 'The Sacred Fire' },
    message: {
      fr: 'Brûle ce qui ne te sert plus. La purification commence.',
      en: 'Burn what no longer serves you. Purification begins.',
    },
    interpretation: {
      fr: "Il est temps de lâcher prise sur les vieilles habitudes et croyances qui t'enchaînent. Le feu sacré de Shiva consume l'ancien pour faire place au nouveau. Ose la transformation.",
      en: "It's time to let go of old habits and beliefs that bind you. Shiva's sacred fire consumes the old to make way for the new. Dare to transform.",
    },
  },
  {
    id: 3,
    slug: 'la-danse-cosmique',
    image: '/images/cards/shiva/03-la-danse-cosmique.png',
    name: { fr: 'La Danse Cosmique', en: 'The Cosmic Dance' },
    message: {
      fr: "Le changement est la seule constante. Danse avec l'univers.",
      en: 'Change is the only constant. Dance with the universe.',
    },
    interpretation: {
      fr: "Comme Nataraja, Shiva dansant, accepte le rythme naturel de la vie. Création et destruction se succèdent éternellement. Ne résiste pas au mouvement — fais-en partie.",
      en: "Like Nataraja, the dancing Shiva, accept life's natural rhythm. Creation and destruction follow each other eternally. Don't resist the movement — become part of it.",
    },
  },
  {
    id: 4,
    slug: 'le-lotus-du-silence',
    image: '/images/cards/shiva/04-le-lotus-du-silence.jpeg',
    name: { fr: 'Le Lotus du Silence', en: 'The Lotus of Silence' },
    message: {
      fr: 'Fais silence. La réponse vient du calme intérieur.',
      en: 'Be still. The answer comes from inner calm.',
    },
    interpretation: {
      fr: "Avant de prendre ta décision, accorde-toi un moment de silence profond. Comme le lotus qui fleurit dans les eaux calmes, ta sagesse émerge quand le mental s'apaise.",
      en: "Before making your decision, grant yourself a moment of deep silence. Like the lotus that blooms in still waters, your wisdom emerges when the mind settles.",
    },
  },
  {
    id: 5,
    slug: 'le-serpent-kundalini',
    image: '/images/cards/shiva/05-le-serpent-kundalini.jpeg',
    name: { fr: 'Le Serpent Kundalini', en: 'The Kundalini Serpent' },
    message: {
      fr: "Une énergie puissante s'éveille en toi. Canalise-la.",
      en: 'A powerful energy awakens within you. Channel it.',
    },
    interpretation: {
      fr: "Tu es à un tournant. L'énergie créatrice qui monte en toi demande à être dirigée avec conscience. Ne la gaspille pas — utilise cette force pour avancer vers ton but le plus élevé.",
      en: "You are at a turning point. The creative energy rising within you demands conscious direction. Don't waste it — use this force to move toward your highest purpose.",
    },
  },
  {
    id: 6,
    slug: 'la-montagne-sacree',
    image: '/images/cards/shiva/06-la-montagne-sacree.png',
    name: { fr: 'La Montagne Sacrée', en: 'The Sacred Mountain' },
    message: {
      fr: 'Reste ancré. Ta stabilité est ta force.',
      en: 'Stay grounded. Your stability is your strength.',
    },
    interpretation: {
      fr: "Comme le mont Kailash, demeure immobile au cœur de la tempête. Les épreuves passent, mais ta fondation intérieure est inébranlable. Prends ta décision depuis cet endroit de calme.",
      en: "Like Mount Kailash, remain still at the heart of the storm. Trials pass, but your inner foundation is unshakable. Make your decision from this place of calm.",
    },
  },
  {
    id: 7,
    slug: 'le-trishula',
    image: '/images/cards/shiva/07-le-trishula.jpeg',
    name: { fr: 'Le Trishula', en: 'The Trishula' },
    message: {
      fr: 'Tranche dans le vif. Le moment de décider est venu.',
      en: 'Cut through decisively. The time to decide has come.',
    },
    interpretation: {
      fr: "Le trident de Shiva tranche les trois souffrances — physique, mentale et spirituelle. Cesse de tergiverser. La clarté vient de l'action, pas de l'hésitation. Choisis et avance.",
      en: "Shiva's trident cuts through the three sufferings — physical, mental, and spiritual. Stop wavering. Clarity comes from action, not hesitation. Choose and move forward.",
    },
  },
  {
    id: 8,
    slug: 'le-damaru',
    image: '/images/cards/shiva/08-le-damaru.png',
    name: { fr: 'Le Damaru', en: 'The Damaru' },
    message: {
      fr: 'Écoute le rythme de ta vie. Il te montre le chemin.',
      en: 'Listen to the rhythm of your life. It shows you the way.',
    },
    interpretation: {
      fr: "Le tambour cosmique de Shiva bat au rythme de la création. Observe les synchronicités autour de toi — les signes, les répétitions, les coïncidences. L'univers te parle.",
      en: "Shiva's cosmic drum beats to the rhythm of creation. Observe the synchronicities around you — the signs, the repetitions, the coincidences. The universe speaks to you.",
    },
  },
  {
    id: 9,
    slug: 'le-croissant-de-lune',
    image: '/images/cards/shiva/09-le-croissant-de-lune.jpeg',
    name: { fr: 'Le Croissant de Lune', en: 'The Crescent Moon' },
    message: {
      fr: 'Fais confiance aux cycles. Chaque phase a son sens.',
      en: 'Trust the cycles. Every phase has its meaning.',
    },
    interpretation: {
      fr: "Tu traverses une phase de transition, comme la lune qui croît et décroît. Ce moment d'incertitude est naturel et nécessaire. Patience — la plénitude reviendra.",
      en: "You are going through a phase of transition, like the waxing and waning moon. This moment of uncertainty is natural and necessary. Patience — fullness will return.",
    },
  },
  {
    id: 10,
    slug: 'le-cobra-royal',
    image: '/images/cards/shiva/10-le-cobra-royal.jpeg',
    name: { fr: 'Le Cobra Royal', en: 'The Royal Cobra' },
    message: {
      fr: 'Maîtrise tes peurs. Elles sont tes alliées.',
      en: 'Master your fears. They are your allies.',
    },
    interpretation: {
      fr: "Comme Shiva qui porte le cobra autour de son cou, apprivoise ce qui t'effraie. La peur n'est pas ton ennemie — c'est une énergie que tu peux transformer en puissance et en sagesse.",
      en: "Like Shiva who wears the cobra around his neck, tame what frightens you. Fear is not your enemy — it is energy you can transform into power and wisdom.",
    },
  },
  {
    id: 11,
    slug: 'le-rudraksha',
    image: '/images/cards/shiva/11-le-rudraksha.png',
    name: { fr: 'Le Rudraksha', en: 'The Rudraksha' },
    message: {
      fr: 'Reconnecte-toi au sacré. La dévotion éclaire.',
      en: 'Reconnect with the sacred. Devotion illuminates.',
    },
    interpretation: {
      fr: "Les larmes de Shiva ont créé les graines de Rudraksha — symbole de compassion divine. Reviens à ce qui est sacré pour toi. Ta connexion spirituelle est la boussole qui guide tes choix.",
      en: "Shiva's tears created the Rudraksha seeds — a symbol of divine compassion. Return to what is sacred to you. Your spiritual connection is the compass that guides your choices.",
    },
  },
  {
    id: 12,
    slug: 'les-cendres-sacrees',
    image: '/images/cards/shiva/12-les-cendres-sacrees.jpeg',
    name: { fr: 'Les Cendres Sacrées', en: 'The Sacred Ashes' },
    message: {
      fr: "De la destruction naît le renouveau. N'aie pas peur de tout recommencer.",
      en: "From destruction comes renewal. Don't be afraid to start over.",
    },
    interpretation: {
      fr: "Les cendres que Shiva porte sur son corps rappellent que tout est éphémère. Ce que tu crois perdu se transforme. Accepte la fin d'un cycle — un nouveau départ t'attend.",
      en: "The ashes Shiva wears on his body remind us that everything is ephemeral. What you believe lost transforms. Accept the end of a cycle — a new beginning awaits you.",
    },
  },
  {
    id: 13,
    slug: 'le-gange-celeste',
    image: '/images/cards/shiva/13-le-gange-celeste.jpeg',
    name: { fr: 'Le Gange Céleste', en: 'The Celestial Ganges' },
    message: {
      fr: 'Laisse couler. La résistance crée la souffrance.',
      en: 'Let it flow. Resistance creates suffering.',
    },
    interpretation: {
      fr: "Comme le Gange qui descend du ciel à travers les cheveux de Shiva, laisse la grâce couler dans ta vie. Cesse de vouloir tout contrôler — la fluidité est ta plus grande sagesse.",
      en: "Like the Ganges descending from heaven through Shiva's hair, let grace flow into your life. Stop trying to control everything — fluidity is your greatest wisdom.",
    },
  },
  {
    id: 14,
    slug: 'l-arbre-banyan',
    image: '/images/cards/shiva/14-l-arbre-banyan.jpeg',
    name: { fr: "L'Arbre Banyan", en: 'The Banyan Tree' },
    message: {
      fr: 'Enracine-toi dans ta vérité. Puis déploie-toi.',
      en: 'Root yourself in your truth. Then unfold.',
    },
    interpretation: {
      fr: "Sous le banyan, Shiva enseigne en silence. Ta sagesse intérieure est plus vaste que tu ne le crois. Prends le temps de revenir à tes racines profondes avant de te déployer vers le monde.",
      en: "Beneath the banyan, Shiva teaches in silence. Your inner wisdom is vaster than you think. Take time to return to your deep roots before unfolding toward the world.",
    },
  },
  {
    id: 15,
    slug: 'le-mantra-om',
    image: '/images/cards/shiva/15-le-mantra-om.png',
    name: { fr: 'Le Mantra Om', en: 'The Om Mantra' },
    message: {
      fr: "Aligne-toi avec la vibration de l'univers.",
      en: 'Align yourself with the vibration of the universe.',
    },
    interpretation: {
      fr: "Om est le son primordial d'où naît toute création. Quand tu es aligné avec ta vérité profonde, tes décisions deviennent naturelles. Trouve ce qui résonne en toi et suis cette vibration.",
      en: "Om is the primordial sound from which all creation is born. When you are aligned with your deep truth, your decisions become natural. Find what resonates within you and follow that vibration.",
    },
  },
  {
    id: 16,
    slug: 'l-oeil-du-cyclone',
    image: '/images/cards/shiva/16-l-oeil-du-cyclone.png',
    name: { fr: "L'Œil du Cyclone", en: 'The Eye of the Storm' },
    message: {
      fr: 'Au centre du chaos, tu trouveras la paix.',
      en: 'At the center of chaos, you will find peace.',
    },
    interpretation: {
      fr: "Autour de toi, tout semble s'agiter — mais au cœur du cyclone règne un calme absolu. Trouve ce centre en toi. C'est depuis cet espace que la décision juste émergera.",
      en: "Around you, everything seems turbulent — but at the heart of the cyclone reigns absolute calm. Find that center within you. It is from this space that the right decision will emerge.",
    },
  },
  {
    id: 17,
    slug: 'le-japa-mala',
    image: '/images/cards/shiva/17-le-japa-mala.jpeg',
    name: { fr: 'Le Japa Mala', en: 'The Japa Mala' },
    message: {
      fr: 'La persévérance porte ses fruits. Continue.',
      en: 'Perseverance bears fruit. Keep going.',
    },
    interpretation: {
      fr: "Grain après grain, le mala enseigne la patience et la constance. Le chemin que tu empruntes est le bon, même s'il semble long. Chaque petit pas te rapproche de ta destination.",
      en: "Bead by bead, the mala teaches patience and constancy. The path you walk is the right one, even if it seems long. Every small step brings you closer to your destination.",
    },
  },
  {
    id: 18,
    slug: 'le-tigre',
    image: '/images/cards/shiva/18-le-tigre.jpeg',
    name: { fr: 'Le Tigre', en: 'The Tiger' },
    message: {
      fr: 'Affirme ta puissance. Tu es plus fort que tu ne le crois.',
      en: 'Assert your power. You are stronger than you think.',
    },
    interpretation: {
      fr: "Shiva est assis sur la peau du tigre — symbole de la maîtrise de la force brute. Tu possèdes une puissance intérieure immense. Le moment est venu de l'utiliser avec conscience et courage.",
      en: "Shiva sits on the tiger skin — symbol of mastery over raw force. You possess immense inner power. The time has come to use it with awareness and courage.",
    },
  },
  {
    id: 19,
    slug: 'le-point-bindu',
    image: '/images/cards/shiva/19-le-point-bindu.png',
    name: { fr: 'Le Point Bindu', en: 'The Bindu Point' },
    message: {
      fr: 'Concentre toute ton énergie en un seul point.',
      en: 'Focus all your energy on a single point.',
    },
    interpretation: {
      fr: "Le bindu est le point d'où tout naît et où tout converge. Disperse moins ton attention. Choisis une direction et investis-y tout ton être. La concentration est la clé de ta réussite.",
      en: "The bindu is the point from which everything is born and where everything converges. Scatter your attention less. Choose one direction and invest your whole being. Focus is the key to your success.",
    },
  },
  {
    id: 20,
    slug: 'shiva-meditant',
    image: '/images/cards/shiva/20-shiva-meditant.jpeg',
    name: { fr: 'Shiva Méditant', en: 'Meditating Shiva' },
    message: {
      fr: "La paix suprême est en toi. Tu n'as besoin de rien d'autre.",
      en: 'Supreme peace is within you. You need nothing else.',
    },
    interpretation: {
      fr: "Shiva en méditation incarne la conscience pure. La réponse que tu cherches n'est pas dans le monde extérieur — elle réside dans le silence de ton être. Médite, et tout deviendra clair.",
      en: "Shiva in meditation embodies pure consciousness. The answer you seek is not in the outer world — it resides in the silence of your being. Meditate, and everything will become clear.",
    },
  },
];

export const oracleShivaDeck: Deck = {
  id: 'oracle-shiva',
  name: {
    fr: 'Oracle de Shiva',
    en: 'Shiva Oracle',
  },
  description: {
    fr: 'Un oracle inspiré de la sagesse de Shiva. 20 cartes pour éclairer tes décisions et trouver ta voie.',
    en: "An oracle inspired by Shiva's wisdom. 20 cards to illuminate your decisions and find your path.",
  },
  cards,
  cardBack: '',
};
