let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;
    let pigeon = null;
    let state;
    let app = null;
    let width = 800;
    let height = 600;
    let poos = [];
    let poosOnGround = [];
    let man = null;

function gameStart(){
    let type = "WebGL"
 
    if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
    }

    PIXI.utils.sayHello(type)
    app = new Application({width: 800, 
        height: 600, 
        antialias: true,
        transparent: false,
        resolution: 1});
    app.renderer.backgroundColor = 0x0000FF;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(width, height);

    loader.add([{name: "background", url: "town.jpeg"},
                {name: "spritesheet", url: "spritesheet.json"},
                {name: "poo",  url: "poo.png"},
                {name: "buisnessmansheet", url: "buisnessman.json"},
                {name: "pooOnGround",  url: "poo1.png"}])

        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource ) {
        let progress = document.getElementById("progress");
        let progressBar = document.getElementById("progressBar");
        progressBar.style.width = loader.progress + "%";
        progress.innerText = loader.progress;
        console.log("loading: " + resource.url); 
        console.log("progress: " + loader.progress + "%");
        if(loader.progress === 100) {
            let loadingScreen = document.getElementById("loadingScreen");
            loadingScreen.style.display = "none";
        }
    }
    document.body.appendChild(app.view);
}

function setup() {

    let background = new PIXI.Sprite(
        resources.background.texture
    );

    app.stage.updateLayersOrder = function () {
        app.stage.children.sort(function(a,b) {
            a.z = a.z || 0;
            b.z = b.z || 0;
            return b.z - a.z
        });
    };

    pigeon = createAnimatedSprite(resources.spritesheet, 'p', 1, 9);
    pigeon.gotoAndPlay(0);
    pigeon.animationSpeed=0.3;
    pigeon.baseScale = 0.2;
    pigeon.scale.x = pigeon.baseScale;
    pigeon.scale.y = pigeon.baseScale;
    pigeon.anchor.x = 0.5;
    pigeon.anchor.y = 0.5;
    pigeon.y = height/2;
    pigeon.x = width/2;
    pigeon.direction = 1;
    pigeon.vx = 0;
    pigeon.vy = 0.05;
    pigeon.isOnGround = false;
    pigeon.z = 50;

    background.width = width;
    background.height = height;
    background.z = 100;

    man = createAnimatedSprite(resources.buisnessmansheet, 'b', 0, 7);
    man.x = 0;
    man.scale.x = 0.5;
    man.scale.y = 0.5;
    man.y =  470;
    man.animationSpeed = 0.1;
    man.vx = 0.5;
    man.gotoAndPlay(0);
    man.z = 1;

    app.stage.addChild(background);
    app.stage.addChild(pigeon);

    app.stage.addChild(man);

    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40),
        space = keyboard(32);

    space.press = () => {

    }
    space.release = () => {
        if(pigeon.isOnGround)
            return;
        let poo = new PIXI.Sprite(
            resources.poo.texture
        );
        poo.x = pigeon.x;
        poo.y = pigeon.y;
        poo.vx = pigeon.vx;
        poo.vy = pigeon.vy;
        poo.scale.x = 0.1;
        poo.scale.y = 0.1;
        poo.z = 10;
        app.stage.addChild(poo);
        app.stage.updateLayersOrder();
        poos.push(poo);
    }

    right.press = () => {
        pigeon.vx = 1;

        if(pigeon.direction === -1){
            pigeon.rotation = 0;
            pigeon.scale.x *= -1;
        }
        pigeon.direction = 1;
    };
    right.release = () => {
        pigeon.vx = 0;
    };

    left.press = () => {
        pigeon.vx = -1;
        if(pigeon.direction === 1){
            pigeon.rotation = 0;
            pigeon.scale.x *= -1;
        }
        pigeon.direction = -1;
    };
    left.release = () => {
        pigeon.vx = 0;
    };

    up.press = () => {
        pigeon.vy = -0.7;
        pigeon.vx += 0.3 * pigeon.direction;
        pigeon.rotation = pigeon.direction * -Math.PI /8;
    };
    up.release = () => {
        pigeon.vy = 0.1;
        pigeon.vx = !left.isDown && !right.isDown ? 0 : pigeon.vx - 0.3 * pigeon.direction;
        pigeon.rotation = 0;
    };

    down.press = () => {
        if(pigeon.isOnGround)
            return;
        pigeon.vy = 1;
        pigeon.vx += 0.8 * pigeon.direction;
        pigeon.rotation = pigeon.direction * Math.PI /4;
    };
    down.release = () => {
        pigeon.vy = 0.1;
        pigeon.vx = !left.isDown && !right.isDown ? 0 : pigeon.vx - 0.8 * pigeon.direction;
        pigeon.rotation = 0;
    };

    state = play
    app.stage.updateLayersOrder();
    gameLoop();
}

function createAnimatedSprite(sheet, frameName , startFrame, frameCount) {
    let frames = [], i;
    for(i = startFrame ; i <= frameCount; i++)
    {
        let texture = sheet.textures[frameName + i + '.png'];
        frames.push(texture);
    }

    return new PIXI.extras.AnimatedSprite(frames);
}

function gameLoop(delta){
    requestAnimationFrame(gameLoop);

    state(delta);
}

function play(delta){
    app.stage.child
    updatePlayer(delta);
    updatePoo(delta);
    man.x += man.vx;
}

function updatePoo(delta) {
    poos.forEach(poo => {
        poo.x += poo.vx;
        poo.y += poo.vy;
        poo.vy += 0.08;
    });

    let pooToRemove = poos.filter( p => p.y > 500);
    pooToRemove.forEach( p => {
        let poo = new PIXI.Sprite(
            resources.pooOnGround.texture
        );
        poo.x = p.x;
        poo.y = p.y;
        poo.scale.x = 0.1;
        poo.scale.y = 0.1;
        poo.z = 10;
        poosOnGround.push(poo);
        app.stage.addChild(poo);
        app.stage.removeChild(p)
        app.stage.updateLayersOrder();
    });

    poos = poos.filter( p => p.y < 500);
}

function updatePlayer(delta){
    pigeon.x += pigeon.vx;
    pigeon.y += pigeon.vy;

    if(pigeon.y <= 10)
        pigeon.y = 10;
    if(pigeon.y >= 500) {
        pigeon.y = 500;
        pigeon.gotoAndStop(7);
        pigeon.isOnGround = true;
    } else {
        if(!pigeon.playing){
            pigeon.play();
            pigeon.isOnGround = false;
        }
    }
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;

        event.preventDefault();}
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;

        event.preventDefault();}
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}