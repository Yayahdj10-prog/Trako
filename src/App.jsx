import { useState, useEffect, useRef } from "react";

const C = {
  dark:"#07090f",darkBlue:"#0d1b3e",blue:"#1a3a6e",accent:"#e63946",
  white:"#ffffff",gray:"#8892a4",lightGray:"#141e30",success:"#2ecc71",
  card:"#111827",gold:"#f5c518",purple:"#9b59b6"
};

const EX = [
  {id:1,name:"Développé couché barre",p:"Pectoraux",s:"Triceps, Épaules",eq:"Barre",emoji:"🏋️",tips:"Omoplates serrées, barre effleure la poitrine, pousse explosif."},
  {id:2,name:"Développé couché haltères",p:"Pectoraux",s:"Triceps",eq:"Haltères",emoji:"💪",tips:"Descente contrôlée 3s, coudes à 45°, pousse en arc."},
  {id:3,name:"Écarté haltères plat",p:"Pectoraux",s:"Épaules avant",eq:"Haltères",emoji:"🦅",tips:"Légère flexion du coude fixe, amplitude complète."},
  {id:4,name:"Pompes classiques",p:"Pectoraux",s:"Triceps, Core",eq:"Poids du corps",emoji:"⬇️",tips:"Corps gainé, poitrine touche presque le sol."},
  {id:5,name:"Dips pectoraux",p:"Pectoraux",s:"Triceps",eq:"Machine",emoji:"📉",tips:"Penche le buste en avant pour cibler les pecs."},
  {id:6,name:"Développé incliné barre",p:"Pectoraux haut",s:"Épaules",eq:"Barre",emoji:"📈",tips:"Banc à 30-45°, cible la partie haute du pectoral."},
  {id:7,name:"Câble croisé poulie haute",p:"Pectoraux",s:"Épaules avant",eq:"Machine",emoji:"✂️",tips:"Poulie haute = bas du pec. Expire en croisant."},
  {id:8,name:"Développé incliné haltères",p:"Pectoraux haut",s:"Épaules",eq:"Haltères",emoji:"📐",tips:"Angle 30-45°, contrôle la descente lentement."},
  {id:9,name:"Pull-over haltère",p:"Pectoraux",s:"Dos, Triceps",eq:"Haltères",emoji:"🌊",tips:"Bras légèrement fléchis, descend derrière la tête, ressens l'étirement."},
  {id:10,name:"Pompes déclinées",p:"Pectoraux bas",s:"Triceps",eq:"Poids du corps",emoji:"↗️",tips:"Pieds surélevés, cible la partie basse du pectoral."},
  {id:11,name:"Soulevé de terre",p:"Dos",s:"Jambes, Fessiers, Trapèzes",eq:"Barre",emoji:"🏋️",tips:"Dos plat, barre proche du tibia, pousse le sol."},
  {id:12,name:"Tractions pronation",p:"Dos",s:"Biceps, Core",eq:"Poids du corps",emoji:"🔝",tips:"Amène les coudes vers les hanches, menton dépasse la barre."},
  {id:13,name:"Tractions supination",p:"Dos",s:"Biceps",eq:"Poids du corps",emoji:"⬆️",tips:"Prise supination, isole davantage le biceps."},
  {id:14,name:"Tirage vertical prise large",p:"Dos",s:"Biceps, Épaules arrière",eq:"Machine",emoji:"⬇️",tips:"Tire vers le haut de la poitrine, coudes vers le bas."},
  {id:15,name:"Rowing barre",p:"Dos",s:"Biceps, Épaules arrière",eq:"Barre",emoji:"🚣",tips:"Buste à 45°, barre monte vers le nombril."},
  {id:16,name:"Rowing haltère unilatéral",p:"Dos",s:"Biceps",eq:"Haltères",emoji:"💪",tips:"Genou et main sur banc, tire le coude vers le plafond."},
  {id:17,name:"Face pull",p:"Dos",s:"Épaules arrière, Rotateurs",eq:"Machine",emoji:"😤",tips:"Poulie haute, tire vers le visage, coudes en croix."},
  {id:18,name:"Soulevé de terre roumain",p:"Dos",s:"Ischio-jambiers, Fessiers",eq:"Barre",emoji:"🔄",tips:"Jambes quasi-tendues, descend en glissant sur les jambes."},
  {id:19,name:"Tirage poulie basse",p:"Dos",s:"Biceps",eq:"Machine",emoji:"🔻",tips:"Dos droit, coudes en arrière, omoplates se serrent."},
  {id:20,name:"Shrug barre",p:"Trapèzes",s:"Dos",eq:"Barre",emoji:"🤷",tips:"Monte les épaules vers les oreilles, pas de rotation."},
  {id:21,name:"Développé militaire barre",p:"Épaules",s:"Triceps, Trapèzes",eq:"Barre",emoji:"🎯",tips:"Core verrouillé, pousse verticalement, ne creuse pas le dos."},
  {id:22,name:"Développé épaules haltères",p:"Épaules",s:"Triceps",eq:"Haltères",emoji:"🏋️",tips:"Haltères à hauteur d'oreilles, pousse sans verrouiller."},
  {id:23,name:"Élévations latérales",p:"Épaules",s:"Trapèzes",eq:"Haltères",emoji:"🦋",tips:"Monte jusqu'à l'horizontale, légère flexion du coude."},
  {id:24,name:"Élévations frontales",p:"Épaules",s:"Pectoraux haut",eq:"Haltères",emoji:"⬆️",tips:"Lent et contrôlé, monte à hauteur des yeux."},
  {id:25,name:"Arnold press",p:"Épaules",s:"Triceps",eq:"Haltères",emoji:"🔁",tips:"Commence prise supine, rotation en poussant. Travaille les 3 chefs."},
  {id:26,name:"Oiseau haltères",p:"Épaules arrière",s:"Dos",eq:"Haltères",emoji:"🐦",tips:"Penché à 45°, bras légèrement fléchis, monte à l'horizontal."},
  {id:27,name:"Presse épaules machine",p:"Épaules",s:"Triceps",eq:"Machine",emoji:"🤖",tips:"Réglage du siège crucial, pousse sans verrouiller."},
  {id:28,name:"Squat barre",p:"Quadriceps",s:"Fessiers, Ischio-jambiers",eq:"Barre",emoji:"🦵",tips:"Dos droit, genoux dans l'axe des orteils, cuisses parallèles."},
  {id:29,name:"Squat goblet",p:"Quadriceps",s:"Fessiers, Core",eq:"Haltères",emoji:"🥤",tips:"Haltère contre la poitrine, parfait pour apprendre."},
  {id:30,name:"Fentes marchées",p:"Quadriceps",s:"Fessiers, Ischio",eq:"Poids du corps",emoji:"🦶",tips:"Grand pas, genou arrière à 2cm du sol, buste droit."},
  {id:31,name:"Presse à cuisse",p:"Quadriceps",s:"Fessiers, Ischio",eq:"Machine",emoji:"🦾",tips:"Pieds largeur épaules, ne verrouille pas les genoux."},
  {id:32,name:"Leg curl couché",p:"Ischio-jambiers",s:"Mollets",eq:"Machine",emoji:"🔄",tips:"Hanches plaquées, tire les talons vers les fesses lentement."},
  {id:33,name:"Leg extension",p:"Quadriceps",s:"-",eq:"Machine",emoji:"🦿",tips:"Contraction complète, maintiens 1s, descends lentement."},
  {id:34,name:"Mollets debout",p:"Mollets",s:"Soléaire",eq:"Machine",emoji:"👟",tips:"Amplitude complète, descend le talon sous la marche."},
  {id:35,name:"Hip thrust",p:"Fessiers",s:"Ischio, Lombaires",eq:"Barre",emoji:"🍑",tips:"Épaules sur banc, corps horizontal en haut, serre les fessiers."},
  {id:36,name:"Sumo squat",p:"Fessiers",s:"Adducteurs, Quadriceps",eq:"Haltères",emoji:"🤼",tips:"Pieds très écartés, orteils vers l'extérieur."},
  {id:37,name:"Fentes bulgares",p:"Quadriceps",s:"Fessiers",eq:"Haltères",emoji:"🏔️",tips:"Pied arrière surélevé sur banc, descends profondément."},
  {id:38,name:"Glute kickback machine",p:"Fessiers",s:"Ischio",eq:"Machine",emoji:"🍑",tips:"Genoux à 90°, pousse le pied vers l'arrière et le haut."},
  {id:39,name:"Abduction hanche machine",p:"Fessiers",s:"Abducteurs",eq:"Machine",emoji:"↔️",tips:"Dos droit, écarte lentement, contrôle le retour."},
  {id:40,name:"Curl barre",p:"Biceps",s:"Avant-bras",eq:"Barre",emoji:"💪",tips:"Coudes fixes contre le corps, descends lentement 3s."},
  {id:41,name:"Curl haltères alterné",p:"Biceps",s:"Brachial",eq:"Haltères",emoji:"🔄",tips:"Supine en montant, coude fixe, un bras à la fois."},
  {id:42,name:"Curl marteau",p:"Biceps",s:"Brachial, Avant-bras",eq:"Haltères",emoji:"🔨",tips:"Prise neutre, coudes fixes, mouvement lent."},
  {id:43,name:"Curl pupitre",p:"Biceps",s:"-",eq:"Machine",emoji:"📚",tips:"Bras à plat, isole parfaitement le biceps."},
  {id:44,name:"Curl concentré",p:"Biceps",s:"-",eq:"Haltères",emoji:"🎯",tips:"Coude appuyé sur la cuisse, isolation totale du biceps."},
  {id:45,name:"Curl incliné haltères",p:"Biceps",s:"Brachial",eq:"Haltères",emoji:"📐",tips:"Banc incliné, bras pendent librement, amplitude maximale."},
  {id:46,name:"Dips triceps",p:"Triceps",s:"Pectoraux, Épaules",eq:"Poids du corps",emoji:"⬇️",tips:"Buste droit, coudes vers l'arrière, descends à 90°."},
  {id:47,name:"Skull crusher",p:"Triceps",s:"-",eq:"Barre",emoji:"💀",tips:"Barre descend vers le front, coudes pointent au plafond."},
  {id:48,name:"Extension triceps poulie",p:"Triceps",s:"-",eq:"Machine",emoji:"🔽",tips:"Coudes fixes, pousse jusqu'à extension complète."},
  {id:49,name:"Extension haltère tête",p:"Triceps",s:"-",eq:"Haltères",emoji:"☝️",tips:"Bras vertical, haltère derrière la tête, coude au plafond."},
  {id:50,name:"Pompes diamant",p:"Triceps",s:"Pectoraux",eq:"Poids du corps",emoji:"💎",tips:"Mains forment un diamant sous la poitrine, coudes près du corps."},
  {id:51,name:"Planche",p:"Core",s:"Épaules, Fessiers",eq:"Poids du corps",emoji:"⚡",tips:"Corps aligné tête-talon, abdos contractés, respire normalement."},
  {id:52,name:"Crunch",p:"Abdominaux",s:"Core",eq:"Poids du corps",emoji:"🔄",tips:"Ne tire pas la nuque, expire en montant, contraction en haut."},
  {id:53,name:"Relevé de jambes",p:"Abdominaux",s:"Hip flexors",eq:"Poids du corps",emoji:"🦵",tips:"Bas du dos plaqué au sol, descends lentement sans toucher le sol."},
  {id:54,name:"Russian twist",p:"Obliques",s:"Abdominaux",eq:"Poids du corps",emoji:"🌀",tips:"Pieds décollés, rotation du buste, touche le sol de chaque côté."},
  {id:55,name:"Mountain climbers",p:"Core",s:"Épaules, Cardio",eq:"Poids du corps",emoji:"🏔️",tips:"Position pompe, genoux vers la poitrine rapidement, core gainé."},
  {id:56,name:"Course à pied",p:"Cardio",s:"Jambes, Core",eq:"Aucun",emoji:"🏃",tips:"Atterris milieu du pied, bras à 90°, regarde devant toi."},
  {id:57,name:"Burpees",p:"Cardio",s:"Full body",eq:"Poids du corps",emoji:"💥",tips:"Pompe, saute les pieds, saute en l'air bras levés. Enchaîne."},
  {id:58,name:"Vélo stationnaire",p:"Cardio",s:"Quadriceps, Mollets",eq:"Machine",emoji:"🚴",tips:"Selle à hauteur de hanche, cadence régulière, dos droit."},
  {id:59,name:"Rameur",p:"Dos",s:"Cardio, Jambes",eq:"Machine",emoji:"🚣",tips:"80% jambes, 20% dos. Pousse jambes d'abord, tire ensuite."},
  {id:60,name:"Squat élastique",p:"Quadriceps",s:"Fessiers",eq:"Élastique",emoji:"🦵",tips:"Élastique sous pieds, même technique que le squat."},
  {id:61,name:"Row élastique",p:"Dos",s:"Biceps",eq:"Élastique",emoji:"🚣",tips:"Élastique fixé devant toi, tire vers le ventre."},
  {id:62,name:"Abduction hanche élastique",p:"Fessiers",s:"Abducteurs",eq:"Élastique",emoji:"🦋",tips:"Élastique autour des genoux, écarte en gardant les pieds fixes."},
  {id:63,name:"Step up",p:"Quadriceps",s:"Fessiers",eq:"Poids du corps",emoji:"🪜",tips:"Monte sur une marche, contrôle la descente, ne saute pas."},
  {id:64,name:"Gainage latéral",p:"Obliques",s:"Core, Épaules",eq:"Poids du corps",emoji:"📐",tips:"Corps aligné, ne laisse pas les hanches tomber."},
  {id:65,name:"Superman",p:"Lombaires",s:"Fessiers, Ischio",eq:"Poids du corps",emoji:"🦸",tips:"Allongé face au sol, lève bras et jambes 2s, dos en extension."},
];

const PHASES = [
  {name:"🩸 Menstrues",days:[1,5],color:"#e63946",shortColor:"#e63946",
   desc:"Le corps perd du sang. Énergie basse, sensibilité élevée. Phase de repos et d'introspection.",
   sport:["Yoga doux","Marche légère","Pilates","Étirements","Natation douce"],
   sportEvoid:["HIIT intense","Musculation lourde","Cardio intense"],
   nutrition:["Fer : épinards, lentilles, viande rouge","Magnésium : chocolat noir, noix","Vitamine C pour absorber le fer","Évite alcool et caféine"],
   body:["Douleurs abdominales normales","Fatigue accrue","Rétention d'eau possible","Humeur plus basse"],
   conseil:"🛁 Chauffe-toi avec une bouillote. La chaleur soulage les crampes. Bois beaucoup d'eau et mange des aliments riches en fer."},
  {name:"🌱 Phase folliculaire",days:[6,13],color:"#2ecc71",shortColor:"#2ecc71",
   desc:"Montée des œstrogènes. Énergie croissante, humeur positive, récupération rapide.",
   sport:["Musculation lourde","HIIT","Course à pied","Nouveaux exercices","Records personnels"],
   sportEvoid:["Aucune restriction ! C'est LE moment pour performer"],
   nutrition:["Protéines pour la construction musculaire","Glucides complexes pour l'énergie","Légumes verts, brocolis","Graines de lin et citrouille"],
   body:["Énergie en hausse progressive","Humeur positive","Meilleure coordination","Récupération plus rapide","Libido en hausse"],
   conseil:"🔥 C'est ta fenêtre de performance ! Profite de cette énergie pour tester de nouveaux exercices et repousser tes limites."},
  {name:"🥚 Ovulation",days:[14,16],color:"#f39c12",shortColor:"#f39c12",
   desc:"Pic d'œstrogènes et de testostérone. Énergie maximale, confiance au sommet.",
   sport:["Records personnels","Entraînements les plus intenses","Sports collectifs","Compétitions"],
   sportEvoid:["Attention aux blessures ligamentaires (les œstrogènes assouplissent les ligaments)"],
   nutrition:["Antioxydants : fruits rouges, épinards","Zinc : huîtres, graines de citrouille","Oméga-3 : poisson gras, noix","Légumes crucifères : brocolis, chou"],
   body:["Pic d'énergie maximal","Confiance et sociabilité élevées","Ligaments plus souples (attention aux blessures)","Température corporelle légèrement plus haute"],
   conseil:"⚡ Ton corps est à son pic ! C'est le meilleur moment pour battre tes records. Mais attention aux entorses : les ligaments sont plus lâches."},
  {name:"🌙 Phase lutéale",days:[17,28],color:"#9b59b6",shortColor:"#9b59b6",
   desc:"Montée de la progestérone. Fatigue progressive, envies sucrées, besoin de calme.",
   sport:["Pilates","Yoga","Natation","Vélo léger","Marche","Musculation modérée"],
   sportEvoid:["HIIT très intense","Compétitions importantes","Efforts maximaux"],
   nutrition:["Magnésium contre les crampes et l'irritabilité","Vitamine B6 : banane, poulet, pomme de terre","Calcium : produits laitiers, amandes","Évite le sel (rétention d'eau)","Évite le sucre raffiné"],
   body:["Fatigue progressive","SPM possible (irritabilité, ballonnements)","Appétit augmenté","Rétention d'eau","Sensibilité des seins"],
   conseil:"🌙 Écoute ton corps. Privilégie les séances plus légères. Les envies sucrées sont normales : opte pour des fruits ou du chocolat noir plutôt que de résister."},
];

const MEAL_CATS = {
  "🌅 Petit-déjeuner":[
    {name:"Porridge banane amandes",cal:410,p:15,c:68,f:9,time:"10min",img:"https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=300&q=80",ing:"80g flocons avoine, 1 banane, 30g amandes, 300ml lait, miel",recipe:"1. Chauffe flocons avec lait 4min. 2. Ajoute banane en rondelles. 3. Garnis d'amandes et miel.",chef:"Ajoute une pincée de cannelle pour booster le métabolisme !"},
    {name:"Œufs brouillés avocat toast",cal:380,p:22,c:28,f:22,time:"10min",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&q=80",ing:"3 œufs, 1 avocat, 2 tranches pain complet, sel, poivre, ciboulette",recipe:"1. Bats les œufs. 2. Cuis à feu doux en remuant. 3. Sers sur pain grillé avec avocat.",chef:"Feu très doux pour des œufs ultra crémeux !"},
    {name:"Yaourt grec fruits rouges",cal:280,p:18,c:32,f:6,time:"5min",img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",ing:"200g yaourt grec, 100g fruits rouges, 30g granola, miel",recipe:"1. Verse le yaourt. 2. Ajoute les fruits. 3. Granola et miel.",chef:"Yaourt grec 10% MG = plus de protéines et de satiété !"},
    {name:"Pancakes protéinés",cal:450,p:30,c:55,f:10,time:"20min",img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80",ing:"100g flocons mixés, 2 œufs, 1 banane, 30g whey vanille, levure",recipe:"1. Mixe tous les ingrédients. 2. Cuis 2-3min par face.",chef:"Ne retourne qu'une fois pour des pancakes moelleux !"},
    {name:"Chia pudding coco",cal:300,p:12,c:35,f:14,time:"5min + nuit",img:"https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=300&q=80",ing:"40g graines chia, 250ml lait coco, miel, vanille, mangue",recipe:"1. Mélange chia + lait + miel + vanille. 2. Frigo toute la nuit. 3. Garnis de fruits.",chef:"Prépare le soir pour un petit-déj instantané !"},
    {name:"Bowl açaï",cal:350,p:8,c:58,f:10,time:"10min",img:"https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&q=80",ing:"200g açaï congelé, 1 banane, jus myrtille, granola, kiwi, coco",recipe:"1. Mixe açaï + banane + jus. 2. Verse dans bol. 3. Toppings.",chef:"Texture semi-congelée = meilleure expérience !"},
    {name:"Toast saumon cream cheese",cal:390,p:25,c:35,f:14,time:"5min",img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",ing:"2 tranches pain complet, 80g saumon fumé, 50g cream cheese, câpres, aneth",recipe:"1. Grille le pain. 2. Étale cream cheese. 3. Saumon + câpres + aneth.",chef:"Filet de citron pour réveiller tous les arômes !"},
    {name:"Muffins protéinés",cal:220,p:14,c:28,f:6,time:"30min",img:"https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&q=80",ing:"100g son d'avoine, 2 œufs, 50g fromage blanc, 20g whey, levure, miel, myrtilles",recipe:"1. Mélange ingrédients secs. 2. Ajoute les humides. 3. Four 180°C 20min.",chef:"Prépare en batch le dimanche, se conserve 5 jours !"},
  ],
  "☀️ Déjeuner":[
    {name:"Poulet riz brocolis",cal:520,p:45,c:52,f:8,time:"25min",img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",ing:"150g poulet, 80g riz, 200g brocolis, huile d'olive, ail, citron",recipe:"1. Cuis riz 18min. 2. Grille poulet 6min/côté. 3. Vapeur brocolis 8min.",chef:"Marinade express : citron + ail + herbes 30min avant !"},
    {name:"Salade quinoa thon",cal:460,p:35,c:48,f:12,time:"10min",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",ing:"80g quinoa, 150g thon, tomates cerises, concombre, olives",recipe:"1. Cuis quinoa 15min. 2. Mélange tout. 3. Vinaigrette citron + huile.",chef:"Rince le quinoa pour enlever l'amertume !"},
    {name:"Bowl buddha saumon",cal:540,p:38,c:50,f:16,time:"20min",img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&q=80",ing:"150g saumon, 80g riz, edamame, avocat, concombre, sauce soja",recipe:"1. Poêle saumon 4min/côté. 2. Arrange riz + garnitures. 3. Sauce soja + sésame.",chef:"Gingembre râpé dans la sauce = secret parfait !"},
    {name:"Pâtes complètes bolognaise",cal:580,p:32,c:72,f:14,time:"30min",img:"https://images.unsplash.com/photo-1598866594240-d914d4df8a8c?w=300&q=80",ing:"100g pâtes complètes, 150g viande hachée 5%, tomates, oignon, ail",recipe:"1. Fais revenir oignon + viande. 2. Tomates + herbes, mijote 20min. 3. Cuis pâtes al dente.",chef:"Laisse mijoter au moins 20min pour les saveurs !"},
    {name:"Wrap dinde légumes",cal:420,p:30,c:45,f:10,time:"10min",img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80",ing:"1 tortilla complète, 120g dinde, poivrons, salade, houmous",recipe:"1. Tartine houmous. 2. Ajoute dinde et légumes. 3. Roule serré.",chef:"Chauffe 30s la tortilla pour qu'elle ne se déchire pas !"},
    {name:"Soupe lentilles corail",cal:380,p:22,c:55,f:6,time:"35min",img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80",ing:"200g lentilles corail, carottes, oignon, cumin, curcuma, bouillon",recipe:"1. Fais revenir oignon. 2. Lentilles + légumes + épices + bouillon. 3. Mijote 25min, mixe.",chef:"Cumin et curcuma sont anti-inflammatoires !"},
    {name:"Riz sauté crevettes",cal:490,p:36,c:58,f:10,time:"20min",img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&q=80",ing:"80g riz complet, 150g crevettes, poivrons, courgettes, sauce soja, sésame",recipe:"1. Cuis riz. 2. Saute crevettes + légumes à feu vif. 3. Sauce soja + sésame.",chef:"Wok très chaud = légumes croquants !"},
    {name:"Chili con carne léger",cal:510,p:38,c:48,f:14,time:"35min",img:"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&q=80",ing:"150g viande hachée 5%, haricots rouges, tomates, poivrons, épices mexicaines",recipe:"1. Fais revenir oignon + viande. 2. Tomates + haricots + épices. 3. Mijote 25min.",chef:"Plus tu laisses mijoter, plus c'est délicieux !"},
  ],
  "🍎 Collation":[
    {name:"Pomme beurre cacahuète",cal:250,p:7,c:28,f:14,time:"2min",img:"https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=300&q=80",ing:"1 pomme, 2cs beurre de cacahuète naturel",recipe:"1. Coupe la pomme. 2. Trempe dans beurre de cacahuète.",chef:"Beurre cacahuète sans sucre ajouté !"},
    {name:"Fromage blanc fruits",cal:180,p:15,c:20,f:2,time:"2min",img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",ing:"150g fromage blanc 0%, fruits rouges, miel",recipe:"1. Verse fromage blanc. 2. Fruits + miel.",chef:"0% = mêmes protéines que le grec !"},
    {name:"Œuf dur crackers",cal:160,p:14,c:12,f:6,time:"12min",img:"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=80",ing:"2 œufs, 4 crackers seigle",recipe:"1. Cuis œufs 10min. 2. Eau froide. 3. Sers avec crackers.",chef:"Eau froide immédiate = coque facile à peler !"},
    {name:"Mix énergétique maison",cal:280,p:8,c:32,f:14,time:"5min",img:"https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&q=80",ing:"30g amandes, 20g cajou, 20g raisins secs, 10g pépites chocolat noir",recipe:"1. Mélange tout. 2. Divise en portions.",chef:"Prépare en grande quantité pour toute la semaine !"},
    {name:"Galettes avoine chocolat",cal:180,p:7,c:26,f:6,time:"15min",img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80",ing:"100g flocons avoine, 1 banane, 20g chocolat noir, 1 œuf, cannelle",recipe:"1. Écrase banane + flocons + œuf + cannelle. 2. Ajoute chocolat. 3. Cuis 3min/côté.",chef:"Pas de sucre ajouté : la banane suffit !"},
    {name:"Skyr myrtilles noix",cal:200,p:18,c:22,f:5,time:"2min",img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80",ing:"150g skyr nature, myrtilles, 20g noix, miel",recipe:"1. Verse skyr. 2. Myrtilles + noix + miel.",chef:"Le skyr = protéines record islandais !"},
  ],
  "🌙 Dîner":[
    {name:"Saumon patate douce",cal:580,p:42,c:45,f:18,time:"30min",img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",ing:"150g saumon, 200g patate douce, huile d'olive, paprika, citron",recipe:"1. Four 200°C. 2. Patate douce 25min. 3. Saumon poêlé 4min/côté.",chef:"Peau du saumon = oméga-3. Mange-la !"},
    {name:"Omelette légumes feta",cal:350,p:26,c:8,f:22,time:"15min",img:"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=80",ing:"3 œufs, poivrons, champignons, épinards, feta",recipe:"1. Fais revenir légumes 5min. 2. Bats œufs, verse. 3. Replie après 3min.",chef:"Feu moyen-doux pour ne jamais dessécher !"},
    {name:"Curry pois chiches coco",cal:450,p:18,c:58,f:14,time:"25min",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&q=80",ing:"400g pois chiches, lait de coco, tomates, curry, curcuma, riz basmati",recipe:"1. Oignon + épices. 2. Pois chiches + tomates + coco. 3. Mijote 15min.",chef:"Plus tu laisses mijoter, meilleur c'est !"},
    {name:"Cabillaud vapeur légumes",cal:320,p:38,c:5,f:8,time:"20min",img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&q=80",ing:"180g cabillaud, légumes vapeur, herbes de Provence, citron",recipe:"1. Vapeur cabillaud 12min. 2. Vapeur légumes. 3. Citron + herbes.",chef:"Citron en fin de cuisson = vitamines préservées !"},
    {name:"Steak haricots verts",cal:430,p:40,c:15,f:18,time:"15min",img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80",ing:"150g steak, 200g haricots verts, ail, beurre",recipe:"1. Poêle steak 3min/côté. 2. Haricots vapeur 8min. 3. Beurre + ail.",chef:"Laisse reposer la viande 5min après cuisson !"},
    {name:"Poulet papillote légumes",cal:380,p:40,c:20,f:10,time:"30min",img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&q=80",ing:"150g poulet, courgettes, tomates, poivrons, herbes de Provence",recipe:"1. Dispose poulet + légumes sur papier cuisson. 2. Huile + herbes. 3. Four 200°C 25min.",chef:"La papillote préserve toutes les vitamines !"},
    {name:"Dahl lentilles",cal:400,p:20,c:58,f:8,time:"30min",img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80",ing:"200g lentilles, oignon, tomates, gingembre, curcuma, cumin, coriandre",recipe:"1. Oignon + épices. 2. Lentilles + tomates + eau. 3. Mijote 25min.",chef:"Une noisette de beurre en fin de cuisson pour le goût !"},
  ],
  "🍰 Desserts":[
    {name:"Mousse chocolat protéinée",cal:280,p:20,c:22,f:10,time:"15min + 2h frigo",img:"https://images.unsplash.com/photo-1511715282680-fbf93a50e721?w=300&q=80",ing:"200g chocolat noir 70%, 4 œufs, 30g whey chocolat",recipe:"1. Fonds chocolat. 2. Jaunes + chocolat + whey. 3. Monte blancs, incorpore. 4. Frigo 2h.",chef:"Blancs en neige fermes = mousse aérienne !"},
    {name:"Banana bread sain",cal:220,p:8,c:38,f:5,time:"50min",img:"https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=300&q=80",ing:"3 bananes très mûres, 2 œufs, 120g farine complète, miel, levure",recipe:"1. Écrase bananes. 2. Mélange tout. 3. Four 180°C 40min.",chef:"Plus les bananes sont noires, plus c'est sucré !"},
    {name:"Cheesecake grec",cal:310,p:16,c:35,f:10,time:"20min + 4h frigo",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&q=80",ing:"300g yaourt grec, 200g fromage blanc, 100g spéculoos, 30g miel, fruits",recipe:"1. Écrase spéculoos, tasse dans moule. 2. Yaourt + fromage blanc + miel. 3. Frigo 4h.",chef:"Cercle à pâtisserie pour un rendu parfait !"},
    {name:"Compote pomme cannelle",cal:120,p:1,c:30,f:0,time:"20min",img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&q=80",ing:"4 pommes, 1cc cannelle, jus citron, 2cs eau",recipe:"1. Épluche et coupe les pommes. 2. Cuis 15min. 3. Écrase + cannelle.",chef:"Cannelle = régule la glycémie !"},
    {name:"Cookies avoine raisins",cal:150,p:4,c:24,f:5,time:"20min",img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80",ing:"100g flocons avoine, 1 banane, 30g raisins secs, 1 œuf, cannelle",recipe:"1. Écrase banane. 2. Mélange tout. 3. Forme cookies. 4. Four 180°C 12min.",chef:"La banane remplace sucre et beurre !"},
  ],
  "🥤 Boissons":[
    {name:"Smoothie protéiné banane",cal:340,p:25,c:45,f:6,time:"5min",img:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&q=80",ing:"1 banane, 250ml lait amande, 30g whey vanille, 1cs beurre cacahuète",recipe:"1. Mixe tous les ingrédients. 2. Consomme immédiatement.",chef:"Banane congelée = texture crémeuse parfaite !"},
    {name:"Tisane gingembre citron",cal:15,p:0,c:3,f:0,time:"5min",img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80",ing:"3 rondelles gingembre, 1/2 citron, 500ml eau chaude, miel",recipe:"1. Eau bouillante. 2. Infuse gingembre 5min. 3. Presse citron.",chef:"Anti-inflammatoire et digestif. À boire à jeun !"},
    {name:"Eau infusée concombre menthe",cal:5,p:0,c:1,f:0,time:"5min + 1h",img:"https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&q=80",ing:"1/2 concombre, menthe fraîche, 1L eau, glaçons",recipe:"1. Concombre en rondelles. 2. Menthe + eau + glaçons. 3. Infuse 1h frigo.",chef:"Plus tu infuses longtemps, plus c'est goûtu !"},
    {name:"Latte curcuma",cal:120,p:4,c:15,f:4,time:"5min",img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&q=80",ing:"300ml lait végétal, 1cc curcuma, 1/2cc cannelle, poivre noir, miel",recipe:"1. Chauffe lait. 2. Ajoute épices. 3. Fouette + miel.",chef:"Le poivre noir multiplie l'absorption du curcuma par 2000% !"},
    {name:"Smoothie vert épinards",cal:180,p:5,c:35,f:2,time:"5min",img:"https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&q=80",ing:"2 poignées épinards, 1 pomme, 1/2 concombre, gingembre, citron, 200ml eau",recipe:"1. Mixe épinards + eau. 2. Ajoute pomme + concombre + gingembre + citron.",chef:"Commence toujours par les légumes + eau !"},
    {name:"Jus récupération orange",cal:160,p:2,c:38,f:0,time:"5min",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80",ing:"4 oranges, 1 citron, gingembre frais, 1cc curcuma",recipe:"1. Presse oranges + citron. 2. Râpe gingembre. 3. Mélange tout.",chef:"À consommer dans l'heure post-entraînement !"},
  ],
};

const COURSES=[
  {id:1,emoji:"💪",title:"Les muscles du corps humain",level:"Débutant",duration:"10 min",content:[{titre:"Les grands groupes musculaires",texte:"Le corps humain possède plus de 600 muscles. En musculation, on travaille les grands groupes : pectoraux, dos (grand dorsal, rhomboïdes, trapèzes), épaules (deltoïdes), bras (biceps, triceps, avant-bras), abdominaux, jambes (quadriceps, ischio-jambiers, fessiers, mollets)."},{titre:"Muscles agonistes et antagonistes",texte:"Quand un muscle se contracte (agoniste), son opposé (antagoniste) s'étire. Exemple : lors du curl biceps, le biceps est agoniste, le triceps est antagoniste. Entraîner les deux en équilibre prévient les blessures et améliore la posture."},{titre:"Fibres musculaires type I et II",texte:"Fibres lentes (type I) : endurance, résistantes à la fatigue. Fibres rapides (type II) : force explosive, se fatiguent vite. La musculation lourde développe les type II, le cardio les type I."},{titre:"Le core : le centre de tout",texte:"Le core (transverse, obliques, abdominaux, lombaires) stabilise la colonne pendant tous les mouvements. Un core faible = moins de force sur tous les exercices + risque de blessures augmenté."},],quiz:[{q:"Combien de muscles le corps humain possède-t-il ?",opts:["Plus de 200","Plus de 400","Plus de 600","Plus de 1000"],ans:2},{q:"Qu'est-ce qu'un muscle antagoniste ?",opts:["Un muscle très fort","Le muscle opposé qui s'étire","Un muscle du dos","Un muscle involontaire"],ans:1},{q:"Quelles fibres sont développées par la musculation lourde ?",opts:["Fibres type I","Fibres type II","Les deux","Aucune"],ans:1},]},
  {id:2,emoji:"🍽️",title:"Bases de la nutrition sportive",level:"Débutant",duration:"12 min",content:[{titre:"Les 3 macronutriments",texte:"Protéines (4 kcal/g) = construction musculaire. Sources : poulet, œufs, poisson, légumineuses. Glucides (4 kcal/g) = carburant principal. Sources : riz, pâtes, patate douce, avoine. Lipides (9 kcal/g) = hormones, articulations. Sources : huile d'olive, avocat, noix, poisson gras."},{titre:"Protéines et hypertrophie",texte:"Pour construire du muscle, consomme 1.6 à 2.2g de protéines par kg de poids corporel par jour. Exemple : 65kg = 104 à 143g de protéines/jour. Répartis sur 4-5 repas pour maximiser la synthèse protéique."},{titre:"Déficit et surplus calorique",texte:"Perte de poids = déficit de 300-500 kcal/jour. Prise de muscle = surplus de 200-300 kcal. Maintien = manger exactement son TDEE. Modifier trop fort = perte de muscle (sèche agressive) ou prise de graisse (masse sale)."},{titre:"Micronutriments et récupération",texte:"Magnésium : réduit les crampes (noix, chocolat noir). Vitamine D : essentielle pour les os et la testostérone (soleil, poisson gras). Fer : essentiel pour les femmes (viande rouge, épinards, lentilles)."},],quiz:[{q:"Combien de kcal contient 1g de lipides ?",opts:["4 kcal","7 kcal","9 kcal","12 kcal"],ans:2},{q:"Quelle quantité de protéines pour la prise de muscle ?",opts:["0.5g/kg","1.0g/kg","1.6 à 2.2g/kg","3g/kg"],ans:2},{q:"Qu'est-ce qu'un déficit calorique ?",opts:["Manger plus que son TDEE","Manger moins que son TDEE","Manger autant que son TDEE","Ne pas manger de glucides"],ans:1},]},
  {id:3,emoji:"😴",title:"La récupération et le sommeil",level:"Intermédiaire",duration:"8 min",content:[{titre:"Pourquoi récupérer ?",texte:"Le muscle ne grandit PAS pendant l'entraînement mais pendant la récupération. L'entraînement crée des micro-déchirures musculaires. Le repos + la nutrition + le sommeil les réparent et les rendent plus grosses et fortes : c'est la surcompensation."},{titre:"Le sommeil et les hormones",texte:"80% de l'hormone de croissance est sécrétée pendant le sommeil profond. Dormir moins de 6h réduit la testostérone de 10-15% et augmente le cortisol (hormone catabolique qui détruit le muscle). Le sommeil est l'anabolisant naturel le plus puissant."},{titre:"Les cycles de sommeil",texte:"Un cycle dure environ 90 minutes. Une nuit idéale = 5 cycles (7h30). Le sommeil paradoxal (REM) consolide la mémoire motrice : les mouvements appris à la salle sont mémorisés la nuit."},{titre:"La récupération active",texte:"Récupération active : marche légère, yoga, natation douce. Foam roller sur les zones travaillées réduit les courbatures de 30%. Étirements post-entraînement : 10 min minimum."},],quiz:[{q:"Quand le muscle grandit-il ?",opts:["Pendant l'entraînement","Pendant la récupération","En mangeant","Le matin"],ans:1},{q:"Combien dure un cycle de sommeil ?",opts:["45 minutes","60 minutes","90 minutes","120 minutes"],ans:2},{q:"Quel pourcentage de GH est libéré pendant le sommeil ?",opts:["20%","50%","80%","100%"],ans:2},]},
  {id:4,emoji:"🏃",title:"Les filières énergétiques",level:"Avancé",duration:"12 min",content:[{titre:"La filière anaérobie alactique",texte:"Durée : 0 à 10 secondes. Exemples : sprint, 1RM. Source : phosphocréatine (PCr). Pas d'oxygène, pas de lactate. Se régénère en 2-3 minutes. C'est pourquoi on se repose 3-5min entre les séries lourdes."},{titre:"La filière anaérobie lactique",texte:"Durée : 10 secondes à 2 minutes. Exemples : séries de 8-15 reps. Produit de l'acide lactique (la brûlure musculaire). Se régénère en 20-40 minutes. C'est la filière principale de l'hypertrophie musculaire."},{titre:"La filière aérobie",texte:"Durée : au-delà de 2-3 minutes. Exemples : jogging, vélo, natation. Utilise l'oxygène pour brûler glucides ET lipides. Indispensable pour la santé cardiovasculaire et la récupération entre séances."},{titre:"Application pratique",texte:"Charges lourdes 1-5 reps + repos 3-5min = filière alactique. Hypertrophie 8-15 reps + repos 60-90s = filière lactique. Cardio +20min = filière aérobie."},],quiz:[{q:"Combien de secondes dure la filière alactique ?",opts:["0-5s","0-10s","0-30s","0-60s"],ans:1},{q:"Qu'est-ce qui cause la brûlure musculaire ?",opts:["L'oxygène","Le glucose","L'acide lactique","Le phosphocréatine"],ans:2},{q:"Quelle filière pour une série de 10 répétitions ?",opts:["Alactique","Lactique","Aérobie","Aucune"],ans:1},]},
  {id:5,emoji:"⚕️",title:"Prévenir les blessures",level:"Débutant",duration:"8 min",content:[{titre:"L'échauffement : la base",texte:"10 minutes minimum avant chaque séance. Phase 1 (5min) : cardio léger pour élever la température. Phase 2 (5min) : mobilisations articulaires spécifiques aux muscles travaillés. Ne jamais s'étirer à froid !"},{titre:"Les blessures les plus fréquentes",texte:"Tendinites (progression trop rapide). Claquages (manque d'échauffement). Lombalgies (mauvaise technique au soulevé de terre). Blessures d'épaule (déséquilibre pec/dos). 80% des blessures sont évitables avec la bonne technique."},{titre:"La règle des 10%",texte:"Augmente la charge de maximum 5-10% par semaine. Les muscles progressent vite, mais les tendons et ligaments sont beaucoup plus lents à s'adapter. Les blessures arrivent toujours quand on va trop vite."},{titre:"Mobilité et étirements",texte:"Mobilité dynamique AVANT : rotations d'épaules, cercles de hanches, squats légers. Étirements statiques APRÈS uniquement (20-30 secondes minimum par position)."},],quiz:[{q:"Combien de temps minimum pour s'échauffer ?",opts:["2 min","5 min","10 min","20 min"],ans:2},{q:"De combien maximum augmenter la charge par semaine ?",opts:["1-2%","5-10%","20-25%","50%"],ans:1},{q:"Quand faire des étirements statiques ?",opts:["Avant l'entraînement","Pendant","Après l'entraînement","Au réveil"],ans:2},]},
  {id:6,emoji:"🧠",title:"Psychologie et performance",level:"Intermédiaire",duration:"10 min",content:[{titre:"Motivation vs Discipline",texte:"La motivation est une émotion qui fluctue. La discipline est une habitude. Les athlètes de haut niveau ont des routines gravées dans leurs habitudes. Automatise tes entraînements comme se brosser les dents."},{titre:"La surcompensation",texte:"Après un stress (entraînement), le corps récupère AU-DELÀ de son niveau initial pour mieux faire face à ce stress. C'est pourquoi il faut progresser de façon continue (surcharge progressive) : augmenter charges, volume ou fréquence."},{titre:"L'effet plateau",texte:"Quand les progrès stagnent : le corps s'est adapté. Solutions : changer les exercices, modifier les répétitions, augmenter le volume, changer les temps de repos. Un plateau = ton corps est prêt pour plus."},{titre:"La visualisation mentale",texte:"Utilisée par les athlètes olympiques. Visualiser l'exécution parfaite active les mêmes circuits neuronaux que l'exécution réelle (démontré par IRM). 5 minutes de visualisation avant la séance améliore les performances."},],quiz:[{q:"Qu'est-ce que la surcompensation ?",opts:["Trop manger après le sport","S'adapter au-delà du niveau initial","Un type de blessure","Une technique d'étirement"],ans:1},{q:"Quelle est la meilleure solution face à un plateau ?",opts:["Arrêter","Faire les mêmes exercices plus vite","Varier exercices, charges et répétitions","Manger plus"],ans:2},{q:"La visualisation active quels circuits ?",opts:["Les mêmes que l'exécution réelle","Uniquement visuels","Circuits de la douleur","Aucun prouvé"],ans:0},]},
];

const DAILY_TIPS=["La récupération se fait pendant le sommeil, pas pendant l'entraînement. Dors tes 7-9h !","La déshydratation réduit tes performances de 20%. Bois avant d'avoir soif.","Mange tes protéines dans les 30-60min après l'entraînement.","5min d'étirements ce soir améliorent ta récupération de demain.","Évite les écrans 1h avant de dormir. La lumière bleue bloque la mélatonine de 50%.","Une banane 1h avant le sport = énergie rapide + potassium contre les crampes.","Le muscle brûle des calories même au repos. Plus tu en as, plus ton métabolisme est rapide."];
const MOTIVATIONS=["🔥 La discipline bat la motivation. Chaque jour, sans exception.","💪 Chaque répétition te rapproche de ta meilleure version.","⚡ La douleur d'aujourd'hui est la force de demain.","🏆 Tes records d'hier sont ton plancher d'aujourd'hui.","🌟 Le seul mauvais entraînement est celui que tu n'as pas fait.","🚀 1% de progrès chaque jour = 37 fois meilleur en un an.","🎯 La régularité bat toujours l'intensité."];
const SLEEP_TIPS=[{icon:"📱",title:"Pas d'écran -1h avant",desc:"La lumière bleue bloque la mélatonine de 50%."},{icon:"🌡️",title:"Chambre à 18-19°C",desc:"Trop chaud = réveil nocturne garanti."},{icon:"☕",title:"Stop caféine après 14h",desc:"La caféine reste dans le sang 6-8h."},{icon:"🌬️",title:"Respiration 4-7-8",desc:"Inspire 4s, retiens 7s, expire 8s. Répète 4 fois."},{icon:"⏰",title:"Même heure chaque jour",desc:"Ton horloge biologique adore la régularité."},{icon:"🛁",title:"Bain chaud 1h avant",desc:"La chute de température après déclenche le sommeil."},{icon:"📓",title:"Journaling 5min",desc:"Écris 3 choses positives. Réduit le stress nocturne."},{icon:"🚫",title:"Pas d'alcool",desc:"L'alcool perturbe le sommeil paradoxal."}];

function calcBMI(w,h){return(w/((h/100)**2)).toFixed(1);}
function calcTDEE(p){if(!p)return 2000;const w=parseFloat(p.weight),h=parseFloat(p.height),a=parseFloat(p.age);const bmr=p.gender==="Homme"?88.36+13.4*w+4.8*h-5.7*a:447.6+9.2*w+3.1*h-4.3*a;const m={"Sédentaire (bureau, peu de marche)":1.2,"Légèrement actif (marche quotidienne)":1.375,"Modérément actif (sport 2-3x/sem)":1.55,"Très actif (sport 4-5x/sem)":1.725,"Extrêmement actif (tous les jours)":1.9};return Math.round(bmr*(m[p.activity]||1.55));}
function calcMacros(tdee,goal){if(goal==="Sèche"){const c=Math.round(tdee-400);return{cal:c,p:Math.round(c*0.35/4),g:Math.round(c*0.35/4),l:Math.round(c*0.30/9)};}if(goal==="Prise de masse"){const c=Math.round(tdee+250);return{cal:c,p:Math.round(c*0.25/4),g:Math.round(c*0.50/4),l:Math.round(c*0.25/9)};}return{cal:tdee,p:Math.round(tdee*0.30/4),g:Math.round(tdee*0.40/4),l:Math.round(tdee*0.30/9)};}

function getPhaseForDay(day,cycleLength){const pct=day/cycleLength;if(pct<=5/28)return 0;if(pct<=13/28)return 1;if(pct<=16/28)return 2;return 3;}

const s={
  app:{background:C.dark,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:"'Segoe UI',sans-serif",color:C.white,paddingBottom:80},
  hdr:{background:`linear-gradient(135deg,${C.darkBlue},${C.blue})`,padding:"15px 14px 11px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`2px solid ${C.accent}`,position:"sticky",top:0,zIndex:50},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.darkBlue,borderTop:`2px solid ${C.accent}`,display:"flex",justifyContent:"space-around",padding:"4px 0 7px",zIndex:100},
  nb:(a)=>({background:"none",border:"none",color:a?C.accent:C.gray,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,fontSize:7.5,fontWeight:a?700:400}),
  card:{background:C.card,borderRadius:16,padding:14,marginBottom:10},
  lbl:{fontSize:10,color:C.gray,marginBottom:5,textTransform:"uppercase",letterSpacing:1},
  btn:(v="red")=>({background:v==="red"?C.accent:v==="blue"?C.blue:v==="green"?C.success:v==="gold"?C.gold:C.lightGray,color:C.white,border:"none",borderRadius:12,padding:"11px 14px",fontSize:13,fontWeight:700,cursor:"pointer",width:"100%",marginBottom:8}),
  inp:{background:"#1a2235",border:`1px solid ${C.blue}`,borderRadius:10,padding:"10px 12px",color:C.white,fontSize:13,width:"100%",boxSizing:"border-box"},
  sec:{padding:"12px 12px 0"},
  fill:(pct,col)=>({height:"100%",width:`${Math.min(pct,100)}%`,background:col||C.accent,borderRadius:4,transition:"width 0.5s"}),
  cho:(sel)=>({background:sel?C.accent:"#1a2235",border:`2px solid ${sel?C.accent:C.blue}`,borderRadius:10,padding:"9px 11px",color:C.white,fontSize:13,cursor:"pointer",width:"100%",marginBottom:8,textAlign:"left",fontWeight:sel?700:400}),
  tag:(col)=>({background:col||C.blue,borderRadius:20,padding:"3px 9px",fontSize:10,fontWeight:700,display:"inline-block",marginRight:3,marginBottom:3}),
  modal:{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"},
  mbox:{background:C.card,borderRadius:"20px 20px 0 0",padding:18,width:"100%",maxWidth:430,maxHeight:"85vh",overflowY:"auto"},
};

const QUIZ_ONB=[{id:"gender",q:"Quel est ton sexe ?",type:"choice",opts:["Femme","Homme"]},{id:"age",q:"Quel est ton âge ?",type:"num",ph:"ex: 25",unit:"ans"},{id:"weight",q:"Quel est ton poids ?",type:"num",ph:"ex: 65",unit:"kg"},{id:"height",q:"Quelle est ta taille ?",type:"num",ph:"ex: 168",unit:"cm"},{id:"bodyFat",q:"Ta masse grasse estimée ?",type:"choice",opts:["< 15%","15-25%","25-35%","> 35%","Je ne sais pas"]},{id:"activity",q:"Ton niveau d'activité quotidienne ?",type:"choice",opts:["Sédentaire (bureau, peu de marche)","Légèrement actif (marche quotidienne)","Modérément actif (sport 2-3x/sem)","Très actif (sport 4-5x/sem)","Extrêmement actif (tous les jours)"]},{id:"goal",q:"Ton objectif principal ?",type:"choice",opts:["Perte de poids","Prise de muscle","Maintien du poids","Améliorer ma forme","Plusieurs objectifs"]},{id:"level",q:"Ton niveau sportif ?",type:"choice",opts:["Débutant (< 6 mois)","Intermédiaire (6 mois - 2 ans)","Avancé (> 2 ans)"]},{id:"sleep",q:"Combien d'heures dors-tu par nuit ?",type:"choice",opts:["< 5h","5-6h","6-7h","7-8h","> 8h"]},{id:"stress",q:"Ton niveau de stress ?",type:"choice",opts:["Faible","Modéré","Élevé","Très élevé"]},{id:"diet",q:"Ton type d'alimentation ?",type:"choice",opts:["Omnivore","Végétarien","Végétalien","Sans gluten","Autre"]},{id:"menstrual",q:"Activer le suivi du cycle menstruel ?",type:"choice",opts:["Oui","Non"],cond:(a)=>a.gender==="Femme"},];

export default function TRAKO(){
  const [screen,setScreen]=useState("splash");
  const [tab,setTab]=useState("home");
  const [prevTab,setPrevTab]=useState("home");
  const [authMode,setAuthMode]=useState("login");
  const [user,setUser]=useState(null);
  const [profile,setProfile]=useState(null);
  const [qStep,setQStep]=useState(0);
  const [qAns,setQAns]=useState({});
  const [water,setWater]=useState(0);
  const [friends,setFriends]=useState([]);
  const [fInp,setFInp]=useState("");
  const [showAddFriend,setShowAddFriend]=useState(false);
  // Workout
  const [exSearch,setExSearch]=useState("");
  const [selEx,setSelEx]=useState(null);
  const [programs,setPrograms]=useState([]);
  const [curProgram,setCurProgram]=useState(null);
  const [showNewProg,setShowNewProg]=useState(false);
  const [progName,setProgName]=useState("");
  const [progExs,setProgExs]=useState([]);
  const [workoutLog,setWorkoutLog]=useState([]);
  const [sessionSets,setSessionSets]=useState({});
  const [restTime,setRestTime]=useState(90);
  const [restLeft,setRestLeft]=useState(0);
  const [sessionActive,setSessionActive]=useState(false);
  const [sessionSecs,setSessionSecs]=useState(0);
  const [newRep,setNewRep]=useState({reps:"",weight:""});
  // Nutrition
  const [calories,setCalories]=useState([]);
  const [calInp,setCalInp]=useState({name:"",kcal:"",grams:"",per100:""});
  const [selMeal,setSelMeal]=useState(null);
  const [mealCat,setMealCat]=useState(null);
  const [aiMealQ,setAiMealQ]=useState("");
  const [aiMealR,setAiMealR]=useState("");
  const [aiLoading,setAiLoading]=useState(false);
  const [aiExQ,setAiExQ]=useState("");
  const [aiExR,setAiExR]=useState("");
  const [aiExLoading,setAiExLoading]=useState(false);
  const [weekLog,setWeekLog]=useState({});
  // Body
  const [weights,setWeights]=useState([{d:"01/01",w:"70"},{d:"15/01",w:"69.5"},{d:"01/02",w:"69"},{d:"15/02",w:"68.2"},{d:"01/03",w:"67.8"},{d:"01/04",w:"67.2"}]);
  const [wInp,setWInp]=useState("");
  const [hovW,setHovW]=useState(null);
  const [macroGoal,setMacroGoal]=useState("Maintien");
  // Sleep
  const [sleepBed,setSleepBed]=useState("22:30");
  const [sleepWake,setSleepWake]=useState("07:00");
  const [sleepMode,setSleepMode]=useState("bed");
  const [sleepRes,setSleepRes]=useState([]);
  const [sleepGoal,setSleepGoal]=useState(8);
  const [sleepLog,setSleepLog]=useState([{d:"Lun",h:7.5},{d:"Mar",h:6},{d:"Mer",h:8},{d:"Jeu",h:7},{d:"Ven",h:6.5},{d:"Sam",h:9},{d:"Dim",h:7.5}]);
  const [sleepInp,setSleepInp]=useState("");
  // Cycle
  const [cycleStartDate,setCycleStartDate]=useState("");
  const [cycleLength,setCycleLength]=useState(28);
  const [periodLength,setPeriodLength]=useState(5);
  const [selPhase,setSelPhase]=useState(null);
  // Learn
  const [selCourse,setSelCourse]=useState(null);
  const [quizMode,setQuizMode]=useState(false);
  const [quizStep,setQuizStep]=useState(0);
  const [quizAns,setQuizAns]=useState([]);
  const [quizDone,setQuizDone]=useState(false);
  const [scores,setScores]=useState({});
  const [authD,setAuthD]=useState({email:"",password:"",pseudo:""});
  const [showCGU,setShowCGU]=useState(false);
  const [geminiKey,setGeminiKey]=useState("");
  const [geminiKeyInput,setGeminiKeyInput]=useState("");
  const [showKeySetup,setShowKeySetup]=useState(false);

  const scrollRef=useRef(null);
  const sessionRef=useRef(null);
  const restRef=useRef(null);

  useEffect(()=>{setTimeout(()=>setScreen("auth"),2000);},[]);
  useEffect(()=>{if(tab!==prevTab){if(scrollRef.current)scrollRef.current.scrollTop=0;setPrevTab(tab);}},[ tab]);
  useEffect(()=>{if(sessionActive){sessionRef.current=setInterval(()=>setSessionSecs(s=>s+1),1000);}else{clearInterval(sessionRef.current);}return()=>clearInterval(sessionRef.current);},[sessionActive]);
  useEffect(()=>{if(restLeft>0){restRef.current=setTimeout(()=>setRestLeft(r=>r-1),1000);}return()=>clearTimeout(restRef.current);},[restLeft]);

  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const totalCal=calories.reduce((s,c)=>s+parseInt(c.kcal||0),0);
  const tdee=calcTDEE(profile);
  const macros=calcMacros(tdee,macroGoal);
  const waterGoalL=profile?Math.round(parseFloat(profile.weight||70)*0.033*10)/10:2;
  const waterL=(water*0.25).toFixed(2);
  const waterPct=Math.min((water*0.25/waterGoalL)*100,100);
  const filtQ=QUIZ_ONB.filter(q=>!q.cond||q.cond(qAns));
  const curQ=filtQ[qStep];
  const tip=DAILY_TIPS[new Date().getDay()%DAILY_TIPS.length];
  const motiv=MOTIVATIONS[new Date().getDate()%MOTIVATIONS.length];
  const bmi=profile?calcBMI(profile.weight||70,profile.height||170):null;
  const getPRs=()=>{const p={};workoutLog.forEach(w=>{if(!p[w.id]||parseFloat(w.weight)>parseFloat(p[w.id].weight))p[w.id]=w;});return p;};
  const prs=getPRs();
  const filtEx=EX.filter(e=>e.name.toLowerCase().includes(exSearch.toLowerCase())||e.p.toLowerCase().includes(exSearch.toLowerCase())||(e.s&&e.s.toLowerCase().includes(exSearch.toLowerCase()))||e.eq.toLowerCase().includes(exSearch.toLowerCase()));

  // Cycle calculations
  const cycleInfo=()=>{
    if(!cycleStartDate)return null;
    const start=new Date(cycleStartDate);
    const today=new Date();
    const diff=Math.floor((today-start)/(1000*60*60*24));
    const dayInCycle=((diff%cycleLength)+cycleLength)%cycleLength+1;
    const phaseIdx=getPhaseForDay(dayInCycle,cycleLength);
    const nextPeriod=new Date(start);
    let cycles=0;while(nextPeriod<=today){nextPeriod.setDate(nextPeriod.getDate()+cycleLength);cycles++;}
    const daysUntil=Math.floor((nextPeriod-today)/(1000*60*60*24));
    return{dayInCycle,phaseIdx,daysUntil,nextPeriod,totalCycles:cycles};
  };
  const ci=cycleInfo();

  const calcSleep=()=>{const src=sleepMode==="bed"?sleepBed:sleepWake;const[h,m]=src.split(":").map(Number);const res=[];for(let i=2;i<=6;i++){let total=sleepMode==="bed"?h*60+m+14+i*90:h*60+m-14-i*90;total=((total%1440)+1440)%1440;res.push({cycles:i,time:`${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`,dur:i*1.5,q:i>=5?"⭐⭐⭐":i===4?"⭐⭐":"⭐"});}setSleepRes(res);};

  const callGemini=async(prompt)=>{
    if(!geminiKey) return "❌ Clé API Gemini non configurée. Va dans ⚙️ Plus pour l'ajouter.";
    const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{maxOutputTokens:1000}})
    });
    const d=await res.json();
    if(d.error) return `❌ Erreur Gemini : ${d.error.message}`;
    return d.candidates?.[0]?.content?.parts?.[0]?.text||"Pas de réponse.";
  };

  const askAIMeal=async()=>{if(!aiMealQ.trim())return;setAiLoading(true);setAiMealR("");try{const r=await callGemini(`Tu es un nutritionniste sportif. Génère une recette fitness pour : "${aiMealQ}". Format compact : Nom, Ingrédients avec grammages, Étapes (max 4), Valeurs (kcal/P/G/L), 1 conseil du chef. En français, motivant.`);setAiMealR(r);}catch(e){setAiMealR("❌ Erreur. Vérifie ta clé API.");}setAiLoading(false);};
  const askAIEx=async()=>{if(!aiExQ.trim())return;setAiExLoading(true);setAiExR("");try{const r=await callGemini(`Tu es un coach sportif expert. L'utilisateur cherche : "${aiExQ}". Propose 8 exercices variés. Pour chaque : Nom, Muscles (principal + secondaires), Équipement, Séries/reps, Conseil d'exécution en 1 phrase. Format numéroté. En français.`);setAiExR(r);}catch(e){setAiExR("❌ Erreur. Vérifie ta clé API.");}setAiExLoading(false);};

  const addSet=(exId)=>{if(!newRep.reps)return;const entry={...EX.find(e=>e.id===exId)||{},...newRep,date:new Date().toLocaleDateString("fr-FR"),id:exId};setWorkoutLog(p=>[...p,entry]);setSessionSets(p=>({...p,[exId]:[...(p[exId]||[]),{...newRep,date:new Date().toLocaleDateString("fr-FR")}]}));setNewRep({reps:"",weight:""});setRestLeft(restTime);};

  if(screen==="splash")return(<div style={{...s.app,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}><div style={{fontSize:64,marginBottom:12}}>⚡</div><div style={{fontSize:48,fontWeight:900,letterSpacing:6}}>TRA<span style={{color:C.accent}}>KO</span></div><div style={{color:C.gray,marginTop:6,fontSize:12,letterSpacing:3}}>YOUR FITNESS JOURNEY</div></div>);
  if(showCGU)return(<div style={{...s.app,padding:18}}><button onClick={()=>setShowCGU(false)} style={{...s.btn("blue"),width:"auto",padding:"8px 14px",marginBottom:14}}>← Retour</button><h2 style={{color:C.accent,marginBottom:10}}>📄 CGU & Confidentialité</h2><div style={{...s.card,fontSize:12,lineHeight:1.8,color:C.gray}}><h3 style={{color:C.white}}>CGU — TRAKO</h3><p><strong style={{color:C.white}}>Responsable :</strong> Yasmine Hadjas • yasmine.hadjas10@gmail.com • Lille, France</p><h4 style={{color:C.white}}>RGPD</h4><p>Données collectées avec consentement, non revendues. Droit accès/suppression : yasmine.hadjas10@gmail.com — CNIL : www.cnil.fr</p></div></div>);

  if(screen==="auth")return(<div style={{...s.app,display:"flex",flexDirection:"column",padding:22,minHeight:"100vh",justifyContent:"center"}}><div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:48,fontWeight:900,letterSpacing:4}}>TRA<span style={{color:C.accent}}>KO</span></div><div style={{color:C.gray,fontSize:11,marginTop:4,letterSpacing:2}}>YOUR FITNESS JOURNEY</div></div><div style={{display:"flex",marginBottom:18,background:C.lightGray,borderRadius:12,padding:4}}>{["login","register"].map(m=>(<button key={m} onClick={()=>setAuthMode(m)} style={{flex:1,padding:"9px",borderRadius:10,border:"none",background:authMode===m?C.accent:"transparent",color:C.white,fontWeight:700,cursor:"pointer",fontSize:13}}>{m==="login"?"Connexion":"Inscription"}</button>))}</div>{authMode==="register"&&<input style={{...s.inp,marginBottom:10}} placeholder="Pseudo (visible par tes amis)" value={authD.pseudo} onChange={e=>setAuthD({...authD,pseudo:e.target.value})}/>}<input style={{...s.inp,marginBottom:10}} placeholder="Email" type="email" value={authD.email} onChange={e=>setAuthD({...authD,email:e.target.value})}/><input style={{...s.inp,marginBottom:18}} placeholder="Mot de passe" type="password" value={authD.password} onChange={e=>setAuthD({...authD,password:e.target.value})}/><button style={s.btn()} onClick={()=>{setUser({email:authD.email,pseudo:authD.pseudo||"Utilisateur"});setScreen(authMode==="register"?"quiz":"app");}}>{authMode==="login"?"Se connecter 🚀":"Créer mon compte ⚡"}</button><button onClick={()=>setShowCGU(true)} style={{background:"none",border:"none",color:C.gray,fontSize:11,marginTop:10,cursor:"pointer",textDecoration:"underline"}}>CGU & Politique de confidentialité</button></div>);

  if(screen==="quiz"){if(!curQ){setProfile(qAns);setScreen("app");return null;}return(<div style={{...s.app,padding:20,minHeight:"100vh",display:"flex",flexDirection:"column"}}><div style={{marginBottom:20}}><div style={{color:C.gray,fontSize:11,marginBottom:5}}>Question {qStep+1} / {filtQ.length}</div><div style={{height:4,background:C.lightGray,borderRadius:2}}><div style={{height:"100%",width:`${((qStep+1)/filtQ.length)*100}%`,background:C.accent,borderRadius:2,transition:"width 0.3s"}}/></div></div><h2 style={{fontSize:18,fontWeight:800,marginBottom:18,lineHeight:1.4}}>{curQ.q}</h2>{curQ.type==="choice"&&curQ.opts.map(opt=>(<button key={opt} style={s.cho(qAns[curQ.id]===opt)} onClick={()=>{const na={...qAns,[curQ.id]:opt};setQAns(na);setTimeout(()=>{const nf=QUIZ_ONB.filter(q=>!q.cond||q.cond(na));if(qStep+1>=nf.length){setProfile(na);setScreen("app");}else setQStep(qStep+1);},280);}}>{opt}</button>))}{curQ.type==="num"&&(<div><div style={{display:"flex",alignItems:"center",gap:8}}><input style={{...s.inp,flex:1}} type="number" placeholder={curQ.ph} value={qAns[curQ.id]||""} onChange={e=>setQAns({...qAns,[curQ.id]:e.target.value})}/><span style={{color:C.gray,minWidth:28}}>{curQ.unit}</span></div><button style={{...s.btn(),marginTop:14}} onClick={()=>{const nf=QUIZ_ONB.filter(q=>!q.cond||q.cond(qAns));if(qStep+1>=nf.length){setProfile(qAns);setScreen("app");}else setQStep(qStep+1);}}>Suivant →</button></div>)}{qStep>0&&<button onClick={()=>setQStep(qStep-1)} style={{background:"none",border:"none",color:C.gray,marginTop:10,cursor:"pointer",fontSize:13}}>← Retour</button>}</div>);}

  const TABS=[{id:"home",icon:"🏠",label:"Accueil"},{id:"workout",icon:"💪",label:"Sport"},{id:"nutrition",icon:"🍽️",label:"Nutrition"},{id:"body",icon:"📊",label:"Corps"},{id:"sleep",icon:"😴",label:"Sommeil"},{id:"cycle",icon:"🩸",label:"Cycle"},{id:"learn",icon:"🎓",label:"Cours"},{id:"more",icon:"⚙️",label:"Plus"}];

  return(
    <div style={s.app}>
      <div style={s.hdr}>
        <div style={{fontSize:20,fontWeight:900,letterSpacing:3}}>TRA<span style={{color:C.accent}}>KO</span></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:11,color:C.gray}}>@<span style={{color:C.white,fontWeight:700}}>{user?.pseudo}</span></span>
          <div style={{width:32,height:32,borderRadius:16,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{profile?.gender==="Femme"?"👩":"👨"}</div>
        </div>
      </div>

      <div ref={scrollRef} style={{overflowY:"auto",height:"calc(100vh - 108px)"}}>

        {/* HOME */}
        {tab==="home"&&(<div style={s.sec}>
          <div style={{...s.card,background:`linear-gradient(135deg,${C.darkBlue},${C.blue})`,border:`1px solid ${C.accent}`}}>
            <div style={{fontSize:11,color:C.accent,fontWeight:700,marginBottom:4}}>💬 MOTIVATION DU JOUR</div>
            <div style={{fontSize:15,fontWeight:700,lineHeight:1.5,color:C.white}}>{motiv}</div>
          </div>
          <div style={s.row}>
            <div style={{...s.card,flex:1,textAlign:"center"}}><div style={s.lbl}>Calories</div><div style={{fontSize:20,fontWeight:900}}>{totalCal}<span style={{fontSize:10,color:C.gray}}>/{tdee}</span></div><div style={{height:6,borderRadius:3,background:C.dark,overflow:"hidden"}}><div style={s.fill((totalCal/tdee)*100,totalCal>tdee?C.accent:C.success)}/></div></div>
            <div style={{...s.card,flex:1,textAlign:"center"}}><div style={s.lbl}>Eau</div><div style={{fontSize:20,fontWeight:900}}>{waterL}L<span style={{fontSize:10,color:C.gray}}>/{waterGoalL}</span></div><div style={{height:6,borderRadius:3,background:C.dark,overflow:"hidden"}}><div style={s.fill(waterPct,"#3498db")}/></div></div>
          </div>
          <div style={{...s.card,border:`1px solid ${C.accent}`}}>
            <div style={{fontSize:12,color:C.accent,fontWeight:800,marginBottom:6}}>💡 CONSEIL DU JOUR</div>
            <div style={{fontSize:14,color:C.white,lineHeight:1.7,fontWeight:500}}>{tip}</div>
          </div>
          {ci&&(<div style={{...s.card,border:`2px solid ${PHASES[ci.phaseIdx].color}`,cursor:"pointer"}} onClick={()=>setTab("cycle")}>
            <div style={s.lbl}>Cycle menstruel — Jour {ci.dayInCycle}</div>
            <div style={{fontWeight:800,color:PHASES[ci.phaseIdx].color,fontSize:15,marginBottom:3}}>{PHASES[ci.phaseIdx].name}</div>
            <div style={{fontSize:11,color:C.gray}}>Prochaines règles dans <span style={{color:C.white,fontWeight:700}}>{ci.daysUntil} jours</span> — Voir le détail →</div>
          </div>)}
          <div style={s.card}>
            <div style={s.lbl}>💧 Hydratation</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:24,fontWeight:900}}>{waterL}L</span>
              <span style={{color:C.gray,fontSize:11}}>{water} verres • obj. {waterGoalL}L</span>
            </div>
            <div style={{height:18,background:C.dark,borderRadius:9,overflow:"hidden",marginBottom:8,position:"relative"}}>
              <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${waterPct}%`,background:"linear-gradient(90deg,#1a6bc4,#3498db)",borderRadius:9,transition:"width 0.5s"}}/>
              <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:9,fontWeight:700,color:C.white,zIndex:1}}>{Math.round(waterPct)}%</div>
            </div>
            <div style={{display:"flex",gap:8}}><button style={{...s.btn("blue"),flex:1,marginBottom:0}} onClick={()=>setWater(Math.max(0,water-1))}>−</button><button style={{...s.btn(),flex:2,marginBottom:0}} onClick={()=>setWater(water+1)}>+ 1 verre 💧</button></div>
          </div>
          <div style={s.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={s.lbl}>👥 Mes amis</div>
              <button onClick={()=>setShowAddFriend(true)} style={{background:C.accent,border:"none",color:C.white,borderRadius:20,width:26,height:26,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
            {friends.length===0?(<div style={{textAlign:"center",padding:"12px 0",color:C.gray,fontSize:12}}><div style={{fontSize:28,marginBottom:6}}>👫</div>Ajoute tes amis avec le <span style={{color:C.accent,fontWeight:700}}>+</span> !</div>):friends.map((f,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:8,background:C.dark,borderRadius:10}}><div style={{width:36,height:36,borderRadius:18,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏃</div><div><div style={{fontWeight:700,fontSize:12}}>@{f.pseudo}</div><div style={{color:C.gray,fontSize:10}}>🏆 {f.pr||"Aucun PR encore"}</div></div></div>))}
          </div>
        </div>)}

        {/* WORKOUT */}
        {tab==="workout"&&(<div style={s.sec}>
          {selEx?(
            <div>
              <button onClick={()=>{setSelEx(null);setSessionActive(false);setSessionSecs(0);setRestLeft(0);}} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Exercices</button>
              <div style={s.card}>
                <div style={{fontSize:38,textAlign:"center",marginBottom:4}}>{selEx.emoji}</div>
                <h2 style={{textAlign:"center",marginBottom:4,fontSize:16}}>{selEx.name}</h2>
                <div style={{textAlign:"center",marginBottom:8}}><span style={s.tag(C.accent)}>💪 {selEx.p}</span>{selEx.s&&selEx.s!=="-"&&<span style={s.tag(C.blue)}>+ {selEx.s}</span>}<span style={s.tag(C.lightGray)}>{selEx.eq}</span></div>
                <div style={{background:C.dark,borderRadius:10,padding:10,marginBottom:10}}><div style={{color:C.accent,fontWeight:700,marginBottom:3,fontSize:11}}>📋 Exécution</div><div style={{color:C.gray,fontSize:12,lineHeight:1.7}}>{selEx.tips}</div></div>
                {/* Chrono */}
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1,background:C.dark,borderRadius:10,padding:8,textAlign:"center"}}><div style={{fontSize:10,color:C.gray}}>Durée séance</div><div style={{fontSize:22,fontWeight:900,color:sessionActive?C.success:C.gray}}>{fmt(sessionSecs)}</div></div>
                  <button style={{...s.btn(sessionActive?"":"green"),flex:1,marginBottom:0}} onClick={()=>setSessionActive(!sessionActive)}>{sessionActive?"⏸ Pause":"▶ Démarrer"}</button>
                </div>
                {/* Repos */}
                <div style={{marginBottom:10}}>
                  <div style={{fontSize:10,color:C.gray,marginBottom:5}}>⏱ Repos entre séries</div>
                  <div style={{display:"flex",gap:5}}>{[30,60,90,120].map(t=>(<button key={t} onClick={()=>setRestTime(t)} style={{flex:1,padding:"7px 0",border:"none",borderRadius:8,background:restTime===t?C.accent:C.lightGray,color:C.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>{t}s</button>))}</div>
                </div>
                {restLeft>0&&(<div style={{background:C.dark,borderRadius:10,padding:10,marginBottom:10,textAlign:"center"}}><div style={{color:C.accent,fontWeight:700,marginBottom:4}}>⏳ Repos : {restLeft}s</div><div style={{height:6,borderRadius:3,background:C.lightGray,overflow:"hidden"}}><div style={s.fill((restLeft/restTime)*100,"#3498db")}/></div></div>)}
                {/* Ajout série directement */}
                <div style={{fontSize:10,color:C.accent,fontWeight:700,marginBottom:6}}>➕ AJOUTER UNE SÉRIE</div>
                <div style={{display:"flex",gap:8,marginBottom:8}}><input style={{...s.inp,flex:1}} type="number" placeholder="Reps" value={newRep.reps} onChange={e=>setNewRep({...newRep,reps:e.target.value})}/><input style={{...s.inp,flex:1}} type="number" placeholder="Poids (kg)" value={newRep.weight} onChange={e=>setNewRep({...newRep,weight:e.target.value})}/></div>
                <button style={s.btn()} onClick={()=>addSet(selEx.id)}>✅ Enregistrer + Repos</button>
              </div>
              {/* Séries de la séance en cours */}
              {sessionSets[selEx.id]?.length>0&&(<div style={s.card}>
                <div style={s.lbl}>Séries de cette séance</div>
                {sessionSets[selEx.id].map((s2,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span style={{color:C.accent,fontWeight:700}}>Série {i+1}</span><span>{s2.reps} reps {s2.weight?`× ${s2.weight}kg`:""}</span></div>))}
              </div>)}
              {/* PR */}
              {prs[selEx.id]&&(<div style={{...s.card,border:`2px solid ${C.gold}`}}><div style={{color:C.gold,fontWeight:800,marginBottom:3}}>🏆 Ton record personnel</div><div style={{fontSize:22,fontWeight:900}}>{prs[selEx.id].weight||"—"}kg × {prs[selEx.id].reps} reps</div><div style={{color:C.gray,fontSize:10}}>le {prs[selEx.id].date}</div></div>)}
              {/* Toutes les performances */}
              {workoutLog.filter(w=>w.id===selEx.id).length>0&&(<div style={s.card}>
                <div style={s.lbl}>Toutes les performances</div>
                {workoutLog.filter(w=>w.id===selEx.id).slice().reverse().map((w,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:11}}><span style={{color:C.gray}}>{w.date}</span><span>{w.reps} reps {w.weight?`× ${w.weight}kg`:""}</span></div>))}
              </div>)}
            </div>
          ):curProgram?(
            <div>
              <button onClick={()=>setCurProgram(null)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Programmes</button>
              {/* Chrono séance */}
              <div style={{...s.card,display:"flex",gap:8,alignItems:"center"}}>
                <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:10,color:C.gray}}>Durée séance</div><div style={{fontSize:28,fontWeight:900,color:sessionActive?C.success:C.gray}}>{fmt(sessionSecs)}</div></div>
                <button style={{...s.btn(sessionActive?"":"green"),flex:1,marginBottom:0}} onClick={()=>setSessionActive(!sessionActive)}>{sessionActive?"⏸ Pause":"▶ Démarrer"}</button>
              </div>
              <div style={s.card}>
                <h2 style={{marginBottom:10,fontSize:16}}>{curProgram.name}</h2>
                {curProgram.exercises.map((ex,i)=>{
                  const exSets=sessionSets[ex.id]||[];
                  return(<div key={i} style={{...s.card,background:C.dark,marginBottom:8,padding:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}} onClick={()=>setSelEx(ex)}>
                      <span style={{fontSize:24}}>{ex.emoji}</span>
                      <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.white}}>{ex.name}</div><div style={{color:C.gray,fontSize:10}}>{ex.p}</div>{prs[ex.id]&&<div style={{color:C.gold,fontSize:10}}>🏆 PR: {prs[ex.id].weight||"—"}kg × {prs[ex.id].reps}</div>}</div>
                      <span style={{color:C.accent,fontSize:12}}>Détails →</span>
                    </div>
                    <div style={{display:"flex",gap:6,marginBottom:6}}><input style={{...s.inp,flex:1,padding:"7px 10px",fontSize:12}} type="number" placeholder="Reps" value={newRep.reps} onChange={e=>setNewRep({...newRep,reps:e.target.value})}/><input style={{...s.inp,flex:1,padding:"7px 10px",fontSize:12}} type="number" placeholder="kg" value={newRep.weight} onChange={e=>setNewRep({...newRep,weight:e.target.value})}/><button style={{background:C.accent,border:"none",color:C.white,borderRadius:8,padding:"7px 12px",fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={()=>addSet(ex.id)}>+</button></div>
                    {exSets.length>0&&<div style={{fontSize:10,color:C.gray}}>{exSets.map((s2,j)=>`S${j+1}: ${s2.reps}r${s2.weight?` ×${s2.weight}kg`:""}`).join(" | ")}</div>}
                    {restLeft>0&&<div style={{color:C.accent,fontSize:11,marginTop:4}}>⏳ Repos : {restLeft}s</div>}
                  </div>);
                })}
              </div>
            </div>
          ):showNewProg?(
            <div>
              <button onClick={()=>setShowNewProg(false)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Retour</button>
              <div style={s.card}>
                <div style={s.lbl}>Nom du programme</div>
                <input style={{...s.inp,marginBottom:12}} placeholder="Ex: Push Day, Full Body..." value={progName} onChange={e=>setProgName(e.target.value)}/>
                <div style={s.lbl}>Exercices ({progExs.length})</div>
                {progExs.length>0&&(<div style={{marginBottom:10}}>{progExs.map((ex,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span>{ex.emoji} {ex.name}</span><button onClick={()=>setProgExs(progExs.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:14}}>×</button></div>))}</div>)}
                <input style={{...s.inp,marginBottom:8}} placeholder="🔍 Ajouter un exercice..." value={exSearch} onChange={e=>setExSearch(e.target.value)}/>
                <div style={{maxHeight:220,overflowY:"auto"}}>{filtEx.filter(e=>!progExs.find(p=>p.id===e.id)).slice(0,20).map(ex=>(<button key={ex.id} onClick={()=>{setProgExs([...progExs,ex]);setExSearch("");}} style={{...s.card,width:"100%",display:"flex",gap:8,alignItems:"center",cursor:"pointer",border:"none",textAlign:"left",marginBottom:5,padding:8}}><span style={{fontSize:22}}>{ex.emoji}</span><div style={{flex:1}}><div style={{fontWeight:600,fontSize:12,color:C.white}}>{ex.name}</div><div style={{color:C.gray,fontSize:10}}>{ex.p}</div></div><span style={{color:C.success,fontSize:18}}>+</span></button>))}</div>
                <button style={{...s.btn(),marginTop:8}} onClick={()=>{if(progName&&progExs.length){setPrograms([...programs,{name:progName,exercises:progExs,id:Date.now()}]);setProgName("");setProgExs([]);setShowNewProg(false);}}}>💾 Enregistrer</button>
              </div>
            </div>
          ):(
            <div>
              <h2 style={{marginBottom:10,fontSize:17}}>💪 Sport</h2>
              <button style={s.btn()} onClick={()=>setShowNewProg(true)}>+ Créer un programme</button>
              {programs.length>0&&(<div style={s.card}><div style={s.lbl}>Mes programmes</div>{programs.map((p,i)=>(<button key={i} onClick={()=>{setCurProgram(p);setSessionSets({});setSessionSecs(0);setSessionActive(false);}} style={{...s.card,width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:"none",marginBottom:6,padding:10}}><div><div style={{fontWeight:700,fontSize:13,color:C.white}}>📋 {p.name}</div><div style={{color:C.gray,fontSize:10}}>{p.exercises.length} exercices</div></div><span style={{color:C.accent}}>›</span></button>))}</div>)}
              <div style={s.card}>
                <div style={{fontSize:11,color:C.accent,fontWeight:800,marginBottom:6}}>🤖 IA COACH</div>
                <input style={{...s.inp,marginBottom:7}} placeholder="Ex: épaules haltères, dos machine, fessiers..." value={aiExQ} onChange={e=>setAiExQ(e.target.value)}/>
                <button style={s.btn()} onClick={askAIEx} disabled={aiExLoading}>{aiExLoading?"⏳ Recherche...":"🔍 Trouver des exercices"}</button>
                {aiExR&&<div style={{background:C.dark,borderRadius:10,padding:10,fontSize:11,color:C.gray,lineHeight:1.8,whiteSpace:"pre-wrap",marginTop:4}}>{aiExR}</div>}
              </div>
              <div style={s.lbl}>Base ({EX.length} exercices)</div>
              <input style={{...s.inp,marginBottom:10}} placeholder="🔍 Nom, muscle, équipement..." value={exSearch} onChange={e=>setExSearch(e.target.value)}/>
              {exSearch&&<div style={{color:C.accent,fontSize:11,marginBottom:8,fontWeight:700}}>{filtEx.length} trouvé(s)</div>}
              {filtEx.map(ex=>(<button key={ex.id} onClick={()=>setSelEx(ex)} style={{...s.card,width:"100%",display:"flex",alignItems:"center",gap:10,cursor:"pointer",border:"none",textAlign:"left",marginBottom:6,padding:10}}><span style={{fontSize:28}}>{ex.emoji}</span><div style={{flex:1}}><div style={{fontWeight:700,color:C.white,fontSize:13}}>{ex.name}</div><div style={{fontSize:10,marginTop:2}}><span style={s.tag(C.accent)}>{ex.p}</span>{ex.s&&ex.s!=="-"&&<span style={s.tag(C.blue)}>+{ex.s}</span>}<span style={s.tag(C.lightGray)}>{ex.eq}</span></div>{prs[ex.id]&&<div style={{color:C.gold,fontSize:10,marginTop:2}}>🏆 {prs[ex.id].weight||"—"}kg</div>}</div><span style={{color:C.accent,fontSize:16}}>›</span></button>))}
            </div>
          )}
        </div>)}

        {/* NUTRITION */}
        {tab==="nutrition"&&(<div style={s.sec}>
          {selMeal?(<div>
            <button onClick={()=>setSelMeal(null)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Retour</button>
            <img src={selMeal.img} alt={selMeal.name} style={{width:"100%",height:170,objectFit:"cover",borderRadius:14,marginBottom:10}} onError={e=>e.target.style.display="none"}/>
            <div style={s.card}><h2 style={{marginBottom:6,fontSize:17}}>{selMeal.name}</h2><div style={{marginBottom:10,display:"flex",flexWrap:"wrap",gap:4}}><span style={s.tag(C.accent)}>{selMeal.cal} kcal</span><span style={s.tag("#1a4a3a")}>P:{selMeal.p}g</span><span style={s.tag(C.blue)}>G:{selMeal.c}g</span><span style={s.tag("#4a3a1a")}>L:{selMeal.f}g</span><span style={s.tag(C.lightGray)}>⏱ {selMeal.time}</span></div><div style={s.lbl}>🛒 Ingrédients</div><div style={{color:C.gray,fontSize:12,marginBottom:10,lineHeight:1.7}}>{selMeal.ing}</div><div style={s.lbl}>📝 Recette</div><div style={{color:C.gray,fontSize:12,lineHeight:1.8,marginBottom:10}}>{selMeal.recipe}</div><div style={{background:C.dark,borderRadius:10,padding:10}}><div style={{color:C.gold,fontWeight:700,fontSize:11,marginBottom:3}}>👨‍🍳 Conseil du chef</div><div style={{color:C.gray,fontSize:12}}>{selMeal.chef}</div></div></div>
          </div>):mealCat?(<div>
            <button onClick={()=>setMealCat(null)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Catégories</button>
            <h2 style={{marginBottom:10,fontSize:16}}>{mealCat}</h2>
            {MEAL_CATS[mealCat].map((m,i)=>(<button key={i} onClick={()=>setSelMeal(m)} style={{...s.card,width:"100%",display:"flex",gap:10,alignItems:"center",cursor:"pointer",border:"none",textAlign:"left",marginBottom:8,padding:10}}><img src={m.img} alt={m.name} style={{width:54,height:54,borderRadius:10,objectFit:"cover"}} onError={e=>e.target.style.display="none"}/><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.white}}>{m.name}</div><div style={{fontSize:10,color:C.gray,marginTop:2}}>{m.cal} kcal • P:{m.p}g • ⏱{m.time}</div></div><span style={{color:C.accent}}>›</span></button>))}
          </div>):(<div>
            <div style={s.card}><div style={s.lbl}>🍽️ Calories du jour</div><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:24,fontWeight:900}}>{totalCal} kcal</span><span style={{color:C.gray,fontSize:11,alignSelf:"flex-end"}}>/ {tdee} kcal</span></div><div style={{height:6,borderRadius:3,background:C.dark,overflow:"hidden",marginBottom:5}}><div style={s.fill((totalCal/tdee)*100,totalCal>tdee?C.accent:C.success)}/></div><div style={{color:C.gray,fontSize:10}}>Restant : {Math.max(0,tdee-totalCal)} kcal</div></div>
            <div style={s.card}><div style={s.lbl}>Ajouter un aliment</div><input style={{...s.inp,marginBottom:7}} placeholder="Nom de l'aliment" value={calInp.name} onChange={e=>setCalInp({...calInp,name:e.target.value})}/><div style={{display:"flex",gap:7,marginBottom:7}}><input style={{...s.inp,flex:1}} placeholder="Grammage (g)" type="number" value={calInp.grams} onChange={e=>{const g=e.target.value;const k=g&&calInp.per100?Math.round(parseInt(g)*parseInt(calInp.per100)/100):"";setCalInp({...calInp,grams:g,kcal:k||calInp.kcal});}}/><input style={{...s.inp,flex:1}} placeholder="kcal/100g" type="number" value={calInp.per100} onChange={e=>{const p=e.target.value;const k=calInp.grams&&p?Math.round(parseInt(calInp.grams)*parseInt(p)/100):"";setCalInp({...calInp,per100:p,kcal:k||calInp.kcal});}}/></div><input style={{...s.inp,marginBottom:7}} placeholder="Calories totales (kcal)" type="number" value={calInp.kcal} onChange={e=>setCalInp({...calInp,kcal:e.target.value})}/><div style={{display:"flex",gap:7}}><button style={{...s.btn(),flex:2,marginBottom:0}} onClick={()=>{if(calInp.name&&calInp.kcal){setCalories([...calories,{...calInp,date:new Date().toLocaleDateString("fr-FR")}]);setCalInp({name:"",kcal:"",grams:"",per100:""});}}}>+ Ajouter</button><button style={{...s.btn("blue"),flex:1,marginBottom:0}} onClick={()=>{if(calories.length){const t=new Date().toLocaleDateString("fr-FR");setWeekLog(p=>({...p,[t]:[...(p[t]||[]),...calories]}));}}}>💾</button></div></div>
            {calories.length>0&&(<div style={s.card}><div style={s.lbl}>Aujourd'hui</div>{calories.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:11}}><span>{c.name} {c.grams?`(${c.grams}g)`:""}</span><span style={{color:C.accent,fontWeight:700}}>{c.kcal} kcal</span></div>))}</div>)}
            <div style={s.card}><div style={{fontSize:11,color:C.accent,fontWeight:800,marginBottom:6}}>🤖 IA CHEF</div><input style={{...s.inp,marginBottom:7}} placeholder="Ex: goûter protéiné, dîner léger..." value={aiMealQ} onChange={e=>setAiMealQ(e.target.value)}/><button style={s.btn()} onClick={askAIMeal} disabled={aiLoading}>{aiLoading?"⏳ Génération...":"✨ Générer une recette"}</button>{aiMealR&&<div style={{background:C.dark,borderRadius:10,padding:10,fontSize:11,color:C.gray,lineHeight:1.7,whiteSpace:"pre-wrap",marginTop:4}}>{aiMealR}</div>}</div>
            <div style={s.card}><div style={s.lbl}>📚 Recettes par catégorie</div>{Object.keys(MEAL_CATS).map(cat=>(<button key={cat} onClick={()=>setMealCat(cat)} style={{...s.card,width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:"none",marginBottom:6,padding:10}}><div><div style={{fontWeight:700,fontSize:14,color:C.white}}>{cat}</div><div style={{color:C.gray,fontSize:10}}>{MEAL_CATS[cat].length} recettes</div></div><span style={{color:C.accent,fontSize:16}}>›</span></button>))}</div>
          </div>)}
        </div>)}

        {/* BODY */}
        {tab==="body"&&(<div style={s.sec}>
          {!profile?(<div style={{textAlign:"center",padding:"40px 20px",color:C.gray}}><div style={{fontSize:40,marginBottom:10}}>📊</div><div style={{fontSize:14,marginBottom:16}}>Complète le quiz pour voir tes stats !</div><button style={s.btn()} onClick={()=>setScreen("quiz")}>Commencer le quiz</button></div>):(
            <>
              <div style={s.row}>
                <div style={{...s.card,flex:1,textAlign:"center"}}><div style={s.lbl}>IMC</div><div style={{fontSize:28,fontWeight:900,color:bmi<18.5?"#3498db":bmi<25?C.success:bmi<30?"#f39c12":C.accent}}>{bmi}</div><div style={{fontSize:9,color:C.gray,marginTop:2}}>{bmi<18.5?"Insuffisant":bmi<25?"Normal ✅":bmi<30?"Surpoids":"Obésité"}</div></div>
                <div style={{...s.card,flex:1,textAlign:"center"}}><div style={s.lbl}>TDEE</div><div style={{fontSize:24,fontWeight:900}}>{tdee}</div><div style={{fontSize:9,color:C.gray}}>kcal/jour</div></div>
              </div>
              <div style={{...s.card,border:`1px solid ${C.accent}`}}>
                <div style={{fontSize:12,color:C.accent,fontWeight:800,marginBottom:8}}>🧮 TDEE & MACROS</div>
                <div style={{display:"flex",gap:6,marginBottom:10}}>{["Sèche","Maintien","Prise de masse"].map(g=>(<button key={g} onClick={()=>setMacroGoal(g)} style={{flex:1,padding:"8px 4px",border:"none",borderRadius:10,background:macroGoal===g?C.accent:C.lightGray,color:C.white,fontSize:10,fontWeight:macroGoal===g?700:400,cursor:"pointer"}}>{g}</button>))}</div>
                <div style={{background:C.dark,borderRadius:10,padding:10,marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:C.gray,fontSize:11}}>Calories objectif</span><span style={{color:C.accent,fontWeight:900,fontSize:16}}>{macros.cal} kcal</span></div>
                  <div style={{height:1,background:C.lightGray,marginBottom:8}}/>
                  {[["🥩 Protéines",macros.p,"g","#2ecc71"],[" 🌾 Glucides",macros.g,"g","#f39c12"],["🫒 Lipides",macros.l,"g","#9b59b6"]].map(([n,v,u,col])=>(<div key={n} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:C.gray}}>{n}</span><span style={{fontWeight:700,color:col,fontSize:14}}>{v}{u}/jour</span></div>))}
                </div>
                <div style={{fontSize:10,color:C.gray,lineHeight:1.6}}>{macroGoal==="Sèche"&&"🔥 Déficit 400 kcal. Protéines élevées pour préserver le muscle."}{macroGoal==="Maintien"&&"⚖️ Équilibre parfait pour la recomposition corporelle."}{macroGoal==="Prise de masse"&&"💪 Surplus 250 kcal. Plus de glucides pour soulever lourd et récupérer."}</div>
              </div>
              <div style={s.card}>
                <div style={s.lbl}>📈 Évolution du poids</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:3,height:80,marginBottom:8,overflowX:"auto",paddingBottom:4}}>
                  {weights.map((w,i)=>{const vals=weights.map(x=>parseFloat(x.w));const max=Math.max(...vals),min=Math.min(...vals);const h=((parseFloat(w.w)-min)/(max-min+0.1))*60+18;return(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:36,cursor:"pointer"}} onClick={()=>setHovW(hovW===i?null:i)}><div style={{height:h,background:i===weights.length-1?C.accent:hovW===i?"#f39c12":C.blue,borderRadius:"3px 3px 0 0",width:"100%"}}/><div style={{fontSize:7,color:C.gray,marginTop:2}}>{w.d}</div></div>);})}
                </div>
                {hovW!==null&&weights[hovW]&&(<div style={{background:C.dark,borderRadius:8,padding:8,fontSize:11,color:C.gray,marginBottom:8}}>📅 {weights[hovW].d} • ⚖️ {weights[hovW].w}kg{weights[hovW].cal?` • 🍽️ ${weights[hovW].cal}kcal`:""}</div>)}
                <div style={{display:"flex",gap:7}}><input style={{...s.inp,flex:1}} placeholder="Nouveau poids (kg)" type="number" value={wInp} onChange={e=>setWInp(e.target.value)}/><button style={{...s.btn(),width:"auto",padding:"9px 12px",marginBottom:0}} onClick={()=>{if(wInp){setWeights([...weights,{d:new Date().toLocaleDateString("fr-FR").slice(0,5),w:wInp,cal:totalCal||undefined}]);setWInp("");}}}>+</button></div>
              </div>
            </>
          )}
        </div>)}

        {/* SLEEP */}
        {tab==="sleep"&&(<div style={s.sec}>
          <div style={s.card}><div style={s.lbl}>😴 Calculateur de cycles</div><div style={{display:"flex",gap:7,marginBottom:10}}><button style={{...s.btn(sleepMode==="bed"?"red":"blue"),flex:1,marginBottom:0}} onClick={()=>{setSleepMode("bed");setSleepRes([]);}}>Je me couche à</button><button style={{...s.btn(sleepMode==="wake"?"red":"blue"),flex:1,marginBottom:0}} onClick={()=>{setSleepMode("wake");setSleepRes([]);}}>Je me lève à</button></div><input type="time" value={sleepMode==="bed"?sleepBed:sleepWake} onChange={e=>sleepMode==="bed"?setSleepBed(e.target.value):setSleepWake(e.target.value)} style={{...s.inp,marginBottom:8}}/><button style={s.btn()} onClick={calcSleep}>Calculer ⚡</button>{sleepRes.map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:C.dark,borderRadius:8,marginBottom:5}}><div><span style={{fontSize:18,fontWeight:900,color:r.cycles>=5?C.success:C.white}}>{r.time}</span><span style={{color:C.gray,fontSize:10,marginLeft:7}}>{r.cycles} cycles • {r.dur}h</span></div><span>{r.q}</span></div>))}</div>
          <div style={s.card}><div style={s.lbl}>🎯 Objectif</div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><button onClick={()=>setSleepGoal(Math.max(5,sleepGoal-0.5))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:8,width:32,height:32,fontSize:18,cursor:"pointer"}}>−</button><div style={{textAlign:"center",flex:1}}><div style={{fontSize:28,fontWeight:900,color:C.success}}>{sleepGoal}h</div><div style={{fontSize:10,color:C.gray}}>par nuit</div></div><button onClick={()=>setSleepGoal(Math.min(12,sleepGoal+0.5))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:8,width:32,height:32,fontSize:18,cursor:"pointer"}}>+</button></div><div style={{background:C.dark,borderRadius:10,padding:8,fontSize:12,color:C.white}}>{sleepGoal<6?"⚠️ Trop peu ! Fatigue chronique et baisse de testostérone.":sleepGoal<=9?"✅ Zone optimale ! Récupération et performance au max.":"ℹ️ Bien, mais plus de 9h peut indiquer un manque de qualité."}</div></div>
          <div style={s.card}><div style={s.lbl}>Ajouter une nuit</div><div style={{display:"flex",gap:7}}><input style={{...s.inp,flex:1}} placeholder="Durée (ex: 7.5)" type="number" step="0.5" value={sleepInp} onChange={e=>setSleepInp(e.target.value)}/><button style={{...s.btn(),width:"auto",padding:"9px 12px",marginBottom:0}} onClick={()=>{if(sleepInp){const days=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];setSleepLog(p=>[...p,{d:days[p.length%7],h:parseFloat(sleepInp)}]);setSleepInp("");}}}>+</button></div></div>
          <div style={s.card}><div style={s.lbl}>📊 Graphique</div><div style={{display:"flex",alignItems:"flex-end",gap:5,height:80,marginBottom:8}}>{sleepLog.slice(-7).map((d,i)=>{const col=d.h>=sleepGoal?C.success:d.h>=6?"#f39c12":C.accent;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{fontSize:8,color:C.white,marginBottom:2}}>{d.h}h</div><div style={{height:(d.h/12)*70,background:col,borderRadius:"3px 3px 0 0",width:"100%",minHeight:4}}/><div style={{fontSize:8,color:C.gray,marginTop:2}}>{d.d}</div></div>);})}</div><div style={{display:"flex",gap:10,fontSize:10}}><span style={{color:C.success}}>■ Objectif</span><span style={{color:"#f39c12"}}>■ Correct</span><span style={{color:C.accent}}>■ Insuffisant</span></div></div>
          <div style={s.card}><div style={s.lbl}>💡 Conseils pour bien dormir</div>{SLEEP_TIPS.map((t,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:10,padding:9,background:C.dark,borderRadius:10}}><span style={{fontSize:20}}>{t.icon}</span><div><div style={{fontWeight:700,fontSize:12,marginBottom:2}}>{t.title}</div><div style={{color:C.gray,fontSize:11,lineHeight:1.6}}>{t.desc}</div></div></div>))}</div>
        </div>)}

        {/* CYCLE */}
        {tab==="cycle"&&(<div style={s.sec}>
          {selPhase?(
            <div>
              <button onClick={()=>setSelPhase(null)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Cycle</button>
              <div style={{...s.card,border:`2px solid ${selPhase.color}`}}>
                <div style={{fontSize:44,textAlign:"center",marginBottom:6}}>{selPhase.name.split(" ")[0]}</div>
                <h2 style={{textAlign:"center",fontSize:18,color:selPhase.color,marginBottom:6}}>{selPhase.name}</h2>
                <div style={{fontSize:12,color:C.gray,lineHeight:1.7,marginBottom:12,textAlign:"center"}}>{selPhase.desc}</div>
                <div style={s.lbl}>💪 Sport recommandé</div>
                {selPhase.sport.map((s2,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span style={{color:C.success}}>✅</span><span>{s2}</span></div>))}
                <div style={{...s.lbl,marginTop:12}}>🚫 À éviter</div>
                {selPhase.sportEvoid.map((s2,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span style={{color:C.accent}}>⚠️</span><span>{s2}</span></div>))}
                <div style={{...s.lbl,marginTop:12}}>🍽️ Nutrition</div>
                {selPhase.nutrition.map((n,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span>🥗</span><span style={{color:C.gray}}>{n}</span></div>))}
                <div style={{...s.lbl,marginTop:12}}>🔬 Ce qui se passe dans ton corps</div>
                {selPhase.body.map((b,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${C.dark}`,fontSize:12}}><span>📍</span><span style={{color:C.gray}}>{b}</span></div>))}
                <div style={{...s.card,background:C.dark,marginTop:12,border:`1px solid ${selPhase.color}`}}>
                  <div style={{color:selPhase.color,fontWeight:700,fontSize:12,marginBottom:4}}>💡 Conseil</div>
                  <div style={{color:C.gray,fontSize:12,lineHeight:1.7}}>{selPhase.conseil}</div>
                </div>
              </div>
            </div>
          ):(
            <div>
              <h2 style={{marginBottom:5,fontSize:17}}>🩸 Cycle Menstruel</h2>
              <div style={{color:C.gray,fontSize:12,marginBottom:14,lineHeight:1.6}}>Comprends ton corps et optimise tes entraînements et ta nutrition selon ta phase.</div>

              {/* Config du cycle */}
              <div style={s.card}>
                <div style={s.lbl}>⚙️ Configuration de ton cycle</div>
                <div style={{marginBottom:8}}>
                  <div style={{fontSize:11,color:C.gray,marginBottom:4}}>Date de début des dernières règles</div>
                  <input type="date" value={cycleStartDate} onChange={e=>setCycleStartDate(e.target.value)} style={{...s.inp}}/>
                </div>
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:C.gray,marginBottom:4}}>Durée du cycle (jours)</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><button onClick={()=>setCycleLength(Math.max(21,cycleLength-1))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:6,width:28,height:28,fontSize:16,cursor:"pointer"}}>−</button><span style={{fontWeight:700,fontSize:16,minWidth:24,textAlign:"center"}}>{cycleLength}</span><button onClick={()=>setCycleLength(Math.min(35,cycleLength+1))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:6,width:28,height:28,fontSize:16,cursor:"pointer"}}>+</button></div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,color:C.gray,marginBottom:4}}>Durée des règles (jours)</div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}><button onClick={()=>setPeriodLength(Math.max(2,periodLength-1))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:6,width:28,height:28,fontSize:16,cursor:"pointer"}}>−</button><span style={{fontWeight:700,fontSize:16,minWidth:24,textAlign:"center"}}>{periodLength}</span><button onClick={()=>setPeriodLength(Math.min(8,periodLength+1))} style={{background:C.lightGray,border:"none",color:C.white,borderRadius:6,width:28,height:28,fontSize:16,cursor:"pointer"}}>+</button></div>
                  </div>
                </div>
              </div>

              {/* Infos actuelles */}
              {ci&&(<div style={{...s.card,border:`2px solid ${PHASES[ci.phaseIdx].color}`}}>
                <div style={s.lbl}>Aujourd'hui — Jour {ci.dayInCycle} / {cycleLength}</div>
                <div style={{fontWeight:900,color:PHASES[ci.phaseIdx].color,fontSize:20,marginBottom:4}}>{PHASES[ci.phaseIdx].name}</div>
                <div style={{fontSize:12,color:C.gray,marginBottom:10}}>{PHASES[ci.phaseIdx].desc}</div>
                <div style={{background:C.dark,borderRadius:10,padding:10,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:C.gray}}>🩸 Prochaines règles</span><span style={{fontWeight:700,color:C.accent}}>{ci.daysUntil === 0 ? "Aujourd'hui !" : `Dans ${ci.daysUntil} jours`}</span></div>
                  <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:C.gray}}>📅 Date estimée</span><span style={{fontWeight:600,fontSize:12}}>{ci.nextPeriod.toLocaleDateString("fr-FR")}</span></div>
                </div>
                <button style={s.btn()} onClick={()=>setSelPhase(PHASES[ci.phaseIdx])}>Voir les conseils détaillés →</button>
              </div>)}

              {/* Graphique du cycle */}
              {ci&&(<div style={s.card}>
                <div style={s.lbl}>📊 Graphique du cycle ({cycleLength} jours)</div>
                <div style={{display:"flex",height:50,borderRadius:10,overflow:"hidden",marginBottom:10}}>
                  {PHASES.map((ph,i)=>{
                    const widths=[5,8,3,cycleLength-16];
                    const w=(widths[i]/cycleLength)*100;
                    const isActive=ci.phaseIdx===i;
                    return(<div key={i} style={{width:`${w}%`,background:ph.color,opacity:isActive?1:0.4,display:"flex",alignItems:"center",justifyContent:"center",transition:"opacity 0.3s",cursor:"pointer",position:"relative"}} onClick={()=>setSelPhase(ph)}>
                      {isActive&&<div style={{position:"absolute",top:-8,left:"50%",transform:"translateX(-50%)",fontSize:16}}>▼</div>}
                    </div>);
                  })}
                </div>
                <div style={{display:"flex",marginBottom:8}}>
                  <div style={{flex:1,height:3,background:"#e63946",opacity:0.3,borderRadius:2}}/>
                  <div style={{height:3,background:"#e63946",width:2}}/>
                  <span style={{fontSize:9,color:C.gray,marginLeft:2}}>Jour {ci.dayInCycle}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {PHASES.map((ph,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:9}}><div style={{width:8,height:8,borderRadius:4,background:ph.color}}/><span style={{color:ci.phaseIdx===i?C.white:C.gray,fontWeight:ci.phaseIdx===i?700:400}}>{ph.name.split(" ").slice(1).join(" ")}</span></div>))}
                </div>
              </div>)}

              {/* Les 4 phases */}
              <div style={{...s.lbl,marginTop:4}}>Les 4 phases — Clique pour les détails</div>
              {PHASES.map((ph,i)=>(<button key={i} onClick={()=>setSelPhase(ph)} style={{...s.card,width:"100%",display:"flex",gap:12,alignItems:"center",cursor:"pointer",border:`2px solid ${ci?.phaseIdx===i?ph.color:"transparent"}`,textAlign:"left",marginBottom:8,padding:12}}>
                <div style={{width:44,height:44,borderRadius:22,background:ph.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{ph.name.split(" ")[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:14,color:ph.color,marginBottom:2}}>{ph.name}</div>
                  <div style={{fontSize:10,color:C.gray}}>Jours {ph.days[0]}-{ph.days[1]} • Sport : {ph.sport[0]}</div>
                  {ci?.phaseIdx===i&&<div style={{fontSize:10,color:C.white,fontWeight:600,marginTop:2}}>← Tu es ici</div>}
                </div>
                <span style={{color:C.accent,fontSize:16}}>›</span>
              </button>))}
            </div>
          )}
        </div>)}

        {/* LEARN */}
        {tab==="learn"&&(<div style={s.sec}>
          {selCourse&&quizMode?(
            <div>{quizDone?(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:56,marginBottom:10}}>🏆</div><div style={{fontSize:22,fontWeight:900,marginBottom:5}}>{quizAns.filter((a,i)=>a===selCourse.quiz[i].ans).length} / {selCourse.quiz.length}</div>{selCourse.quiz.map((q,i)=>(<div key={i} style={{...s.card,textAlign:"left",border:`1px solid ${quizAns[i]===q.ans?C.success:C.accent}`}}><div style={{fontSize:12,fontWeight:700,marginBottom:4}}>{q.q}</div><div style={{fontSize:11,color:quizAns[i]===q.ans?C.success:C.accent}}>{quizAns[i]===q.ans?"✅":"❌"} {q.opts[q.ans]}</div></div>))}<button style={s.btn()} onClick={()=>{const sc=quizAns.filter((a,i)=>a===selCourse.quiz[i].ans).length;setScores(p=>({...p,[selCourse.id]:Math.max(p[selCourse.id]||0,sc)}));setSelCourse(null);setQuizMode(false);setQuizDone(false);setQuizAns([]);setQuizStep(0);}}>← Retour</button></div>):(<div><div style={{color:C.gray,fontSize:11,marginBottom:8}}>Question {quizStep+1} / {selCourse.quiz.length}</div><div style={{height:4,background:C.lightGray,borderRadius:2,marginBottom:16}}><div style={{height:"100%",width:`${((quizStep+1)/selCourse.quiz.length)*100}%`,background:C.accent,borderRadius:2}}/></div><h3 style={{fontSize:16,marginBottom:16,lineHeight:1.4}}>{selCourse.quiz[quizStep].q}</h3>{selCourse.quiz[quizStep].opts.map((opt,i)=>(<button key={i} style={s.cho(false)} onClick={()=>{const na=[...quizAns,i];setQuizAns(na);if(quizStep+1>=selCourse.quiz.length){setQuizDone(true);}else setQuizStep(quizStep+1);}}>{opt}</button>))}</div>)}</div>
          ):selCourse?(<div><button onClick={()=>setSelCourse(null)} style={{...s.btn("blue"),width:"auto",padding:"7px 12px",marginBottom:12}}>← Cours</button><div style={s.card}><div style={{fontSize:44,textAlign:"center",marginBottom:6}}>{selCourse.emoji}</div><h2 style={{textAlign:"center",fontSize:17,marginBottom:4}}>{selCourse.title}</h2><div style={{textAlign:"center",marginBottom:12}}><span style={s.tag()}>{selCourse.level}</span><span style={s.tag(C.lightGray)}>⏱ {selCourse.duration}</span></div>{selCourse.content.map((c,i)=>(<div key={i} style={{marginBottom:14}}><div style={{color:C.accent,fontWeight:700,fontSize:13,marginBottom:5}}>{i+1}. {c.titre}</div><div style={{color:C.gray,fontSize:12,lineHeight:1.75}}>{c.texte}</div></div>))}</div><button style={s.btn()} onClick={()=>{setQuizMode(true);setQuizStep(0);setQuizAns([]);setQuizDone(false);}}>🧠 Faire le quiz</button></div>
          ):(<div>
            <h2 style={{marginBottom:5,fontSize:17}}>🎓 Cours & Apprentissage</h2>
            <div style={{color:C.accent,fontSize:13,fontWeight:600,marginBottom:14}}>Parfait pour la STAPS ! 💪</div>
            {Object.keys(scores).length>0&&(<div style={s.card}><div style={s.lbl}>🏆 Mes scores</div>{Object.entries(scores).map(([id,sc])=>{const course=COURSES.find(c=>c.id===parseInt(id));return course?(<div key={id} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.dark}`,fontSize:11}}><span>{course.emoji} {course.title}</span><span style={{color:C.gold,fontWeight:700}}>{sc}/{course.quiz.length}</span></div>):null;})}</div>)}
            {COURSES.map(course=>(<button key={course.id} onClick={()=>{setSelCourse(course);setQuizMode(false);}} style={{...s.card,width:"100%",display:"flex",gap:12,alignItems:"center",cursor:"pointer",border:"none",textAlign:"left",marginBottom:8,padding:12}}><span style={{fontSize:36}}>{course.emoji}</span><div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:C.white}}>{course.title}</div><div style={{fontSize:10,color:C.gray,marginTop:2}}>{course.level} • {course.duration}</div>{scores[course.id]!==undefined&&<div style={{color:C.gold,fontSize:10,marginTop:2}}>🏆 {scores[course.id]}/{course.quiz.length}</div>}</div><span style={{color:C.accent,fontSize:16}}>›</span></button>))}
          </div>)}
        </div>)}

        {/* MORE */}
        {tab==="more"&&(<div style={s.sec}>
          <div style={s.card}>
            <div style={s.lbl}>👤 Mon compte</div>
            <div style={{fontSize:12,marginBottom:4}}>Email : <span style={{color:C.gray}}>{user?.email}</span></div>
            <div style={{fontSize:12,marginBottom:12}}>Pseudo : <span style={{color:C.accent,fontWeight:700}}>@{user?.pseudo}</span></div>
            <button style={s.btn("blue")} onClick={()=>setShowCGU(true)}>📄 CGU & Confidentialité</button>
            <button style={s.btn()} onClick={()=>{setScreen("auth");setUser(null);setProfile(null);setTab("home");}}>Se déconnecter</button>
          </div>
          <div style={s.card}>
            <div style={s.lbl}>🤖 Clé API Gemini</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:10,height:10,borderRadius:5,background:geminiKey?C.success:C.accent,flexShrink:0}}/>
              <span style={{fontSize:12,color:geminiKey?C.success:C.accent,fontWeight:700}}>{geminiKey?"IA connectée ✅":"Clé non configurée ❌"}</span>
            </div>
            {geminiKey&&<div style={{fontSize:11,color:C.gray,marginBottom:8}}>Clé : ••••••••{geminiKey.slice(-4)}</div>}
            {showKeySetup?(
              <div>
                <div style={{fontSize:11,color:C.gray,marginBottom:6,lineHeight:1.6}}>
                  Obtiens ta clé gratuite sur <span style={{color:C.accent}}>aistudio.google.com</span> → Get API Key
                </div>
                <input
                  style={{...s.inp,marginBottom:8,fontFamily:"monospace",fontSize:11}}
                  placeholder="Colle ta clé Gemini ici (AIza...)"
                  value={geminiKeyInput}
                  onChange={e=>setGeminiKeyInput(e.target.value)}
                  type="password"
                />
                <div style={{display:"flex",gap:7}}>
                  <button style={{...s.btn("green"),flex:2,marginBottom:0}} onClick={()=>{if(geminiKeyInput.trim()){setGeminiKey(geminiKeyInput.trim());setGeminiKeyInput("");setShowKeySetup(false);}}}>✅ Enregistrer</button>
                  <button style={{...s.btn("blue"),flex:1,marginBottom:0}} onClick={()=>{setShowKeySetup(false);setGeminiKeyInput("");}}>Annuler</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",gap:7}}>
                <button style={{...s.btn(geminiKey?"blue":"red"),flex:1,marginBottom:0}} onClick={()=>setShowKeySetup(true)}>{geminiKey?"🔄 Changer la clé":"+ Ajouter ma clé"}</button>
                {geminiKey&&<button style={{...s.btn(),flex:1,marginBottom:0}} onClick={()=>setGeminiKey("")}>🗑️ Supprimer</button>}
              </div>
            )}
            <div style={{fontSize:10,color:C.gray,marginTop:8,lineHeight:1.6}}>
              🔒 Ta clé est stockée uniquement en mémoire locale, jamais dans le code.
            </div>
          </div>
        </div>)}

      </div>

      {showAddFriend&&(<div style={s.modal} onClick={()=>setShowAddFriend(false)}><div style={s.mbox} onClick={e=>e.stopPropagation()}><h3 style={{marginBottom:12}}>👥 Ajouter un ami</h3><input style={{...s.inp,marginBottom:10}} placeholder="Pseudo de ton ami" value={fInp} onChange={e=>setFInp(e.target.value)}/><button style={s.btn()} onClick={()=>{if(fInp){setFriends([...friends,{pseudo:fInp,pr:""}]);setFInp("");setShowAddFriend(false);}}}>Ajouter ✅</button><button style={s.btn("blue")} onClick={()=>setShowAddFriend(false)}>Annuler</button></div></div>)}

      <nav style={s.nav}>
        {TABS.map(t=>(<button key={t.id} style={s.nb(tab===t.id)} onClick={()=>setTab(t.id)}><span style={{fontSize:15}}>{t.icon}</span>{t.label}</button>))}
      </nav>
    </div>
  );
}
