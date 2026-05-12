
// init phaser
//var game = new Phaser.Game(800,600, Phaser.AUTO, 'game_div',
//                          { preload: preload, create: create, update: update});
var game = new Phaser.Game(600, 600, Phaser.CANVAS, 'game_div',
                          { preload: preload, create: create, update: update});

var Point = function (x, y) {
    "use strict";
    this.x = x;
    this.y = y;
};

// Add zodiac
var zodiacCenterX = game.width / 2 - 100;
var zodiacCenterY = game.height / 2;
var zodiacCtr = new Point(zodiacCenterX, zodiacCenterY);

var zodiac_diameter = 480;
var zodiac_radius = zodiac_diameter / 2;

var house = new Array(12);

var SkyBody = function (name, initR, initPhi) {
    "use strict";
    
    this.name = name;
    this.phi = initPhi;
    this.r = initR;
    this.x = zodiacCtr.x - this.r * Math.cos(this.phi * (Math.PI / 180.0));
    this.y = zodiacCtr.y - this.r * Math.sin(this.phi * (Math.PI / 180.0));
    
    this.rotate = function (dPhi) {
        this.phi = dPhi;
        if (this.phi >= 360) { this.phi -= 360; }
        this.x = zodiacCtr.x - this.r * Math.cos(this.phi * (Math.PI / 180.0));
        this.y = zodiacCtr.y - this.r * Math.sin(this.phi * (Math.PI / 180.0));
        
        //console.log('phi = ' + this.phi + ', x = ' + this.x + ', y = ' + this.y);
        
        return;
    };
};

var planetsInnerRadius = 140;

// Add inner planets
var zodiac = new SkyBody('zodiac', 0, 0);
var zodiac_sprite;
var earth = new SkyBody('earth', 0, 0);
var sun = new SkyBody('sun', planetsInnerRadius, 0);
var sun_sprite;
var moon = new SkyBody('moon', planetsInnerRadius, 0);
var moon_sprite;
var mercury = new SkyBody('mercury', planetsInnerRadius, 0);
var mercury_sprite;
var venus = new SkyBody('venus', planetsInnerRadius, 0);
var venus_sprite;
var mars = new SkyBody('mars', planetsInnerRadius, 0);
var mars_sprite;
var jupiter = new SkyBody('jupiter', planetsInnerRadius, 0);
var jupiter_sprite;
var saturn = new SkyBody('saturn', planetsInnerRadius, 0);
var saturn_sprite;
var uranus = new SkyBody('uranus', planetsInnerRadius, 0);
var uranus_sprite;
var neptune = new SkyBody('neptune', planetsInnerRadius, 0);
var neptune_sprite;
var pluto = new SkyBody('pluto', planetsInnerRadius, 0);
var pluto_sprite;

var innerPlanets = [sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto];
var innerSprites = [sun_sprite, moon_sprite, mercury_sprite, venus_sprite, mars_sprite,
                    jupiter_sprite, saturn_sprite, uranus_sprite, neptune_sprite, pluto_sprite];

var button;
var graphics;

var chartName, lat, long, tz;

function preload() {
    "use strict";
    // called first
    console.log("PRELOAD");
    game.stage.backgroundColor = '#ffffff';
    //game.load.image('zodiac', 'img/zodiac-f.gif');
    game.load.image('zodiac', 'img/zodiac-h.gif');
    //game.load.image('earth', 'img/earth_icon_t.png');
    game.load.image('moon', 'img/moon_icon_t.png');
    game.load.image('sun', 'img/sun_icon_t.png');
    game.load.image('mercury', 'img/mercury_icon_t.png');
    game.load.image('venus', 'img/venus_icon_t.png');
    game.load.image('mars', 'img/mars_icon_t.png');
    game.load.image('jupiter', 'img/jupiter_icon_t.png');
    game.load.image('saturn', 'img/saturn_icon_t.png');
    game.load.image('uranus', 'img/uranus_icon_t.png');
    game.load.image('neptune', 'img/neptune_icon_t.png');
    game.load.image('pluto', 'img/pluto_icon_t.png');

    if ((location.pathname.includes('index')) || (location.pathname === '')) {
        //game.load.spritesheet('button', 'img/buttons/button_sprite_sheet.png', 193, 71);
        //game.load.spritesheet('button', 'img/buttons/button_texture_atlas.png', 193, 71);
        game.load.spritesheet('button', 'img/buttons/stacked.png', 157, 47);        
    }
}

function create() {
    "use strict";
    
    console.log("CREATE");
        
    console.log("CREATE: ", zodiac.x, zodiac.y);
    console.log("CREATE: ", zodiacCenterX, zodiacCenterY);

	// FIXIT: Issues:
	// 1. Why do I have to subtract 100? i.e. why is the center at 400, 300 rather than 300 300?
	// 2. See above: zodiacCenterX = game.width / 2 - 100
    zodiac_sprite = game.add.sprite(zodiacCenterX, zodiacCenterY, 'zodiac');
    //zodiac_sprite = game.add.sprite(zodiac.x, zodiac.y, 'zodiac');
    zodiac_sprite.anchor.setTo(0.5, 0.5);
    
    //this.earth_sprite = game.add.sprite(earth.x, earth.y, 'earth');
    //this.earth_sprite.anchor.setTo(0.5, 0.5);
    
    createInnerPlanets();

    if ((location.pathname.includes('index')) || (location.pathname === '')) {
        button = game.add.button(78, 24, 'button', updateChartClicked, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
    }
    
    if ((location.pathname.includes('transits')) || 
        (location.pathname.includes('progressions'))) 
    {
        createOuterPlanets();
    } else {
        showNatalAspects = true;
    }
    
    graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0x808080, 1); // gray
      
    if (location.search) {
        console.log('LOCATION.SEARCH: ', location.search);
        var utcDate = paramsFromQuery();
        $('#cityLat').val(lat);
        $('#cityLong').val(long);
        var utcNow = getDateTime(utcDate);
        var ltcNow = getDateTime(new Date(utcDate.getTime() + tz * 3600000));
        $('#utcNowId').val(utcNow);
        $('#ltcNowId').val(ltcNow);

		name = nameFromQuery();
        $('#subTitleId').val(name);

        drawChart(utcDate, 0);
    } else {
        lat = $('#cityLat').val();
        long = $('#cityLong').val();
        var utcDate = new Date($('#utcNowId').val());

        drawChart(utcDate, 0);
    }
}

function nameFromQuery() {
    var parts = decodeURI(location.search.substring(1)).split('&');
    var name = parts[0].split('=');
    var nameTag = name[0];
    var nameText = name[1];
	return nameText;
}

function paramsFromQuery() {
    var params = {};
    var parts = decodeURI(location.search.substring(1)).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }

    lat = params['lat'];
    long = params['long'];
    tz = params['tz'];
    chartName = params['chartName'];
    var utcDate = new Date(params['utc']);
    return utcDate;
}

function createInnerPlanets() {
    for (var planetIdx = 0; planetIdx < innerPlanets.length; planetIdx++) {
        innerSprites[planetIdx] = game.add.sprite(
            innerPlanets[planetIdx].x, 
            innerPlanets[planetIdx].y, 
            innerPlanets[planetIdx].name);
        innerSprites[planetIdx].anchor.setTo(0.5, 0.5);
    }
}

var jDate = new Date(paramsFromQuery());
var startUpdate = jDate.getMilliseconds();
var updateMethod = "auto";

function update() {
    "use strict";
    // called 60 times per second

    if ((location.pathname.includes('transits')) ||
        (location.pathname.includes('progressions')))
    {
        if (updateMethod === "auto") {
            var days = 0.1;
            if (location.pathname.includes('progressions')) {
                days = 1.0
            }
            
            //console.log('update: ', jDate.getUTCDate(), jDate.getUTCDay)
            jDate.setMilliseconds(startUpdate + days * 86400000);
            if (location.pathname.includes('transits'))
                drawChart(jDate, 1);
            else if (location.pathname.includes('progressions'))
                drawChart(jDate, 2);
        }
    }
}

function updateChartClicked() {
    lat = $('#cityLat').val();
    long = $('#cityLong').val();
    var utcDate = new Date($('#utcNowId').val());

    drawChart(utcDate, 0);
}

var acText, mcText;

function drawHouses(utcDate) {
    console.log('drawHouses');
    
    var utcDay = utcDate.getDate();
    var utcMonth = utcDate.getMonth() + 1;
    var utcYear = utcDate.getFullYear();
    var utcTime = utcDate.getHours() + utcDate.getMinutes() / 60;

    console.log('UTC: ', utcYear, utcMonth, utcDay, utcTime);
    var julianDay = julian_day(utcDay, utcMonth, utcYear);    
    
    var t=FNcentury(julianDay,utcTime)
    var ra=FNramc(t,utcTime,-long);
    var ob=FNobl(t);

    var junk=placidus(ra,ob,FNrad(lat));
    sharedhsys="Placidus";
    //var junk=koch(ra,ob,FNrad(lat));
    //sharedhsys="Koch";
    
    zodiac_sprite.angle = house[1]; //subAngle(360, house[1]);
    console.log('house[1]: ', house[1]);
    console.log('zodiac_sprite.angle: ', zodiac_sprite.angle);

    graphics.clear();
    
    // AC + MC
    graphics.lineStyle(3, 0x808080, 1); // gray
    
    // AC
    graphics.moveTo(zodiac_sprite.x - zodiac_radius, zodiac_sprite.y);
    graphics.lineTo(zodiac_sprite.x + zodiac_radius, zodiac_sprite.y);
    
    if (acText) { acText.destroy(); }
    acText = game.add.text(zodiac_sprite.x - zodiac_radius, zodiac_sprite.y, 
        'AC: ' + (house[1]).toFixed(2), {font: "14px Arial"});
    
    for (var houseIdx = 1; houseIdx < house.length; houseIdx++) {
        console.log('house[' + houseIdx + ']', house[houseIdx])
    }
    
    // MC
    houseLine(house, 4, graphics, zodiac_radius);
    
    if (mcText) { mcText.destroy(); }
    mcText = game.add.text(zodiac_sprite.x, zodiac_sprite.y - zodiac_radius, 
        'MC: ' + (house[10]).toFixed(2), {font: "14px Arial"});
    
    // Other house lines
    graphics.lineStyle(1, 0x808080, 1); // gray
    houseLine(house, 2, graphics, zodiac_radius);
    houseLine(house, 3, graphics, zodiac_radius);
    houseLine(house, 5, graphics, zodiac_radius);
    houseLine(house, 6, graphics, zodiac_radius);
}

function houseLine(house, houseNum, graphics, zodiac_radius) {
    //var mcStartPhi = -180 - subAngle(house[houseNum], house[1]);
    var mcStartPhi = 180 + subAngle(house[houseNum], house[1]);
    console.log('mcStartPhi: ', mcStartPhi);
    var startX = zodiac_sprite.x + zodiac_radius * Math.cos(mcStartPhi * (Math.PI / 180.0));
    var startY = zodiac_sprite.y - zodiac_radius * Math.sin(mcStartPhi * (Math.PI / 180.0));
    
    var mcEndPhi = subAngle(house[houseNum + 6], house[7]);
    console.log('mcEndPhi: ', mcEndPhi);
    var endX = zodiac_sprite.x + zodiac_radius * Math.cos(mcEndPhi * (Math.PI / 180.0));
    var endY = zodiac_sprite.y - zodiac_radius * Math.sin(mcEndPhi * (Math.PI / 180.0));

    graphics.moveTo(startX, startY);
    graphics.lineTo(endX, endY);
}

function subAngle(a1, a2) {
    var subRes;
    if (a1 >= a2) {
        subRes = a1 - a2;
    } else {
        subRes = 360 + a1 - a2;
    }
    return subRes;
}

var utcDate;

function drawChart(jDate, transProgFlag) {
    console.log('jDate = ', jDate);
    var simDay = jDate.getDate();
    var simMonth = jDate.getMonth() + 1;
    var simYear = jDate.getFullYear();
    var simHrs = jDate.getHours();
    var simMin = jDate.getMinutes();
    
    if (transProgFlag === 0) { utcDate = jDate; }
    
    graphics.clear();
    drawHouses(utcDate);
    
    $('#simDate').val(('0' + simMonth).slice(-2) + '/' + 
                      ('0' + simDay).slice(-2) + '/' + 
                      simYear + ' ' +
                      ('0' + simHrs).slice(-2) + ':' +
                      ('0' + simMin).slice(-2));

    var birthDate = paramsFromQuery();
    var diffDates = jDate - birthDate;
    // Important below: Div by 365.0 below for progressions: year->day
    // IDK why 365.0 is more accurate than 365.2425
    var calcDate = new Date(birthDate.getTime() + diffDates/365.0);
    
    var calcDay = calcDate.getDate();
    var calcMonth = calcDate.getMonth() + 1;
    var calcYear = calcDate.getFullYear();
    var calcHrs = calcDate.getHours();
    var calcMin = calcDate.getMinutes();

    $('#calcDate').val(('0' + calcMonth).slice(-2) + '/' + 
                      ('0' + calcDay).slice(-2) + '/' + 
                      calcYear + ' ' +
                      ('0' + calcHrs).slice(-2) + ':' +
                      ('0' + calcMin).slice(-2));

//    d1=julian_day(simDay,simMonth,simYear);
//    var gmt1=FNdec(simHrs,simMin,0);
//    var t1=FNcentury(d1,gmt1);
//    junk=planets_aa1(t1);
//    planetLambda[2]=ex_moon(t1);

    if (transProgFlag === 0) {
        console.log('draw inner planets');
        
        d1=julian_day(simDay,simMonth,simYear);
        var gmt1=FNdec(simHrs,simMin,0);
        var t1=FNcentury(d1,gmt1);
        junk=planets_aa1(t1);
        planetLambda[2]=ex_moon(t1);

        for (var planetIdx = 0; planetIdx < innerPlanets.length; planetIdx++) {
            innerPlanets[planetIdx].rotate(
                zodiac_sprite.angle - planetLambda[planetIdx+1]);
            innerSprites[planetIdx].x = innerPlanets[planetIdx].x;
            innerSprites[planetIdx].y = innerPlanets[planetIdx].y;
        }
        markAspects(planetLambda, 0);
        innerPlanetLambda = planetLambda.slice();
    } else {
        console.log('draw outer planets');
        
        if (transProgFlag === 1) {
            d1=julian_day(simDay,simMonth,simYear);
            var gmt1=FNdec(simHrs,simMin,0);
            var t1=FNcentury(d1,gmt1);
            junk=planets_aa1(t1);
            planetLambda[2]=ex_moon(t1);
        } else if (transProgFlag === 2) {
            d1=julian_day(calcDay,calcMonth,calcYear);
            var gmt1=FNdec(calcHrs,calcMin,0);
            var t1=FNcentury(d1,gmt1);
            junk=planets_aa1(t1);
            planetLambda[2]=ex_moon(t1);
        } 

        var startIdx = (showFastPlanets) ? 0 : 5;
        for (var planetIdx = 0; planetIdx < outerPlanets.length; planetIdx++) {
            if (planetIdx < startIdx) {
                outerSprites[planetIdx].x = -50;
                outerSprites[planetIdx].y = -50;
            } else {
            outerPlanets[planetIdx].rotate(
                zodiac_sprite.angle - planetLambda[planetIdx+1]);
            outerSprites[planetIdx].x = outerPlanets[planetIdx].x;
            outerSprites[planetIdx].y = outerPlanets[planetIdx].y;
            }
        }

        if (showNatalAspects) {
            markAspects(innerPlanetLambda, 0);
        }
        markTransitAspects(innerPlanetLambda, planetLambda, transProgFlag);
        if (showTPAspects) {
            markAspects(planetLambda, 2);
        }
        
    }

    fillPlanetsTable(transProgFlag);
}

function fillPlanetsTable(transProgFlag) {
    let sunLong360 = planetLambda[1];
    let sunSignNum = Math.floor(sunLong360 / 30);
	if (transProgFlag === 0) {
    	$('#sunLong30Id').val((sunLong360 % 30).toFixed(2));
    	$('#sunSignId').val(signs[sunSignNum]);
	} else {
    	$('#tpSunLong30Id').val((sunLong360 % 30).toFixed(2));
    	$('#tpSunSignId').val(signs[sunSignNum]);
	}

    let moonLong360 = planetLambda[2];
    let moonSignNum = Math.floor(moonLong360 / 30);
	if (transProgFlag === 0) {
    	$('#moonLong30Id').val((moonLong360 % 30).toFixed(2));
    	$('#moonSignId').val(signs[moonSignNum]);
	} else {
    	$('#tpMoonLong30Id').val((moonLong360 % 30).toFixed(2));
    	$('#tpMoonSignId').val(signs[moonSignNum]);
	}

    let mercuryLong360 = planetLambda[3];
    let mercurySignNum = Math.floor(mercuryLong360 / 30);
	if (transProgFlag === 0) {
    	$('#mercuryLong30Id').val((mercuryLong360 % 30).toFixed(2));
    	$('#mercurySignId').val(signs[mercurySignNum]);
	} else {
    	$('#tpMercuryLong30Id').val((mercuryLong360 % 30).toFixed(2));
    	$('#tpMercurySignId').val(signs[mercurySignNum]);
	}

    let venusLong360 = planetLambda[4];
    let venusSignNum = Math.floor(venusLong360 / 30);
	if (transProgFlag === 0) {
    	$('#venusLong30Id').val((venusLong360 % 30).toFixed(2));
    	$('#venusSignId').val(signs[venusSignNum]);
	} else {
    	$('#tpVenusLong30Id').val((venusLong360 % 30).toFixed(2));
    	$('#tpVenusSignId').val(signs[venusSignNum]);
	}

    marsLong360 = planetLambda[5];
    var marsSignNum = Math.floor(marsLong360 / 30);
	if (transProgFlag === 0) {
    	$('#marsLong30Id').val((marsLong360 % 30).toFixed(2));
    	$('#marsSignId').val(signs[marsSignNum]);
	} else {
    	$('#tpMarsLong30Id').val((marsLong360 % 30).toFixed(2));
    	$('#tpMarsSignId').val(signs[marsSignNum]);
	}

    jupiterLong360 = planetLambda[6];
    var jupiterSignNum = Math.floor(jupiterLong360 / 30);
	if (transProgFlag === 0) {
    	$('#jupiterLong30Id').val((jupiterLong360 % 30).toFixed(2));
    	$('#jupiterSignId').val(signs[jupiterSignNum]);
	} else {
    	$('#tpJupiterLong30Id').val((jupiterLong360 % 30).toFixed(2));
    	$('#tpJupiterSignId').val(signs[jupiterSignNum]);
	}

    saturnLong360 = planetLambda[7];
    var saturnSignNum = Math.floor(saturnLong360 / 30);
	if (transProgFlag === 0) {
    	$('#saturnLong30Id').val((saturnLong360 % 30).toFixed(2));
    	$('#saturnSignId').val(signs[saturnSignNum]);
	} else {
    	$('#tpSaturnLong30Id').val((saturnLong360 % 30).toFixed(2));
    	$('#tpSaturnSignId').val(signs[saturnSignNum]);
	}

    uranusLong360 = planetLambda[8];
    var uranusSignNum = Math.floor(uranusLong360 / 30);
	if (transProgFlag === 0) {
    	$('#uranusLong30Id').val((uranusLong360 % 30).toFixed(2));
    	$('#uranusSignId').val(signs[uranusSignNum]);
	} else {
    	$('#tpUranusLong30Id').val((uranusLong360 % 30).toFixed(2));
    	$('#tpUranusSignId').val(signs[uranusSignNum]);
	}

    neptuneLong360 = planetLambda[9];
    var neptuneSignNum = Math.floor(neptuneLong360 / 30);
	if (transProgFlag === 0) {
    	$('#neptuneLong30Id').val((neptuneLong360 % 30).toFixed(2));
    	$('#neptuneSignId').val(signs[neptuneSignNum]);
	} else {
    	$('#tpNeptuneLong30Id').val((neptuneLong360 % 30).toFixed(2));
    	$('#tpNeptuneSignId').val(signs[neptuneSignNum]);
	}

    plutoLong360 = planetLambda[10];
    var plutoSignNum = Math.floor(plutoLong360 / 30);
	if (transProgFlag === 0) {
    	$('#plutoLong30Id').val((plutoLong360 % 30).toFixed(2));
    	$('#plutoSignId').val(signs[plutoSignNum]);
	} else {
    	$('#tpPlutoLong30Id').val((plutoLong360 % 30).toFixed(2));
    	$('#tpPlutoSignId').val(signs[plutoSignNum]);
	}

    meanNodeLong360 = planetLambda[11];
    var meanNodeSignNum = Math.floor(meanNodeLong360 / 30);
	if (transProgFlag === 0) {
    	$('#meanNodeLong30Id').val((meanNodeLong360 % 30).toFixed(2));
    	$('#meanNodeSignId').val(signs[meanNodeSignNum]);
	} else {
    	$('#tpMeanNodeLong30Id').val((meanNodeLong360 % 30).toFixed(2));
    	$('#tpMeanNodeSignId').val(signs[meanNodeSignNum]);
	}

    trueNodeLong360 = planetLambda[12];
    var trueNodeSignNum = Math.floor(trueNodeLong360 / 30);
	if (transProgFlag === 0) {
    	$('#trueNodeLong30Id').val((trueNodeLong360 % 30).toFixed(2));
    	$('#trueNodeSignId').val(signs[trueNodeSignNum]);
	} else {
    	$('#tpTrueNodeLong30Id').val((trueNodeLong360 % 30).toFixed(2));
    	$('#tpTrueNodeSignId').val(signs[trueNodeSignNum]);
	}

}

var aspectRadiusInner = zodiac_radius - 150;
var aspectRadiusOuter = zodiac_radius - 50;

// unnamedPlanets: An array of planets and their longitudes
// transProgFlag: 
// 0: natal, 1: intra-transit, 2: intra-progression
function markAspects(unnamedPlanets, transProgFlag) {
    var sunMoonMaxOrb = 6;
    var normalMaxOrb = 3;
    var planetIndex, planet2Index, maxOrb;
    var sunFlag = false;
    var moonFlag = false;
    
    console.log('markAspects');
    console.log('Sun long: ', unnamedPlanets[1])
    console.log('Moon long: ', unnamedPlanets[2])
    
    graphics.lineStyle(2, 0x808080, 1); // gray     
    graphics.drawCircle(zodiac_sprite.x, zodiac_sprite.y, aspectRadiusInner);     

    if (!showNatalAspects && !showTPAspects) { return }; 

    var planet2start;
    if (transProgFlag === 0) {
        planet2start = 1;
    } else {
        planet2start = (showFastPlanets) ? 1 : 6;
        if (transProgFlag === 2) {
            sunMoonMaxOrb = 1;
            normalMaxOrb = 1;
        }
    }

    for (planetIndex = planet2start; planetIndex < unnamedPlanets.length; planetIndex++) {
        for (planet2Index = planetIndex + 1;
            planet2Index < unnamedPlanets.length; planet2Index++) 
        {
            if ((planetIndex === 1) || (planet2Index === 1) ||
                (planetIndex === 2) || (planet2Index === 2)) 
            {
                maxOrb = sunMoonMaxOrb;
            } else {
                maxOrb = normalMaxOrb;
            }
            
            if ((planetIndex === 1) || (planet2Index === 1)) {
                sunFlag = true;
            } else {
                sunFlag = false;
            }
            if ((planetIndex === 2) || (planet2Index === 2)) {
                moonFlag = true;
            } else {
                moonFlag = false;
            }

            
            var longitude1 = unnamedPlanets[planetIndex];
            var longitude2 = unnamedPlanets[planet2Index];
            var longDiff = Math.min(
                Math.abs(longitude1 - longitude2),
                Math.abs(longitude1 + 360 - longitude2),
                Math.abs(longitude2 + 360 - longitude1));
            
            var a1 = zodiac_sprite.angle - longitude1;
            var a2 = zodiac_sprite.angle - longitude2;
            
            //console.log('--planet: ', planetIndex, planet2Index, longDiff);
            
            // Conjunction
            if (longDiff <= maxOrb) {
                //console.log('--conj: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                
                // Progression: Skip conj for moon and any planet except sun
                if ((moonFlag && !sunFlag) && (transProgFlag === 2)) break;
                drawAspectLine('conj', a1, a2, transProgFlag);
            }
            
            // Sextile
            if ((longDiff >= (60 - maxOrb)) && (longDiff <= (60 + maxOrb))) {
                //console.log('--sextile: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                
                // Progression: Skip sextile for moon and any planet
                if (moonFlag && (transProgFlag === 2)) break;
                drawAspectLine('sextile', a1, a2, transProgFlag);
            }
            
            // Trine
            if ((longDiff >= (120 - maxOrb)) && (longDiff <= (120 + maxOrb))) {
                //console.log('--trine: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                
                // Progression: Skip trine for moon and any planet
                if (moonFlag && (transProgFlag === 2)) break;
                drawAspectLine('trine', a1, a2, transProgFlag);
            }

            // Square
            if ((longDiff >= (90 - maxOrb)) && (longDiff <= (90 + maxOrb))) {
                //console.log('--square: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);

                // Progression: Skip square for moon and any planet except sun
                if ((moonFlag && !sunFlag) && (transProgFlag === 2)) break;
                drawAspectLine('square', a1, a2, transProgFlag);
            }

            // Opposition
            if ((longDiff >= (180 - maxOrb)) && (longDiff <= (180 + maxOrb))) {
                //console.log('--opposite: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);

                // Progression: Skip opposition for moon and any planet except sun
                if ((moonFlag && !sunFlag) && (transProgFlag === 2)) break;                
                drawAspectLine('opposite', a1, a2, transProgFlag);
            }

        }
    }
}

// unnamedPlanets: An array of planets and their longitudes
// transProgFlag: 
// 1: natal-transit, 2: natal-progression
function markTransitAspects(innerPlanets, outerPlanets, transProgFlag) {
    var sunMoonMaxOrb = 6;
    var normalMaxOrb = 3;
    var planetIndex, planet2Index, maxOrb;
    
    console.log('markTransitAspects');
    console.log('sun long: ', outerPlanets[1])
    console.log('moon long: ', outerPlanets[2])
    
    graphics.lineStyle(2, 0x808080, 1); // gray
    graphics.drawCircle(zodiac_sprite.x, zodiac_sprite.y, aspectRadiusInner);
    graphics.drawCircle(zodiac_sprite.x, zodiac_sprite.y, aspectRadiusOuter);       

    var planet2start = (showFastPlanets) ? 1 : 6;
    
    if (transProgFlag === 2) {
        sunMoonMaxOrb = 1;
        normalMaxOrb = 1;
    }
    
    for (planetIndex = 1; planetIndex < innerPlanets.length; planetIndex++) {
        for (planet2Index = planet2start; planet2Index < outerPlanets.length; planet2Index++) 
        {
            if ((planetIndex === 1) || (planet2Index === 1) ||
                (planetIndex === 2) || (planet2Index === 2)) 
            {
                maxOrb = sunMoonMaxOrb;
            } else {
                maxOrb = normalMaxOrb;
            }
            var longitude1 = innerPlanets[planetIndex];
            var longitude2 = outerPlanets[planet2Index];
            var longDiff = Math.min(
                Math.abs(longitude1 - longitude2),
                Math.abs(longitude1 + 360 - longitude2),
                Math.abs(longitude2 + 360 - longitude1));
            
            var a1 = zodiac_sprite.angle - longitude1;
            var a2 = zodiac_sprite.angle - longitude2;
            
            //console.log('--planet: ', planetIndex, planet2Index, longDiff);
            
            // Conjunction
            if (longDiff <= maxOrb) {
                //console.log('--conj: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                drawAspectLine('conj', a1, a2, 1);
            }
            
            // Sextile
            if ((longDiff >= (60 - maxOrb)) && (longDiff <= (60 + maxOrb))) {
                //console.log('--sextile: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                drawAspectLine('sextile', a1, a2, 1);
            }
            
            // Trine
            if ((longDiff >= (120 - maxOrb)) && (longDiff <= (120 + maxOrb))) {
                //console.log('--trine: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                drawAspectLine('trine', a1, a2, 1);
            }

            // Square
            if ((longDiff >= (90 - maxOrb)) && (longDiff <= (90 + maxOrb))) {
                //console.log('--square: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                drawAspectLine('square', a1, a2, 1);
            }

            // Opposite
            if ((longDiff >= (180 - maxOrb)) && (longDiff <= (180 + maxOrb))) {
                //console.log('--opposite: ', planetIndex, planet2Index, longDiff);
                //console.log('   --longitudes: ', longitude1, longitude2, ', a: ', a1, a2);
                drawAspectLine('opposite', a1, a2, 1);
            }

        }
    }
}

function drawAspectLine(aspectName, a1, a2, innerOuter) {
    switch(aspectName) {
        case 'conj':
            graphics.lineStyle(1, 0xff0000, 2);
            break;
        case 'trine':
            graphics.lineStyle(1, 0x0000ff, 2);
            break;
        case 'sextile':
            graphics.lineStyle(1, 0x0000ff, 2);
            break;
        case 'square':
            graphics.lineStyle(1, 0xff0000, 2);
            break;
        case 'opposite':
            graphics.lineStyle(1, 0xff0000, 2);
            break;
    }
    
    var aspectRadius1, aspectRadius2;
    
    if (innerOuter === 0) {
        aspectRadius1 = aspectRadiusInner;
        aspectRadius2 = aspectRadiusInner;
    } else if (innerOuter === 1) {
        aspectRadius1 = aspectRadiusInner;
        aspectRadius2 = aspectRadiusOuter;
    } else if (innerOuter === 2) {
        aspectRadius1 = aspectRadiusOuter;
        aspectRadius2 = aspectRadiusOuter;
    }
    
    var x1 = zodiac_sprite.x - aspectRadius1 * Math.cos(a1 * (Math.PI / 180.0));
    var y1 = zodiac_sprite.y - aspectRadius1 * Math.sin(a1 * (Math.PI / 180.0));

    var x2 = zodiac_sprite.x - aspectRadius2 * Math.cos(a2 * (Math.PI / 180.0));
    var y2 = zodiac_sprite.y - aspectRadius2 * Math.sin(a2 * (Math.PI / 180.0));

    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
}

