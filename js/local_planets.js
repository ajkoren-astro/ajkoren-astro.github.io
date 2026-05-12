// Ref:
// Michael Erlewine's Manual of Computer programming for Astrologers

var datacounter=0

errmess=new Array("","Date out of range error: Only dates between 1900 and 2300 accepted.")

//planet = new Array(1)
planetLambda = new Array (10) // PlanetLambda = planet ecliptic longitude
innerPlanetLambda = new Array (10) // PlanetLambda = planet ecliptic longitude

PlanetData = new Array(144)

// Sun data
PlanetData [1] = 358.4758
PlanetData [2] = 35999.0498
PlanetData [3] = -.0002
PlanetData [4] = .01675
PlanetData [5] = -.4E-4
PlanetData [6] = 0
PlanetData [7] = 1
PlanetData [8] = 101.2208
PlanetData [9] = 1.7192
PlanetData [10] = .00045
PlanetData [11] = 0
PlanetData [12] = 0
PlanetData [13] = 0
PlanetData [14] = 0
PlanetData [15] = 0
PlanetData [16] = 0
// Mercury data
PlanetData [17] = 102.2794
PlanetData [18] = 149472.515
PlanetData [19] = 0
PlanetData [20] = .205614
PlanetData [21] = .2E-4
PlanetData [22] = 0
PlanetData [23] = .3871
PlanetData [24] = 28.7538
PlanetData [25] = .3703
PlanetData [26] = .0001
PlanetData [27] = 47.1459
PlanetData [28] = 1.1852
PlanetData [29] = .0002
PlanetData [30] = 7.009
PlanetData [31] = .00186
PlanetData [32] = 0
// Venus data
PlanetData [33] = 212.6032
PlanetData [34] = 58517.8039
PlanetData [35] = .0013
PlanetData [36] = .00682
PlanetData [37] = -.5E-4
PlanetData [38] = 0
PlanetData [39] = .7233
PlanetData [40] = 54.3842
PlanetData [41] = .5082
PlanetData [42] = -.14E-2
PlanetData [43] = 75.7796
PlanetData [44] = .8999
PlanetData [45] = .4E-3
PlanetData [46] = 3.3936
PlanetData [47] = .1E-2
PlanetData [48] = 0
// Mars data
PlanetData [49] = 319.5294
PlanetData [50] = 19139.8585
PlanetData [51] = .2E-3
PlanetData [52] = .09331
PlanetData [53] = .9E-4
PlanetData [54] = 0
PlanetData [55] = 1.5237
PlanetData [56] = 285.4318
PlanetData [57] = 1.0698
PlanetData [58] = .1E-3
PlanetData [59] = 48.7864
PlanetData [60] = .77099
PlanetData [61] = 0
PlanetData [62] = 1.8503
PlanetData [63] = -.7E-3
PlanetData [64] = 0
// Jupiter data
PlanetData [65] = 225.4928
PlanetData [66] = 3033.6879
PlanetData [67] = 0
PlanetData [68] = .04838
PlanetData [69] = -.2E-4
PlanetData [70] = 0
PlanetData [71] = 5.2029
PlanetData [72] = 273.393
PlanetData [73] = 1.3383
PlanetData [74] = 0
PlanetData [75] = 99.4198
PlanetData [76] = 1.0583
PlanetData [77] = 0
PlanetData [78] = 1.3097
PlanetData [79] = -.52E-2
PlanetData [80] = 0
// Saturn data
PlanetData [81] = 174.2153
PlanetData [82] = 1223.50796
PlanetData [83] = 0
PlanetData [84] = .05423
PlanetData [85] = -.2E-3
PlanetData [86] = 0
PlanetData [87] = 9.5525
PlanetData [88] = 338.9117
PlanetData [89] = -.3167
PlanetData [90] = 0
PlanetData [91] = 112.8261
PlanetData [92] = .8259
PlanetData [93] = 0
PlanetData [94] = 2.4908
PlanetData [95] = -.0047
PlanetData [96] = 0
// Uranus data
PlanetData [97] = 74.1757
PlanetData [98] = 427.2742
PlanetData [99] = 0
PlanetData [100] = .04682
PlanetData [101] = .00042
PlanetData [102] = 0
PlanetData [103] = 19.2215
PlanetData [104] = 95.6863
PlanetData [105] = 2.0508
PlanetData [106] = 0
PlanetData [107] = 73.5222
PlanetData [108] = .5242
PlanetData [109] = 0
PlanetData [110] = .7726
PlanetData [111] = .1E-3
PlanetData [112] = 0
// Neptune data
PlanetData [113] = 30.13294
PlanetData [114] = 240.45516
PlanetData [115] = 0
PlanetData [116] = .00913
PlanetData [117] = -.00127
PlanetData [118] = 0
PlanetData [119] = 30.11375
PlanetData [120] = 284.1683
PlanetData [121] = -21.6329
PlanetData [122] = 0
PlanetData [123] = 130.68415
PlanetData [124] = 1.1005
PlanetData [125] = 0
PlanetData [126] = 1.7794
PlanetData [127] = -.0098
PlanetData [128] = 0
// Pluto data
PlanetData [129] = 229.94722
PlanetData [130] = 144.91306
PlanetData [131] = 0
PlanetData [132] = 0.24864
PlanetData [133] = 0
PlanetData [134] = 0
PlanetData [135] = 39.51774
PlanetData [136] = 113.52139
PlanetData [137] = 0
PlanetData [138] = 0
PlanetData [139] = 108.95444
PlanetData [140] = 1.39601
PlanetData [141] = 0.00031
PlanetData [142] = 17.14678
PlanetData [143] = 0
PlanetData [144] = 0

planetname = new Array(10)

planetname[1] = "Sun "
planetname[2] = "Moon "
planetname[3] = "Mercury "
planetname[4] = "Venus "
planetname[5] = "Mars "
planetname[6] = "Jupiter "
planetname[7] = "Saturn "
planetname[8] = "Uranus "
planetname[9] = "Neptune "
planetname[10] = "Pluto "


function getCookie(Name) {
   var search = Name + "="
   //console.log('Dest Cookie length = ', document.cookie.length);
   //console.log('Dest Cookie content = ', document.cookie);
   if (document.cookie.length > 0) { // if there are any cookies
      offset = document.cookie.indexOf(search) 
      if (offset != -1) { // if cookie exists 
         offset += search.length 
         // set index of beginning of value
         end = document.cookie.indexOf(";", offset) 
         // set index of end of cookie value
         if (end == -1) 
            end = document.cookie.length
         return unescape(document.cookie.substring(offset, end))
      } 
   }
}

//function makechart () {
//    var check=eval(getCookie("Byear"))
//    if (isNaN(check)) {check=0}
//    if (check < 1900 || check > 2300) {
//        retval=1
//    } else {
//        retval=0
//
//        console.log('Bday = ', getCookie("Bday"))
//        console.log('Bmth = ', getCookie("Bmth"))
//        console.log('Byear = ', getCookie("Byear"))
//        console.log('Bhrs = ', getCookie("Bhrs"))
//        console.log('Bmin = ', getCookie("Bmin"))
//        d1=julian_day(
//            eval(getCookie("Bday")),eval(getCookie("Bmth")),eval(getCookie("Byear")))
//
//        var gmt1=FNdec(eval(getCookie("Bhrs")),eval(getCookie("Bmin")),0)
//        var t1=FNcentury(d1,gmt1)
//        junk=planets_aa1(t1)
//        planetLambda[2]=ex_moon(t1)
//    }
//    return retval
//}

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

function ex_moon(t) {
    var t2=t*t
    var da=t*36525
    var ln=FNmod(259.1833-0.05295392*da+(0.000002*t+0.002078)*t2)
    var ms=FNmod(279.69668+36000.7689*t+0.0003025*t2)
    var de=FNmod(350.737486+445267.114*t-0.001436*t2)
    var lp=FNmod(334.32956+0.11140408*da+(-0.000012*t+0.010325)*t2)
    var ma=FNmod(358.47584+35999.04975*t-0.00015*t2)
    var ml=FNmod(270.434164+13.1763965*da+(0.0000019*t-0.001133)*t2)
    var nu=(-(17.2327+0.01737*t)*FNsin(ln)-1.273*FNsin(2*ms))/3600
    var el=FNmod(296.1046083+477198.849*t+0.00919167*t*t)
    // Exact moon calculation starts here
    el=ma
    var ll=ml-lp
    var ff=ml-ln
    //Long term lunar perturbations coefficients
    var w=FNsin(51.2+20.2*t)
    var x=FNsin(193.4404-132.87*t-0.0091731*t2)*14.27
    var y=FNsin(ln)
    var z=-15.58*FNsin(ln+275.05-2.3*t)
    //Correction to elements
    ml=(0.84*w+x+7.261*y)/3600+ml
    ll=(2.94*w+x+9.337*y)/3600+ll
    de=(7.24*w+x+7.261*y)/3600+de
    el=-6.40*w/3600+el
    ff=(0.21*w+x-88.699*y-15.58*z)/3600+ff
    //Short term lunar perturbations
    l=22639.55*FNsin(ll)-4586.47*FNsin(ll-2*de)+2369.912*FNsin(2*de)
    l=l+769.02*FNsin(2*ll)-668.15*FNsin(el)
    l=l-411.61*FNsin(2*ff)-211.66*FNsin(2*ll-2*de)-205.96*FNsin(ll+el-2*de)
    l=l+191.95*FNsin(ll+2*de)-165.15*FNsin(el-2*de)
    l=l+147.69*FNsin(ll-el)-125.15*FNsin(de)-109.67*FNsin(ll+el)
    l=l-55.17*FNsin(2*ff-2*de)-45.099*FNsin(ll+2*ff)
    l=l+39.53*FNsin(ll-2*ff)-38.43*FNsin(ll-4*de)+36.12*FNsin(3*ll)
    l=l-30.77*FNsin(2*ll-4*de)+28.48*FNsin(ll-el-2*de)
    l=l-24.42*FNsin(el+2*de)
    l=l+18.61*FNsin(ll-de)+18.02*FNsin(el+de)+14.58*FNsin(ll-el+2*de)
    l=l+14.39*FNsin(2*ll+2*de)+13.9*FNsin(4*de)-13.19*FNsin(3*ll-2*de)
    l=l+9.7*FNsin(2*ll-el)+9.37*FNsin(ll-2*ff-2*de)-8.63*FNsin(2*ll+el-2*de)
    l=l-8.47*FNsin(ll+de)-8.096*FNsin(2*el-2*de)-7.65*FNsin(2*ll+el)
    l=l-7.49*FNsin(2*el)-7.41*FNsin(ll+2*el-2*de)-6.38*FNsin(ll-2*ff+2*de)
    l=l-5.74*FNsin(2*ff+2*de)-4.39*FNsin(ll+el-4*de)-3.99*FNsin(2*ll+2*ff)
    l=l+3.22*FNsin(ll-3*de)-2.92*FNsin(ll+el+2*de)-2.74*FNsin(2*ll+el-4*de)
    l=l-2.49*FNsin(2*ll-el-2*de)+2.58*FNsin(ll-2*el)+2.53*FNsin(ll-2*el-2*de)
    l=l-2.15*FNsin(el+2*ff-2*de)+1.98*FNsin(ll+4*de)+1.94*FNsin(4*ll)
    l=l-1.88*FNsin(el-4*de)+1.75*FNsin(2*ll-de)-1.44*FNsin(el-2*ff+2*de)
    l=l-1.298*FNsin(2*ll-2*ff)-1.27*FNsin(ll+el+de)+1.23*FNsin(2*ll-3*de)
    l=l-1.19*FNsin(3*ll-4*de)+1.18*FNsin(2*ll-el+2*de)-1.17*FNsin(ll+2*el)
    l=l-1.09*FNsin(ll-el-de)+1.06*FNsin(3*ll+2*de)-0.59*FNsin(2*ll+de)
    l=l-0.99*FNsin(ll+2*ff+2*de)-0.95*FNsin(4*ll-2*de)-0.57*FNsin(2*ll-6*de)
    l=l+0.64*FNsin(ll-4*de)+0.56*FNsin(el-de)+0.76*FNsin(ll-2*el+2*de)
    l=l+0.58*FNsin(2*ff-de)-0.55*FNsin(3*ll+el)+0.68*FNsin(3*ll-el)
    l=(l+0.557*FNsin(2*ll+2*ff-2*de)+0.538*FNsin(2*ll-2*ff-2*de))/3600
    return ml+l+nu
}

function planets_aa1(ct) {
    var i=0;dummy=0;var g=0;var xa=0;var ya=0;var za=0;var x1=0;var y1=0
    var z1=0;var m=0;var e=0;var ea=0;var au=0;var e1=0;var xw=0;var yw=0
    var zw=0;var ap=0;var an=0;var i_n=0;var x=0;var y=0;var r=0;var a=0
    datacounter=0

    for (i=1; i < 11; i++) {
        if (i==2) {i++}
        m=FNrad(FNmod(FNdeg(FNterms(ct))))
        e=FNdeg(FNterms(ct))
        ea=m
        for (a=1; a < 5; a++) {ea=m+e*Math.sin(ea)}
        au=ReadData()
        e1=0.01720209/(Math.pow(au,1.5)*(1-e*Math.cos(ea)))
        xw=-(au*e1)*Math.sin(ea)
        yw=(au*e1)*Math.pow(Math.abs(1-e*e),0.5)*Math.cos(ea)
        ap=FNterms(ct)
        an=FNterms(ct)
        i_n=FNterms(ct)
        x=xw
        y=yw

        //rotate
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=ap
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a);d=x;x=y;y=0
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=i_n
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a);g=y;y=x;x=d
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=an
        if (a<0) {a+=(2*Math.PI)}
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a)

        xh=x;yh=y;zh=g
        if (i==1)
            {xa=-xh;ya=-yh;za=-zh;ab=0}
        else
            {xw=xh+xa;yw=yh+ya;zw=zh+za}
        x=au*(Math.cos(ea)-e)
        y=au*Math.sin(ea)*Math.pow(Math.abs(1-e*e),0.5)

        //rotate
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=ap
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a);d=x;x=y;y=0
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=i_n
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a);g=y;y=x;x=d
        if (y==0) {y=1.7E-05};a=polara(x,y);r=polarr(x,y);a+=an
        if (a<0) {a+=(2*Math.PI)}
        if (a==0) {a=1.7E-05};x=r*Math.cos(a);y=r*Math.sin(a)

        xx=x;yy=y;zz=g
        xk=(xx*yh-yy*xh)/(xx*xx+yy*yy)
        br=0
        a2=a;r2=r;x2=xx;y2=yy;z2=zz

        //spherical i,xx,yy,zz,a,r,br,ab,ss,p,c 
        if (y2==0) {y2=1.7E-05};a2=polara(x2,y2);r2=polarr(x2,y2)
        c=FNdeg(a2)+br
        if (i==1 && ab==1) {c=FNmod(c+180)}
        c=FNmod(c)
        ss=c;y2=z2;x2=r
        if (y2==0) {y2=1.7E-05};a2=polara(x2,y2);r2=polarr(x2,y2)
        if (a2>0.35) {a2=a2+2*Math.PI}
        p=FNdeg(a2)

        ab=1
        if (i==1){
                x1=xx;y1=yy;z1=zz;
                }
        else{
            xx-=x1;yy-=y1;zz-=z1;xk=(xx*yw-yy*xw)/(xx*xx+yy*yy)
            }
        br=0.0057683*Math.sqrt(xx*xx+yy*yy+zz*zz)*FNdeg(xk)
        a2=a;r2=r;x2=xx;y2=yy;z2=zz

        //spherical i,xx,yy,zz,a,r,br,ab,ss,p,c 
        if (y2==0) {y2=1.7E-05};a2=polara(x2,y2);r2=polarr(x2,y2)
        c=FNdeg(a2)+br
        if (i==1 && ab==1) {c=FNmod(c+180)}
        c=FNmod(c)
        planetLambda[i]=c
	}
    return c
}

function polara(x,y){
    a=Math.atan(y/x)
    if (a<0) {a=a+Math.PI}
    if (y<0) {a=a+Math.PI}
    return a
}

function polarr(x,y){return Math.sqrt(x*x+y*y)}

function FNterms(ct){
    s=ReadData()
    s1=ReadData()
    s2=ReadData()
    return FNrad(s+s1*ct+s2*ct*ct)
}

function ReadData(){datacounter ++;return PlanetData[datacounter]}

function FNcentury (jd,tme) {return ((jd-2415020)+((tme/24)-0.5))/36525}
function FNrad(a) {return Math.PI/180*a}
function FNdeg(a) {return 180/Math.PI*a}
function FNsin(a) {return Math.sin(Math.PI/180*a)}
function FNcos(a) {return Math.cos(Math.PI/180*a)}
function FNdec(d,m,s) {return d+(m/60)+(s/3600)}
function FNmod(a) {
    if (a>360) {return a-(parseInt(a/360)*360)}
    else { return a }
}

function write_data() {
    nme1=getCookie("Bname")
    document.write("<CENTER><H3>Synastry data for "+nme1+"</H3><P>")
    document.write("Generated by Astromatch</CENTER><P>")

    document.write("<CENTER><TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0>")
    document.write("<TR><TD COLSPAN=2><CENTER><FONT SIZE=4><B>Planetary positions</B></FONT></CENTER><BR></TD></TR>")

    document.write("<TR><TD><B>"+nme1+"</B></TD></TR>")

    for (i=1; i < 11; i++) {
        document.write("<TR><TD>"+planetname[i]+planetLambda[i]+"</TD></TR>")
    }
}
