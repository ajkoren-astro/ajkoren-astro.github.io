var planetsOuterRadius = 250;

// Add outer planets

var sun_outer = new SkyBody('sun', planetsOuterRadius, 0);
var sun_outer_sprite;
var moon_outer = new SkyBody('moon', planetsOuterRadius, 0);
var moon_outer_sprite;
var mercury_outer = new SkyBody('mercury', planetsOuterRadius, 0);
var mercury_outer_sprite;
var venus_outer = new SkyBody('venus', planetsOuterRadius, 0);
var venus_outer_sprite;
var mars_outer = new SkyBody('mars', planetsOuterRadius, 0);
var mars_outer_sprite;
var jupiter_outer = new SkyBody('jupiter', planetsOuterRadius, 0);
var jupiter_outer_sprite;
var saturn_outer = new SkyBody('saturn', planetsOuterRadius, 0);
var saturn_outer_sprite;
var uranus_outer = new SkyBody('uranus', planetsOuterRadius, 0);
var uranus_outer_sprite;
var neptune_outer = new SkyBody('neptune', planetsOuterRadius, 0);
var neptune_outer_sprite;
var pluto_outer = new SkyBody('pluto', planetsOuterRadius, 0);
var pluto_outer_sprite;

var outerPlanets = 
    [sun_outer, moon_outer, mercury_outer, venus_outer, mars_outer, 
     jupiter_outer, saturn_outer, uranus_outer, neptune_outer, pluto_outer];
var outerSprites = 
    [sun_outer_sprite, moon_outer_sprite, mercury_outer_sprite, venus_outer_sprite,
     mars_outer_sprite, jupiter_outer_sprite, saturn_outer_sprite, uranus_outer_sprite,
     neptune_outer_sprite, pluto_outer_sprite];


function createOuterPlanets() {
    console.log("CREATE OUTER PLANETS");
    for (var planetIdx = 0; planetIdx < outerPlanets.length; planetIdx++) {
        outerSprites[planetIdx] = game.add.sprite(
            outerPlanets[planetIdx].x, 
            outerPlanets[planetIdx].y, 
            outerPlanets[planetIdx].name);
        outerSprites[planetIdx].anchor.setTo(0.5, 0.5);
    }
}

function setOuterZodiacAngle(ac) {
    sun_outer.rotate(ac);
    moon_outer.rotate(ac);
    mercury_outer.rotate(ac);
    venus_outer.rotate(ac);
    mars_outer.rotate(ac);
    jupiter_outer.rotate(ac);
    saturn_outer.rotate(ac);
    uranus_outer.rotate(ac);
    neptune_outer.rotate(ac);
    pluto_outer.rotate(ac);

    updateOuterSprites();
}

function updateOuterSprites() {
    for (var planetIdx = 0; planetIdx < outerPlanets.length; planetIdx++) {
        outerPlanets[planetIdx].rotate(zodiac_sprite.angle - planetLambda[planetIdx+1]);
        outerSprites[planetIdx].x = outerPlanets[planetIdx].x; 
        outerSprites[planetIdx].y = outerPlanets[planetIdx].y; 
    }
}

function FNcentury (jd,tme) {return ((jd-2415020)+((tme/24)-0.5))/36525}
function FNrad(a) {return Math.PI/180*a}
function FNdeg(a) {return 180/Math.PI*a}
function FNmod(a) {
    if (a>360) {return a-(parseInt(a/360)*360)}
    else { return a }}
function FNasn(a) {return Math.atan(a/Math.sqrt(1-a*a))}
function FNacs(a) {return Math.atan(Math.sqrt(1-a*a)/a)}

function FNramc(t,gmt,lon) {
	return FNrad(FNmod((6.6460656+(2400.0513*t)+(2.58E-05*t*t)+gmt)*15-lon))
}
function FNobl(t){return FNrad(23.452294-0.0130125*t)}

function midheaven(ra,ob) {
    var x=Math.atan(Math.tan(ra)/Math.cos(ob))
    if (x<0) {x=x+Math.PI}
    if (Math.sin(ra)<0) {x=x+Math.PI}
    return FNmod(FNdeg(x))
}

function ascendant(ra,ob,la) {
    asn=Math.atan(Math.cos(ra)/(-Math.sin(ra)*Math.cos(ob)-Math.tan(la)*Math.sin(ob)))
    if (asn<0) {asn=asn+Math.PI}
    if (Math.cos(ra)<0) {asn=asn+Math.PI}
    return FNmod(FNdeg(asn))
}

function julian_day (day, month, year) {
    var im=(12*(year+4800))+(month-3)
    var j=wholediv((2*(im-(wholediv(im,12))*12)+7+365*im),12)
    j=parseInt(j)+day+parseInt(wholediv(im,48))-32083
    if (j>2299171)
        j=j+parseInt(wholediv(im,4800))-parseInt(wholediv(im,1200))+38
    return j
}

function wholediv(a,b) {
    var result=a%b
    a=a-result
    result=a/b
    return result
}

//koch
function koch(ra,ob,la) {
    a1=FNasn(Math.sin(ra)*Math.tan(la)*Math.tan(ob))
    for (i=1; i < 13; i++) {
        d=FNmod(60+30*i)
        a2=d/90-1;kn=1
        if (d>=180) {kn=-1;a2=d/90-3}
        a3=FNrad(FNmod(FNdeg(ra)+d+a2*FNdeg(a1)))
        x=Math.atan(Math.sin(a3)/(Math.cos(a3)*Math.cos(ob)-kn*Math.tan(la)*Math.sin(ob)))
        if (x<0) {x=x+Math.PI}
        if (Math.sin(a3)<0) {x=x+Math.PI}
        house[i]=FNmod(FNdeg(x))
    }
    return true
}

//placidus
function placidus(ra,ob,la) {
    mc=midheaven(ra,ob)
    house[4]=FNmod(mc+180)
    house[1]=ascendant(ra,ob,la)
    console.log('placidus: house[1]: ', house[1])
    r1=ra+FNrad(30)
    house[5]=FNmod(plac(3,0,r1,ra,ob,la)+180)
    r1=ra+FNrad(60)
    house[6]=FNmod(plac(1.5,0,r1,ra,ob,la)+180)
    r1=ra+FNrad(120)
    house[2]=FNmod(plac(1.5,1,r1,ra,ob,la))
    r1=ra+FNrad(150)
    house[3]=FNmod(plac(3,1,r1,ra,ob,la))
    for (i=7; i < 13; i++) {house[i]=FNmod(house[i-6]+180)}
    return true
}

function plac(ff,y,r1,ra,ob,la) {
    x=-1
    if (y == 1) {x=1}
    for (i=1; i < 11; i++) {
        xx=FNacs(x*Math.sin(r1)*Math.tan(ob)*Math.tan(la))
        if (xx<0) {xx=xx+Math.PI}
        r2=ra+(xx/ff)
        if (y == 1) {r2=ra+Math.PI-(xx/ff)}
        r1=r2
    }
    lo=Math.atan(Math.tan(r1)/Math.cos(ob))
    if (lo<0) {lo=lo+Math.PI}
    if (Math.sin(r1)<0) {lo=lo+Math.PI}
    return FNdeg(lo)
}

