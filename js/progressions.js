
// init phaser
var game = new Phaser.Game(650,650, Phaser.AUTO, 'game_div'); 

var Point = function (x, y) {
    "use strict";
    this.x = x;
    this.y = y;
};

// Add zodiac
var zodiacCenterX = game.width / 2;
var zodiacCenterY = game.height / 2;
var zodiac = new Point(zodiacCenterX, zodiacCenterY);

var SkyBody = function (initR, initPhi) {
    "use strict";
    
    this.phi = initPhi;
    this.r = initR;
    this.x = zodiac.x + this.r * Math.cos(this.phi * (Math.PI / 180.0));
    this.y = zodiac.y + this.r * Math.sin(this.phi * (Math.PI / 180.0));
    
    this.rotate = function (dPhi) {
        this.phi += dPhi;
        if (this.phi >= 360) { this.phi -= 360; }
        this.x = zodiac.x + this.r * Math.cos(this.phi * (Math.PI / 180.0));
        this.y = zodiac.y + this.r * Math.sin(this.phi * (Math.PI / 180.0));
        
        console.log('phi = ' + this.phi +
                    ', x = ' + this.x + ', y = ' + this.y);
        
        return;
    };
};

var animationSpeed = 50;

// Add planets
var sun = new SkyBody(250, 0);
var mercury = new SkyBody(250, 0);
var venus = new SkyBody(250, 0);

var earth = new SkyBody(250, 0);
var moon = new SkyBody(250, 0);
var mars = new SkyBody(250, 0);

// Define first and only state
var main_state = {

    preload: function () {
        "use strict";
		// called first
        //game.stage.backgroundColor = '#71c5cf';
        game.stage.backgroundColor = '#ffffff';
        //game.load.image('zodiac', 'img/zodiac-f.gif');
        game.load.image('zodiac', 'img/zodiac-h.gif');
		//game.load.image('earth', 'img/earth_icon_t.png');
		game.load.image('moon', 'img/moon_icon_t.png');
		game.load.image('sun', 'img/sun_icon_t.png');
		game.load.image('mercury', 'img/mercury_icon_t.png');
		game.load.image('venus', 'img/venus_icon_t.png');
		game.load.image('mars', 'img/mars_icon_t.png');
	},

	create: function () {
        "use strict";
        
        this.zodiac_sprite =
            game.add.sprite(zodiac.x, zodiac.y, 'zodiac');
        this.zodiac_sprite.anchor.setTo(0.5, 0.5);
		//this.earth_sprite =
        //    game.add.sprite(earth.x, earth.y, 'earth');
        //this.earth_sprite.anchor.setTo(0.5, 0.5);
		this.moon_sprite =
            game.add.sprite(moon.x, moon.y, 'moon');
        this.moon_sprite.anchor.setTo(0.5, 0.5);
		this.sun_sprite =
            game.add.sprite(sun.x, sun.y, 'sun');
        this.sun_sprite.anchor.setTo(0.5, 0.5);
		this.mercury_sprite =
            game.add.sprite(mercury.x, mercury.y, 'mercury');
        this.mercury_sprite.anchor.setTo(0.5, 0.5);
		this.venus_sprite =
            game.add.sprite(venus.x, venus.y, 'venus');
        this.venus_sprite.anchor.setTo(0.5, 0.5);
		this.mars_sprite =
            game.add.sprite(mars.x, mars.y, 'mars');
        this.mars_sprite.anchor.setTo(0.5, 0.5);
    },

	update: function () {
        "use strict";
		// called 60 times per second
        
        this.zodiac_sprite.angle += animationSpeed / 365;

		moon.rotate(-animationSpeed / 28);
		this.moon_sprite.x = moon.x;
		this.moon_sprite.y = moon.y;
        mercury.rotate(-animationSpeed / 88);
		this.mercury_sprite.x = mercury.x;
		this.mercury_sprite.y = mercury.y;
        venus.rotate(-animationSpeed / 225);
		this.venus_sprite.x = venus.x;
		this.venus_sprite.y = venus.y;
        sun.rotate(-animationSpeed / 365);
		this.sun_sprite.x = sun.x;
		this.sun_sprite.y = sun.y;
        mars.rotate(-animationSpeed / 687);
		this.mars_sprite.x = mars.x;
		this.mars_sprite.y = mars.y;
		//this.sun_sprite.angle -= 1;
        
        /// Orig
        //this.hello_sprite.angle -= 1;   
	}
};

game.state.add('main', main_state);
game.state.start('main');