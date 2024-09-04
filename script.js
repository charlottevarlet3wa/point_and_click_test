// game.js

    const container = document.getElementById('game-container');

    const inventoryIcon = document.getElementById('inventory-icon');
    const inventoryContainer = document.getElementById('inventory-container');
    const inventoryList = document.getElementById('inventory-list');

    const mapIcon = document.getElementById('map-icon');
    const mapContainer = document.getElementById('map-container');
    const hotspots = document.querySelectorAll('.hotspot');

    // Machines
    const weighingMachine = document.getElementById('weighing-machine');
    const writingMachine = document.getElementById('writing-machine');
    const calendarMachine = document.getElementById('calendar-machine');
    const forestMachine = document.getElementById('forest-machine');
    const herboristMachine = document.getElementById('herborist-machine');
    const crystalMachine = document.getElementById('crystal-machine');
    const potionMachine = document.getElementById('potion-machine');
    let isPotionMachineOpen = false;
    let cauldronElem = null;

    let draggedItem = null;
    let selectedItemInHand = null;

    let hasFlowers = false;
    let hasCrystal = false;
    // ITEMS (database)
    const items = [
        {index: 0, name: 'Fleur rose', description: "Une fleur rouge.", image: 'images/inventory/item_flower_pink.jpg', weight: 1},
        {index: 1, name: 'Fleur bleue', description: "Une fleur bleue.", image: 'images/inventory/item_flower_blue.jpg', weight: 1},
        {index: 2, name: 'Fleur orange', description: "Une fleur verte.", image: 'images/inventory/item_flower_orange.jpg', weight: 1},
        
        {index: 3, name: 'Pierre orange', description: "Une pierre orange.", image: 'images/inventory/item_rock_orange.jpg', weight: 1},
        {index: 4, name: 'Pierre verte', description: "Une pierre verte.", image: 'images/inventory/item_rock_green.jpg', weight: 1},
        {index: 5, name: 'Pierre bleue', description: "Une pierre bleue.", image: 'images/inventory/item_rock_blue.jpg', weight: 1},
        
        {index: 6, name: 'Grand champignon', description: "Un grand champignon.", image: 'images/inventory/big_mushroom.jpg', weight: 75},
        {index: 7, name: 'Champignon moyen', description: "Un champignon de taille moyenne.", image: 'images/inventory/medium_mushroom.jpg', weight: 50},
        {index: 8, name: 'Petit champignon', description: "Un petit champignon.", image: 'images/inventory/small_mushroom.jpg', weight: 25},
        
        {index: 9, name: 'Plume de phénix', description: "Une plume de phénix.", image: 'images/inventory/item_feather.jpg', weight: 1},
    
        {index: 10, name: 'Message incompréhensible trouvé sur la fontaine', description:
            `Utzw afsnjw q'trfsj.
            Yri ptqyi h'smiweu hi Jiyw.
            Wpg hnqxv fk Nwpfg.
            Zsj kytfrj fg Atwqft.
            1.325uqpp h'Iey ixivmppi.`, 
            image: '', value: 'fountain'},
        {index: 11, name: 'Message trouvé sur la fontaine déchiffré', description: `
            Pour vaincre l'ombre.
            Une plume d'oiseau de Feu.
            Une fleur de Lune.
            Une amanite de Vornars.
            1.325qmm de Ténèbres de cristal.`, 
        image: ''},
    
        {index: 12, name: `Fiche incomplète trouvée dans le livre`, image: ''},
        {index: 13, name: `Extrait du Journal du Chef du Village`, image: '', description:`Aujourd'hui, j'ai rencontré la grand-mère Elara. Nous avons discuté de nos traditions et des anciens remèdes. Elle a mentionné une potion spéciale, qui pourrait résoudre les plus grands maux. Ses yeux brillaient d'une lueur inquiète, comme si elle savait quelque chose d'une importance capitale.`},
        {index: 14, name: `Indication 'double des clés'`, image: 'images/machines/balance_drawing.png', description:`Un curieux schéma représentant une balance.`, zoom: 'images/machines/balance_drawing.png'},
        {index: 15, name: 'Clés du laboratoire', image: 'images/inventory/potionKey.jpg', description: 'Les clés du laboratoire.'},
        
        {index: 16, name: '"Duaelinguae Epsile" p.27', image: 'images/uniqueCollectables/dialect1.jpg', description: 'Page trouvée dans un livre de langue.', zoom: 'images/uniqueCollectables/dialect1.jpg'},
        {index: 17, name: '"Le Delte illustré" p.18', image: 'images/uniqueCollectables/dialect2.jpg', description: "Page trouvée dans un livre de langue.", zoom: 'images/uniqueCollectables/dialect2.jpg'},
        {index: 18, name: '"Le dialecte pas Bête" p.51', image: 'images/uniqueCollectables/dialect3.jpg', description: 'Page trouvée dans un livre de langue.', zoom: 'images/uniqueCollectables/dialect3.jpg'},

        {index: 19, name:'Note trouvée chez le minéralogiste', image: '', description: `L'émeraude est moins dense que le topaze.
Le topaze est plus dense que l'ambre.
L'ambre n'est pas le plus dense.`},
        {index: 20, name: 'Potion Ultima', description: 'Une potion scintillante obtenue en mélangeant les ingrédients inscrits sur la fontaine.'},

        {index: 21, name: 'Clé du minéralogiste', image: 'images/inventory/potionKey.jpg', description: 'Les clés de chez le minéralogiste.'},
        {index: 22, name: "Clé de l'herboriste", image: 'images/inventory/potionKey.jpg', description: "Les clés de chez l'herboriste."},
        
        {index: 23, name: 'Fleur lumineuse', description: "Une fleur étincelante.", image: 'images/inventory/item_luminous_flower.jpg', weight: 1},

        {index: 24, name: 'Cristal violet', description: "Un cristal orange.", image: 'images/inventory/item_crystal_orange.jpg', weight: 5.3},
        {index: 25, name: 'Cristal vert', description: "Un cristal vert.", image: 'images/inventory/item_crystal_green.jpg', weight: 4.7},
        {index: 26, name: 'Cristal bleu', description: "Un cristal bleu.", image: 'images/inventory/item_crystal_blue.jpg', weight: 2.1},
        
        {index: 27, name: '"Plantes et Magie", p.534', image: 'images/uniqueCollectables/herb_hint.jpg', description: `L'oeuvre d'une vie de l'herboriste Marg Erite trouvée dans la bibliothèque du chef du village.`, zoom: 'images/uniqueCollectables/herb_hint.jpg'},
        
        {index: 28, name: '"Eléments", p.57', image: 'images/uniqueCollectables/elements.jpg', description: `Livre du minéralogiste H. Ogène, chapitre sur la classification des éléments magiques.`, zoom: 'images/uniqueCollectables/elements.jpg'},
        {index: 29, name: 'Calculs griffonnés', image: 'images/uniqueCollectables/formulas.jpg', description: `Des formules écrites par Hydr, sur le calcul de la Quantité de Matière Magique (en qmm) et la Charge Magique Atomique (en UM)`, zoom: 'images/uniqueCollectables/formulas.jpg'},
    
        {index: 30, name: "Clé du chef du village", image: 'images/inventory/potionKey.jpg', description: "Les clés de la maison du chef du village. Les nombreux champignons cachés protègent la maison des Ombres."},
        
        {index: 31, name: "Trophée en or", image: 'images/inventory/potionKey.jpg', description: "Un trophée remis par le chef du village pour avoir éradiqué le Fléau."},
    ];
    

    // INVENTORY
    const inventory = [
        // {
        //     name: 'Fleur rose',
        //     image: 'images/inventory/item_flower_pink.jpg',
        //     description: 'Une fleur rose.',
        //     count: 5,
        //     weight: 1
        // },
        // {
        //     name: 'Fleur orange',
        //     image: 'images/inventory/item_flower_orange.jpg',
        //     description: 'Une fleur orange.',
        //     count: 5,
        //     weight: 1
        // },
        // {index: 15, name: 'Clés du laboratoire', image: 'images/inventory/potionKey.jpg', description: 'Les clés du laboratoire.', weight : 1, count: 1},
        {index: 21, name: 'Clé du minéralogiste', image: 'images/inventory/potionKey.jpg', description: 'Les clés de chez le minéralogiste.', count: 1},
        {index: 22, name: "Clé de l'herboriste", image: 'images/inventory/potionKey.jpg', description: "Les clés de chez l'herboriste.", count: 1},
        // {index: 3, name: 'Pierre orange', description: "Une pierre orange.", image: 'images/inventory/item_rock_orange.jpg', weight : 1, count: 1},
        // {index: 4, name: 'Pierre verte', description: "Une pierre verte.", image: 'images/inventory/item_rock_green.jpg', weight : 1, count: 1},
        // {index: 5, name: 'Pierre bleue', description: "Une pierre bleue.", image: 'images/inventory/item_rock_blue.jpg', weight : 1, count: 1},
        // {index: 20, name: 'Potion ultime', description: 'Une potion qui pourrait vaincre le fléau.', count: 1},


    ];

    const collectedItems = new Set();

    inventoryContainer.style.display = 'none';
    inventoryIcon.addEventListener('click', () => {
        if (inventoryContainer.style.display === 'none') {
            inventoryContainer.style.display = 'flex';
            updateInventory();
        } else {
            inventoryContainer.style.display = 'none';
            zoomContainer.style.display = 'none';
        }
    });

    addToInventory(items[6])
    addToInventory(items[6])
    addToInventory(items[6])
    addToInventory(items[6])
    addToInventory(items[9])
    addToInventory(items[9])
    addToInventory(items[9])
    addToInventory(items[9])
    addToInventory(items[9])
    addToInventory(items[9])
    addToInventory(items[15])
    addToInventory(items[15])
    addToInventory(items[15])
    addToInventory(items[15])
    addToInventory(items[15])
    addToInventory(items[23])
    addToInventory(items[23])
    addToInventory(items[23])
    addToInventory(items[23])
    addToInventory(items[23])
    addToInventory(items[26])
    addToInventory(items[26])
    addToInventory(items[26])
    addToInventory(items[26])
    addToInventory(items[20])
    addToInventory(items[20])
    addToInventory(items[20])
    addToInventory(items[20])
    addToInventory(items[20])
    addToInventory(items[20])
    addToInventory(items[20])


    // HAND

    const hand = [
    ];

    const handContainer = document.getElementById('hand-container');

    function allowDrop(event) {
        event.preventDefault();
    }
    
    function drag(event) {
        event.dataTransfer.setData("text", event.target.getAttribute('itemName'));
    }
    
    
    
    
    function drop(event) {
        event.preventDefault();
        // Drop inventory to hand item
        const itemName = event.dataTransfer.getData("text");
        const item = inventory.find(invItem => invItem.name === itemName);
        if (item && event.target.classList.contains('hand-item')) {
            const index = event.target.getAttribute('index');
            hand[Number(index)] = item;
            updateHand();
        }
        draggedItem = null;
    }
    
    
    
    function selectItem(event) {
      const handItems = document.querySelectorAll(".hand-item");
      const index = event.target.getAttribute("index");
      selectedItemInHand = hand[Number(index)];
      handItems.forEach((handItem) => {
        handItem.style.borderColor = "black";
      });
      event.target.style.borderColor = "red";
    }    
    
    function updateHand() {
        const handItems = document.querySelectorAll('.hand-item');
        handItems.forEach((handItem, index) => {
            if (hand[index] && hand[index].count > 0) {
                handItem.innerHTML = `<div class="hand-item-count">${hand[index].count}</div>`;
                handItem.style.backgroundImage = `url(${hand[index].image})`;
            } else {
                handItem.innerHTML = ''; // Clear the content
                handItem.style.backgroundImage = 'none';
            }
        });
    }
    
    function throwHandItem(panNumber, event) {
        if (selectedItemInHand && selectedItemInHand.weight) {
            const pan = document.getElementById(`pan-${panNumber}`);
            const weightDisplay = document.getElementById(`weight-${panNumber}`);
    
            // Créer une nouvelle image pour représenter l'item
            const itemImage = document.createElement('img');
            itemImage.src = selectedItemInHand.image;
            itemImage.className = 'item-in-pan';
            itemImage.style.position = 'absolute';
            itemImage.style.width = '50px'; // Taille réduite de l'image
            itemImage.style.height = '50px'; // Taille réduite de l'image
            itemImage.style.left = `${event.offsetX - 25}px`; // Centrer l'image sur le clic
            itemImage.style.top = `${event.offsetY - 25}px`; // Centrer l'image sur le clic
    
            // Ajouter l'image comme enfant de la balance cliquée
            pan.appendChild(itemImage);
    
            // Mettre à jour le poids total
            const currentWeight = parseInt(weightDisplay.textContent) || 0;
            weightDisplay.textContent = currentWeight + selectedItemInHand.weight;
    
            // Ajouter un événement de clic pour retirer l'élément
            itemImage.addEventListener('click', function() {
                pan.removeChild(itemImage);
                weightDisplay.textContent = parseInt(weightDisplay.textContent) - selectedItemInHand.weight;
                addToInventory(selectedItemInHand);
                checkBalanceCondition();
            });
    
            // Retirer un seul item de la main
            removeFromInventory(selectedItemInHand);
    
            // Vérifier la condition après la mise à jour du poids
            checkBalanceCondition();
        }
    }

    function removeFromInventory(item) {
        const index = hand.indexOf(item);
        if (index !== -1) {
            hand[index].count -= 1;
            if (hand[index].count <= 0) {
                hand.splice(index, 1); // Retirer l'item de l'inventaire s'il n'en reste plus
                setSeletectedItemInHandToNull();
            }
            updateHand(); // Mettre à jour l'inventaire dans l'interface utilisateur
        }
    }
    
    
    function checkBalanceCondition() {
        const weight1 = parseInt(document.getElementById('weight-1').textContent) || 0;
        const weight2 = parseInt(document.getElementById('weight-2').textContent) || 0;
    
        // if (weight1 === (weight2 - 4)) {
        if (weight1 === (weight2 - 1)) { // test
            document.getElementById('balance_btn').style.display = 'block';
        } else {
            document.getElementById('balance_btn').style.display = 'none';
        }
    }
    
    
    
    
    function setSeletectedItemInHandToNull() {
        selectedItemInHand = null;
        const handItems = document.querySelectorAll(".hand-item");
        handItems.forEach((handItem) => {
          handItem.style.borderColor = "black";
        });

    }
    


    // MAP
    mapContainer.style.display = 'none';
    mapIcon.addEventListener('click', () => {
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
        } else {
            mapContainer.style.display = 'none';
        }
    });

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (event) => {
            const sceneName = event.target.getAttribute('data-scene');
            changeScene(sceneName);
        });
    });

    const baseObjects = {
        enemy: {
            src: 'images/enemies/enemy.png',
            action: function() {
                if(selectedItemInHand){
                    switch(selectedItemInHand.name) {
                        case 'Grand champignon':
                            this.hp -= 3;
                            break;
                        case 'Champignon moyen':
                            this.hp -= 2;
                            break;
                        case 'Petit champignon':
                            this.hp -= 1;
                            break;
                        default:
                            return;
                    }

                    // Mettre à jour la barre de vie
                    const healthPercentage = Math.max((this.hp / 3) * 100, 0); // Ajuster 3 au max HP
                    this.healthBar.style.width = `${healthPercentage}%`;

                    removeFromInventory(selectedItemInHand);
                    if (this.hp <= 0) {
                        document.getElementById(this.id).style.display = 'none';
                        if (this.healthBarContainer) {
                            this.healthBarContainer.style.display = 'none';
                        }
                    }
                }
                removeFromInventory(selectedItemInHand);
                if(this.hp <= 0){
                    document.getElementById(this.id).style.display = 'none';
                }
            }
        },
        mushroom: {
            src: 'mushroom.webp',
            action: function() {
                alert(this.message);
                document.getElementById(this.id).style.display = 'none';
                addToInventory(this.item);
            }          
        },
        balance_btn: {
            src: 'images/machines/kitchen_balance_btn.png',
            action: function() {
                if(!this.isClicked){
                    const keysItem = { ...items[15], count: 1 };
                    addToInventory(keysItem);
                    this.isClicked = true;
                }
            }
        },
        door: {
            type: 'div',
            action: function() {
                if(this.key){
                    if(!inventory.find(invItem => invItem.name === this.key.name)){
                        displayMessage(this.message);
                        return;
                    }
                }
                changeScene(this.targetScene);
            }
        },
        arrow_door: {
            type: 'img',
            src: 'images/icons/arrow.png',
            action: function() {
                console.log('change scene door :o');
                changeScene(this.targetScene);
            }
        },
        collectable: {
            type: 'div',
            action: function() {
                addToInventory(this.item);
            }
        },
        message: {
            type: 'div',
            action: function(){
                console.log(this.message);
                displayMessage(this.message);
            }
        },
        uniqueCollectable: {
            type: 'div',
            action: function() {
                if(!this.isCollected) {
                    addToInventory(this.item);
                    collectedItems.add(this.id);
                    this.isCollected = true;
                    // TODO marche pas
                    document.getElementById('this.id').style.display = 'none';
                }
                if(this.message){
                    displayMessage(this.message);
                }
            }
        },
        chief_mushrooms: {
            type: 'div',
            action: function() {
                for(let i=0; i<10; i++){
                    addToInventory(items[8])
                }
                for(let i=0; i<10; i++){
                    addToInventory(items[7])
                }
                addToInventory(items[6])
            }
        },
        writing_machine: {
            type: 'div',
            action: function(){
                openWritingMachine();
            }
        },
        pink_potion: {
            src: 'images/uniqueCollectables/pinkPotion.png',
            action: function() {
                document.getElementById(this.id).style.display = 'none';
                addToInventory(this.item);
            }
        },
        calendar: {
            type: 'div',
            action: function(){
                calendarMachine.style.display = 'flex';
            }
        },
        herborist_chest: {
            type: 'div',
            action: function() {
                herboristMachine.style.display = 'flex'; 
            }
        },
        crystal_chest: {
            type: 'div',
            action: function() {
                crystalMachine.style.display = 'flex'; 
            }
        },
        cauldron: {
            type: 'div',
            action: function() {
                if(isPotionMachineOpen) {
                    addIngredientToPotion(selectedItemInHand);
                }
                potionMachine.style.display = 'flex';
                isPotionMachineOpen = true;
                if(cauldronElem){
                    cauldronElem.style.cursor = 'cell';
                }
                
            }
        },
        fountain: {
            type: 'div',
            action: function() {
                if(!this.isClicked){
                    displayMessage(this.message)
                    addToInventory(items[10]);
                    addOptionToWritingMachineSelect(items[10]);
                    this.isClicked = true;
                    document.getElementById('fountain').style.cursor = 'cell';
                    return;
                } 
                
                if(selectedItemInHand) {
                    addToFountain(selectedItemInHand)
                }
            }
        }
    };

    function addToFountain(item) {
        if(item.name == 'Potion Ultima') {
            displayMessage(`Vous versez la potion dans la fontaine, qui s'illumine. Les ombres s'affaissent, et disparaissent.`)
            messageContainer.classList.add('dialogue');
            displayMessage(`Tu as réussi ! Les Ombres ne devraient pas revenir de sitôt, grâce à toi. Prends ce trophée en guise de remerciement.`);
            addToInventory(items[31]);
            isTuto = true;
            tutoStep = 'end';
        } else {
            displayMessage(`Rien ne se passe.`)
        }
        removeFromInventory(item);
    }



    const scenes = {
        village: {
            background: 'images/backgrounds/village.jpg',
            objects: [
                {
                    id: 'big_mushroom',
                    base: 'collectable',
                    style: 'top: 420px; left: 50px; width: 130px; height: 95px;',
                    item: items[6]
                },
                {
                    id: 'medium_mushroom',
                    base: 'collectable',
                    style: 'top: 460px; left: 200px; width: 100px; height: 55px;',
                    item: items[7]
                },
                {
                    id: 'small_mushroom',
                    base: 'collectable',
                    style: 'top: 530px; left: 210px; width: 55px; height: 50px;',
                    item: items[8]
                },
                {
                    id: 'small_mushroom2',
                    base: 'collectable',
                    style: 'top: 520px; left: 130px; width: 70px; height: 70px;',
                    item: items[8]
                },
                {
                    id: 'pink_flower',
                    base: 'collectable',
                    style: 'top: 520px; left: 10px; width: 90px; height: 60px;',
                    item: items[0]
                },
                {
                    id: 'orange_flower',
                    base: 'collectable',
                    style: 'top: 485px; left: 310px; width: 70px; height: 50px;',
                    item: items[2]
                },
                {
                    id: 'fountain',
                    base: 'fountain',
                    style: 'top: 390px; left: 310px; width: 100px; height: 50px;',
                    message: 'Une fontaine vide sur laquelle il est écrit quelque chose...',
                    isClicked: false
                },
                {
                    id: 'door_house',
                    base: 'door',
                    style: 'top: 330px; left: 520px; width: 50px; height: 70px;',
                    targetScene: 'house'
                },
                {
                    id: 'door-mineralogist',
                    base: 'door',
                    style: 'top:330px; left:385px; width: 40px; height: 60px;',
                    message: "Porte de chez le minéralogiste verrouillée.",
                    key: items[21],
                    targetScene: 'mineralogist'
                },
                {
                    id: 'door-herborist',
                    base: 'door',
                    style: 'top:330px; left:295px; width: 40px; height: 60px;',
                    message: "Porte de chez l'herboriste verrouillée.",
                    key: items[22],
                    targetScene: 'herborist'
                },
                {
                    id: 'door_potion',
                    base: 'door',
                    style: 'top: 340px; left: 460px; width: 40px; height: 50px;',
                    message: 'Porte verrouillée.',
                    key:items[15],
                    targetScene: 'potion'
                },
                {
                    id: 'door-chief',
                    base: 'door',
                    style: 'top: 340px; left: 140px; width: 40px; height: 70px;',
                    message: "Porte verrouillée.",
                    key: items[30],
                    targetScene: 'chief'
                },
                {
                    id: 'door_library',
                    base: 'door',
                    style: 'top: 130px; left: 130px; width: 90px; height: 40px;',
                    targetScene: 'library'
                },
                {
                    id: 'enemy-1',
                    base: 'enemy',
                    style: 'right: 25px; top: 405px; cursor: cell;',
                    hp: 3
                },
                {
                    id: 'enemy-2',
                    base: 'enemy',
                    style: 'left: 230px; top: 390px; width: 50px; cursor: cell;',
                    hp: 2
                }
            ]
        },
        house: {
            background: 'images/backgrounds/house.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'message-1',
                    base: 'message',
                    style: "width: 25px; height: 30px; top: 390px; left: 310px; transform:rotate(15deg); background-color: beige; opacity: 1; border-radius: 0; box-shadow: 1px 1px 1px grey;",
                    message: `Je suis partie récupérer des ingrédients pour ma nouvelle potion pousse-cheveux. N’oublie pas de nourrir le chat : 40g de croquettes par jour. Merci !`
                },
                {
                    id: 'message-2',
                    base: 'message',
                    style: "width: 80px; height: 90px; top: 280px; left: 330px;",
                    message: `Notre réussite approche, mais le temps presse. Le Fléau revient tous les demi-siècles en moyenne. 
                    
                    Finalement, la plume de phénix était inutile.`
                },
                {
                    id: 'door_kitchen',
                    base: 'door',
                    style: 'top: 300px; left: 490px; width: 70px; height: 120px',
                    targetScene: 'kitchen'
                },
                {
                    id: 'door_village',
                    base: 'door',
                    style: 'top: 290px; left: 160px; width: 60px; height: 100px',
                    targetScene: 'village'
                },
                {
                    id: 'hint_key',
                    base: 'uniqueCollectable',
                    isCollected: false,
                    style: 'top: 510px; left: 210px; width: 200px; height: 80px;',
                    item: items[14]
                }

            ]
        },
        potion: {
            background: 'images/backgrounds/potionRoom.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'black-potion',
                    base: 'message',
                    style: "width: 100px; height: 110px; top: 430px; left: 90px;",
                    message: 'Une mixture étrange.'
                },
                {
                    id: 'pink-potion',
                    base: 'pink_potion',
                    style: 'top: 369px; left: 86px; display: none;',
                    item: items[20]
                },
                {
                    id: 'phoenix',
                    base: 'uniqueCollectable',
                    style: 'top: 110px; left: 10px; width: 100px; height: 150px;',
                    item: items[9]
                },
                {
                    id: 'cauldron',
                    base: 'cauldron',
                    style: 'top: 160px; left: 200px; width: 230px; height: 250px;'
                }
            ]  
        },
        kitchen: {
            background: 'images/backgrounds/kitchen.jpg',
            objects: [
                {
                    id: 'balance_btn',
                    base: 'balance_btn',
                    style: 'top: 442px; left: 287px;display:none;',
                    isClicked: false
                },
                {
                    id: 'left_arrow',
                    base: 'door',
                    style: 'top:500px; left: 0px;',
                    targetScene : 'village'
                }
            ]
        },
        forest: {
            background: 'images/backgrounds/forest_dark.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
            ]
        },
        cave: {
            background: 'images/backgrounds/cave.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'green-stone-1',
                    base: 'collectable',
                    style: 'top: 370px; left: 40px; width: 60px; height: 50px;',
                    item: items[4]
                },
                {
                    id: 'green-stone-2',
                    base: 'collectable',
                    style: 'top: 490px; left: 140px; width: 80px; height: 60px;',
                    item: items[4]
                },
                {
                    id: 'orange-stone-1',
                    base: 'collectable',
                    style: 'top: 455px; left: 315px; width: 52px; height: 40px;',
                    item: items[3]
                },
                {
                    id: 'orange-stone-2',
                    base: 'collectable',
                    style: 'top: 480px; left: 400px; width: 60px; height: 60px;',
                    item: items[3]
                },
                {
                    id: 'blue-stone-1',
                    base: 'collectable',
                    style: 'top: 535px; left: 35px; width: 65px; height: 55px;',
                    item: items[5]
                },
                {
                    id: 'blue-stone-2',
                    base: 'collectable',
                    style: 'top: 400px; left: 425px; width: 100px; height: 65px;',
                    item: items[5]
                },
            ]
        },
        library: {
            background: 'images/backgrounds/library.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'book1',
                    base: 'message',
                    style: 'top: 180px; left: 210px; width: 50px; height: 100px;',
                    message: `LITTERATURE : Le conte de la sorcière d'argent, réadapté`
                },
                {
                    id: 'book_hint1',
                    base: 'message',
                    style: 'top: 180px; left: 265px; width: 60px; height: 100px;',
                    message: `DIALECTES DE LA PLAINE DE VORNARS
                    Vornars est un lieu d'échanges où coexistent divers dialectes. 
                    Bien que certains paraissent intimidants au premier abord, ils sont étroitement liés. Les habitants ont pu développer un système de traduction efficace, grâce à des tables spécialement conçues pour faciliter la compréhension mutuelle. 
                    Il est fréquent, aujourd’hui, de changer de langue à chaque phrase.`
                },
                {
                    id: 'door_village',
                    base: 'door',
                    style: 'top: 370px; left: 320px; width: 55px; height: 80px;',
                    targetScene: 'village'
                },
                {
                    id: 'writing_machine',
                    base: 'writing_machine',
                    style: 'left:100px; top: 430px; height: 40px; width: 60px',
                    message: 'top'
                },
                {
                    id: 'dialect-1',
                    base: 'uniqueCollectable',
                    style: 'left: 500px; top: 330px; width: 100px; height: 130px;',
                    isCollected: false,
                    item: items[16]
                },
                {
                    id: 'dialect-2',
                    base: 'uniqueCollectable',
                    style: 'top: 180px; left: 330px; width: 70px; height: 100px;',
                    isCollected: false,
                    item: items[17]
                },
                {
                    id: 'dialect-8',
                    base: 'uniqueCollectable',
                    style: 'left: 50px; top: 100px; width: 100px; height: 100px;',
                    isCollected: false,
                    item: items[18]
                },

            ]
        },
        herborist: {
            background: 'images/backgrounds/herborist.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'message-1',
                    base: 'message',
                    style: "height: 80px; width: 60px; top: 220px;",
                    message: `J’ai donné une clé au chef, comme Hydr m’a donné la sienne. Il n’a pas été facile de le convaincre de financer mes voyages, et encore moins de lui avouer tout ce qui se tramait dans son dos. L’heure n’est plus à la concurrence entre les sciences, mais à la collaboration. Ensemble, on peut vaincre ce Fléau.`
                },
                {
                    id: 'calendar',
                    base: 'calendar',
                    style: "width:160px; height:50px;top:400px; left: -35px; transform:rotateZ(-25deg);"
                },
                {
                    id: 'flower-book-1',
                    base: 'message',
                    style: "width: 100px; height: 130px; top: 300px; left: 320px;",
                    message: `Jour 4126

Les Fleurs de Lune :

L'Astre-fleur et la Lune-d'ombre ne brillent qu'à l'écart des regards. 
Durée de l’éclat après un regard : 1 minute.

La fleur de la potion, plus délicate encore, brille peut-être en secret.`
                },
                {
                    id: 'flower-book-2',
                    base: 'message',
                    style: "width: 150px; height: 130px; top: 80px; left: 340px;",
                    message: `Jour 4134

Les Températures optimales

Il semble que certaines plantes possèdent des propriétés si subtiles qu'elles ne se manifestent que dans des conditions rigoureusement précises. La Sélénite pourpre, par exemple, ne révèle ses vertus curatives qu'à une température exacte de 17 degrés.

J’ai enfin fini Meteor, un bijou de technologie qui prédit les températures à la minute près. D’après mes calculs, une plante telle que la Fleur-Lumineuse peut apparaître entre 2h et 2h30, là où les températures sont les plus froides dans la Forêt hantée. 
                    `
                },
                {
                    id: 'key-mineralogist',
                    base: 'uniqueCollectable',
                    style: "width: 40px; height: 100px; transform:rotateZ(50deg);top:390px; left: 120px;",
                    isCollected: false,
                    item : items[21]
                }
            ]
        },
        mineralogist: {
            background: 'images/backgrounds/mineralogist.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'message-1',
                    base: 'message',
                    style: "height: 100px; width: 70px; left: 260px; top: 200px;",
                    message: `Histoire du Fléau, p.147
                    
                    Après des siècles de peur, la pierre salvique représentait un nouvel espoir. Tout le village s’entraida pour construire un gigantesque abri. Une philosophie nouvelle émergeait : pourquoi combattre quand on pouvait se cacher le temps que les ombres s’amenuisent ? L’épidémie était devenue une maladie passagère.`
                },
                {
                    id: 'crystal_chest',
                    base: 'crystal_chest',
                    style: "width:248px; height:134px; top: 420px; left: 350px;"
                },
                {
                    id: 'stone-book-1',
                    base: 'uniqueCollectable',
                    style: 'width: 110px; height: 160px; left: 350px; top: 245px',
                    isCollected: false,
                    item: items[28]
                },
                {
                    id: 'stone-book-2',
                    base: 'uniqueCollectable',
                    style: 'width: 170px; height: 60px; left: 00px; top: 370px; transform: rotateZ(-13deg);',
                    isCollected: false,
                    item: items[29]
                },
                {
                    id: 'stone-book-3',
                    base: 'message',
                    style: 'width: 80px; height: 110px; right: 50px; top: 200px;',
                    message: `Les Cristaux

Les cristaux surpassent les pierres, beaucoup plus rares et dotées d'une quantité de magie bien plus élevée.

Mon classement repose sur le type de magie que chaque élément renferme :
Bleu : l'Air, la transformation.
Rouge : le Feu, la destruction.
Vert : la Terre, la création.
Violet : les Ténèbres, le secret.`
                },
                {
                    id: 'crystal-hint',
                    base: 'message',
                    style: 'width: 190px; height: 110px; left: 150px; top: 470px;',
                    message: `Coffre de cristaux :

 1. Si la mmm (masse molaire magique) du Solium est de 18.9 , alors l’Altidée n’est pas la clé.

2. Si la quantité magique d’1g de Lunaris est de 1mol, alors le Boat n’est pas la
clé. 

Soient A la bleue Altidée, B le vert Boat, et C le flamboyant Fyrite, les pierres trouvées dans la grotte située au Nord,
3. Si non-A et non-B, alors C, et si non-B et non-C alors A, et si non-A et non-C alors B.`
                }
            ]
        },
        chief: {
            background: 'images/backgrounds/chief_house.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'message-1',
                    base: 'message',
                    style: "width: 70px; top: 350px; left: 100px;",
                    message: 
`AMANITES!

75g: -100
50g: -67
25g: -34`
                },
                {
                    id: 'message-2',
                    base: 'message',
                    style: 'height: 100px; width: 30px; top: 360px; left: 185px;',
                    message:
`Mon fils, tu as fait preuve de bravoure aujourd’hui. Mais il n’est pas encore temps pour toi d’être brave. C’est mon devoir de rester dehors, et ton devoir de te cacher. Un jour, c’est toi qui devras rester. 
Ce jour-là, ne laisse aucun villageois sans protection. Tu feras un merveilleux chef, j’en suis certain.`
                },
                {
                    id: 'herborist-chest',
                    base: 'herborist_chest',
                    style: "width:80px; height: 75px; left: 520px; top: 400px;"
                },
                {
                    id: 'chief-book-1',
                    base: 'message',
                    style: "width: 70px; height: 120px; left: 65px; top: 415px;",
                    message: `(Dans un tiroir) 
                    Merci pour notre discussion. Je te confie ma clé au cas où. 

                    Sibilome < Estratan
                    Mercil > Sibilome
                    !(Mercil > Sibilome et Mercil > Estratan)
                    
                    ....... > ....... > .......`
                },
                {
                    id: 'chief-mushrooms',
                    base: 'chief_mushrooms',
                    style: 'height: 100px; width: 80px; top: 310px; left: 380px;',
                },
                {
                    id: 'chief-book-2',
                    base: 'uniqueCollectable',
                    style: 'width: 120px; height: 140px; left: 470px; top: 245px',
                    isCollected: false,
                    item: items[27]
                }
            ]
        },
        flowers: {
            background: 'images/backgrounds/forest_light.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 400px; left: 25px; width: 70px; height: 70px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 420px; left: 85px; width: 50px; height: 50px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 430px; left: 160px; width: 60px; height: 60px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 470px; left: 35px; width: 80px; height: 80px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 490px; left: 130px; width: 50px; height: 50px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 370px; left: 480px; width: 50px; height: 50px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 360px; left: 550px; width: 60px; height: 60px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 420px; left: 530px; width: 50px; height: 50px; border-radius: 50%;',
                    item: items[23]
                },
                {
                    id: 'flower',
                    base: 'collectable',
                    style: 'top: 380px; left: 200px; width: 50px; height: 50px; border-radius: 50%;',
                    item: items[23]
                },
            ]
        }
    };




    function changeScene(sceneName) {
        if(sceneName == 'forest' && hasFlowers){
            sceneName = 'flowers';
        } 
    
        if(sceneName == 'forest') {
            forestMachine.style.display = 'flex';
        } else {
            forestMachine.style.display = 'none';
        }
    
        const scene = scenes[sceneName];
        container.style.backgroundImage = `url(${scene.background})`;
        container.innerHTML = '';
    
        scene.objects.forEach(obj => {
            if (collectedItems.has(obj.id)) return;
    
            const baseObj = baseObjects[obj.base];
            let element;
            if (baseObj.type === 'div') {
                element = document.createElement('div');
                element.className = 'clickable';
            } else {
                element = document.createElement('img');
                element.src = baseObj.src;
                element.className = 'object';
            }
            element.id = obj.id;
            element.style = obj.style;
            element.message = obj.message;
            element.targetScene = obj.targetScene;
    
            // HEALTHBAR
            if (obj.base === 'enemy') {
                const healthBarContainer = document.createElement('div');
                healthBarContainer.classList.add('healthbar-container');
                healthBarContainer.style.position = 'absolute';
                healthBarContainer.style.width = '50px';
                healthBarContainer.style.height = '5px';
                healthBarContainer.style.backgroundColor = 'grey';
                healthBarContainer.style.top = `${parseInt(obj.style.split('top:')[1]) - 15}px`; // Positionnement au-dessus de l'ennemi
                healthBarContainer.style.left = `${parseInt(obj.style.split('left:')[1]) + 0}px`; // Centrer horizontalement
                healthBarContainer.style.right = `${parseInt(obj.style.split('right:')[1]) + 10}px`; // Centrer horizontalement

                const healthBar = document.createElement('div');
                healthBar.classList.add('healthbar');
                healthBar.style.width = '100%'; // Taille initiale à 100%
                healthBar.style.height = '100%';
                healthBarContainer.appendChild(healthBar);
    
                container.appendChild(healthBarContainer);
                element.healthBar = healthBar; // Stocker la barre de vie dans l'élément pour y accéder plus tard
                element.healthBarContainer = healthBarContainer;
            }
    
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop) && !(prop in baseObj)) {
                    element[prop] = obj[prop];
                }
            }
    
            if (obj.classList) {
                obj.classList.forEach(className => {
                    element.classList.add(className);
                });
            }
            element.addEventListener('click', baseObj.action.bind(element));
            container.appendChild(element);
        });
    
        mapContainer.style.display = 'none';
        inventoryContainer.style.display = 'none';
    
        // Handle weighing machine visibility
        if (sceneName === 'kitchen') {
            weighingMachine.style.display = 'block';
        } else {
            weighingMachine.style.display = 'none';
        }
    
        // Potion clickable cursor
        if(sceneName === 'potion') {
            cauldronElem = document.getElementById('cauldron');
            cauldronElem.style.cursor = 'pointer';
        }
    }
    
    
    
    const inventoryName = document.getElementById('inventory-name');
    const inventoryDescription = document.getElementById('inventory-description');
    
    function addToInventory(item) {
        const existingItem = inventory.find(invItem => invItem.name === item.name);
        if (existingItem) {
            existingItem.count += 1;
        } else {
            const newItem = {...item, count: 1};
            inventory.push(newItem);
        }
        updateInventory();
        displayInventoryMessage(`1x ${item.name}`);
    }
    
    function displayInventoryMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'inventory-message';
        messageContainer.textContent = message;
        document.body.appendChild(messageContainer);
        setTimeout(() => {
            document.body.removeChild(messageContainer);
        }, 4000);
    }

    function updateInventory() {
        inventoryList.innerHTML = '';
        inventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = "inventory-item";
            itemElement.style.backgroundImage = `url(${item.image})`;
    
            // Ajout des attributs et événements pour le drag-and-drop
            itemElement.setAttribute('draggable', 'true');
            itemElement.setAttribute('ondragstart', 'drag(event)');
            itemElement.setAttribute('itemName', item.name);

            const itemCount = document.createElement('p');
            itemCount.textContent = item.count;
            itemElement.appendChild(itemCount);
            
            if(item.zoom){
                const zoom = document.createElement('button');
                zoom.textContent = '+';
    
                zoom.addEventListener('click', () => {
                    document.getElementById('zoom-container').style.display = 'block';
                    document.getElementById('zoom-image').src = item.zoom;
                })
    
                itemElement.appendChild(zoom);
            }
    
            itemElement.addEventListener('click', () => {
                inventoryName.textContent = item.name;
                inventoryDescription.textContent = item.description;
            });
    
            inventoryList.appendChild(itemElement);
        });
    }
    
    const zoomContainer = document.getElementById('zoom-container');
    function closeZoom(){
        zoomContainer.style.display = 'none';
    }

    // MESSAGE
    const messageContainer = document.getElementById('message-container');
    const messageContent = document.getElementById('message-content');
    document.getElementById('close-message-btn').addEventListener('click', closeMessage);
function displayMessage(message) {
    // Remplacer les séquences de saut de ligne par des balises <br>
    const formattedMessage = message.replace(/\n/g, '<br>');
    messageContent.innerHTML = formattedMessage;
    messageContainer.style.display = 'block';
}

    
    function closeMessage(){
        messageContainer.style.display = 'none';
    }


    // OBJECTS
    
    // Writing Machine
    const writingMachineErrorElem = document.querySelector('#writing-machine .error-message');
    const writingMachineSelect = document.getElementById('writing-machine-select');

    function openWritingMachine(){
        writingMachine.style.display = 'flex';
        writingMachineErrorElem.textContent = '';
    }
    
    function closeWritingMachine(){
        writingMachine.style.display = 'none';

    }

    function addOptionToWritingMachineSelect(item) {
        if(item.value) {
            const newOption = document.createElement('option');
            newOption.textContent = item.name;
            newOption.value = item.value;
            writingMachineSelect.appendChild(newOption);
        }
    }

    function handleSubmitWritingMachine(){
        const select = document.getElementById('writing-machine-select').value;
        const input1 = document.getElementById('writing-machine-input-1').value;
        const input2 = document.getElementById('writing-machine-input-2').value;

        if(!select) {
            writingMachineErrorElem.textContent = 'Veuillez choisir un texte à traduire.';
            return;
        }

        if(!(select == 'fountain' && input1 == 4 && input2 == 2)){
            writingMachineErrorElem.textContent = `Aucune traduction n'a été trouvée. Choisissez d'autres valeurs.`;
            return;
        } 

        const item = items.find(it => it.value == select);
        if(item){
            addToInventory(items[11]);
        }

    }


    // CALENDAR MACHINE

    document.querySelector('#calendar-machine .close-btn').addEventListener('click', (e) => {
        calendarMachine.style.display = 'none';
    });

    const temperatureElements = document.querySelectorAll('#calendar-machine td');
    let temperatureColor = 'black';
    
    const styleBtns = document.querySelectorAll('#calendar-machine .style-btn');
    styleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            temperatureColor = e.target.getAttribute('data-color');
            console.log(temperatureColor)

            styleBtns.forEach(styleBtn => {
                styleBtn.classList.remove('active');
            })
            e.target.classList.add('active');
        })
    })
    
    temperatureElements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.target.style.textDecoration = e.target.style.textDecoration == '' ? `line-through 1px ${temperatureColor}` : '';
        })
    })

    // FOREST MACHINE

    // Remplir le select des heures
const hourSelect = document.getElementById('forest-hour');
for (let i = 0; i <= 23; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.text = i + 'h';
    hourSelect.appendChild(option);
}

// Remplir le select des minutes
const minuteSelect = document.getElementById('forest-minute');
for (let i = 0; i <= 59; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.text = i + 'm';
    minuteSelect.appendChild(option);
}

hourSelect.addEventListener('change', (e) => {
    if(e.target.value == 2 && minuteSelect.value == 20 && !hasFlowers) {
        hasFlowers = true;
        forestMachine.style.display = 'none';
        changeScene('flowers')
    }
});

minuteSelect.addEventListener('change', (e) => {
    if(e.target.value == 20 && hourSelect.value == 2 && !hasFlowers) {
        hasFlowers = true;
        forestMachine.style.display = 'none';
        changeScene('flowers');
    }
});

// HERBORIST MACHINE

const herbBtns = document.querySelectorAll('.herb-btn');
const herbImgs1 = document.querySelectorAll('#herb-btn-1 img');
const herbImgs2 = document.querySelectorAll('#herb-btn-2 img');
const herbImgs3 = document.querySelectorAll('#herb-btn-3 img');

const herboristChestIndexes = [0,1,2];
const herboristChest = [0,2,1];

// Close btn
document.querySelector('#herborist-machine .close-btn').addEventListener('click', (e) => {
    herboristMachine.style.display = 'none';
});

herbBtns[0].addEventListener('click', (e) => {
    const btn = e.currentTarget;

    herbImgs1.forEach(img => {
        img.style.display = 'none';
    });
    
    const newIndex = (parseInt(btn.getAttribute('data-index')) + 1) % herbImgs1.length; 
    btn.setAttribute('data-index', newIndex);
    
    herbImgs1[newIndex].style.display = 'block';

    herboristChestIndexes[0] = newIndex;
    checkHerboristChest();
});
herbBtns[1].addEventListener('click', (e) => {
    const btn = e.currentTarget;

    herbImgs2.forEach(img => {
        img.style.display = 'none';
    });
    
    const newIndex = (parseInt(btn.getAttribute('data-index')) + 1) % herbImgs2.length; 
    btn.setAttribute('data-index', newIndex);

    herbImgs2[newIndex].style.display = 'block';

    herboristChestIndexes[1] = newIndex;
    checkHerboristChest();
});
herbBtns[2].addEventListener('click', (e) => {
    const btn = e.currentTarget;

    herbImgs3.forEach(img => {
        img.style.display = 'none';
    });
    
    const newIndex = (parseInt(btn.getAttribute('data-index')) + 1) % herbImgs3.length; 
    btn.setAttribute('data-index', newIndex);

    herbImgs3[newIndex].style.display = 'block';

    herboristChestIndexes[2] = newIndex;
    checkHerboristChest();
});

function checkHerboristChest(){
    console.log('click')
    for(let i=0; i<3; i++){
        if(herboristChestIndexes[i] != herboristChest[i]){
            return;
        }
    }
    herboristMachine.style.display = 'none';
    addToInventory(items[22]);
}


// CRYSTAL MACHINE

const crystalDropElem = document.getElementById('crystal-drop');
const crystalImgs = document.querySelectorAll('.crystal-images img');

// Close btn
document.querySelector('#crystal-machine .close-btn').addEventListener('click', () => {
    crystalMachine.style.display = 'none';
});

crystalDropElem.addEventListener('click', (e) => {
    switch(selectedItemInHand.name){
        case 'Pierre bleue':
            crystalImgs.forEach(img => {
                img.style.display = 'none';
            });
            crystalImgs[0].style.display = 'block';
            break;
        case 'Pierre verte':
            crystalImgs.forEach(img => {
                img.style.display = 'none';
            });
            crystalImgs[1].style.display = 'block';
            break;
        case 'Pierre orange':
            crystalImgs.forEach(img => {
                img.style.display = 'none';
                crystalMachine.style.display = 'none';
                addToInventory(items[24]);
                addToInventory(items[24]);
                addToInventory(items[24]);
                addToInventory(items[25]);
                addToInventory(items[25]);
                addToInventory(items[25]);
                addToInventory(items[26]);
                addToInventory(items[26]);
                addToInventory(items[26]);
                hasCrystal = true;
            });
            crystalImgs[2].style.display = 'block';
            break;
        default:
            // displayMessage('Rien ne se passe');
            break;
    }
});


// POTION MACHINE

// Close btn
document.querySelector('#potion-machine .close-btn').addEventListener('click', (e) => {
    potionMachine.style.display = 'none';
    isPotionMachineOpen = false;
    if(cauldronElem) {
        cauldronElem.style.cursor = 'pointer';
    }
})

const currentPotionIngredients = [];

const potionIngredients = [
    {
        name: 'Fleur lumineuse',
        weight: 0
    },
    {
        name: 'Cristal violet',
        weight: 5.3
    },
    {
        name: 'Grand champignon',
        weight: 0
    },
    {
        name: 'Plume de phénix',
        weight: 0
    }
];

const ingredientsContainer = document.getElementById('ingredients');
let potionIngredientsElements = document.querySelectorAll('.ingredient');
let potionIngredientNamesElements = document.querySelectorAll('.ingredient .ingredientName');
let potionIngredientWeightsElements = document.querySelectorAll('.ingredient .weight');

// Mix btn
document.getElementById('mix-btn').addEventListener('click', (e) => {
    checkPotionIngredients();
})


function addIngredientToPotion(item) {
    if(item) {
        const {name, weight} = item;
        const existingIngredient = currentPotionIngredients.find(ingredient => ingredient.name === name);

        if (existingIngredient) {
            existingIngredient.weight += weight;
        } else {
            currentPotionIngredients.push({name, weight});
        }

        removeFromInventory(item);

        updateRecipe();
    }
}

function updateRecipe() {
    currentPotionIngredients.forEach((ingredient, i) => {
        if(!potionIngredientsElements[i]) {
            const newIngredientElem = document.createElement('li'); 
            newIngredientElem.innerHTML = `<span class="ingredientName">Ingrédient 4</span> (<span class="weight">0</span>g)`;
            newIngredientElem.classList.add('ingredient');
            ingredientsContainer.appendChild(newIngredientElem);

            potionIngredientsElements = document.querySelectorAll('.ingredient');
            potionIngredientNamesElements = document.querySelectorAll('.ingredient .ingredientName');
            potionIngredientWeightsElements = document.querySelectorAll('.ingredient .weight');
        }
        potionIngredientNamesElements[i].textContent = ingredient.name;
        potionIngredientWeightsElements[i].textContent = ingredient.weight;
    })
}

function checkPotionIngredients() {
    console.log(currentPotionIngredients);
    
    let hasIngredient = true;
    let hasWeight = true;
    
    potionIngredients.forEach((ingredient, i) => {
        hasIngredient = currentPotionIngredients.find(cur => cur.name == ingredient.name);
        hasWeight = currentPotionIngredients.find(cur => cur.weight >= ingredient.weight);
        
        if(!hasIngredient || !hasWeight) {
            return;
        }
    });
    
    if(hasIngredient && hasWeight) {
        document.getElementById('black-potion').style.display = 'none';
        document.getElementById('pink-potion').style.display = 'block';
    }
    
    // Reset recipe panel
    currentPotionIngredients.length = 0;
    ingredientsContainer.innerHTML = `
    <li class="ingredient"><span class="ingredientName">Ingrédient 1</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 2</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 3</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 4</span> (<span class="weight">0</span>g)</li>            </ul>
    `;
    potionIngredientsElements = document.querySelectorAll('.ingredient');
    potionIngredientNamesElements = document.querySelectorAll('.ingredient .ingredientName');
    potionIngredientWeightsElements = document.querySelectorAll('.ingredient .weight');
}



changeScene('village');
// changeScene('library');
// changeScene('kitchen');
// changeScene('house');
// changeScene('chief');
// changeScene('cave');
// changeScene('potion');
// changeScene('herborist');
// changeScene('forest');
// changeScene('flowers');
// changeScene('mineralogist');


// displayMessage(`CHEF DU VILLAGE 
// Où étais-tu passé ? Les autres se sont déjà enfermés dans l’abri. Maintenant, tu vas devoir te débrouiller seul. Je vais voir si d’autres villageois sont restés dehors. N’oublie pas, les Ombres n’aiment pas les champignons. J’en ai plein ma maison. Voilà ma clé, tu seras plus en sécurité.`)
addToInventory(items[30]);

let isTuto = false;
const tutoSteps = ['chief', 'collect', 'hand', 'select', 'throw', 'congratulations', 'end']
let tutoStep = tutoSteps[0];
const closeMessageBtn = document.getElementById('close-message-btn');
closeMessageBtn.addEventListener('click', (e) => {
    if(!isTuto){
        return;
    }
    switch(tutoStep){
        case 'chief':
            messageContainer.classList.remove('dialogue');
            messageContainer.style.zIndex = 30;
            displayMessage(`Cueille des champignons en cliquant dessus.`)
            tutoStep = tutoSteps[1];
            break;
        case 'collect':
            displayMessage(`Les champignons ont été ajoutés à ton inventaire. Clique sur l’icône sac à dos.`)
            tutoStep = tutoSteps[2];
            break;
        case 'hand':
            displayMessage(`Fais glisser un champignon jusqu'à le déposer dans ta main (cases en bas à droite).`)
            tutoStep = tutoSteps[3];
            break;
        case 'select':
            displayMessage(`Clique sur le champignon dans ta main.`)
            tutoStep = tutoSteps[4];
            break;
        case 'throw':
            displayMessage(`Clique sur un ennemi pour lancer un champignon et faire baisser sa vie.`)
            tutoStep = tutoSteps[5];
            break;
        case 'congratulations':
            displayMessage(`Bravo ! Inspecte les lieux, peut-être que se cacher dans la maison du chef n'est pas la seule possibilité.`)
            isTuto = false;
            messageContainer.style.zIndex = 0;
            break;
        case 'end':
            messageContainer.classList.remove('dialogue');
            tutoStep = '';
            isTuto = false;
            break;
    }
});

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch(e.key){
        case 'i':
            if (inventoryContainer.style.display === 'none') {
                inventoryContainer.style.display = 'flex';
                updateInventory();
            } else {
                inventoryContainer.style.display = 'none';
                zoomContainer.style.display = 'none';
            }
            break;
        case 'm':
            if (mapContainer.style.display === 'none') {
                mapContainer.style.display = 'block';
            } else {
                mapContainer.style.display = 'none';
            }
            break;
    }
})