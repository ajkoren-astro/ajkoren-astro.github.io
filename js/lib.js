var signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
             'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
    document.getElementById("menuId").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function longitudeToHouseNum(longitude, houseCusps) {
    var i;
    
    for (i = 0; i < 12; i++) {
        var houseNum = i;
        var nextHouseNum = (i < 11) ? i + 1 : 0;
        
        if (houseCusps[nextHouseNum] > houseCusps[houseNum]) {
            if (houseCusps[houseNum] < longitude && houseCusps[nextHouseNum] > longitude) {
                break;
            }
        } else {
            if (houseCusps[houseNum] < longitude || houseCusps[nextHouseNum] > longitude) {
                break;
            }
        }
    }
    //console.log('longitudeToHouseNum: longitude = ' + longitude);
    //console.log('i = ' + i + ', cusp = ' + houseCusps[i]);
    
    return (i + 1);
}

function longitudeInHouse(longitude, houseNum, houseCusps) {
    var houseIdx = houseNum - 1;
    var longitudeDiff = longitude - houseCusps[houseIdx];
    var longInHouse = (longitudeDiff > 0) ? longitudeDiff : longitudeDiff + 360;
    return longInHouse;
}

function getDateTimeNow() {
    'use strict';
    var jsDate = new Date();
    var dateTimeNow = {
        year: jsDate.getFullYear(),
        month: jsDate.getMonth() + 1,
        day: jsDate.getDate(),
        hour: jsDate.getHours(),
        minute: jsDate.getMinutes()
    };
    var strDateTimeNow = dateTimeNow.year + '-' + dateTimeNow.month + '-' +
        dateTimeNow.day + ' ' + dateTimeNow.hour + ':' + dateTimeNow.minute;
    console.log(strDateTimeNow);
    return strDateTimeNow;
}

function getUtcNow() {
    'use strict';
    var jsDate = new Date();
    var utcNow = {
        year: jsDate.getUTCFullYear(),
        month: jsDate.getUTCMonth() + 1,
        day: jsDate.getUTCDate(),
        hour: jsDate.getUTCHours(),
        minute: jsDate.getUTCMinutes()
    };
    var strUtcNow = utcNow.year + '-' + utcNow.month + '-' +
        utcNow.day + ' ' + utcNow.hour + ':' + utcNow.minute;
    console.log(strUtcNow);
    return strUtcNow;
}

function getDateTime(jsDate) {
    'use strict';
    console.log('getDateTime: ', jsDate);
    
    var asDateTime = {
        year: jsDate.getFullYear(),
        month: jsDate.getMonth() + 1,
        day: jsDate.getDate(),
        hour: jsDate.getHours(),
        minute: jsDate.getMinutes()
    };
    var strDateTime = asDateTime.year + '-' + asDateTime.month + '-' +
        asDateTime.day + ' ' + asDateTime.hour + ':' + asDateTime.minute;
    console.log(strDateTime);
    return strDateTime;
}

function updateUtc() {
    var ltc = new Date($('#ltcNowId').val());
    var hoursUtcDiff = $('#utcDiff').val();

    var jsUtc = new Date(ltc);
    if (isNaN(hoursUtcDiff)) { hoursUtcDiff = 0; }

    var jsUtc2 = (hoursUtcDiff > 0) ?
        new Date(jsUtc.setHours(jsUtc.getHours() - Math.abs(hoursUtcDiff))) :
        new Date(jsUtc.setHours(jsUtc.getHours() + Math.abs(hoursUtcDiff)));
    console.log('jsUtc2: ', jsUtc2, jsUtc2.length);
    var asUtc2 = getDateTime(jsUtc2);
    console.log('asUtc2: ', asUtc2, asUtc2.length);
    $('#utcNowId').val(asUtc2);        
}    

var showNatalAspects = false;
var showTPAspects = false;
var showFastPlanets = false;

$(document).ready(function () {
    'use strict';
    $('#getDateTimeId').click(function () {
        var localDt = getDateTimeNow();
        var localMin = localDt.split(':')[1];
        var localMinDispl = ('0' + localMin).slice(-2);
        localDt = localDt.replace(':' + localMin, ':' + localMinDispl);
        
        var utcDt = getUtcNow();
        var utcMin = utcDt.split(':')[1];
        var utcMinDispl = ('0' + utcMin).slice(-2);
        utcDt = utcDt.replace(':' + utcMin, ':' + utcMinDispl);
        
        $('#ltcNowId').val(localDt);
        $('#utcNowId').val(utcDt);
    });
    
    $('#getDateTimeId').click();
   
    $('#ltcNowId').on('input',function(e) {
        console.log('ltcNowId changed');
        updateUtc();
    });
    
    $('#utcDiff').on('change keydown paste input', function(e) {
        console.log('timezone changed');
        updateUtc();        
    });
    
    $("#transitsId").submit(function(event) {
        changeUrl($(this), event);
    });

    $("#progressionsId").submit(function(event) {
        changeUrl($(this), event);
    });

    $("#printId").submit(function(event) {
        changeUrl($(this), event);
    });

    $("#sendId").submit(function(event) {
        changeUrl($(this), event);
    });

	$("#saveId").submit(function(event) {
        changeUrl($(this), event);
    });

    // $("#saveId").submit(function(event) {
        // var loggedCookie = $.cookie("asLogged");
        
        // var lat = $('#cityLat').val();
        // $.cookie("lat", lat);
        // var long = $('#cityLong').val();
        // $.cookie("long", long);
        // var utc = $('#utcNowId').val()
        // $.cookie("utc", utc);
        // var tz = $('#utcDiff').val();
        // $.cookie("tz", tz);

        // if (loggedCookie == 1) {
            // window.location.href = "/save.html";
        // } else {
            // $.cookie("dest", "/save.html");
            // window.location.href = "/login.html";
        // }
        // return false;
    // });

    if (location.pathname.includes('transits')) {
        showFastPlanets = false;
        $('#fastPlanetsId').removeAttr('checked');
    } else if (location.pathname.includes('progressions')) {
        showFastPlanets = true;
        showTPAspects = true;
        $('#fastPlanetsId').attr("checked", "checked");
        $('#tpAspectsId').attr("checked", "checked");
    }
    
    if($.cookie("asLogged") < 0) {
        $.cookie("asLogged", "0");
        $('#pageHeaderId').text("Create a chart");
        $('#ddMenuId').text("Login");
    } else if ($.cookie("asLogged") == 1) {
        //var parts = decodeURI(location.search.substring(1)).split('&');
        //var chartName = parts["chartName"];
        $('#pageHeaderId').text("Chart: " + chartName);
        $('#ddMenuId').text($.cookie("name"));
    }
    
});

function listClicked() {
    $.cookie("dest", "/list.html");
    return false;
}

function changeUrl(obj, event) {
    event.preventDefault();
    var lat = $('#cityLat').val();
    var long = $('#cityLong').val();
    var utc = $('#utcNowId').val()
    var tz = $('#utcDiff').val();
    
    var url = obj.attr('action') + 
        '?lat=' + lat + '&long=' + long + '&utc=' + utc +
        '&tz=' + tz;
    console.log("changing to url: " + url)
    
    if ((obj.attr('action') == "print") || (obj.attr('action') == "send")) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}

function natalAspectsClicked(object) {
    console.log('natalAspectsClicked: ', object.checked);
    showNatalAspects = object.checked;
    if (location.pathname.includes('transits')) {
        drawChart(jDate, 1);
    } else if (location.pathname.includes('progressions')) {
        drawChart(jDate, 2);
    }
}

function tpAspectsClicked(object) {
    console.log('tpAspectsClicked: ', object.checked);
    showTPAspects = object.checked;
    if (location.pathname.includes('transits')) {
        drawChart(jDate, 1);
    } else if (location.pathname.includes('progressions')) {
        drawChart(jDate, 2);
    }
}

function fastPlanetsClicked(object) {
    console.log('fastPlanetsClicked: ', object.checked);
    showFastPlanets = object.checked;
    if (location.pathname.includes('transits')) {
        drawChart(jDate, 1);
    } else if (location.pathname.includes('progressions')) {
        drawChart(jDate, 2);
    }
}

var sliderStartDate;

function radioDateClicked(object) {
    console.log('radioDateClicked: ', object.checked);
 
    sliderStartDate = new Date($('#simDate').val());

    if (object.value === "manual") {
        $('#simDate').removeAttr('disabled');
        updateMethod = "manual";
    }
    else if (object.value === "slider") {
        $('#simDate').removeAttr('disabled');
        updateMethod = "slider";
		setSlider(0);
    }
    else if (object.value === "auto") {
        $('#simDate').attr("disabled", "disabled");
        updateMethod = "auto";
    }
}

function stop() {
    updateMethod = "manual";
}

function go() {
    updateMethod = "auto";
}

function setManualDate() {
    jDate = new Date($('#simDate').val());
    if (!isNaN(jDate.getTime())) {
        if (location.pathname.includes('transits'))
            drawChart(jDate, 1);        
        if (location.pathname.includes('progressions'))
            drawChart(jDate, 2);        
    }
}

function resetSlider() {
    sliderStartDate = new Date($('#simDate').val());
	$('#slider1').val(0);
	//document.querySelector('input[type=range]').value = 0;
}

function setSlider(max) {
    let sliderValue = 100;

	if (max) {
		$('#slider1').val(sliderValue);
	} else {
		sliderValue = $('#slider1').val();
	}

    sliderStartDate = new Date($('#simDate').val());

    if ($("input[name=radioSliderRange]:checked").val() === "days") {
        sliderStartDate.setTime(sliderStartDate.getTime() - 1 * sliderValue * 86400000);
    } else if ($("input[name=radioSliderRange]:checked").val() === "weeks"){
        sliderStartDate.setTime(sliderStartDate.getTime() - 7 * sliderValue * 86400000);
    } else if ($("input[name=radioSliderRange]:checked").val() === "months"){
        sliderStartDate.setTime(sliderStartDate.getTime() - 30.437 * sliderValue * 86400000);
    }
}

function showSliderValue(sliderValue) {
    if (updateMethod === "slider") {
        if ($("input[name=radioSliderRange]:checked").val() === "days") {
            jDate.setTime(sliderStartDate.getTime() + 1 * sliderValue * 86400000);
        } else if ($("input[name=radioSliderRange]:checked").val() === "weeks"){
            jDate.setTime(sliderStartDate.getTime() + 7 * sliderValue * 86400000);
        } else if ($("input[name=radioSliderRange]:checked").val() === "months"){
            jDate.setTime(sliderStartDate.getTime() + 30.437 * sliderValue * 86400000);
        }
        
        if (location.pathname.includes('transits'))
            drawChart(jDate, 1);        
        if (location.pathname.includes('progressions'))
            drawChart(jDate, 2);        
    }
}

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode( html ) {
    var a = document.createElement( 'a' ); a.innerHTML = html;
    return a.textContent;
}
