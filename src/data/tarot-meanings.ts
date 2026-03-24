import type { TarotMeaning } from '../types/card';

/**
 * Extended meanings for the 8 most-searched Major Arcana.
 * Used by CardMeaningLayout pages for SEO content.
 * FR is the priority language; EN included; others to come.
 */
export const tarotMeanings: TarotMeaning[] = [
  // ─── 0 · Le Mat ──────────────────────────────────────────
  {
    slug: 'le-mat',
    number: 0,
    image: '/images/cards/tarot/arcane____0_Le_Mat.png',
    name: { fr: 'Le Mat', en: 'The Fool' },
    keywords: {
      fr: 'Liberté, voyage, innocence, spontanéité, nouveau départ, insouciance',
      en: 'Freedom, journey, innocence, spontaneity, new beginning, carefree',
    },
    element: 'Air',
    planet: 'Uranus',
    upright: {
      meaning: {
        fr: "Le Mat est l'arcane du commencement absolu. Il représente l'élan pur, celui qui pousse à se lancer sans filet, guidé uniquement par la foi en la vie. Cette carte symbolise la liberté totale, le voyage intérieur autant qu'extérieur, et l'innocence de celui qui n'a pas encore été marqué par les épreuves. Quand Le Mat apparaît dans un tirage, c'est un appel à faire confiance à l'inconnu, à accueillir l'imprévu comme un cadeau. Il te dit que le moment est venu de lâcher prise sur ce que tu connais pour embrasser ce que tu ne connais pas encore.",
        en: "The Fool is the arcanum of absolute beginning. It represents the pure impulse that drives you to leap without a net, guided only by faith in life. This card symbolizes total freedom, the inner journey as much as the outer one, and the innocence of someone who has not yet been marked by trials. When The Fool appears in a reading, it's a call to trust the unknown, to welcome the unexpected as a gift. It tells you the time has come to let go of what you know and embrace what you don't yet know.",
      },
      love: {
        fr: "En amour, Le Mat à l'endroit annonce une rencontre inattendue ou un renouveau dans ta relation. C'est le coup de foudre, l'aventure amoureuse qui arrive quand on ne l'attend plus. Si tu es en couple, cette carte t'invite à retrouver la spontanéité des débuts, à surprendre l'autre, à sortir de la routine. Si tu es célibataire, Le Mat te dit que l'amour viendra quand tu arrêteras de le chercher — ouvre-toi simplement à la vie.",
        en: "In love, The Fool upright announces an unexpected encounter or a renewal in your relationship. It's the spark, the romantic adventure that arrives when you've stopped looking. If you're in a relationship, this card invites you to rediscover the spontaneity of early days. If single, The Fool tells you love will come when you stop searching — simply open yourself to life.",
      },
      career: {
        fr: "Sur le plan professionnel, Le Mat à l'endroit est un signal fort pour oser le changement. Reconversion, nouveau projet, voyage professionnel — cette carte te pousse à sortir de ta zone de confort. C'est le moment de prendre des risques calculés, de croire en tes idées même si personne d'autre n'y croit encore. L'énergie du Mat favorise l'entrepreneuriat et les chemins non conventionnels.",
        en: "Career-wise, The Fool upright is a strong signal to dare to change. Career shift, new project, professional travel — this card pushes you out of your comfort zone. It's the time to take calculated risks and believe in your ideas even if no one else does yet.",
      },
    },
    reversed: {
      meaning: {
        fr: "Le Mat inversé révèle une peur de l'inconnu qui te paralyse. Tu tournes en rond, tu repousses les décisions, tu restes dans une situation qui ne te convient plus par peur de ce qui pourrait arriver. Cette carte peut aussi indiquer de l'imprudence — des choix irréfléchis, un manque de préparation, une fuite en avant. Le Mat renversé te demande de trouver l'équilibre entre audace et sagesse : oui, il faut oser, mais pas n'importe comment.",
        en: "The Fool reversed reveals a fear of the unknown that paralyzes you. You're going in circles, postponing decisions, staying in a situation that no longer suits you out of fear. This card can also indicate recklessness — thoughtless choices, lack of preparation, running away. The reversed Fool asks you to find balance between boldness and wisdom.",
      },
      love: {
        fr: "En amour, Le Mat inversé met en garde contre l'engagement à la légère ou, à l'inverse, contre la peur de s'engager. Tu peux être attiré par des relations superficielles qui ne mènent nulle part, ou fuir dès que les choses deviennent sérieuses. Cette carte t'invite à te poser la question : est-ce que tu fuis l'amour, ou est-ce que tu fuis toi-même ?",
        en: "In love, The Fool reversed warns against committing too lightly or, conversely, fearing commitment. You may be drawn to superficial relationships or flee when things get serious. This card invites you to ask: are you running from love, or from yourself?",
      },
      career: {
        fr: "Professionnellement, Le Mat inversé signale un manque de direction. Tu papillonnes d'un projet à l'autre sans jamais rien terminer, ou tu restes bloqué dans un poste par peur du vide. Il est temps de poser un cadre, de définir tes priorités et de t'y tenir. Le talent est là, mais il a besoin d'une structure pour s'exprimer.",
        en: "Career-wise, The Fool reversed signals a lack of direction. You flutter from project to project without finishing, or stay stuck in a position out of fear. It's time to set a framework, define your priorities and stick to them.",
      },
    },
  },

  // ─── I · Le Bateleur ─────────────────────────────────────
  {
    slug: 'le-bateleur',
    number: 'I',
    image: '/images/cards/tarot/arcane____I_Le_Bateleur.jpeg',
    name: { fr: 'Le Bateleur', en: 'The Magician' },
    keywords: {
      fr: 'Volonté, création, habileté, potentiel, action, maîtrise',
      en: 'Willpower, creation, skill, potential, action, mastery',
    },
    element: 'Air',
    planet: 'Mercure',
    upright: {
      meaning: {
        fr: "Le Bateleur est l'arcane de la volonté créatrice. Il représente celui qui a tous les outils devant lui — les quatre éléments du tarot — et qui sait les utiliser pour manifester sa vision dans le monde réel. C'est la carte du potentiel infini, du talent brut qui ne demande qu'à être exploité. Le Bateleur t'invite à passer à l'action : tu as tout ce qu'il faut pour réussir, il ne manque que ta décision de commencer. C'est le moment de transformer tes idées en réalité, de prendre les commandes de ta vie.",
        en: "The Magician is the arcanum of creative willpower. He represents someone who has all the tools before them — the four elements of tarot — and knows how to use them to manifest their vision in the real world. This is the card of infinite potential, raw talent waiting to be harnessed. The Magician invites you to take action: you have everything you need to succeed, all that's missing is your decision to begin.",
      },
      love: {
        fr: "En amour, Le Bateleur à l'endroit est un excellent signe de séduction et de charme. Tu as le pouvoir d'attirer la personne qui te plaît, de créer la relation dont tu rêves. En couple, cette carte indique une période de renouveau où tu prends l'initiative — une surprise, une déclaration, un projet commun. Célibataire, c'est le moment de te montrer tel que tu es : ton authenticité est ton meilleur atout.",
        en: "In love, The Magician upright is an excellent sign of seduction and charm. You have the power to attract the person you desire. In a relationship, this card indicates a renewal period where you take initiative. Single, it's time to show yourself as you are.",
      },
      career: {
        fr: "Sur le plan professionnel, Le Bateleur est la carte par excellence de l'entrepreneur, du créateur, du freelance. Tes compétences sont reconnues ou sur le point de l'être. C'est le moment idéal pour lancer un projet, proposer une idée, prendre une initiative. Le Bateleur maîtrise la communication — négocie, présente, convaincs. Les opportunités sont là, il suffit de les saisir.",
        en: "Career-wise, The Magician is the quintessential card of the entrepreneur, creator, and freelancer. Your skills are recognized or about to be. It's the perfect time to launch a project or take initiative. Opportunities are there — seize them.",
      },
    },
    reversed: {
      meaning: {
        fr: "Le Bateleur inversé pointe vers la manipulation, le bluff ou l'incapacité à exploiter son potentiel. Tu possèdes les talents nécessaires mais tu les disperses, tu procrastines, ou pire, tu les utilises pour tromper les autres. Cette carte peut aussi révéler un manque de confiance déguisé en arrogance — tu joues un rôle au lieu d'être toi-même. Le Bateleur renversé te demande de retrouver l'authenticité et de canaliser tes dons vers un objectif clair.",
        en: "The Magician reversed points to manipulation, bluffing, or inability to harness your potential. You have the necessary talents but you scatter them, procrastinate, or worse, use them to deceive others. This card asks you to return to authenticity and channel your gifts toward a clear goal.",
      },
      love: {
        fr: "En amour, Le Bateleur inversé met en garde contre le jeu et la manipulation. Est-ce que tu es sincère dans tes intentions ? Ou est-ce que tu séduis par ego, par peur de la solitude ? Cette carte peut aussi indiquer que ton partenaire n'est pas honnête avec toi. Écoute ton instinct et exige la transparence — en amour, les tours de magie finissent toujours par être découverts.",
        en: "In love, The Magician reversed warns against games and manipulation. Are you sincere in your intentions? This card can also indicate your partner isn't being honest. Trust your instinct and demand transparency.",
      },
      career: {
        fr: "Professionnellement, Le Bateleur inversé signale de l'arnaque dans l'air — un collaborateur pas fiable, une opportunité trop belle pour être vraie, ou ta propre tendance à survendre tes compétences. Reste honnête sur ce que tu sais faire, et méfie-toi des raccourcis. Le vrai talent n'a pas besoin de tricher.",
        en: "Career-wise, The Magician reversed signals something fishy — an unreliable collaborator, an opportunity too good to be true, or your own tendency to oversell. Stay honest and beware of shortcuts.",
      },
    },
  },

  // ─── II · La Papesse ─────────────────────────────────────
  {
    slug: 'la-papesse',
    number: 'II',
    image: '/images/cards/tarot/arcane___II_La_Papesse.png',
    name: { fr: 'La Papesse', en: 'The High Priestess' },
    keywords: {
      fr: 'Intuition, sagesse, mystère, patience, savoir caché, introspection',
      en: 'Intuition, wisdom, mystery, patience, hidden knowledge, introspection',
    },
    element: 'Eau',
    planet: 'Lune',
    upright: {
      meaning: {
        fr: "La Papesse est la gardienne des mystères. Assise entre deux piliers — le visible et l'invisible —, elle détient un livre de sagesse qu'elle ne révèle qu'à ceux qui savent écouter le silence. Cette carte t'invite à plonger en toi-même, à faire confiance à ton intuition plutôt qu'à la logique pure. La réponse que tu cherches n'est pas à l'extérieur : elle est déjà en toi, enfouie sous les couches de doute et de bruit. La Papesse te demande de ralentir, d'observer, de méditer. Ce n'est pas le moment d'agir, mais de comprendre.",
        en: "The High Priestess is the guardian of mysteries. Seated between two pillars — the visible and invisible — she holds a book of wisdom revealed only to those who know how to listen to silence. This card invites you to dive within yourself, to trust your intuition over pure logic. The answer you seek is already within you. The High Priestess asks you to slow down, observe, and meditate.",
      },
      love: {
        fr: "En amour, La Papesse suggère qu'il y a plus que ce qui se voit en surface. Un sentiment non exprimé, une attirance silencieuse, un secret qui attend d'être révélé. Si tu es en couple, cette carte t'invite à approfondir ta connexion émotionnelle — au-delà des mots, dans l'espace du ressenti. Si tu es célibataire, quelqu'un pense peut-être à toi sans oser te le dire. Sois attentif aux signes subtils.",
        en: "In love, The High Priestess suggests there's more than meets the eye. An unexpressed feeling, a silent attraction, a secret waiting to be revealed. Be attentive to subtle signs.",
      },
      career: {
        fr: "Professionnellement, La Papesse conseille de prendre du recul avant de décider. Ne te précipite pas dans un choix de carrière : prends le temps de rassembler les informations, d'analyser les non-dits dans ton environnement de travail. Cette carte favorise les métiers liés à la recherche, la psychologie, le conseil, l'écriture, et tout ce qui demande de l'écoute et de la profondeur.",
        en: "Career-wise, The High Priestess advises stepping back before deciding. Don't rush career choices — take time to gather information and analyze what's unsaid in your work environment. This card favors research, psychology, counseling, and writing.",
      },
    },
    reversed: {
      meaning: {
        fr: "La Papesse inversée révèle que tu ignores ton intuition au profit de la raison pure ou de l'opinion des autres. Tu as perdu le contact avec ta voix intérieure, noyée dans le bruit extérieur. Cette carte peut aussi indiquer des secrets mal gardés, des informations cachées qui finiront par émerger, ou une tendance à l'isolement malsain. Le message est clair : reconnecte-toi à toi-même. Fais silence, écoute, et tu retrouveras ta boussole intérieure.",
        en: "The High Priestess reversed reveals you're ignoring your intuition in favor of pure reason or others' opinions. You've lost touch with your inner voice. This card asks you to reconnect with yourself — be still, listen, and you'll find your inner compass again.",
      },
      love: {
        fr: "En amour, La Papesse inversée signale un manque de communication émotionnelle. Tu gardes trop de choses pour toi, ou ton partenaire le fait. Les non-dits s'accumulent et créent une distance invisible. Cette carte t'invite à ouvrir le dialogue, à partager tes ressentis même s'ils te rendent vulnérable. L'amour profond demande de la transparence.",
        en: "In love, The High Priestess reversed signals a lack of emotional communication. Unsaid things accumulate and create invisible distance. This card invites you to open dialogue and share your feelings.",
      },
      career: {
        fr: "Sur le plan professionnel, La Papesse inversée met en garde contre les décisions prises sans toutes les informations. Il y a quelque chose que tu ne vois pas — un détail dans un contrat, une dynamique de pouvoir cachée, une opportunité que tu négliges. Creuse, pose les bonnes questions, et ne signe rien tant que tu n'as pas compris tous les enjeux.",
        en: "Career-wise, The High Priestess reversed warns against decisions made without full information. There's something you're not seeing. Dig deeper, ask the right questions.",
      },
    },
  },

  // ─── III · L'Impératrice ─────────────────────────────────
  {
    slug: 'limperatrice',
    number: 'III',
    image: '/images/cards/tarot/arcane__III_LImperatrice.png',
    name: { fr: "L'Impératrice", en: 'The Empress' },
    keywords: {
      fr: 'Féminité, abondance, créativité, nature, fertilité, sensualité',
      en: 'Femininity, abundance, creativity, nature, fertility, sensuality',
    },
    element: 'Terre',
    planet: 'Vénus',
    upright: {
      meaning: {
        fr: "L'Impératrice est l'incarnation de la puissance féminine créatrice. Elle est la mère, l'artiste, la terre fertile qui donne naissance à toute chose. Cette carte annonce une période d'abondance, de créativité débordante et de connexion profonde avec la nature et les sens. L'Impératrice t'invite à embrasser ta sensualité, à nourrir tes projets avec patience et tendresse, comme on cultive un jardin. C'est le moment de créer, d'embellir, de prendre soin de toi et des autres avec générosité.",
        en: "The Empress is the embodiment of creative feminine power. She is the mother, the artist, the fertile earth that gives birth to all things. This card announces a period of abundance, overflowing creativity, and deep connection with nature and the senses. The Empress invites you to embrace your sensuality and nurture your projects with patience and tenderness.",
      },
      love: {
        fr: "En amour, L'Impératrice est une carte magnifique. Elle annonce l'épanouissement sentimental, la passion, et parfois la grossesse ou la naissance d'un projet de couple. Si tu es en relation, c'est une période de grande complicité où l'amour se vit pleinement, dans le plaisir et la douceur. Célibataire, L'Impératrice te dit que tu dégages une énergie irrésistible — l'amour est attiré par ceux qui s'aiment eux-mêmes.",
        en: "In love, The Empress is a magnificent card. It announces romantic fulfillment, passion, and sometimes pregnancy or the birth of a couple's project. You radiate an irresistible energy — love is attracted to those who love themselves.",
      },
      career: {
        fr: "Professionnellement, L'Impératrice favorise les projets créatifs, artistiques et tout ce qui touche à la beauté, au bien-être ou à la maternité. C'est une période de prospérité où tes efforts portent leurs fruits. Si tu lances un business, les résultats seront au rendez-vous — à condition de rester connecté à ta créativité et de ne pas céder aux pressions extérieures.",
        en: "Career-wise, The Empress favors creative, artistic projects and everything related to beauty, wellness, or nurturing. It's a period of prosperity where your efforts bear fruit.",
      },
    },
    reversed: {
      meaning: {
        fr: "L'Impératrice inversée peut indiquer un blocage créatif, un manque de confiance en ta féminité ou ta capacité à créer. Tu négliges ton corps, ton bien-être, ou tu étouffes ta créativité sous des contraintes trop rigides. Cette carte peut aussi signaler une relation toxique de dépendance — donner trop sans rien recevoir, ou étouffer l'autre par un amour possessif. L'Impératrice inversée t'invite à retrouver l'équilibre entre donner et recevoir, entre discipline et plaisir.",
        en: "The Empress reversed can indicate creative block, lack of confidence in your femininity or ability to create. You may be neglecting your body or stifling creativity. This card invites you to find balance between giving and receiving, between discipline and pleasure.",
      },
      love: {
        fr: "En amour, L'Impératrice inversée met en garde contre la dépendance affective ou le sacrifice excessif. Tu donnes peut-être trop à l'autre au détriment de toi-même, ou tu attends trop de l'autre pour combler un vide intérieur. Cette carte te rappelle que l'amour commence par l'amour de soi. Prends soin de toi d'abord — le reste suivra naturellement.",
        en: "In love, The Empress reversed warns against emotional dependency or excessive sacrifice. You may be giving too much at the expense of yourself. This card reminds you that love starts with self-love.",
      },
      career: {
        fr: "Professionnellement, L'Impératrice inversée signale une stagnation créative ou un environnement de travail étouffant. Tes idées ne sont pas écoutées, ou tu n'oses pas les exprimer. Il est peut-être temps de changer d'air, de retrouver un espace où ta créativité peut respirer. Ne laisse personne éteindre ta flamme.",
        en: "Career-wise, The Empress reversed signals creative stagnation or a stifling work environment. Your ideas aren't being heard. It may be time to find a space where your creativity can breathe.",
      },
    },
  },

  // ─── VI · L'Amoureux ─────────────────────────────────────
  {
    slug: 'lamoureux',
    number: 'VI',
    image: '/images/cards/tarot/arcane___VI_LAmoureux.png',
    name: { fr: "L'Amoureux", en: 'The Lovers' },
    keywords: {
      fr: 'Choix, amour, union, dualité, engagement, harmonie',
      en: 'Choice, love, union, duality, commitment, harmony',
    },
    element: 'Air',
    planet: 'Vénus',
    upright: {
      meaning: {
        fr: "L'Amoureux est avant tout la carte du choix. Contrairement à ce que son nom pourrait laisser croire, il ne parle pas uniquement d'amour romantique — il parle d'un carrefour dans ta vie où tu dois prendre une décision importante en alignant ton cœur et ta raison. C'est la carte de l'union des contraires, de l'harmonie entre le désir et la sagesse. L'Amoureux t'invite à choisir avec le cœur, mais sans abandonner ta lucidité. Quand cette carte apparaît, c'est que le choix est crucial et qu'il t'appartient pleinement.",
        en: "The Lovers is above all the card of choice. Contrary to what its name might suggest, it's not only about romantic love — it speaks of a crossroads where you must make an important decision aligning heart and mind. The Lovers invites you to choose with your heart, but without abandoning clarity.",
      },
      love: {
        fr: "En amour, L'Amoureux à l'endroit est une carte puissante. Il annonce une relation profonde, une connexion d'âmes, une rencontre qui change tout. C'est le coup de foudre avec de la profondeur, l'amour qui transforme. En couple, cette carte confirme que votre lien est fort et authentique. Célibataire, elle annonce l'arrivée imminente d'une personne significative dans ta vie. Mais souviens-toi : L'Amoureux implique toujours un choix — être avec quelqu'un est une décision quotidienne.",
        en: "In love, The Lovers upright is a powerful card. It announces a deep relationship, a soul connection, a life-changing encounter. In a couple, it confirms your bond is strong and authentic. Single, it announces the imminent arrival of a significant person.",
      },
      career: {
        fr: "Professionnellement, L'Amoureux signale un choix de carrière important. Deux chemins s'offrent à toi et les deux ont du potentiel. Ne choisis pas par défaut ou par peur — choisis la voie qui résonne avec tes valeurs profondes. Cette carte favorise aussi les partenariats, les associations professionnelles et les collaborations fructueuses. Trouve un associé qui complète tes forces.",
        en: "Career-wise, The Lovers signals an important career choice. Two paths present themselves. Don't choose by default — choose the path that resonates with your deep values. This card also favors partnerships and fruitful collaborations.",
      },
    },
    reversed: {
      meaning: {
        fr: "L'Amoureux inversé révèle un conflit intérieur, une incapacité à choisir, ou un mauvais choix déjà fait. Tu es déchiré entre deux options, deux personnes, deux directions de vie, et cette indécision te ronge. Cette carte peut aussi indiquer un déséquilibre dans une relation — domination, manipulation, ou sacrifice de soi. L'Amoureux inversé te demande d'être honnête avec toi-même : que veux-tu vraiment, au fond ? Et as-tu le courage de le choisir ?",
        en: "The Lovers reversed reveals inner conflict, inability to choose, or a bad choice already made. You're torn between options and this indecision is eating you up. This card asks you to be honest: what do you truly want?",
      },
      love: {
        fr: "En amour, L'Amoureux inversé signale une relation déséquilibrée, un triangle amoureux, ou une tentation qui met ton couple en danger. C'est la carte de l'infidélité, des tentations, ou simplement du doute qui s'installe. Si tu es célibataire, tu attires peut-être les mauvaises personnes parce que tu n'es pas clair sur ce que tu cherches vraiment. Clarifie tes intentions avant de t'engager.",
        en: "In love, The Lovers reversed signals an imbalanced relationship, a love triangle, or temptation. If single, you may attract the wrong people because you're unclear about what you truly seek.",
      },
      career: {
        fr: "Professionnellement, L'Amoureux inversé indique un mauvais partenariat ou un choix de carrière fait pour les mauvaises raisons. Tu as peut-être accepté un poste pour l'argent alors que ton cœur te disait non, ou tu t'es associé avec quelqu'un dont les valeurs ne correspondent pas aux tiennes. Il n'est jamais trop tard pour rectifier le tir.",
        en: "Career-wise, The Lovers reversed indicates a bad partnership or career choice made for wrong reasons. It's never too late to course-correct.",
      },
    },
  },

  // ─── X · La Roue de Fortune ──────────────────────────────
  {
    slug: 'la-roue-de-fortune',
    number: 'X',
    image: '/images/cards/tarot/arcane____X_La_Roue_de_Fortune.png',
    name: { fr: 'La Roue de Fortune', en: 'Wheel of Fortune' },
    keywords: {
      fr: 'Destin, cycles, changement, chance, tournant, karma',
      en: 'Destiny, cycles, change, luck, turning point, karma',
    },
    element: 'Feu',
    planet: 'Jupiter',
    upright: {
      meaning: {
        fr: "La Roue de Fortune est la carte du mouvement perpétuel, des cycles de la vie qui tournent inlassablement. Ce qui était en bas remonte, ce qui était en haut redescend — c'est la loi naturelle du changement. Quand cette carte apparaît à l'endroit, elle annonce un tournant positif, un coup de chance, un événement inattendu qui relance tout. La Roue te rappelle que rien n'est permanent : les épreuves passent, et le meilleur est souvent juste après le pire. Accepte le mouvement, ne résiste pas au changement — il joue en ta faveur.",
        en: "The Wheel of Fortune is the card of perpetual movement, life's cycles turning ceaselessly. What was down comes up, what was up comes down. When this card appears upright, it announces a positive turning point, a stroke of luck, an unexpected event. Accept the movement — change is working in your favor.",
      },
      love: {
        fr: "En amour, La Roue de Fortune à l'endroit annonce un changement heureux. Une rencontre déterminante, une relation qui passe à l'étape supérieure, une réconciliation après une période difficile. C'est la carte des âmes sœurs qui se retrouvent par un coup du destin. Si tu traverses une période de solitude, la roue est sur le point de tourner — garde espoir, le bonheur amoureux est en chemin.",
        en: "In love, the Wheel of Fortune upright announces a happy change. A decisive encounter, a relationship leveling up, or reconciliation after a difficult period. The wheel is about to turn — romantic happiness is on its way.",
      },
      career: {
        fr: "Professionnellement, La Roue de Fortune annonce un coup d'accélérateur. Promotion, opportunité en or, changement de poste ou de secteur — les choses bougent et c'est bon signe. Cette carte favorise les prises de risque : si tu hésitais à te lancer, c'est maintenant. La chance est de ton côté, mais rappelle-toi que la roue tourne toujours — profite de cette vague positive pour construire des fondations solides.",
        en: "Career-wise, the Wheel of Fortune announces acceleration. Promotion, golden opportunity, position or sector change — things are moving and it's a good sign. Luck is on your side, so use this positive wave to build solid foundations.",
      },
    },
    reversed: {
      meaning: {
        fr: "La Roue de Fortune inversée indique que le cycle est en phase descendante. Tu traverses une période de malchance, de blocages, d'événements qui échappent à ton contrôle. Mais cette carte porte aussi un message d'espoir : si la roue descend, c'est qu'elle remontera. Ne lutte pas contre les événements, ne t'accroche pas à ce qui s'en va. Parfois, perdre quelque chose est la condition nécessaire pour gagner quelque chose de mieux.",
        en: "The Wheel of Fortune reversed indicates the cycle is in its descending phase. You're going through a period of bad luck and blocks. But this card carries hope: if the wheel goes down, it will rise again. Don't fight events — sometimes losing something is necessary to gain something better.",
      },
      love: {
        fr: "En amour, La Roue inversée peut annoncer une rupture, un éloignement, ou un sentiment que rien n'avance. La routine s'est installée, la passion s'est éteinte, ou un événement extérieur perturbe ta vie sentimentale. Cette carte te rappelle que les périodes creuses sont nécessaires — elles te préparent au prochain chapitre. Ne force rien, laisse le temps faire son œuvre.",
        en: "In love, the reversed Wheel may announce a breakup or stagnation. Routine has set in or an external event disrupts your love life. Remember that low periods prepare you for the next chapter.",
      },
      career: {
        fr: "Professionnellement, La Roue inversée signale des obstacles, des retards, voire un licenciement ou une faillite. C'est un moment de test. Ne panique pas, ne prends pas de décisions impulsives. Utilise cette période pour te former, te reposer, et préparer ta prochaine montée. Ceux qui traversent l'hiver avec sagesse récoltent au printemps.",
        en: "Career-wise, the reversed Wheel signals obstacles, delays, or even layoffs. It's a testing moment. Don't panic. Use this period to train, rest, and prepare for your next rise.",
      },
    },
  },

  // ─── XVIII · La Lune ─────────────────────────────────────
  {
    slug: 'la-lune',
    number: 'XVIII',
    image: '/images/cards/tarot/arcane_XVIII_La_Lune.jpeg',
    name: { fr: 'La Lune', en: 'The Moon' },
    keywords: {
      fr: 'Illusion, inconscient, peur, intuition, rêves, mystère',
      en: 'Illusion, subconscious, fear, intuition, dreams, mystery',
    },
    element: 'Eau',
    planet: 'Lune',
    upright: {
      meaning: {
        fr: "La Lune est la carte des profondeurs de l'inconscient. Elle éclaire ce que le soleil ne peut pas voir — les peurs cachées, les désirs inavoués, les souvenirs enfouis. Quand La Lune apparaît, elle t'invite à explorer ton monde intérieur sans peur, à accepter que tout n'est pas rationnel et que certaines vérités ne se révèlent que dans l'obscurité. C'est la carte des rêves, des visions, de l'intuition profonde. Mais attention : La Lune peut aussi créer des illusions. Tout ce qui brille dans la nuit n'est pas or — apprends à distinguer l'intuition vraie de la projection anxieuse.",
        en: "The Moon is the card of subconscious depths. It illuminates what the sun cannot see — hidden fears, unspoken desires, buried memories. When The Moon appears, it invites you to explore your inner world without fear. But beware: The Moon can also create illusions. Learn to distinguish true intuition from anxious projection.",
      },
      love: {
        fr: "En amour, La Lune révèle que tout n'est pas clair. Des émotions confuses, des non-dits, peut-être même un secret. Cette carte ne signifie pas forcément quelque chose de négatif — elle dit simplement que les sentiments sont profonds et complexes, et qu'il faut du temps pour y voir clair. Si tu doutes de ta relation, La Lune te dit d'attendre avant de juger. Laisse tes émotions se décanter.",
        en: "In love, The Moon reveals things aren't clear. Confused emotions, unsaid things, perhaps a secret. This card says feelings are deep and complex — wait before judging. Let your emotions settle.",
      },
      career: {
        fr: "Professionnellement, La Lune conseille la prudence. Quelque chose dans ton environnement de travail n'est pas ce qu'il semble être — un collègue, un contrat, une promesse. Ne prends pas les choses pour argent comptant. Cette carte favorise en revanche les métiers créatifs, artistiques, thérapeutiques — tout ce qui puise dans l'imaginaire et l'émotionnel.",
        en: "Career-wise, The Moon advises caution. Something in your work environment isn't what it seems. Don't take things at face value. However, this card favors creative, artistic, and therapeutic work.",
      },
    },
    reversed: {
      meaning: {
        fr: "La Lune inversée annonce la dissipation des illusions. Les vérités cachées émergent enfin, les peurs reculent, la confusion se lève. C'est un moment de clarté après une longue période de doute. Mais cette clarté peut être douloureuse — découvrir une vérité que tu refusais de voir. La Lune inversée t'invite à accueillir cette lucidité comme un cadeau, même si elle fait mal. La vérité est toujours préférable au mensonge confortable.",
        en: "The Moon reversed announces the dissipation of illusions. Hidden truths finally emerge, fears recede, confusion lifts. It's a moment of clarity after a long period of doubt. Welcome this lucidity as a gift, even if it hurts.",
      },
      love: {
        fr: "En amour, La Lune inversée signifie que les masques tombent. Un mensonge est découvert, un quiproquo se résout, ou tes propres peurs d'engagement se dissipent enfin. C'est le moment de voir ta relation telle qu'elle est vraiment — sans idéalisation ni projection. Si ce que tu vois te plaît, fonce. Sinon, tu as maintenant la clarté pour agir.",
        en: "In love, The Moon reversed means masks are falling. A lie is discovered, a misunderstanding resolves, or your own fears of commitment finally dissipate. See your relationship as it truly is.",
      },
      career: {
        fr: "Professionnellement, La Lune inversée est positive : un projet nébuleux se clarifie, une décision bloquée se débloque, tu vois enfin la direction à prendre. C'est aussi le moment où les manœuvres en coulisses sont exposées. Si quelqu'un travaillait contre toi, c'est maintenant que ça se voit. Utilise cette clarté pour avancer.",
        en: "Career-wise, The Moon reversed is positive: a nebulous project clarifies, a stuck decision unblocks. Behind-the-scenes maneuvers are exposed. Use this clarity to move forward.",
      },
    },
  },

  // ─── XIX · Le Soleil ─────────────────────────────────────
  {
    slug: 'le-soleil',
    number: 'XIX',
    image: '/images/cards/tarot/arcane__XIX_Le_Soleil.png',
    name: { fr: 'Le Soleil', en: 'The Sun' },
    keywords: {
      fr: 'Joie, succès, vitalité, clarté, épanouissement, bonheur',
      en: 'Joy, success, vitality, clarity, fulfillment, happiness',
    },
    element: 'Feu',
    planet: 'Soleil',
    upright: {
      meaning: {
        fr: "Le Soleil est la carte la plus positive du tarot. Il brille sur toi et illumine tout ce qu'il touche — la joie, le succès, la vitalité, la clarté totale. Quand Le Soleil apparaît dans un tirage, c'est un oui retentissant de l'univers. Tout ce que tu entreprends a de grandes chances de réussir. L'énergie est haute, l'optimisme est justifié, et la vie te sourit. Le Soleil représente aussi l'authenticité — la capacité d'être pleinement toi-même, sans masque, sans filtre, radieux dans ta vérité. C'est le moment de célébrer, de briller, d'oser.",
        en: "The Sun is the most positive card in the tarot. It shines upon you and illuminates everything — joy, success, vitality, total clarity. When The Sun appears, it's a resounding yes from the universe. Everything you undertake has great chances of success. The Sun represents authenticity — being fully yourself, radiant in your truth.",
      },
      love: {
        fr: "En amour, Le Soleil est un cadeau. Il annonce le bonheur pur, la relation lumineuse, l'amour qui réchauffe et guérit. En couple, c'est une période de grande joie — peut-être un mariage, une naissance, ou simplement un quotidien rempli de complicité et de rires. Célibataire, Le Soleil te promet une rencontre qui t'illumine. Cette personne arrivera quand tu seras à ton meilleur — et elle te rendra encore plus lumineux.",
        en: "In love, The Sun is a gift. It announces pure happiness, a luminous relationship, love that warms and heals. A joyful period — perhaps marriage, a birth, or simply a daily life filled with laughter and complicity.",
      },
      career: {
        fr: "Professionnellement, Le Soleil est synonyme de réussite éclatante. Reconnaissance, promotion, succès d'un projet — tout ce que tu touches en ce moment a un potentiel de victoire. C'est la carte idéale pour les lancements, les présentations, les négociations. Ta confiance est contagieuse et les gens veulent travailler avec toi. Profite de ce moment pour viser haut — les étoiles sont alignées.",
        en: "Career-wise, The Sun means brilliant success. Recognition, promotion, project success — everything you touch has victory potential. It's the ideal card for launches, presentations, and negotiations. Aim high — the stars are aligned.",
      },
    },
    reversed: {
      meaning: {
        fr: "Le Soleil inversé ne devient pas négatif — il perd simplement un peu de son éclat. Le bonheur est là mais tu ne le vois pas, le succès arrive mais tu le sabotes par manque de confiance, la joie est accessible mais tu t'interdis de la ressentir. Cette carte inversée te dit que le problème n'est pas dans ta situation — il est dans ta perception. Tu te focalises sur ce qui manque au lieu de voir ce qui est déjà là. Change de lunettes, et le soleil brillera à nouveau.",
        en: "The Sun reversed doesn't become negative — it simply loses some of its brightness. Happiness is there but you can't see it. Success arrives but you sabotage it with self-doubt. The problem isn't your situation — it's your perception. Change your lens, and the sun will shine again.",
      },
      love: {
        fr: "En amour, Le Soleil inversé indique que le bonheur est à portée de main mais que quelque chose t'empêche d'en profiter — insécurité, comparaison aux autres, ou blessures passées non guéries. Ton partenaire t'aime, mais tu n'arrives pas à y croire. Ou tu es célibataire et tu penses que tu ne mérites pas d'être aimé. Le Soleil inversé te dit : tu mérites tout le bonheur du monde. Ouvre les yeux.",
        en: "In love, The Sun reversed indicates happiness is within reach but something prevents you from enjoying it — insecurity, comparison, or unhealed past wounds. The reversed Sun says: you deserve all the happiness in the world. Open your eyes.",
      },
      career: {
        fr: "Professionnellement, Le Soleil inversé signale un succès retardé ou sous-estimé. Tu travailles bien mais tu ne reçois pas la reconnaissance méritée, ou tu n'oses pas mettre en avant tes réussites. Le syndrome de l'imposteur te freine. Cette carte t'encourage à prendre ta place, à revendiquer tes victoires, à arrêter de te cacher. Tu es compétent — il est temps que le monde le sache.",
        en: "Career-wise, The Sun reversed signals delayed or underestimated success. Impostor syndrome holds you back. This card encourages you to take your place and claim your victories. You are competent — it's time the world knows.",
      },
    },
  },
];

/** Get a specific card meaning by slug */
export function getMeaning(slug: string): TarotMeaning | undefined {
  return tarotMeanings.find((m) => m.slug === slug);
}

/** Get all card meanings for navigation (prev/next) */
export function getMeaningNavigation(slug: string): {
  current: TarotMeaning | undefined;
  prev: TarotMeaning | undefined;
  next: TarotMeaning | undefined;
} {
  const idx = tarotMeanings.findIndex((m) => m.slug === slug);
  return {
    current: tarotMeanings[idx],
    prev: idx > 0 ? tarotMeanings[idx - 1] : undefined,
    next: idx < tarotMeanings.length - 1 ? tarotMeanings[idx + 1] : undefined,
  };
}
