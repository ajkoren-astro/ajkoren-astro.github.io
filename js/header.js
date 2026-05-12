var lat, long, tz, chartName;

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

$(document).ready(function() {

    if($.cookie("asLogged") <= 0) {
        $.cookie("asLogged", "0");
        $('#pageHeaderId').text("Create a chart");
        $('#ddMenuId').text("Login");
        $('#menuId :first-child').remove();
        $('#menuId :first-child').remove();
        $('#menuId :first-child').remove();
        $('#menuId :first-child').text("Login");
    } else if ($.cookie("asLogged") == 1) {
        var startPageHeader = $('#pageHeaderId').text();
        paramsFromQuery();
        if (chartName != $.cookie("chartName")) {
            chartName = $.cookie("chartName");
        }
        $('#pageHeaderId').text(startPageHeader + chartName);
        $('#ddMenuId').text($.cookie("name"));
    }
});

function logClicked(sub) {
    var loggedCookie = $.cookie("asLogged");
    var nameCookie = $.cookie("name");
    
    if (loggedCookie < 1) {
        //$('#logId').attr("href", "/login.html");
        //$('#menuId').text("");
        $.cookie("dest", "/");
        window.location.href = "/login.html";
        return false;
    } else if (loggedCookie == 1) {
        $('#menuId :first-child').remove();
        $('#menuId :first-child').remove();
        $('#menuId :first-child').text("Login");
        
        $.cookie("asLogged", "0");
        $.removeCookie("name");
        $.removeCookie("email");
        $.removeCookie("dest");
        window.location.href = "/";
    }
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownClicked() {
    document.getElementById("menuId").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        // this is for an array of menus. length=1. But I'll leave it, for a future array.
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                console.log('menu clicked: ', openDropdown.id);
                openDropdown.classList.remove('show');
            }
        }
        return true;
    }
    return false;
}

$('#homeId').click
