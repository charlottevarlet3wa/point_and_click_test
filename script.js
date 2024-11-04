// game.js

const container = document.getElementById("game-container");

const inventoryIcon = document.getElementById("inventory-icon");
const inventoryContainer = document.getElementById("inventory-container");
const inventoryList = document.getElementById("inventory-list");

const mapIcon = document.getElementById("map-icon");
const mapContainer = document.getElementById("map-container");
const hotspots = document.querySelectorAll(".hotspot");

// Machines
const weighingMachine = document.getElementById("weighing-machine");
const writingMachine = document.getElementById("writing-machine");
const calendarMachine = document.getElementById("calendar-machine");
const forestMachine = document.getElementById("forest-machine");
const herboristMachine = document.getElementById("herborist-machine");
const crystalMachine = document.getElementById("crystal-machine");
const potionMachine = document.getElementById("potion-machine");

const machines = [
  weighingMachine,
  writingMachine,
  calendarMachine,
  forestMachine,
  herboristMachine,
  crystalMachine,
  potionMachine,
];
let isPotionMachineOpen = false;
let cauldronElem = null;

let draggedItem = null;
let selectedItemInHand = null;

let hasFlowers = false;
let hasCrystal = false;

import { items } from "./scripts/items.js";
import { scenes } from "./scripts/scenes.js";

const inventory = [];

const collectedItems = new Set();

inventoryContainer.style.display = "none";
inventoryIcon.addEventListener("click", () => {
  if (inventoryContainer.style.display === "none") {
    inventoryContainer.style.display = "flex";
    updateInventory();
  } else {
    inventoryContainer.style.display = "none";
    zoomContainer.style.display = "none";
  }
});

// HAND
const hand = Array(6).fill(null);
const handItems = document.querySelectorAll(".hand-item");

const handContainer = document.getElementById("hand-container");

window.allowDrop = function (event) {
  event.preventDefault();
};

function drag(event) {
  event.dataTransfer.setData("text", event.target.getAttribute("itemName"));
}

window.drop = function (event) {
  event.preventDefault();
  // Drop inventory to hand item
  const itemName = event.dataTransfer.getData("text");
  const item = inventory.find((invItem) => invItem.name === itemName);
  if (item && event.target.classList.contains("hand-item")) {
    const index = event.target.getAttribute("index");
    hand[Number(index)] = item;
    updateHand();
  }
  draggedItem = null;
};

window.selectItem = function (event) {
  const handItems = document.querySelectorAll(".hand-item");
  const index = event.target.getAttribute("index");
  selectedItemInHand = hand[Number(index)];
  handItems.forEach((handItem) => {
    handItem.style.borderColor = "black";
  });
  event.target.style.borderColor = "red";
};

function updateHand() {
  const handItems = document.querySelectorAll(".hand-item");
  handItems.forEach((handItem, index) => {
    if (hand[index] && hand[index].count > 0) {
      handItem.innerHTML = `<div class="hand-item-count">${hand[index].count}</div>`;
      handItem.style.backgroundImage = `url(${hand[index].image})`;
    } else {
      handItem.innerHTML = ""; // Clear the content
      handItem.style.backgroundImage = "none";
    }
  });
}

window.throwHandItem = function (panNumber, event) {
  if (selectedItemInHand && selectedItemInHand.weight) {
    const pan = document.getElementById(`pan-${panNumber}`);
    const weightDisplay = document.getElementById(`weight-${panNumber}`);

    // Créer une nouvelle image pour représenter l'item
    const itemImage = document.createElement("img");
    itemImage.src = selectedItemInHand.image;
    itemImage.className = "item-in-pan";
    itemImage.style.left = `${event.offsetX - 25}px`; // Centrer l'image sur le clic
    itemImage.style.top = `${event.offsetY - 25}px`; // Centrer l'image sur le clic
    itemImage.setAttribute("item", selectedItemInHand.name);

    // Ajouter l'image comme enfant de la balance cliquée
    pan.appendChild(itemImage);

    // Mettre à jour le poids total, en arrondissant à 2 décimales
    const currentWeight = parseFloat(weightDisplay.textContent) || 0.0;
    const newWeight = currentWeight + selectedItemInHand.weight;

    weightDisplay.textContent = newWeight.toFixed(1); // Arrondir à deux décimales

    // Ajouter un événement de clic pour retirer l'élément
    itemImage.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      const name = event.target.getAttribute("item");
      const item = items.find((item) => item.name === name);
      pan.removeChild(itemImage);
      const updatedWeight = parseFloat(weightDisplay.textContent) - item.weight;
      weightDisplay.textContent = updatedWeight.toFixed(1); // Arrondir à deux décimales
      addToInventory(item);
      checkBalanceCondition();
    });

    // Retirer un seul item de la main
    removeFromInventory(selectedItemInHand);

    // Vérifier la condition après la mise à jour du poids
    checkBalanceCondition();
  }
};

document.addEventListener("keydown", (e) => {
  // Ne pas déclencher l'événement si un champ input ou textarea est en focus
  const activeElement = document.activeElement;
  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA" ||
    activeElement.isContentEditable
  ) {
    return; // Ne rien faire si un champ de saisie est actif
  }
  const handItems = document.querySelectorAll(".hand-item");
  switch (e.key) {
    case "1":
    case "&": // Pour le clavier AZERTY
    case "End": // Pour le pavé numérique
      selectHandSlot(0, handItems);
      break;
    case "2":
    case "é": // Pour le clavier AZERTY
    case "ArrowDown": // Pavé numérique 2 (flèche bas)
      selectHandSlot(1, handItems);
      break;
    case "3":
    case '"': // Pour le clavier AZERTY
    case "PageDown": // Pavé numérique 3
      selectHandSlot(2, handItems);
      break;
    case "4":
    case "'": // Pour le clavier AZERTY
    case "ArrowLeft": // Pavé numérique 4
      selectHandSlot(3, handItems);
      break;
    case "5":
    case "(": // Pour le clavier AZERTY
    case "ArrowRight": // Pavé numérique 5
      selectHandSlot(4, handItems);
      break;
    case "6":
    case "-": // Pour le clavier AZERTY
    case "Home": // Pavé numérique 6
      selectHandSlot(5, handItems);
      break;
  }
});

function selectHandSlot(index, handItems) {
  selectedItemInHand = hand[index]; // Sélectionner l'élément correspondant dans la main
  handItems.forEach((handItem) => {
    handItem.style.borderColor = "black"; // Désélectionner tous les slots
  });
  handItems[index].style.borderColor = "red"; // Mettre en évidence le slot sélectionné
}

function removeFromInventory(item) {
  const indexInHand = hand.indexOf(item);
  if (indexInHand !== -1) {
    hand[indexInHand].count -= 1;
    if (hand[indexInHand].count <= 0) {
      // hand.splice(indexInHand, 1); // Retirer l'item de la main s'il n'en reste plus
      hand[indexInHand] = null;
      setSeletectedItemInHandToNull();
    }
    updateHand();
  }

  // Retirer également l'élément de l'inventaire s'il n'en reste plus
  const indexInInventory = inventory.findIndex(
    (invItem) => invItem.name === item.name
  );
  if (indexInInventory !== -1 && inventory[indexInInventory].count <= 0) {
    inventory.splice(indexInInventory, 1); // Retirer complètement l'élément de l'inventaire
  }

  updateInventory(); // Mettre à jour l'inventaire dans l'interface utilisateur
}

function checkBalanceCondition() {
  const weight1 =
    parseInt(document.getElementById("weight-1").textContent) || 0;
  const weight2 =
    parseInt(document.getElementById("weight-2").textContent) || 0;

  if (weight1 === weight2 - 4) {
    document.getElementById("balance_btn").style.display = "block";
  } else {
    document.getElementById("balance_btn").style.display = "none";
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
mapContainer.style.display = "none";
mapIcon.addEventListener("click", () => {
  if (mapContainer.style.display === "none") {
    mapContainer.style.display = "block";
  } else {
    mapContainer.style.display = "none";
  }
});

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", (event) => {
    const sceneName = event.target.getAttribute("data-scene");
    changeScene(sceneName);
  });
});

const baseObjects = {
  enemy: {
    src: "images/enemies/enemy.png",
    action: function () {
      if (selectedItemInHand) {
        switch (selectedItemInHand.name) {
          case "Grand champignon":
            this.hp -= 3;
            break;
          case "Champignon moyen":
            this.hp -= 2;
            break;
          case "Petit champignon":
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
          document.getElementById(this.id).style.display = "none";
          if (this.healthBarContainer) {
            this.healthBarContainer.style.display = "none";
          }
        }
      }
      // removeFromInventory(selectedItemInHand);
      if (this.hp <= 0) {
        document.getElementById(this.id).style.display = "none";
      }
    },
  },
  mushroom: {
    src: "mushroom.webp",
    action: function () {
      alert(this.message);
      document.getElementById(this.id).style.display = "none";
      addToInventory(this.item);
    },
  },
  balance_btn: {
    src: "images/machines/kitchen_balance_btn.png",
    action: function () {
      if (!this.isClicked) {
        const keysItem = { ...items[15], count: 1 };
        addToInventory(keysItem);
        this.isClicked = true;
      }
    },
  },
  door: {
    type: "div",
    action: function () {
      if (this.key) {
        if (!inventory.find((invItem) => invItem.name === this.key.name)) {
          displayMessage(this.message);
          return;
        }
      }
      changeScene(this.targetScene);
    },
  },
  arrow_door: {
    type: "img",
    src: "images/icons/arrow3.png",
    action: function () {
      changeScene(this.targetScene);
    },
  },
  collectable: {
    type: "div",
    action: function () {
      addToInventory(this.item);
    },
  },
  message: {
    type: "div",
    action: function () {
      displayMessage(this.message);
    },
  },
  uniqueCollectable: {
    type: "div",
    action: function () {
      if (!this.isCollected) {
        addToInventory(this.item);
        collectedItems.add(this.id);
        this.isCollected = true;
        // TODO marche pas
        document.getElementById("this.id").style.display = "none";
      }
      if (this.message) {
        displayMessage(this.message);
      }
    },
  },
  chief_mushrooms: {
    type: "div",
    action: function () {
      for (let i = 0; i < 10; i++) {
        addToInventory(items[8]);
      }
      for (let i = 0; i < 10; i++) {
        addToInventory(items[7]);
      }
      addToInventory(items[6]);
    },
  },
  writing_machine: {
    type: "div",
    action: function () {
      openWritingMachine();
    },
  },
  pink_potion: {
    src: "images/uniqueCollectables/pinkPotion.png",
    action: function () {
      document.getElementById(this.id).style.display = "none";
      addToInventory(this.item);
    },
  },
  calendar: {
    type: "div",
    action: function () {
      calendarMachine.style.display = "flex";
    },
  },
  herborist_chest: {
    type: "div",
    action: function () {
      herboristMachine.style.display = "flex";
    },
  },
  crystal_chest: {
    type: "div",
    action: function () {
      if (!hasCrystal) {
        crystalMachine.style.display = "flex";
      }
    },
  },
  cauldron: {
    type: "div",
    action: function () {
      if (isPotionMachineOpen) {
        addIngredientToPotion(selectedItemInHand);
      }
      potionMachine.style.display = "flex";
      isPotionMachineOpen = true;
      if (cauldronElem) {
        cauldronElem.style.cursor = "cell";
      }
    },
  },
  fountain: {
    type: "div",
    action: function () {
      if (!this.isClicked) {
        displayMessage(this.message);
        addToInventory(items[10]);
        addOptionToWritingMachineSelect(items[10]);
        this.isClicked = true;
        document.getElementById("fountain").style.cursor = "cell";
        return;
      }

      if (selectedItemInHand) {
        addToFountain(selectedItemInHand);
      }
    },
  },
  trophy: {
    src: "images/clickable/trophy.png",
    action: function () {
      displayMessage(
        `Merci à la famille Ogène
Pour la découverte de la Pierre Salvique`
      );
    },
  },
};

function addToFountain(item) {
  if (item.name == "Potion Ultima") {
    displayMessage(
      `Vous versez la potion dans la fontaine, qui s'illumine. Les ombres s'affaissent, et disparaissent.`
    );
    messageContainer.classList.add("dialogue");
    displayMessage(
      `Tu as réussi ! Les Ombres ne devraient pas revenir de sitôt, grâce à toi. Prends ce trophée en guise de remerciement.`
    );
    addToInventory(items[31]);
    isTuto = true;
    tutoStep = "end";
  } else {
    displayMessage(`Rien ne se passe.`);
  }
  removeFromInventory(item);
}

function changeScene(sceneName) {
  hideAllMachines();

  if (sceneName == "forest" && hasFlowers) {
    sceneName = "flowers";
  }

  if (sceneName == "forest") {
    forestMachine.style.display = "flex";
  } else {
    forestMachine.style.display = "none";
  }

  const scene = scenes[sceneName];
  container.style.backgroundImage = `url(${scene.background})`;
  container.innerHTML = "";

  scene.objects.forEach((obj) => {
    if (collectedItems.has(obj.id)) return;

    const baseObj = baseObjects[obj.base];
    let element;
    if (baseObj.type === "div") {
      element = document.createElement("div");
      element.className = "clickable";
    } else {
      element = document.createElement("img");
      element.src = baseObj.src;
      element.className = "object";
    }
    element.id = obj.id;
    element.style = obj.style;
    element.message = obj.message;
    element.targetScene = obj.targetScene;

    // HEALTHBAR
    if (obj.base === "enemy") {
      const healthBarContainer = document.createElement("div");
      healthBarContainer.classList.add("healthbar-container");
      healthBarContainer.style.position = "absolute";
      healthBarContainer.style.width = "50px";
      healthBarContainer.style.height = "5px";
      healthBarContainer.style.backgroundColor = "grey";
      const enemyWidth = parseInt(obj.style.split("width:")[1]) - 15;
      if (enemyWidth) {
        healthBarContainer.style.left = `${
          parseInt(obj.style.split("left:")[1]) + enemyWidth / 2 - 15
        }px`; // Centrer la barre de vie
      } else {
        healthBarContainer.style.left = `${
          parseInt(obj.style.split("left:")[1]) + 0
        }px`; // Centrer horizontalement
      }
      healthBarContainer.style.top = `${
        parseInt(obj.style.split("top:")[1]) - 15
      }px`; // Positionnement au-dessus de l'ennemi
      healthBarContainer.style.right = `${
        parseInt(obj.style.split("right:")[1]) + 10
      }px`; // Centrer horizontalement

      const healthBar = document.createElement("div");
      healthBar.classList.add("healthbar");
      healthBar.style.width = "100%"; // Taille initiale à 100%
      healthBar.style.height = "100%";
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
      obj.classList.forEach((className) => {
        element.classList.add(className);
      });
    }
    element.addEventListener("click", baseObj.action.bind(element));
    container.appendChild(element);
  });

  mapContainer.style.display = "none";
  inventoryContainer.style.display = "none";

  // Handle weighing machine visibility
  if (sceneName === "kitchen") {
    weighingMachine.style.display = "block";
  } else {
    weighingMachine.style.display = "none";
  }

  // Potion clickable cursor
  if (sceneName === "potion") {
    cauldronElem = document.getElementById("cauldron");
    cauldronElem.style.cursor = "pointer";
  }
}

const inventoryName = document.getElementById("inventory-name");
const inventoryDescription = document.getElementById("inventory-description");

function addToInventory(item) {
  const existingItem = inventory.find((invItem) => invItem.name === item.name);
  if (existingItem) {
    existingItem.count += 1;
  } else {
    const newItem = { ...item, count: 1 };
    inventory.push(newItem);
  }
  updateInventory();
  displayInventoryMessage(`1x ${item.name}`);
}

function displayInventoryMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.className = "inventory-message";
  messageContainer.textContent = message;
  document.body.appendChild(messageContainer);
  setTimeout(() => {
    document.body.removeChild(messageContainer);
  }, 4000);
}

function updateInventory() {
  inventoryList.innerHTML = "";
  inventory.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "inventory-item";
    itemElement.style.backgroundImage = `url(${item.image})`;

    // Ajout des attributs et événements pour le drag-and-drop
    itemElement.setAttribute("draggable", "true");
    itemElement.addEventListener("dragstart", drag);

    itemElement.setAttribute("itemName", item.name);

    const itemCount = document.createElement("p");
    itemCount.textContent = item.count;
    itemElement.appendChild(itemCount);

    // Ajouter l'événement pour le clic droit (contextmenu)
    itemElement.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      addItemToHand(item); // Appel de la fonction pour ajouter l'item dans la main
    });

    if (item.zoom) {
      const zoom = document.createElement("button");
      zoom.textContent = "+";

      zoom.addEventListener("click", () => {
        document.getElementById("zoom-container").style.display = "block";
        document.getElementById("zoom-image").src = item.zoom;
      });

      itemElement.appendChild(zoom);
    }

    itemElement.addEventListener("click", () => {
      inventoryName.textContent = item.name;
      inventoryDescription.textContent = item.description;
    });

    inventoryList.appendChild(itemElement);
  });
}

document.querySelectorAll(".hand-item").forEach((handItem, index) => {
  handItem.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    hand[index] = null;
    handItems.forEach((item) => (item.style.borderColor = "black"));
    updateHand();
  });
});

function addItemToHand(item) {
  const emptySlotIndex = hand.findIndex((slot) => slot === null); // Trouve un emplacement vide
  if (emptySlotIndex !== -1) {
    hand[emptySlotIndex] = item; // Ajoute l'item dans la main
    updateHand();
  } else {
    hand[0] = item;
    updateHand();
  }
}

const zoomContainer = document.getElementById("zoom-container");
window.closeZoom = function () {
  zoomContainer.style.display = "none";
};

// MESSAGE
const messageContainer = document.getElementById("message-container");
const messageContent = document.getElementById("message-content");
document
  .getElementById("close-message-btn")
  .addEventListener("click", closeMessage);
function displayMessage(message) {
  // Remplacer les séquences de saut de ligne par des balises <br>
  const formattedMessage = message.replace(/\n/g, "<br>");
  messageContent.innerHTML = formattedMessage;
  messageContainer.style.display = "block";
}

function closeMessage() {
  messageContainer.style.display = "none";
}

// OBJECTS

// Writing Machine
const writingMachineErrorElem = document.querySelector(
  "#writing-machine .error-message"
);
const writingMachineSelect = document.getElementById("writing-machine-select");

function openWritingMachine() {
  writingMachine.style.display = "flex";
  writingMachineErrorElem.textContent = "";
}

window.closeWritingMachine = function () {
  writingMachine.style.display = "none";
};

function addOptionToWritingMachineSelect(item) {
  if (item.value) {
    const newOption = document.createElement("option");
    newOption.textContent = item.name;
    newOption.value = item.value;
    writingMachineSelect.appendChild(newOption);
  }
}

window.handleSubmitWritingMachine = function () {
  const select = document.getElementById("writing-machine-select").value;
  const input1 = document.getElementById("writing-machine-input-1").value;
  const input2 = document.getElementById("writing-machine-input-2").value;

  if (!select) {
    writingMachineErrorElem.textContent =
      "Veuillez choisir un texte à traduire.";
    return;
  }

  if (!(select == "fountain" && input1 == 4 && input2 == 2)) {
    writingMachineErrorElem.textContent = `Aucune traduction n'a été trouvée. Choisissez d'autres valeurs.`;
    return;
  }

  const item = items.find((it) => it.value == select);
  if (item) {
    addToInventory(items[11]);
  }
};

// CALENDAR MACHINE

document
  .querySelector("#calendar-machine .close-btn")
  .addEventListener("click", (e) => {
    calendarMachine.style.display = "none";
  });

const temperatureElements = document.querySelectorAll("#calendar-machine td");
let temperatureColor = "black";

const styleBtns = document.querySelectorAll("#calendar-machine .style-btn");
styleBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    temperatureColor = e.target.getAttribute("data-color");

    styleBtns.forEach((styleBtn) => {
      styleBtn.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

temperatureElements.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.target.style.textDecoration =
      e.target.style.textDecoration == ""
        ? `line-through 1px ${temperatureColor}`
        : "";
  });
});

// FOREST MACHINE

// Remplir le select des heures
const hourSelect = document.getElementById("forest-hour");
for (let i = 0; i <= 23; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = i + "h";
  hourSelect.appendChild(option);
}

// Remplir le select des minutes
const minuteSelect = document.getElementById("forest-minute");
for (let i = 0; i <= 59; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.text = i + "m";
  minuteSelect.appendChild(option);
}

hourSelect.addEventListener("change", (e) => {
  if (e.target.value == 2 && minuteSelect.value == 11 && !hasFlowers) {
    hasFlowers = true;
    forestMachine.style.display = "none";
    changeScene("flowers");
  }
});

minuteSelect.addEventListener("change", (e) => {
  if (e.target.value == 11 && hourSelect.value == 2 && !hasFlowers) {
    hasFlowers = true;
    forestMachine.style.display = "none";
    changeScene("flowers");
  }
});

// HERBORIST MACHINE

const herbBtns = document.querySelectorAll(".herb-btn");
const herbImgs1 = document.querySelectorAll("#herb-btn-1 img");
const herbImgs2 = document.querySelectorAll("#herb-btn-2 img");
const herbImgs3 = document.querySelectorAll("#herb-btn-3 img");

const herboristChestIndexes = [0, 1, 2];
const herboristChest = [0, 2, 1];

// Close btn
document
  .querySelector("#herborist-machine .close-btn")
  .addEventListener("click", (e) => {
    herboristMachine.style.display = "none";
  });

herbBtns[0].addEventListener("click", (e) => {
  const btn = e.currentTarget;

  herbImgs1.forEach((img) => {
    img.style.display = "none";
  });

  const newIndex =
    (parseInt(btn.getAttribute("data-index")) + 1) % herbImgs1.length;
  btn.setAttribute("data-index", newIndex);

  herbImgs1[newIndex].style.display = "block";

  herboristChestIndexes[0] = newIndex;
  checkHerboristChest();
});
herbBtns[1].addEventListener("click", (e) => {
  const btn = e.currentTarget;

  herbImgs2.forEach((img) => {
    img.style.display = "none";
  });

  const newIndex =
    (parseInt(btn.getAttribute("data-index")) + 1) % herbImgs2.length;
  btn.setAttribute("data-index", newIndex);

  herbImgs2[newIndex].style.display = "block";

  herboristChestIndexes[1] = newIndex;
  checkHerboristChest();
});
herbBtns[2].addEventListener("click", (e) => {
  const btn = e.currentTarget;

  herbImgs3.forEach((img) => {
    img.style.display = "none";
  });

  const newIndex =
    (parseInt(btn.getAttribute("data-index")) + 1) % herbImgs3.length;
  btn.setAttribute("data-index", newIndex);

  herbImgs3[newIndex].style.display = "block";

  herboristChestIndexes[2] = newIndex;
  checkHerboristChest();
});

function checkHerboristChest() {
  for (let i = 0; i < 3; i++) {
    if (herboristChestIndexes[i] != herboristChest[i]) {
      return;
    }
  }
  herboristMachine.style.display = "none";
  addToInventory(items[22]);
}

// CRYSTAL MACHINE

const crystalDropElem = document.getElementById("crystal-drop");
const crystalImgs = document.querySelectorAll(".crystal-images img");

// Close btn
document
  .querySelector("#crystal-machine .close-btn")
  .addEventListener("click", () => {
    crystalMachine.style.display = "none";
  });

crystalDropElem.addEventListener("click", (e) => {
  switch (selectedItemInHand.name) {
    case "Pierre bleue":
      crystalImgs.forEach((img) => {
        img.style.display = "none";
      });
      crystalImgs[0].style.display = "block";
      break;
    case "Pierre verte":
      crystalImgs.forEach((img) => {
        img.style.display = "none";
      });
      crystalImgs[1].style.display = "block";
      break;
    case "Pierre orange":
      crystalImgs.forEach((img) => {
        img.style.display = "none";
        crystalMachine.style.display = "none";
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
      crystalImgs[2].style.display = "block";
      break;
    default:
      // displayMessage('Rien ne se passe');
      break;
  }
});

// POTION MACHINE

// Close btn
document
  .querySelector("#potion-machine .close-btn")
  .addEventListener("click", (e) => {
    potionMachine.style.display = "none";
    isPotionMachineOpen = false;
    if (cauldronElem) {
      cauldronElem.style.cursor = "pointer";
    }
  });

const currentPotionIngredients = [];

const potionIngredients = [
  {
    name: "Fleur lumineuse",
    weight: 0,
  },
  {
    name: "Cristal violet",
    weight: 5.3,
  },
  {
    name: "Grand champignon",
    weight: 0,
  },
  {
    name: "Plume de phénix",
    weight: 0,
  },
];

const ingredientsContainer = document.getElementById("ingredients");
let potionIngredientsElements = document.querySelectorAll(".ingredient");
let potionIngredientNamesElements = document.querySelectorAll(
  ".ingredient .ingredientName"
);
let potionIngredientWeightsElements = document.querySelectorAll(
  ".ingredient .weight"
);

// Mix btn
document.getElementById("mix-btn").addEventListener("click", (e) => {
  checkPotionIngredients();
});

function addIngredientToPotion(item) {
  if (item) {
    const { name, weight } = item;
    const existingIngredient = currentPotionIngredients.find(
      (ingredient) => ingredient.name === name
    );

    if (existingIngredient) {
      existingIngredient.weight += weight;
    } else {
      currentPotionIngredients.push({ name, weight });
    }

    removeFromInventory(item);

    updateRecipe();
  }
}

function updateRecipe() {
  currentPotionIngredients.forEach((ingredient, i) => {
    if (!potionIngredientsElements[i]) {
      const newIngredientElem = document.createElement("li");
      newIngredientElem.innerHTML = `<span class="ingredientName">Ingrédient 4</span> (<span class="weight">0</span>g)`;
      newIngredientElem.classList.add("ingredient");
      ingredientsContainer.appendChild(newIngredientElem);

      potionIngredientsElements = document.querySelectorAll(".ingredient");
      potionIngredientNamesElements = document.querySelectorAll(
        ".ingredient .ingredientName"
      );
      potionIngredientWeightsElements = document.querySelectorAll(
        ".ingredient .weight"
      );
    }
    potionIngredientNamesElements[i].textContent = ingredient.name;
    potionIngredientWeightsElements[i].textContent = ingredient.weight;
  });
}

function checkPotionIngredients() {
  let hasIngredient = true;
  let hasWeight = true;
  let isWrong = false;

  potionIngredients.forEach((ingredient, i) => {
    hasIngredient = currentPotionIngredients.find(
      (cur) => cur.name == ingredient.name
    );
    hasWeight = currentPotionIngredients.find(
      (cur) => cur.weight >= ingredient.weight
    );

    if (!hasIngredient || !hasWeight) {
      return;
    }
  });

  currentPotionIngredients.forEach((tryIngredient, i) => {
    const index = potionIngredients.find(
      (soluceIngr) => soluceIngr.name == tryIngredient.name
    );
    if (index == undefined) {
      isWrong = true;
    }
    if (isWrong) return;
  });

  if (hasIngredient && hasWeight && !isWrong) {
    document.getElementById("black-potion").style.display = "none";
    document.getElementById("pink-potion").style.display = "block";
  }

  // Reset recipe panel
  currentPotionIngredients.length = 0;
  ingredientsContainer.innerHTML = `
    <li class="ingredient"><span class="ingredientName">Ingrédient 1</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 2</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 3</span> (<span class="weight">0</span>g)</li>
    <li class="ingredient"><span class="ingredientName">Ingrédient 4</span> (<span class="weight">0</span>g)</li>            </ul>
    `;
  potionIngredientsElements = document.querySelectorAll(".ingredient");
  potionIngredientNamesElements = document.querySelectorAll(
    ".ingredient .ingredientName"
  );
  potionIngredientWeightsElements = document.querySelectorAll(
    ".ingredient .weight"
  );
}

changeScene("village");
// changeScene("library");
// changeScene("kitchen");
// changeScene("house");
// changeScene("chief");
// changeScene("cave");
// changeScene("potion");
// changeScene("herborist");
// changeScene("forest");
// changeScene("flowers");
// changeScene("mineralogist");

displayMessage(`CHEF DU VILLAGE
Où étais-tu passé ? Les autres se sont déjà enfermés dans l’abri. Maintenant, tu vas devoir te débrouiller seul. Je vais voir si d’autres villageois sont restés dehors. N’oublie pas, les Ombres n’aiment pas les champignons. J’en ai plein ma maison. Voilà ma clé, tu seras plus en sécurité.`);
addToInventory(items[30]);

let isTuto = true;
// let isTuto = false;
const tutoSteps = [
  "chief",
  "collect",
  "hand",
  "select",
  "throw",
  "congratulations",
  "end",
];
let tutoStep = tutoSteps[0];
const closeMessageBtn = document.getElementById("close-message-btn");
const closeTutoBtn = document.getElementById("close-tuto-btn");
closeMessageBtn.addEventListener("click", (e) => {
  if (!isTuto) {
    return;
  }
  switch (tutoStep) {
    case "chief":
      messageContainer.classList.remove("dialogue");
      closeMessageBtn.classList.add("next");
      closeTutoBtn.style.display = "inline-block";
      closeMessageBtn.textContent = "Suivant";
      messageContainer.style.zIndex = 30;
      displayMessage(`Cueille des champignons en cliquant dessus.`);
      tutoStep = tutoSteps[1];
      break;
    case "collect":
      displayMessage(
        `Les champignons ont été ajoutés à ton inventaire. Clique sur l’icône d'inventaire ou appuie sur la touche i.`
      );
      tutoStep = tutoSteps[2];
      break;
    case "hand":
      displayMessage(
        `Fais glisser un champignon jusqu'à le déposer dans ta main (cases en bas à droite), ou fais un clic droit dessus.`
      );
      tutoStep = tutoSteps[3];
      break;
    case "select":
      displayMessage(
        `Clique sur le champignon dans ta main ou utilise les raccourcis claviers (1, 2, 3, 4, 5, 6) pour le sélectionner.`
      );
      tutoStep = tutoSteps[4];
      break;
    case "throw":
      displayMessage(
        `Clique sur un ennemi pour lancer un champignon et faire baisser sa vie.`
      );
      tutoStep = tutoSteps[5];
      break;
    case "congratulations":
      displayMessage(
        `Bravo ! Inspecte les lieux, peut-être que se cacher dans la maison du chef n'est pas la seule possibilité.`
      );
      isTuto = false;
      messageContainer.style.zIndex = 0;
      closeMessageBtn.style.display = "none";
      break;
    case "end":
      messageContainer.classList.remove("dialogue");
      closeMessageBtn.classList.remove("next");
      closeMessageBtn.style.display = "block";
      closeMessageBtn.textContent = "X";
      closeTutoBtn.style.display = "none";
      tutoStep = "";
      isTuto = false;
      break;
  }
});

document.getElementById("close-tuto-btn").addEventListener("click", (e) => {
  messageContainer.classList.remove("dialogue");
  closeMessageBtn.classList.remove("next");
  closeMessageBtn.style.display = "inline-block";
  closeMessageBtn.textContent = "X";
  closeTutoBtn.style.display = "none";
  tutoStep = "";
  isTuto = false;
  closeMessage();
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "i":
      if (inventoryContainer.style.display === "none") {
        inventoryContainer.style.display = "flex";
        updateInventory();
      } else {
        inventoryContainer.style.display = "none";
        zoomContainer.style.display = "none";
      }
      break;
    case "m":
      if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
      } else {
        mapContainer.style.display = "none";
      }
      break;
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function hideAllMachines() {
  machines.forEach((machine) => (machine.style.display = "none"));
}
