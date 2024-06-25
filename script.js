// game.js

window.onload = function() {
    const container = document.getElementById('gameContainer');

    const scenes = {
        scene1: {
            background: 'images/backgrounds/village.webp',
            objects: [
                {
                    id: 'mushroom1',
                    src: 'images/clickable/mushroom.webp',
                    style: 'top: 200px; left: 150px; width: 100px; height: 100px',
                    message: 'You picked mushroom 1!',
                    action: function() {
                        alert(this.message);
                        document.getElementById(this.id).style.display = 'none';
                    }
                },
                {
                    id: 'nextRoom',
                    src: 'images/clickable/arrow.png',
                    style: 'top: 300px; left: 400px; width: 100px; height: 100px;',
                    action: function() {
                        changeScene('scene2');
                    }
                }
            ]
        },
        scene2: {
            background: 'images/backgrounds/potion.webp',
            objects: [
                {
                    id: 'mushroom2',
                    src: 'images/clickable/mushroom.webp',
                    style: 'top: 200px; left: 250px; width: 100px; height: 100px',
                    message: 'You picked mushroom 2!',
                    action: function() {
                        alert(this.message);
                        document.getElementById(this.id).style.display = 'none';
                    }
                },
                {
                    id: 'prevRoom',
                    src: 'images/clickable/arrow.png',
                    style: 'top: 100px; left: 50px; width: 100px; height: 100px;',
                    action: function() {
                        changeScene('scene1');
                    }
                }
            ]
        }
    };

    function changeScene(sceneName) {
        const scene = scenes[sceneName];
        container.style.backgroundImage = `url(${scene.background})`;
        container.innerHTML = '';

        scene.objects.forEach(obj => {
            let element;
            if (obj.type === 'div') {
                element = document.createElement('div');
                element.className = 'clickable';
            } else {
                element = document.createElement('img');
                element.src = obj.src;
                element.className = 'object';
            }
            element.id = obj.id;
            element.style = obj.style;
            element.addEventListener('click', obj.action.bind(obj));
            container.appendChild(element);
        });
    }

    changeScene('scene1');
};
