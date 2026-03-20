import type { TarotCard, TarotDeck } from '../types/card';

const cards: TarotCard[] = [
  {
    id: 0,
    slug: 'le-mat',
    image: '/images/cards/tarot/00-le-mat.jpeg',
    name: { fr: 'Le Mat', en: 'The Fool', zh: '愚者', es: 'El Loco' },
    message: {
      upright: {
        fr: "Fais confiance à l'inconnu. Un voyage commence.",
        en: 'Trust the unknown. A journey begins.',
        zh: '相信未知。一段旅程即将开始。',
        es: 'Confía en lo desconocido. Un viaje comienza.',
      },
      reversed: {
        fr: 'Tu hésites trop. Ose le premier pas.',
        en: 'You hesitate too much. Dare to take the first step.',
        zh: '你犹豫太多了。勇敢迈出第一步。',
        es: 'Dudas demasiado. Atrévete a dar el primer paso.',
      },
    },
  },
  {
    id: 1,
    slug: 'le-bateleur',
    image: '/images/cards/tarot/01-le-bateleur.jpeg',
    name: { fr: 'Le Bateleur', en: 'The Magician', zh: '魔术师', es: 'El Mago' },
    message: {
      upright: {
        fr: 'Tu as tous les outils en main. Crée ta réalité.',
        en: 'You have all the tools. Create your reality.',
        zh: '你拥有所有的工具。创造你的现实。',
        es: 'Tienes todas las herramientas. Crea tu realidad.',
      },
      reversed: {
        fr: 'Tes talents sont dispersés. Recentre-toi.',
        en: 'Your talents are scattered. Refocus.',
        zh: '你的才华过于分散。重新集中注意力。',
        es: 'Tus talentos están dispersos. Recéntrate.',
      },
    },
  },
  {
    id: 2,
    slug: 'la-papesse',
    image: '/images/cards/tarot/02-la-papesse.jpeg',
    name: { fr: 'La Papesse', en: 'The High Priestess', zh: '女祭司', es: 'La Papisa' },
    message: {
      upright: {
        fr: 'Écoute ton intuition. La réponse est en toi.',
        en: 'Listen to your intuition. The answer is within.',
        zh: '倾听你的直觉。答案在你心中。',
        es: 'Escucha tu intuición. La respuesta está en ti.',
      },
      reversed: {
        fr: 'Tu ignores ta voix intérieure. Fais silence.',
        en: "You're ignoring your inner voice. Be still.",
        zh: '你在忽视内心的声音。静下来。',
        es: 'Ignoras tu voz interior. Haz silencio.',
      },
    },
  },
  {
    id: 3,
    slug: 'l-imperatrice',
    image: '/images/cards/tarot/03-l-imperatrice.jpeg',
    name: { fr: "L'Impératrice", en: 'The Empress', zh: '女皇', es: 'La Emperatriz' },
    message: {
      upright: {
        fr: "L'abondance arrive. Accueille la fertilité de la vie.",
        en: "Abundance is coming. Welcome life's fertility.",
        zh: '丰盛即将到来。迎接生命的富饶。',
        es: 'La abundancia llega. Acoge la fertilidad de la vida.',
      },
      reversed: {
        fr: 'Tu négliges ta créativité. Reconnecte-toi à la nature.',
        en: "You're neglecting your creativity. Reconnect with nature.",
        zh: '你忽略了自己的创造力。重新与自然连接。',
        es: 'Descuidas tu creatividad. Reconéctate con la naturaleza.',
      },
    },
  },
  {
    id: 4,
    slug: 'l-empereur',
    image: '/images/cards/tarot/04-l-empereur.jpeg',
    name: { fr: "L'Empereur", en: 'The Emperor', zh: '皇帝', es: 'El Emperador' },
    message: {
      upright: {
        fr: 'Structure et stabilité te protègent. Affirme ton autorité.',
        en: 'Structure and stability protect you. Assert your authority.',
        zh: '结构和稳定保护着你。展现你的权威。',
        es: 'La estructura y la estabilidad te protegen. Afirma tu autoridad.',
      },
      reversed: {
        fr: 'Trop de contrôle étouffe. Lâche prise sur le pouvoir.',
        en: 'Too much control suffocates. Let go of power.',
        zh: '过多的控制令人窒息。放下对权力的执念。',
        es: 'Demasiado control asfixia. Suelta el poder.',
      },
    },
  },
  {
    id: 5,
    slug: 'le-pape',
    image: '/images/cards/tarot/05-le-pape.jpeg',
    name: { fr: 'Le Pape', en: 'The Hierophant', zh: '教皇', es: 'El Papa' },
    message: {
      upright: {
        fr: 'Un enseignement précieux arrive. Ouvre-toi à la sagesse.',
        en: 'A precious teaching is coming. Open yourself to wisdom.',
        zh: '珍贵的教导即将到来。向智慧敞开自己。',
        es: 'Una enseñanza preciosa llega. Ábrete a la sabiduría.',
      },
      reversed: {
        fr: 'Les conventions te limitent. Trouve ton propre chemin.',
        en: 'Conventions limit you. Find your own path.',
        zh: '传统观念限制了你。找到你自己的道路。',
        es: 'Las convenciones te limitan. Encuentra tu propio camino.',
      },
    },
  },
  {
    id: 6,
    slug: 'l-amoureux',
    image: '/images/cards/tarot/06-l-amoureux.jpeg',
    name: { fr: "L'Amoureux", en: 'The Lovers', zh: '恋人', es: 'Los Enamorados' },
    message: {
      upright: {
        fr: "Un choix d'amour se présente. Suis ton cœur.",
        en: 'A choice of love presents itself. Follow your heart.',
        zh: '一个关于爱的选择出现了。跟随你的心。',
        es: 'Una elección de amor se presenta. Sigue tu corazón.',
      },
      reversed: {
        fr: "L'indécision te paralyse. Choisis avec courage.",
        en: 'Indecision paralyzes you. Choose with courage.',
        zh: '犹豫不决让你停滞不前。勇敢地做出选择。',
        es: 'La indecisión te paraliza. Elige con coraje.',
      },
    },
  },
  {
    id: 7,
    slug: 'le-chariot',
    image: '/images/cards/tarot/07-le-chariot.jpeg',
    name: { fr: 'Le Chariot', en: 'The Chariot', zh: '战车', es: 'El Carro' },
    message: {
      upright: {
        fr: 'La victoire est proche. Avance avec détermination.',
        en: 'Victory is near. Move forward with determination.',
        zh: '胜利就在眼前。坚定地向前迈进。',
        es: 'La victoria está cerca. Avanza con determinación.',
      },
      reversed: {
        fr: 'Tu forces trop. La vraie force est dans la maîtrise de soi.',
        en: "You're forcing too much. True strength is self-mastery.",
        zh: '你用力过猛了。真正的力量在于自我控制。',
        es: 'Fuerzas demasiado. La verdadera fuerza está en el autodominio.',
      },
    },
  },
  {
    id: 8,
    slug: 'la-justice',
    image: '/images/cards/tarot/08-la-justice.jpeg',
    name: { fr: 'La Justice', en: 'Justice', zh: '正义', es: 'La Justicia' },
    message: {
      upright: {
        fr: "L'équilibre se rétablit. La vérité triomphe.",
        en: 'Balance is restored. Truth prevails.',
        zh: '平衡正在恢复。真相终将胜利。',
        es: 'El equilibrio se restablece. La verdad triunfa.',
      },
      reversed: {
        fr: 'Un déséquilibre persiste. Sois honnête avec toi-même.',
        en: 'An imbalance persists. Be honest with yourself.',
        zh: '失衡依然存在。对自己坦诚。',
        es: 'Un desequilibrio persiste. Sé honesto contigo mismo.',
      },
    },
  },
  {
    id: 9,
    slug: 'l-hermite',
    image: '/images/cards/tarot/09-l-hermite.jpeg',
    name: { fr: "L'Hermite", en: 'The Hermit', zh: '隐士', es: 'El Ermitaño' },
    message: {
      upright: {
        fr: "La solitude t'éclaire. Cherche la lumière intérieure.",
        en: 'Solitude enlightens you. Seek your inner light.',
        zh: '独处给你启示。寻找你内心的光芒。',
        es: 'La soledad te ilumina. Busca tu luz interior.',
      },
      reversed: {
        fr: "Tu t'isoles trop. Partage ta sagesse avec le monde.",
        en: "You're isolating too much. Share your wisdom with the world.",
        zh: '你太孤立了。与世界分享你的智慧。',
        es: 'Te aíslas demasiado. Comparte tu sabiduría con el mundo.',
      },
    },
  },
  {
    id: 10,
    slug: 'la-roue-de-fortune',
    image: '/images/cards/tarot/10-la-roue-de-fortune.jpeg',
    name: { fr: 'La Roue de Fortune', en: 'Wheel of Fortune', zh: '命运之轮', es: 'La Rueda de la Fortuna' },
    message: {
      upright: {
        fr: 'Le destin tourne en ta faveur. Saisis cette chance.',
        en: 'Destiny turns in your favor. Seize this opportunity.',
        zh: '命运之轮正向你倾斜。抓住这个机会。',
        es: 'El destino gira a tu favor. Aprovecha esta oportunidad.',
      },
      reversed: {
        fr: 'Un cycle se répète. Apprends la leçon pour avancer.',
        en: 'A cycle repeats. Learn the lesson to move forward.',
        zh: '一个循环在重复。学会教训才能前进。',
        es: 'Un ciclo se repite. Aprende la lección para avanzar.',
      },
    },
  },
  {
    id: 11,
    slug: 'la-force',
    image: '/images/cards/tarot/11-la-force.jpeg',
    name: { fr: 'La Force', en: 'Strength', zh: '力量', es: 'La Fuerza' },
    message: {
      upright: {
        fr: 'Ta douceur est ta plus grande puissance.',
        en: 'Your gentleness is your greatest power.',
        zh: '你的温柔是你最大的力量。',
        es: 'Tu dulzura es tu mayor poder.',
      },
      reversed: {
        fr: 'La peur te domine. Apprivoise tes instincts.',
        en: 'Fear dominates you. Tame your instincts.',
        zh: '恐惧支配着你。驯服你的本能。',
        es: 'El miedo te domina. Domestica tus instintos.',
      },
    },
  },
  {
    id: 12,
    slug: 'le-pendu',
    image: '/images/cards/tarot/12-le-pendu.jpeg',
    name: { fr: 'Le Pendu', en: 'The Hanged Man', zh: '倒吊人', es: 'El Colgado' },
    message: {
      upright: {
        fr: "Lâcher prise t'apporte l'illumination.",
        en: 'Letting go brings you illumination.',
        zh: '放手会给你带来启示。',
        es: 'Soltar te trae iluminación.',
      },
      reversed: {
        fr: 'Tu résistes au changement. Accepte de voir autrement.',
        en: 'You resist change. Accept seeing differently.',
        zh: '你在抗拒变化。接受用不同的视角来看待事物。',
        es: 'Resistes al cambio. Acepta ver de otra manera.',
      },
    },
  },
  {
    id: 13,
    slug: 'l-arcane-sans-nom',
    image: '/images/cards/tarot/13-l-arcane-sans-nom.jpeg',
    name: { fr: "L'Arcane Sans Nom", en: 'The Nameless Arcana', zh: '无名牌', es: 'El Arcano Sin Nombre' },
    message: {
      upright: {
        fr: 'Une transformation profonde est en cours. Renaissance.',
        en: 'A deep transformation is underway. Rebirth.',
        zh: '深刻的变革正在进行中。重生。',
        es: 'Una transformación profunda está en curso. Renacimiento.',
      },
      reversed: {
        fr: "Tu t'accroches au passé. Laisse mourir ce qui doit partir.",
        en: 'You cling to the past. Let go of what must leave.',
        zh: '你紧抓着过去不放。让该走的离去。',
        es: 'Te aferras al pasado. Deja morir lo que debe partir.',
      },
    },
  },
  {
    id: 14,
    slug: 'temperance',
    image: '/images/cards/tarot/14-temperance.jpeg',
    name: { fr: 'Tempérance', en: 'Temperance', zh: '节制', es: 'La Templanza' },
    message: {
      upright: {
        fr: "L'harmonie revient. Patience et équilibre portent leurs fruits.",
        en: 'Harmony returns. Patience and balance bear fruit.',
        zh: '和谐回归。耐心和平衡终将结出果实。',
        es: 'La armonía regresa. La paciencia y el equilibrio dan sus frutos.',
      },
      reversed: {
        fr: "Tu es dans l'excès. Retrouve la mesure.",
        en: 'You are in excess. Find moderation again.',
        zh: '你过度了。重新找到适度。',
        es: 'Estás en el exceso. Recupera la medida.',
      },
    },
  },
  {
    id: 15,
    slug: 'le-diable',
    image: '/images/cards/tarot/15-le-diable.jpeg',
    name: { fr: 'Le Diable', en: 'The Devil', zh: '恶魔', es: 'El Diablo' },
    message: {
      upright: {
        fr: "Reconnais tes chaînes pour t'en libérer.",
        en: 'Recognize your chains to free yourself.',
        zh: '认清你的枷锁才能解放自己。',
        es: 'Reconoce tus cadenas para liberarte.',
      },
      reversed: {
        fr: 'Une dépendance te retient. Tu as le pouvoir de la briser.',
        en: 'An addiction holds you. You have the power to break it.',
        zh: '一种依赖束缚着你。你有打破它的力量。',
        es: 'Una dependencia te retiene. Tienes el poder de romperla.',
      },
    },
  },
  {
    id: 16,
    slug: 'la-maison-dieu',
    image: '/images/cards/tarot/16-la-maison-dieu.jpeg',
    name: { fr: 'La Maison Dieu', en: 'The Tower', zh: '塔', es: 'La Torre' },
    message: {
      upright: {
        fr: "L'effondrement libère. Après la tempête, la clarté.",
        en: 'Collapse liberates. After the storm, clarity.',
        zh: '崩塌带来解放。风暴之后，是清明。',
        es: 'El derrumbe libera. Después de la tormenta, la claridad.',
      },
      reversed: {
        fr: 'Tu résistes à une vérité nécessaire. Laisse les murs tomber.',
        en: 'You resist a necessary truth. Let the walls fall.',
        zh: '你在抗拒一个必要的真相。让那些墙倒塌吧。',
        es: 'Resistes a una verdad necesaria. Deja caer los muros.',
      },
    },
  },
  {
    id: 17,
    slug: 'l-etoile',
    image: '/images/cards/tarot/17-l-etoile.jpeg',
    name: { fr: "L'Étoile", en: 'The Star', zh: '星星', es: 'La Estrella' },
    message: {
      upright: {
        fr: "L'espoir renaît. Tu es guidé(e) par la grâce.",
        en: 'Hope is reborn. You are guided by grace.',
        zh: '希望重生。你被恩典引导着。',
        es: 'La esperanza renace. Eres guiado por la gracia.',
      },
      reversed: {
        fr: 'Tu as perdu foi en toi. Rappelle-toi ta lumière.',
        en: "You've lost faith in yourself. Remember your light.",
        zh: '你对自己失去了信心。记住你的光芒。',
        es: 'Has perdido la fe en ti. Recuerda tu luz.',
      },
    },
  },
  {
    id: 18,
    slug: 'la-lune',
    image: '/images/cards/tarot/18-la-lune.jpeg',
    name: { fr: 'La Lune', en: 'The Moon', zh: '月亮', es: 'La Luna' },
    message: {
      upright: {
        fr: 'Tes rêves portent des messages. Explore ton inconscient.',
        en: 'Your dreams carry messages. Explore your unconscious.',
        zh: '你的梦承载着信息。探索你的潜意识。',
        es: 'Tus sueños llevan mensajes. Explora tu inconsciente.',
      },
      reversed: {
        fr: 'Les illusions te trompent. Cherche la vérité derrière les ombres.',
        en: 'Illusions deceive you. Seek truth behind the shadows.',
        zh: '幻觉在欺骗你。在阴影背后寻找真相。',
        es: 'Las ilusiones te engañan. Busca la verdad detrás de las sombras.',
      },
    },
  },
  {
    id: 19,
    slug: 'le-soleil',
    image: '/images/cards/tarot/19-le-soleil.jpeg',
    name: { fr: 'Le Soleil', en: 'The Sun', zh: '太阳', es: 'El Sol' },
    message: {
      upright: {
        fr: 'Joie pure et réussite. La lumière est avec toi.',
        en: 'Pure joy and success. The light is with you.',
        zh: '纯粹的喜悦与成功。光与你同在。',
        es: 'Alegría pura y éxito. La luz está contigo.',
      },
      reversed: {
        fr: 'Une joie te semble inaccessible. Elle est plus proche que tu ne crois.',
        en: "A joy seems unreachable. It's closer than you think.",
        zh: '一种快乐似乎遥不可及。它比你想的更近。',
        es: 'Una alegría te parece inalcanzable. Está más cerca de lo que crees.',
      },
    },
  },
  {
    id: 20,
    slug: 'le-jugement',
    image: '/images/cards/tarot/20-le-jugement.jpeg',
    name: { fr: 'Le Jugement', en: 'Judgement', zh: '审判', es: 'El Juicio' },
    message: {
      upright: {
        fr: 'Un appel intérieur te réveille. Réponds à ta vocation.',
        en: 'An inner calling awakens you. Answer your vocation.',
        zh: '内心的召唤唤醒了你。回应你的使命。',
        es: 'Un llamado interior te despierta. Responde a tu vocación.',
      },
      reversed: {
        fr: "Tu ignores un appel important. Écoute avant qu'il ne soit trop tard.",
        en: "You ignore an important calling. Listen before it's too late.",
        zh: '你在忽视一个重要的召唤。在为时已晚之前倾听。',
        es: 'Ignoras un llamado importante. Escucha antes de que sea tarde.',
      },
    },
  },
  {
    id: 21,
    slug: 'le-monde',
    image: '/images/cards/tarot/21-le-monde.jpeg',
    name: { fr: 'Le Monde', en: 'The World', zh: '世界', es: 'El Mundo' },
    message: {
      upright: {
        fr: "L'accomplissement est là. Tu as bouclé le cycle.",
        en: "Accomplishment is here. You've completed the cycle.",
        zh: '成就已至。你完成了这个循环。',
        es: 'La realización está aquí. Has completado el ciclo.',
      },
      reversed: {
        fr: "Quelque chose reste inachevé. La dernière étape t'attend.",
        en: 'Something remains unfinished. The last step awaits you.',
        zh: '有些事情尚未完成。最后一步在等着你。',
        es: 'Algo queda inacabado. El último paso te espera.',
      },
    },
  },
];

export const tarotMarseilleDeck: TarotDeck = {
  id: 'tarot-marseille',
  name: {
    fr: 'Tarot de Marseille Remastered',
    en: 'Marseille Tarot Remastered',
    zh: '马赛塔罗重制版',
    es: 'Tarot de Marsella Remasterizado',
  },
  description: {
    fr: 'Les 22 arcanes majeurs du Tarot de Marseille. Tire 3 cartes pour révéler ton passé, ton présent et ton futur.',
    en: 'The 22 major arcana of the Marseille Tarot. Draw 3 cards to reveal your past, present and future.',
    zh: '马赛塔罗的22张大阿尔卡那。抽3张牌揭示你的过去、现在和未来。',
    es: 'Los 22 arcanos mayores del Tarot de Marsella. Tira 3 cartas para revelar tu pasado, tu presente y tu futuro.',
  },
  cards,
};
