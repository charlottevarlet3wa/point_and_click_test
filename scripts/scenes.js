import { items } from "./items.js";

export const scenes = {
  village: {
    background: "images/backgrounds/village.jpg",
    objects: [
      {
        id: "big_mushroom",
        base: "collectable",
        style: "top: 420px; left: 50px; width: 130px; height: 95px;",
        item: items[6],
      },
      {
        id: "medium_mushroom",
        base: "collectable",
        style: "top: 460px; left: 200px; width: 100px; height: 55px;",
        item: items[7],
      },
      {
        id: "small_mushroom",
        base: "collectable",
        style: "top: 530px; left: 210px; width: 55px; height: 50px;",
        item: items[8],
      },
      {
        id: "small_mushroom2",
        base: "collectable",
        style: "top: 520px; left: 130px; width: 70px; height: 70px;",
        item: items[8],
      },
      {
        id: "pink_flower",
        base: "collectable",
        style: "top: 520px; left: 10px; width: 90px; height: 60px;",
        item: items[0],
      },
      {
        id: "orange_flower",
        base: "collectable",
        style: "top: 485px; left: 310px; width: 70px; height: 50px;",
        item: items[2],
      },
      {
        id: "fountain",
        base: "fountain",
        style: "top: 390px; left: 310px; width: 100px; height: 50px;",
        message: "Une fontaine vide sur laquelle il est écrit quelque chose...",
        isClicked: false,
      },
      {
        id: "door_house",
        base: "door",
        style: "top: 330px; left: 520px; width: 50px; height: 70px;",
        targetScene: "house",
      },
      {
        id: "door-mineralogist",
        base: "door",
        style: "top:330px; left:385px; width: 40px; height: 60px;",
        message: "Porte de chez le minéralogiste verrouillée.",
        key: items[21],
        targetScene: "mineralogist",
      },
      {
        id: "door-herborist",
        base: "door",
        style: "top:330px; left:295px; width: 40px; height: 60px;",
        message: "Porte de chez l'herboriste verrouillée.",
        key: items[22],
        targetScene: "herborist",
      },
      {
        id: "door_potion",
        base: "door",
        style: "top: 340px; left: 460px; width: 40px; height: 50px;",
        message: "Porte verrouillée.",
        key: items[15],
        targetScene: "potion",
      },
      {
        id: "door-chief",
        base: "door",
        style: "top: 340px; left: 140px; width: 40px; height: 70px;",
        message: "Porte verrouillée.",
        key: items[30],
        targetScene: "chief",
      },
      {
        id: "door_library",
        base: "door",
        style: "top: 130px; left: 130px; width: 90px; height: 40px;",
        targetScene: "library",
      },
      {
        id: "enemy-1",
        base: "enemy",
        style: "right: 25px; top: 405px; cursor: cell;",
        hp: 3,
      },
      {
        id: "enemy-2",
        base: "enemy",
        style: "left: 230px; top: 390px; width: 50px; cursor: cell;",
        hp: 2,
      },
    ],
  },
  house: {
    background: "images/backgrounds/house.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px;top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "message-1",
        base: "message",
        style:
          "width: 25px; height: 30px; top: 390px; left: 310px; transform:rotate(15deg); background-color: beige; opacity: 1; border-radius: 0; box-shadow: 1px 1px 1px grey;",
        message: `Je suis partie récupérer des ingrédients pour ma nouvelle potion pousse-cheveux. N’oublie pas de nourrir le chat : 40g de croquettes par jour. Merci !`,
      },
      {
        id: "message-2",
        base: "message",
        style: "width: 80px; height: 90px; top: 280px; left: 330px;",
        message: `Notre réussite approche, mais le temps presse. Le Fléau revient tous les demi-siècles en moyenne. 
                      
                      Finalement, la plume de phénix était inutile.`,
      },
      {
        id: "door_kitchen",
        base: "door",
        style: "top: 300px; left: 490px; width: 70px; height: 120px",
        targetScene: "kitchen",
      },
      {
        id: "door_village",
        base: "door",
        style: "top: 290px; left: 160px; width: 60px; height: 100px",
        targetScene: "village",
      },
      {
        id: "hint_key",
        base: "uniqueCollectable",
        isCollected: false,
        style: "top: 510px; left: 210px; width: 200px; height: 80px;",
        item: items[14],
      },
    ],
  },
  potion: {
    background: "images/backgrounds/potionRoom.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "black-potion",
        base: "message",
        style: "width: 100px; height: 110px; top: 430px; left: 90px;",
        message: "Une mixture étrange.",
      },
      {
        id: "pink-potion",
        base: "pink_potion",
        style: "top: 369px; left: 86px; display: none;",
        item: items[20],
      },
      {
        id: "phoenix",
        base: "uniqueCollectable",
        style: "top: 110px; left: 10px; width: 100px; height: 150px;",
        item: items[9],
      },
      {
        id: "cauldron",
        base: "cauldron",
        style: "top: 160px; left: 200px; width: 230px; height: 250px;",
      },
    ],
  },
  kitchen: {
    background: "images/backgrounds/kitchen.jpg",
    objects: [
      {
        id: "balance_btn",
        base: "balance_btn",
        style: "top: 442px; left: 287px;display:none;",
        isClicked: false,
      },
      {
        id: "left_arrow",
        base: "door",
        style: "top:500px; left: 0px;",
        targetScene: "village",
      },
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px;top:3px; left: 3px;",
        targetScene: "house",
      },
    ],
  },
  forest: {
    background: "images/backgrounds/forest_dark.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
    ],
  },
  cave: {
    background: "images/backgrounds/cave.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px;top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "green-stone-1",
        base: "collectable",
        style: "top: 370px; left: 40px; width: 60px; height: 50px;",
        item: items[4],
      },
      {
        id: "green-stone-2",
        base: "collectable",
        style: "top: 490px; left: 140px; width: 80px; height: 60px;",
        item: items[4],
      },
      {
        id: "orange-stone-1",
        base: "collectable",
        style: "top: 455px; left: 315px; width: 52px; height: 40px;",
        item: items[3],
      },
      {
        id: "orange-stone-2",
        base: "collectable",
        style: "top: 480px; left: 400px; width: 60px; height: 60px;",
        item: items[3],
      },
      {
        id: "blue-stone-1",
        base: "collectable",
        style: "top: 535px; left: 35px; width: 65px; height: 55px;",
        item: items[5],
      },
      {
        id: "blue-stone-2",
        base: "collectable",
        style: "top: 400px; left: 425px; width: 100px; height: 65px;",
        item: items[5],
      },
    ],
  },
  library: {
    background: "images/backgrounds/library.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "book1",
        base: "message",
        style: "top: 180px; left: 210px; width: 50px; height: 100px;",
        message: `LITTERATURE : Le conte de la sorcière d'argent, réadapté`,
      },
      {
        id: "book_hint1",
        base: "message",
        style: "top: 180px; left: 265px; width: 60px; height: 100px;",
        message: `DIALECTES DE LA PLAINE DE VORNARS
                      Vornars est un lieu d'échanges où coexistent divers dialectes. 
                      Bien que certains paraissent intimidants au premier abord, ils sont étroitement liés. Les habitants ont pu développer un système de traduction efficace, grâce à des tables spécialement conçues pour faciliter la compréhension mutuelle. 
                      Il est fréquent, aujourd’hui, de changer de langue à chaque phrase.`,
      },
      {
        id: "door_village",
        base: "door",
        style: "top: 370px; left: 320px; width: 55px; height: 80px;",
        targetScene: "village",
      },
      {
        id: "writing_machine",
        base: "writing_machine",
        style: "left:100px; top: 430px; height: 40px; width: 60px",
        message: "top",
      },
      {
        id: "dialect-1",
        base: "uniqueCollectable",
        style: "left: 500px; top: 330px; width: 100px; height: 130px;",
        isCollected: false,
        item: items[16],
      },
      {
        id: "dialect-2",
        base: "uniqueCollectable",
        style: "top: 180px; left: 330px; width: 70px; height: 100px;",
        isCollected: false,
        item: items[17],
      },
      {
        id: "dialect-8",
        base: "uniqueCollectable",
        style: "left: 50px; top: 100px; width: 100px; height: 100px;",
        isCollected: false,
        item: items[18],
      },
    ],
  },
  herborist: {
    background: "images/backgrounds/herborist.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "message-1",
        base: "message",
        style: "height: 80px; width: 60px; top: 220px;",
        message: `J’ai donné une clé au chef, comme Hydr m’a donné la sienne. Il n’a pas été facile de le convaincre de financer mes voyages, et encore moins de lui avouer tout ce qui se tramait dans son dos. L’heure n’est plus à la concurrence entre les sciences, mais à la collaboration. Ensemble, on peut vaincre ce Fléau.`,
      },
      {
        id: "calendar",
        base: "calendar",
        style:
          "width:160px; height:50px;top:400px; left: -35px; transform:rotateZ(-25deg);",
      },
      {
        id: "flower-book-1",
        base: "message",
        style: "width: 100px; height: 130px; top: 300px; left: 320px;",
        message: `Jour 4126
  
  Les Fleurs de Lune :
  
  L'Astre-fleur et la Lune-d'ombre ne brillent qu'à l'écart des regards. 
  Durée de l’éclat après un regard : 1 minute.
  
  La fleur de la potion, plus délicate encore, brille peut-être en secret.`,
      },
      {
        id: "flower-book-2",
        base: "message",
        style: "width: 150px; height: 130px; top: 80px; left: 340px;",
        message: `Jour 4134
  
  Les Températures optimales
  
  Il semble que certaines plantes possèdent des propriétés si subtiles qu'elles ne se manifestent que dans des conditions rigoureusement précises. La Sélénite pourpre, par exemple, ne révèle ses vertus curatives qu'à une température exacte de 17 degrés.
  
  J’ai enfin fini Meteor, un bijou de technologie qui prédit les températures à la minute près. D’après mes calculs, une plante telle que la Fleur-Lumineuse peut apparaître entre 2h et 2h30, là où les températures sont les plus froides dans la Forêt hantée. 
                      `,
      },
      {
        id: "key-mineralogist",
        base: "uniqueCollectable",
        style:
          "width: 40px; height: 100px; transform:rotateZ(50deg);top:390px; left: 120px;",
        isCollected: false,
        item: items[21],
      },
    ],
  },
  mineralogist: {
    background: "images/backgrounds/mineralogist.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "message-1",
        base: "message",
        style: "height: 100px; width: 70px; left: 260px; top: 200px;",
        message: `Histoire du Fléau, p.147
                      
                      Après des siècles de peur, la pierre salvique représentait un nouvel espoir. Tout le village s’entraida pour construire un gigantesque abri. Une philosophie nouvelle émergeait : pourquoi combattre quand on pouvait se cacher le temps que les ombres s’amenuisent ? L’épidémie était devenue une maladie passagère.`,
      },
      {
        id: "crystal_chest",
        base: "crystal_chest",
        style: "width:248px; height:134px; top: 420px; left: 350px;",
      },
      {
        id: "stone-book-1",
        base: "uniqueCollectable",
        style: "width: 110px; height: 160px; left: 350px; top: 245px",
        isCollected: false,
        item: items[28],
      },
      {
        id: "stone-book-2",
        base: "uniqueCollectable",
        style:
          "width: 170px; height: 60px; left: 00px; top: 370px; transform: rotateZ(-13deg);",
        isCollected: false,
        item: items[29],
      },
      {
        id: "stone-book-3",
        base: "message",
        style: "width: 80px; height: 110px; right: 50px; top: 200px;",
        message: `Les Cristaux
  
  Les cristaux surpassent les pierres, beaucoup plus rares et dotées d'une quantité de magie bien plus élevée.
  
  Mon classement repose sur le type de magie que chaque élément renferme :
  Bleu : l'Air, la transformation.
  Rouge : le Feu, la destruction.
  Vert : la Terre, la création.
  Violet : les Ténèbres, le secret.`,
      },
      {
        id: "crystal-hint",
        base: "message",
        style: "width: 190px; height: 110px; left: 150px; top: 470px;",
        message: `Coffre de cristaux :
  
   1. Si la mmm (masse molaire magique) du Solium est de 18.9 , alors l’Altidée n’est pas la clé.
  
  2. Si la quantité magique d’1g de Lunaris est de 1mol, alors le Boat n’est pas la
  clé. 
  
  Soient A la bleue Altidée, B le vert Boat, et C le flamboyant Fyrite, les pierres trouvées dans la grotte située au Nord,
  3. Si non-A et non-B, alors C, et si non-B et non-C alors A, et si non-A et non-C alors B.`,
      },
      {
        id: "trophy",
        base: "trophy",
        style: "width: 30px; left: 50px; top: 260px;",
      },
      {
        id: "door",
        base: "door",
        style: "height: 120px; width: 60px; left: 190px; top: 270px;",
        targetScene: "village",
      },
    ],
  },
  chief: {
    background: "images/backgrounds/chief_house.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "message-1",
        base: "message",
        style: "width: 70px; top: 350px; left: 100px;",
        message: `AMANITES!
  
  75g: -100
  50g: -67
  25g: -34`,
      },
      {
        id: "message-2",
        base: "message",
        style: "height: 100px; width: 30px; top: 360px; left: 185px;",
        message: `Mon fils, tu as fait preuve de bravoure aujourd’hui. Mais il n’est pas encore temps pour toi d’être brave. C’est mon devoir de rester dehors, et ton devoir de te cacher. Un jour, c’est toi qui devras rester. 
  Ce jour-là, ne laisse aucun villageois sans protection. Tu feras un merveilleux chef, j’en suis certain.`,
      },
      {
        id: "herborist-chest",
        base: "herborist_chest",
        style: "width:80px; height: 75px; left: 520px; top: 400px;",
      },
      {
        id: "chief-book-1",
        base: "message",
        style: "width: 70px; height: 120px; left: 65px; top: 415px;",
        message: `(Dans un tiroir) 
                      Merci pour notre discussion. Je te confie ma clé au cas où. 
  
                      Sibilome < Estratan
                      Mercil > Sibilome
                      !(Mercil > Sibilome et Mercil > Estratan)
                      
                      ....... > ....... > .......`,
      },
      {
        id: "chief-mushrooms",
        base: "chief_mushrooms",
        style: "height: 100px; width: 80px; top: 310px; left: 380px;",
      },
      {
        id: "chief-book-2",
        base: "uniqueCollectable",
        style: "width: 120px; height: 140px; left: 470px; top: 245px",
        isCollected: false,
        item: items[27],
      },
    ],
  },
  flowers: {
    background: "images/backgrounds/forest_light.jpg",
    objects: [
      {
        id: "left_arrow",
        base: "arrow_door",
        style: "width: 40px; height: 40px; top:3px; left: 3px;",
        targetScene: "village",
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 400px; left: 25px; width: 70px; height: 70px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 420px; left: 85px; width: 50px; height: 50px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 430px; left: 160px; width: 60px; height: 60px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 470px; left: 35px; width: 80px; height: 80px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 490px; left: 130px; width: 50px; height: 50px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 370px; left: 480px; width: 50px; height: 50px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 360px; left: 550px; width: 60px; height: 60px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 420px; left: 530px; width: 50px; height: 50px; border-radius: 50%;",
        item: items[23],
      },
      {
        id: "flower",
        base: "collectable",
        style:
          "top: 380px; left: 200px; width: 50px; height: 50px; border-radius: 50%;",
        item: items[23],
      },
    ],
  },
};
