
function initMap() {
    var mapDiv = document.getElementById('map');
	
	var urlLat = 45.00;
	var urlLong = -93.25;
	var tzStr = -5;
	
    var centerPosition = {lat: 39.00, lng: -96.0};
    var markerPosition = {lat: urlLat, lng: urlLong};
	
	if (location.search != "") {
		var searchParams = location.search.substring(1).split("&");
		
		// TODO: Move the following loop to lib.js
		
		for (var i = 0; i <  searchParams.length; i++) {
			if (searchParams[i].startsWith("lat=")) {
				var urlLatStr = searchParams[i].substring(searchParams[i].indexOf("=") + 1);
				urlLat = Number.parseFloat(urlLatStr);
			} else if (searchParams[i].startsWith("long=")) {
				var urlLongStr = searchParams[i].substring(searchParams[i].indexOf("=") + 1);
				urlLong = Number.parseFloat(urlLongStr);
			} else if (searchParams[i].startsWith("tz=")) {
				tzStr = searchParams[i].substring(searchParams[i].indexOf("=") + 1);
			}
				
		}
	
		centerPosition = {lat: urlLat, lng: urlLong};
		markerPosition = {lat: urlLat, lng: urlLong};
		$('#utcDiff').val(tzStr);
	}

    var mapOptions = {
        scrollwheel: true,
        disableDoubleClickZoom: true,
        //panControl: false,
        streetViewControl: false,
        center: centerPosition,
        zoom: 4
    };

    var map = new google.maps.Map(mapDiv, mapOptions);
    var marker = new google.maps.Marker({
        position: markerPosition,
        title: 'Birth Location',
        map: map,
        draggable: true
    });

    function updateMarkerPosition(position) {
        console.log(position.lat(), position.lng());
        $('#cityLong').val(position.lng().toFixed(2));
        $('#cityLat').val(position.lat().toFixed(2));
    }

   // Add dragging event listeners.
    google.maps.event.addListener(marker, 'dragstart', function() {
        //console.log('Dragging...');
    });

    google.maps.event.addListener(marker, 'drag', function() {
        //console.log('Dragging...');
        updateMarkerPosition(marker.getPosition());
    });

    function setTimezone(position) {
        var lat = position.lat()
        var long = position.lng();
        $.ajax({
            url:"https://maps.googleapis.com/maps/api/timezone/json?location=" + 
            lat + "," + long + 
            "&timestamp=" + (Math.round((new Date().getTime())/1000)).toString()+
            "&sensor=false",
        }).done(function(response) {
            if(response.timeZoneId != null) {
                var hoursOffset = (response.rawOffset + response.dstOffset) / 3600;
                console.log('hoursOffset: ', hoursOffset);
                $('#utcDiff').val(hoursOffset);
                updateUtc();
            } else {
                $('#utcDiff').val(0);
                updateUtc();
            }
        });
    };

    google.maps.event.addListener(marker, 'dragend', function() {
        console.log('Drag ended');
        var position = marker.getPosition();
        updateMarkerPosition(position);
        var hoursDiff = setTimezone(position);
    });
}
