// game.js

    const container = document.getElementById('game-container');

    const inventoryIcon = document.getElementById('inventory-icon');
    const inventoryContainer = document.getElementById('inventory-container');
    const inventoryList = document.getElementById('inventory-list');

    const mapIcon = document.getElementById('map-icon');
    const mapContainer = document.getElementById('map-container');
    const hotspots = document.querySelectorAll('.hotspot');

    let draggedItem = null;
    let selectedItemInHand = null;

    // ITEMS (database)
    const items = [
        {index: 0, name: 'Fleur rose', description: "Une fleur rouge.", image: 'images/inventory/item_flower_pink.jpg', weight: 1},
        {index: 1, name: 'Fleur bleue', description: "Une fleur bleue.", image: 'images/inventory/item_flower_blue.jpg', weight: 1},
        {index: 2, name: 'Fleur orange', description: "Une fleur verte.", image: 'images/inventory/item_flower_orange.jpg', weight: 1},
        
        {index: 3, name: 'Pierre orange', description: "Une pierre orange.", image: 'images/inventory/item_rock_orange.jpg'},
        {index: 4, name: 'Pierre verte', description: "Une pierre verte.", image: 'images/inventory/item_rock_green.jpg'},
        {index: 5, name: 'Pierre bleue', description: "Une pierre bleue.", image: 'images/inventory/item_rock_blue.jpg'},
        
        {index: 6, name: 'Grand champignon', description: "Un grand champignon.", image: 'images/inventory/big_mushroom.jpg', weight: 3},
        {index: 7, name: 'Champignon moyen', description: "Un champignon de taille moyenne.", image: 'images/inventory/medium_mushroom.jpg', weight: 2},
        {index: 8, name: 'Petit champignon', description: "Un petit champignon.", image: 'images/inventory/small_mushroom.jpg', weight: 1},
        
        {index: 9, name: 'Plume de phénix', description: "Une plume de phénix.", image: 'images/inventory/item_feather.jpg'},
    
        {index: 10, name: 'Message incompréhensible trouvé sur la fontaine', description: `Utzw fufnxjw yjrutwfjwjrjs qf rfqjiynsnyts, hmjwfmji q'frsnjy Qzrnsf.
            Lkqn qj naiaza lhoq xqnwhya, ykjykyapv hw hcaajzwena Lkpekj z’Wahknew.
            Rqwt ftcfkswgt ng hngcw c lcocek, ugwng nc oavjkswg Rqvkqp Gvtrkug ffgvkgpv ng rqxqwqv cdtqnw.`, image: ''},
        {index: 11, name: 'Message trouvé sur la fontaine déchiffré', description: `Pour apaiser temporairement la malédiction, cherchez l'amanite Lumina.
    Pour un remède plus durable, concoctez la légendaire Potion d’Aeloria.
    Pour éradiquer le fléau à jamais, seule la mythique Potion Eternis détient le pouvoir absolu.`, image: ''},
    
        {index: 12, name: `Fiche incomplète trouvée dans le livre `, image: ''},
        {index: 13, name: `Extrait du Journal du Chef du Village`, image: '', description:`Aujourd'hui, j'ai rencontré la grand-mère Elara. Nous avons discuté de nos traditions et des anciens remèdes. Elle a mentionné une potion spéciale, qui pourrait résoudre les plus grands maux. Ses yeux brillaient d'une lueur inquiète, comme si elle savait quelque chose d'une importance capitale.`},
        {index: 14, name: `Indication 'double des clés'`, image: 'images/machines/balance_drawing.png', description:`Un curieux schéma représentant une balance.`, zoom: 'images/machines/balance_drawing.png'},
        {index: 15, name: 'Clés du laboratoire', image: 'images/inventory/potionKey.jpg', description: 'Les clés du laboratoire.'},
        
        {index: 16, name: '"Duaelinguae Epsile" p.27', image: 'images/uniqueCollectables/dialect1.jpg', description: 'Page trouvée dans un livre de langue.', zoom: 'images/uniqueCollectables/dialect1.jpg'},
        {index: 17, name: '"Le Delte illustré" p.18', image: 'images/uniqueCollectables/dialect2.jpg', description: "Page trouvée dans un livre de langue.", zoom: 'images/uniqueCollectables/dialect2.jpg'},
        {index: 18, name: '"Le dialiecte pas Bête" p.51', image: 'images/uniqueCollectables/dialect3.jpg', description: 'Page trouvée dans un livre de langue.', zoom: 'images/uniqueCollectables/dialect3.jpg'},
    ];
    

    // INVENTORY
    const inventory = [
        {
            name: 'Fleur rose',
            image: 'images/inventory/item_flower_pink.jpg',
            description: 'Une fleur rose.',
            count: 1,
            weight: 1
        },
        {
            name: 'Fleur orange',
            image: 'images/inventory/item_flower_orange.jpg',
            description: 'Une fleur orange.',
            count: 1,
            weight: 1
        },
        {index: 15, name: 'Clés du laboratoire', image: 'images/inventory/potionKey.jpg', description: 'Les clés du laboratoire.',
            count: 1
        },

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
            const index = hand.indexOf(selectedItemInHand);
            if (index !== -1) {
                hand[index].count -= 1;
                if (hand[index].count <= 0) {
                    hand.splice(index, 1); // Retirer l'item de la main s'il n'en reste plus
                    setSeletectedItemInHandToNull();
                }
                updateHand();
            }
    
            // Vérifier la condition après la mise à jour du poids
            checkBalanceCondition();
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
                    console.log('tu as une clé demandée !');
                    if(!inventory.find(invItem => invItem.name === this.key.name)){
                        console.log("et tu ne l'as pas !");
                        displayMessage(this.message);
                        return;
                    }
                    console.log("et tu l'as !");
                }
                console.log('change de scène !');
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
                // alert(this.item.name);
                // document.getElementById(this.id).style.display = 'none';
                addToInventory(this.item);
                console.log("message : " + this.message);
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
            // action: function(){
                
            // }
            action: function() {
                if(!this.isCollected) {
                    addToInventory(this.item);
                    collectedItems.add(this.id);
                    this.isCollected = true;
                }
                if(this.message){
                    displayMessage(this.message);
                }
            }
        },
        writing_machine: {
            type: 'div',
            action: function(){
                openWritingMachine();
            }
        }
    };

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
                    base: 'message',
                    style: 'top: 390px; left: 310px; width: 100px; height: 50px;',
                    message: 'Une fontaine vide.'
                },
                {
                    id: 'water',
                    base: 'uniqueCollectable',
                    style: 'top: 430px; left: 200px; width: 150px; height: 20px;',
                    item: items[10],
                    message: "Un bassin d'eau sur lequel il est écrit quelque chose..."
                },
                {
                    id: 'door_house',
                    base: 'door',
                    style: 'top: 330px; left: 520px; width: 50px; height: 70px;',
                    targetScene: 'house'
                },
                {
                    id: 'door_locked1',
                    base: 'message',
                    style: 'top: 340px; left: 290px; width: 40px; height: 50px;',
                    message: 'Porte verrouillée.'
                },
                {
                    id: 'door_locked2',
                    base: 'message',
                    style: 'top: 340px; left: 390px; width: 40px; height: 50px;',
                    message: 'Porte verrouillée.'
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
                    id: 'door_chief',
                    base: 'door',
                    style: 'top: 340px; left: 140px; width: 40px; height: 70px;',
                    message: 'Porte verrouillée.',
                    targetScene: 'chief'
                },
                {
                    id: 'door_library',
                    base: 'door',
                    style: 'top: 130px; left: 130px; width: 90px; height: 40px;',
                    targetScene: 'library'
                },
            ]
        },
        house: {
            background: 'images/backgrounds/house.jpg',
            objects: [
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
            objects: []  
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
            objects: []
        },
        cave: {
            background: 'images/backgrounds/cave.jpg',
            objects: []
        },
        library: {
            background: 'images/backgrounds/library.jpg',
            objects: [
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
        chief: {
            background: 'images/backgrounds/house_chief.jpg',
            objects: [
                {
                    id: 'left_arrow',
                    base: 'arrow_door',
                    style: "width: 40px; height: 40px; transform:rotateY(180deg);top:3px; left: 3px;",
                    targetScene: 'village'
                }
            ]
        }
    };

    const weighingMachine = document.getElementById('weighing-machine');
    const writingMachine = document.getElementById('writing-machine');

    function changeScene(sceneName) {
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
        }, 2000);
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
    function openWritingMachine(){
        // const machine = document.getElementById('writing-machine');
        writingMachine.style.display = 'flex';
    }
    
    function closeWritingMachine(){
        writingMachine.style.display = 'none';

    }

    function handleSubmitWritingMachine(){
        const select = document.getElementById('writing-machine-select').value;
        const input1 = document.getElementById('writing-machine-input-1').value;
        const input2 = document.getElementById('writing-machine-input-2').value;
        if(select == 'fountain' && input1 == 4 && input2 == 2){
            console.log("success !");
            addToInventory(items[11]);
        } else {
            console.log("fail !");
        }
    }



    changeScene('village');
    // changeScene('library');
    // changeScene('kitchen');
    // changeScene('house');
    // changeScene('chief');

