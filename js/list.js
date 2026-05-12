
var db;
var objectStore;
const dbVersion = 1;

function initDB() {
	//prefixes of implementation that we want to test
	window.indexedDB = window.indexedDB || window.mozIndexedDB || 
	window.webkitIndexedDB || window.msIndexedDB;

	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction || 
	window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
	window.msIDBKeyRange

	if (!window.indexedDB) {
		window.alert("Your browser doesn't support a stable version of IndexedDB.")
	}

	const chartsData = [
		{ id: 1, name: "Albert Einstein", born: "1879-3-14 9:30", tz: 2, lat: 48, long: 10.0,
			link: "?name=Albert.Einstain&lat=48.40&long=10.0&utc=1879-3-14%2011:30&tz=2" },
		{ id: 2, name: "Wolfgang Amadeus Mozart", born: "1756-1-27 18:00", tz: 2, lat: 47.8, long: 13.0,
			link: "?name=Mozart&lat=47.8&long=13.0&utc=1756-1-27%2020:00&tz=2" },
		{ id: 3, name: "Donald Trump", born: "1946-6-14 14:54", tz: -4, lat: 40.7, long: -73.8,
			link: "?name=Trump&lat=40.7&long=-73.8&utc=1946-6-14%2010:54&tz=-4" }
	];
	var request = window.indexedDB.open("astroDatabase", dbVersion);

	request.onerror = function(event) {
		console.log("error: ");
	};

	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: "+ db);
	};

	request.onupgradeneeded = function(event) {
		db = event.target.result;
		objectStore = db.createObjectStore("charts", {keyPath: "id", autoIncrement: true});

		for (var i in chartsData) {
		   objectStore.add(chartsData[i]);
		}
	}
	var request2 = window.indexedDB.open("astroDatabase", dbVersion);

	request2.onerror = function(event) {
		console.log("error: ");
	};

	request2.onsuccess = function(event) {
		db = request2.result;
		console.log("adding person to: "+ db);
		addPerson();
	};
	
	createTable();
}

function createTable() {
	var request = window.indexedDB.open("astroDatabase", dbVersion);

	request.onerror = function(event) {
		console.log("error: ");
	};

	request.onsuccess = function(event) {
		var db = request.result;
		console.log("create table opened db: "+ db);

		var objectStore = db.transaction("charts").objectStore("charts");

		$("#tableDiv").html('<table id="tableId" style="padding:0 15px 0 15px;">');
		$("#tableDiv").append("<tr>");
		$("#tableDiv").append("<th>Name</th>");
		$("#tableDiv").append("<th>Born</th>");
		$("#tableDiv").append("<th>TZ</th>");
		$("#tableDiv").append("<th>Lat</th>");
		$("#tableDiv").append("<th>Long</th>");
		$("#tableDiv").append("<th><button onclick='remove()'>Delete</button></th>");
		$("#tableDiv").append("</tr>");
		
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;

			if (cursor) {
				//alert("Name for id " + cursor.key + " is " + cursor.value.name + 
				//", born: " + cursor.value.born + ", tz: " + cursor.value.tz +
				//", lat: " + cursor.value.lat + ", long: " + cursor.value.long);
				$("#tableDiv").append("<tr>");
				$("#tableDiv").append("<td><a href='index.html" + cursor.value.link + "'>" + 
					cursor.value.name + "</a></td>");
				$("#tableDiv").append("<td>" + cursor.value.born + "</td>");
				$("#tableDiv").append("<td>" + cursor.value.tz + "</td>");
				$("#tableDiv").append("<td>" + cursor.value.lat + "</td>");
				$("#tableDiv").append("<td>" + cursor.value.long + "</td>");
				$("#tableDiv").append("<td><input value='" + cursor.key + "' type='checkbox'></td>");
				$("#tableDiv").append("</tr>");
				cursor.continue();
			} else {
				console.log("wrote table");
			}
		};
		
		$("#tableDiv").append("</table>");
	};

}

function searchToArray(searchStr) {
	var chartParams = [];
	var searchParams = searchStr.substring(1).split(/[&=]/);
	
	for (var i = 0; i < searchParams.length; i += 2) {
		chartParams[searchParams[i]] = decodeURI(searchParams[i+1]);
	}
	
	return chartParams;
}

function readAll() {
	var objectStore = db.transaction("charts").objectStore("charts");

	objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;

		if (cursor) {
			alert("Name for id " + cursor.key + " is " + cursor.value.name + 
			", born: " + cursor.value.born + ", tz: " + cursor.value.tz +
			", lat: " + cursor.value.lat + ", long: " + cursor.value.long);
			cursor.continue();
		} else {
			alert("No more entries!");
		}
	};
}

function addData() {
	var chartData = { name: "Donald Trump", born: "1946-6-14 10:54", tz: -4, lat: 40.7, long: -73.8 }
	add(chartData);
}

function addPerson() {
	if (location.search != "") {
		var chartParams = searchToArray(location.search);
		var person = prompt("Please enter a name", "New Person");
		if (person != null) {
			linkLocation = location.search.substring(1);
			var chartData = { 
				name: person, born: chartParams["utc"], tz: chartParams["tz"], 
				lat: chartParams["lat"], long: chartParams["long"], 
				link: "?name=" + person + "&" + linkLocation };
			add(chartData);
		}
	}
}

function add(chartData) {
	var transaction = db.transaction(["charts"], "readwrite");
	var objectStore = transaction.objectStore("charts");
	console.log("autoIncrement: " + objectStore.autoIncrement);
	var request = objectStore.put(chartData);
	
	request.onsuccess = function(event) {
		console.log("An entry was added to DB");
	};
	
	request.onerror = function(event) {
	   alert("Unable to add entry. It's already in the DB");
	}
}

function remove() {
	var i = 0
	
	var removed = $('input[type=checkbox]').each(function () {
		var id = parseInt($(this).val());
		var isChecked = (this.checked ? "1" : "0");
		if (isChecked == 1) {
			console.log("delete: " + id);

			var request = db.transaction(["charts"], "readwrite")
			.objectStore("charts")
			.delete(id);
			
			request.onsuccess = function(event) {
				console.log("deleted from DB");
			};
		}
	});

	createTable();
}


