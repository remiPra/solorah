import type { Card, Deck } from '../types/card';

const cards: Card[] = [
  {
    id: 1,
    slug: 'eveil-du-coeur',
    image: '/images/cards/oracle/01-eveil-du-coeur.jpeg',
    name: { fr: "L'Éveil du Cœur", en: 'Heart Awakening' },
    message: {
      fr: "Ton cœur s'ouvre à nouveau. L'amour frappe à ta porte.",
      en: 'Your heart is opening again. Love is knocking at your door.',
    },
    interpretation: {
      fr: "Une nouvelle énergie circule en toi. Après une période de repli, ton cœur est prêt à accueillir l'amour sous toutes ses formes. Laisse-toi porter par cette ouverture.",
      en: 'A new energy flows through you. After a period of withdrawal, your heart is ready to welcome love in all its forms. Let yourself be carried by this opening.',
    },
  },
  {
    id: 2,
    slug: 'ames-jumelles',
    image: '/images/cards/oracle/02-ames-jumelles.png',
    name: { fr: 'Les Âmes Jumelles', en: 'Twin Souls' },
    message: {
      fr: 'Votre rencontre est écrite dans les étoiles.',
      en: 'Your meeting is written in the stars.',
    },
    interpretation: {
      fr: "Une connexion profonde se prépare ou se renforce. Cette âme qui résonne avec la tienne est plus proche que tu ne le crois. Fais confiance au timing de l'univers.",
      en: 'A deep connection is forming or strengthening. This soul that resonates with yours is closer than you think. Trust the timing of the universe.',
    },
  },
  {
    id: 3,
    slug: 'rose-eternelle',
    image: '/images/cards/oracle/03-rose-eternelle.jpeg',
    name: { fr: 'La Rose Éternelle', en: 'The Eternal Rose' },
    message: {
      fr: "L'amour véritable ne fane jamais.",
      en: 'True love never fades.',
    },
    interpretation: {
      fr: "L'amour que tu portes en toi est inaltérable. Qu'il s'agisse d'un lien existant ou d'un souvenir précieux, cet amour continue de fleurir au-delà du temps.",
      en: 'The love you carry within is unalterable. Whether it is an existing bond or a precious memory, this love continues to bloom beyond time.',
    },
  },
  {
    id: 4,
    slug: 'danse-des-flammes',
    image: '/images/cards/oracle/04-danse-des-flammes.jpeg',
    name: { fr: 'La Danse des Flammes', en: 'Dance of Flames' },
    message: {
      fr: 'La passion revient. Laisse-toi embraser.',
      en: 'Passion returns. Let yourself be ignited.',
    },
    interpretation: {
      fr: "Le feu intérieur se ravive. Une passion intense revient dans ta vie — qu'elle soit amoureuse ou créative. Accueille cette flamme sans chercher à la contrôler.",
      en: 'Your inner fire reignites. An intense passion returns to your life — whether romantic or creative. Welcome this flame without trying to control it.',
    },
  },
  {
    id: 5,
    slug: 'jardin-secret',
    image: '/images/cards/oracle/05-jardin-secret.jpeg',
    name: { fr: 'Le Jardin Secret', en: 'The Secret Garden' },
    message: {
      fr: 'Un amour inattendu se cache tout près.',
      en: 'An unexpected love hides nearby.',
    },
    interpretation: {
      fr: "L'amour ne vient pas toujours d'où on l'attend. Ouvre les yeux sur ton entourage, sur les petits gestes du quotidien. La beauté se cache dans l'inattendu.",
      en: "Love doesn't always come from where you expect it. Open your eyes to your surroundings, to the small gestures of everyday life. Beauty hides in the unexpected.",
    },
  },
  {
    id: 6,
    slug: 'etoile-du-berger',
    image: '/images/cards/oracle/06-etoile-du-berger.jpeg',
    name: { fr: "L'Étoile du Berger", en: 'The Guiding Star' },
    message: {
      fr: "L'amour te guide. Suis ta lumière intérieure.",
      en: 'Love guides you. Follow your inner light.',
    },
    interpretation: {
      fr: "Tu es sur le bon chemin. Même dans la nuit, une étoile veille sur toi et éclaire ta route. Fais confiance à ton intuition, elle te mène vers l'amour.",
      en: 'You are on the right path. Even in the darkest night, a star watches over you and lights your way. Trust your intuition — it leads you to love.',
    },
  },
  {
    id: 7,
    slug: 'papillon-de-lame',
    image: '/images/cards/oracle/07-papillon-de-lame.jpeg',
    name: { fr: "Le Papillon de l'Âme", en: 'Soul Butterfly' },
    message: {
      fr: "Tu te transformes. L'amour naît de ta métamorphose.",
      en: 'You are transforming. Love is born from your metamorphosis.',
    },
    interpretation: {
      fr: "Comme le papillon, tu traverses une transformation profonde. Ce que tu deviens attire l'amour à toi. Honore chaque étape de ce voyage intérieur.",
      en: 'Like the butterfly, you are going through a deep transformation. Who you are becoming attracts love to you. Honor every step of this inner journey.',
    },
  },
  {
    id: 8,
    slug: 'lune-bienveillante',
    image: '/images/cards/oracle/08-lune-bienveillante.jpeg',
    name: { fr: 'La Lune Bienveillante', en: 'The Benevolent Moon' },
    message: {
      fr: "La nuit porte conseil. L'amour mûrit dans la patience.",
      en: 'Night brings wisdom. Love ripens with patience.',
    },
    interpretation: {
      fr: "Ne précipite rien. Comme la lune qui éclaire doucement la nuit, laisse le temps révéler ce qui est juste. L'amour le plus profond est celui qui mûrit patiemment.",
      en: 'Do not rush. Like the moon that softly illuminates the night, let time reveal what is right. The deepest love is the one that ripens patiently.',
    },
  },
  {
    id: 9,
    slug: 'pont-de-lumiere',
    image: '/images/cards/oracle/09-pont-de-lumiere.jpeg',
    name: { fr: 'Le Pont de Lumière', en: 'Bridge of Light' },
    message: {
      fr: "Les distances s'effacent. L'amour rapproche les cœurs.",
      en: 'Distances dissolve. Love brings hearts closer.',
    },
    interpretation: {
      fr: "Aucune distance — physique ou émotionnelle — ne peut séparer deux cœurs liés. Un pont invisible se construit entre vous, fait de lumière et d'intention.",
      en: 'No distance — physical or emotional — can separate two bonded hearts. An invisible bridge is being built between you, made of light and intention.',
    },
  },
  {
    id: 10,
    slug: 'cle-doree',
    image: '/images/cards/oracle/10-cle-doree.jpeg',
    name: { fr: 'La Clé Dorée', en: 'The Golden Key' },
    message: {
      fr: 'Tu détiens la clé. Ouvre ton cœur sans crainte.',
      en: 'You hold the key. Open your heart without fear.',
    },
    interpretation: {
      fr: "Le pouvoir est entre tes mains. Toi seul(e) peux ouvrir la porte de ton cœur. Ose franchir le seuil, car derrière cette porte t'attendent des trésors d'amour.",
      en: 'The power is in your hands. Only you can open the door to your heart. Dare to cross the threshold, for treasures of love await behind that door.',
    },
  },
  {
    id: 11,
    slug: 'arbre-des-voeux',
    image: '/images/cards/oracle/11-arbre-des-voeux.jpeg',
    name: { fr: "L'Arbre des Vœux", en: 'The Wishing Tree' },
    message: {
      fr: "Tes vœux d'amour sont entendus par l'univers.",
      en: 'Your wishes for love are heard by the universe.',
    },
    interpretation: {
      fr: "Chaque prière, chaque souhait que tu as formulé a été entendu. L'univers travaille en ta faveur. Continue de croire en la magie de tes désirs les plus profonds.",
      en: 'Every prayer, every wish you have made has been heard. The universe works in your favor. Keep believing in the magic of your deepest desires.',
    },
  },
  {
    id: 12,
    slug: 'ocean-de-tendresse',
    image: '/images/cards/oracle/12-ocean-de-tendresse.jpeg',
    name: { fr: "L'Océan de Tendresse", en: 'Ocean of Tenderness' },
    message: {
      fr: 'L\'amour est vaste et profond. Plonge sans peur.',
      en: 'Love is vast and deep. Dive without fear.',
    },
    interpretation: {
      fr: "L'amour est un océan infini. Ne reste pas sur le rivage à l'observer. Plonge dans ses eaux profondes et laisse-toi porter par ses courants de tendresse.",
      en: "Love is an infinite ocean. Don't stay on the shore watching it. Dive into its deep waters and let yourself be carried by its currents of tenderness.",
    },
  },
  {
    id: 13,
    slug: 'nid-douillet',
    image: '/images/cards/oracle/13-nid-douillet.jpeg',
    name: { fr: 'Le Nid Douillet', en: 'The Cozy Nest' },
    message: {
      fr: "Un foyer d'amour se construit. Prends soin de ce qui naît.",
      en: 'A home of love is being built. Nurture what is growing.',
    },
    interpretation: {
      fr: "Quelque chose de doux et de solide se construit dans ta vie affective. Comme un oiseau bâtit son nid brindille par brindille, nourris ce lien naissant avec tendresse.",
      en: 'Something soft and solid is being built in your love life. Like a bird building its nest twig by twig, nurture this growing bond with tenderness.',
    },
  },
  {
    id: 14,
    slug: 'miroir-de-lame',
    image: '/images/cards/oracle/14-miroir-de-lame.jpeg',
    name: { fr: "Le Miroir de l'Âme", en: 'Mirror of the Soul' },
    message: {
      fr: "Aime-toi d'abord. Tu mérites l'amour que tu donnes.",
      en: 'Love yourself first. You deserve the love you give.',
    },
    interpretation: {
      fr: "Avant de chercher l'amour ailleurs, regarde-toi avec les yeux du cœur. Tu es digne d'amour. Quand tu t'aimes toi-même, tu attires un amour à ta mesure.",
      en: 'Before seeking love elsewhere, look at yourself with the eyes of the heart. You are worthy of love. When you love yourself, you attract a love that matches you.',
    },
  },
  {
    id: 15,
    slug: 'lettre-du-destin',
    image: '/images/cards/oracle/15-lettre-du-destin.jpeg',
    name: { fr: 'La Lettre du Destin', en: 'Letter of Destiny' },
    message: {
      fr: "Un message d'amour arrive. Reste attentif aux signes.",
      en: 'A love message is coming. Stay alert to the signs.',
    },
    interpretation: {
      fr: "L'univers t'envoie un message. Il peut prendre la forme d'un regard, d'un mot, d'une synchronicité. Ouvre grand tes yeux et ton cœur — le destin te parle.",
      en: 'The universe is sending you a message. It may come as a glance, a word, a synchronicity. Open wide your eyes and heart — destiny speaks to you.',
    },
  },
  {
    id: 16,
    slug: 'couronne-de-fleurs',
    image: '/images/cards/oracle/16-couronne-de-fleurs.jpeg',
    name: { fr: 'La Couronne de Fleurs', en: 'Crown of Flowers' },
    message: {
      fr: "Tu es digne d'être aimé(e). Accepte ta couronne.",
      en: 'You are worthy of love. Accept your crown.',
    },
    interpretation: {
      fr: "Arrête de douter de toi. Tu es magnifique, à l'intérieur comme à l'extérieur. Accepte cette couronne que la vie te tend et porte-la avec fierté.",
      en: 'Stop doubting yourself. You are magnificent, inside and out. Accept this crown that life extends to you and wear it with pride.',
    },
  },
  {
    id: 17,
    slug: 'lever-du-jour',
    image: '/images/cards/oracle/17-lever-du-jour.jpeg',
    name: { fr: 'Le Lever du Jour', en: 'The Dawn' },
    message: {
      fr: "Un nouveau chapitre d'amour commence aujourd'hui.",
      en: 'A new chapter of love begins today.',
    },
    interpretation: {
      fr: "Chaque aurore est une promesse de renouveau. Aujourd'hui marque le début d'un nouveau chapitre dans ta vie amoureuse. Accueille-le avec espoir et gratitude.",
      en: 'Every dawn is a promise of renewal. Today marks the beginning of a new chapter in your love life. Welcome it with hope and gratitude.',
    },
  },
  {
    id: 18,
    slug: 'fil-rouge',
    image: '/images/cards/oracle/18-fil-rouge.jpeg',
    name: { fr: 'Le Fil Rouge', en: 'The Red Thread' },
    message: {
      fr: 'Le fil du destin vous relie. Rien ne peut le rompre.',
      en: 'The thread of destiny connects you. Nothing can break it.',
    },
    interpretation: {
      fr: "Un fil invisible mais indestructible vous relie. Quels que soient les obstacles, les distances ou le temps, ce lien sacré persistera. Fais confiance au destin.",
      en: 'An invisible but indestructible thread connects you. Whatever the obstacles, distances, or time, this sacred bond will persist. Trust in destiny.',
    },
  },
  {
    id: 19,
    slug: 'cristal-damour',
    image: '/images/cards/oracle/19-cristal-damour.jpeg',
    name: { fr: "Le Cristal d'Amour", en: 'Crystal of Love' },
    message: {
      fr: "L'énergie de l'amour te guérit et t'élève.",
      en: 'The energy of love heals and elevates you.',
    },
    interpretation: {
      fr: "L'amour est la plus puissante des énergies de guérison. Laisse cette vibration cristalline traverser ton être et dissoudre les blessures du passé.",
      en: 'Love is the most powerful healing energy. Let this crystalline vibration flow through your being and dissolve the wounds of the past.',
    },
  },
  {
    id: 20,
    slug: 'infini',
    image: '/images/cards/oracle/20-infini.jpeg',
    name: { fr: "L'Infini", en: 'Infinity' },
    message: {
      fr: 'Votre amour est éternel. Il traverse le temps et l\'espace.',
      en: 'Your love is eternal. It transcends time and space.',
    },
    interpretation: {
      fr: "L'amour que vous partagez transcende les limites du monde visible. Il est éternel, infini, et ne connaît ni frontière ni fin. Vous êtes bénis.",
      en: 'The love you share transcends the boundaries of the visible world. It is eternal, infinite, and knows no borders or end. You are blessed.',
    },
  },
];

export const oracleAmourDeck: Deck = {
  id: 'oracle-amour',
  name: {
    fr: "Oracle de l'Amour",
    en: 'Love Oracle',
  },
  description: {
    fr: 'Un oracle dédié aux questions du cœur. 20 cartes pour éclairer ta vie sentimentale, tes relations et tes émotions profondes.',
    en: 'An oracle dedicated to matters of the heart. 20 cards to illuminate your love life, relationships, and deepest emotions.',
  },
  cards,
  cardBack: '', // CSS-generated card back
};
