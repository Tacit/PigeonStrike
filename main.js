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
                {name: "spritesheet", url: "spritesheet.json"}])
        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource ) {
        console.log("loading: " + resource.url); 
        console.log("progress: " + loader.progress + "%");
    }
    document.body.appendChild(app.view);
}

function setup() {
    
    let background = new PIXI.Sprite(
        resources.background.texture
    );
    
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


    background.width = width;
    background.height = height;

    app.stage.addChild(background);
    app.stage.addChild(pigeon);

    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40),
        space = keyboard(32);

    space.press = () => {
        alert(pigeon.y);
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
    updatePlayer(delta);
}

function updatePlayer(delta){
    pigeon.x += pigeon.vx;
    pigeon.y += pigeon.vy;  

    if(pigeon.y <= 10)
        pigeon.y = 10;
    if(pigeon.y >= 415) {
        pigeon.y = 415;
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