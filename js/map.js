

var map = null;
var dm;
var directionsManager;
var countRoute = 0;
var locations = [];
var routeinfo = "";
var credentials = '';
// get the bing map key https://msdn.microsoft.com/en-us/library/ff428642.aspx
credentials = "ArZxGw7TYxstZjcAPEHLJ0aaHuuxy1GiRwLFOXW9i0Df61T9LAluZdJgilhf0Vdh";

function GetMap(countryName) {

	// countryName - name of the country from the CRM's form
	//var countryName = parent.Xrm.Page.getAttribute("new_name").getValue();
	//var countryName = "th";

	// calling virtual earth api
	var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations?countryRegion=" + countryName + "&key=" + credentials + "&jsonp=GeocodeCallback";

	//var ouroffice = "http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/47.610,-122.107/15?mapSize=500,500&pp=47.610,-122.107;21;OurOffice&key="+ credentials + "&jsonp=GeocodeCallback";

	CallRestService(geocodeRequest);
	//getDistanceMatrix();
}

function GeocodeCallback(result) {

	if (result && result.resourceSets && result.resourceSets.length > 0 && result.resourceSets[0].resources && result.resourceSets[0].resources.length > 0) {

		var coordinates = result.resourceSets[0].resources[0].point.coordinates;
		var centerPoint = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);

		map = new Microsoft.Maps.Map(document.getElementById("mapDiv"),
			{
				credentials: credentials,
				center: centerPoint,
				mapTypeId: Microsoft.Maps.MapTypeId.road,
				zoom: 5
			});

		var pushpin = new Microsoft.Maps.Pushpin(map.getCenter());
		map.entities.push(pushpin);
	}
}

function CallRestService(request) {
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", request);
	document.body.appendChild(script);

}




function gotoOffice() {
	map = new Microsoft.Maps.Map(document.getElementById("mapDiv"),
		{
			credentials: credentials,
			center: new Microsoft.Maps.Location(12.910377, 100.858133),
			zoom: 15
		});

	var center = map.getCenter();
	//Create custom Pushpin
	var pin = new Microsoft.Maps.Pushpin(center, {
		title: 'Together Teamsolutions',
		subTitle: 'our office',
		//Zoom : 500
		// text: 'our office'
	});
	//Add the pushpin to the map
	map.entities.push(pin);
}

function addmoreLocation() {
	dm = null;
	map = new Microsoft.Maps.Map(document.getElementById("mapDiv"),
		{
			credentials: credentials,
			center: new Microsoft.Maps.Location(12.910377, 100.858133),
			zoom: 12
		});

	locations = [{ lat: 12.910377, long: 100.858133, titles: 'Our Office' }, { lat: 12.934652, long: 100.883655, titles: 'Central Festival' },
	{ lat: 12.927435, long: 100.874596, titles: 'Walking Street' },
	{ lat: 12.972820, long: 100.889117, titles: 'Sanctuary of Truth' }, { lat: 12.833965, long: 100.942042, titles: 'Dolphin ' }];

	//locations = [{ lat: 12.910377, long: 100.858133, titles: 'Our Office' }, { lat: 12.934652, long: 100.883655, titles: 'Central Festival' }];


	var len = locations.length;


	infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
		visible: false
	});

	//Assign the infobox to a map instance.
	infobox.setMap(map);

	for (var i = 0; i < len; i++) {


		var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(locations[i].lat, locations[i].long), {
			title: locations[i].titles
		});

		//Store some metadata with the pushpin.
		pin.metadata = {
			title: locations[i].titles,
			description: 'Description for pin' + i,
			startla: locations[0].lat,
			startlong: locations[0].long,
			endla: locations[i].lat,
			endlong: locations[i].long

		};
		//Add a click event handler to the pushpin.
		Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
		map.entities.push(pin);
		if (i > 0) {
			getRoute(locations[0].lat, locations[0].long, locations[i].lat, locations[i].long);
		}

	}



}

function pushpinClicked(e) {
	console.log("bbbb");
	//Make sure the infobox has metadata to display.
	if (e.target.metadata) {
		//Set the infobox options with the metadata of the pushpin.
		infobox.setOptions({
			location: e.target.getLocation(),
			title: e.target.metadata.title,
			description: e.target.metadata.description,
			visible: true
		});

		Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
			//Generate some routes.
			getRoute(e.target.metadata.startla, e.target.metadata.startlong, e.target.metadata.endla, e.target.metadata.endlong);


		});

		Microsoft.Maps.loadModule("Microsoft.Maps.Traffic", function () {
			//Create an instance of the traffic manager and bind to map.
			trafficManager = new Microsoft.Maps.Traffic.TrafficManager(map);

			//Display the traffic data.
			trafficManager.show();
		})
	}


}

function getRoute(startla, endla, startlong, endlong, title) {
	//console.log("1="+startla, endla);
	console.log("2=" + startlong, endlong);
	if (dm != null) {
		dm.clearAll();
	}

	Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {

		dm = new Microsoft.Maps.Directions.DirectionsManager(map);
		dm.setRequestOptions({
			routeMode: Microsoft.Maps.Directions.RouteMode.driving,
			distanceUnit: Microsoft.Maps.Directions.DistanceUnit.km
		});
		dm.setRenderOptions({
			autoUpdateMapView: false,
			drivingPolylineOptions: {
				strokeColor: 'blue',
				strokeThickness: 3
			}
		});



		dm.addWaypoint(new Microsoft.Maps.Directions.Waypoint({
			location: new Microsoft.Maps.Location(startla, endla)
		}));
		dm.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ address: 'B', location: new Microsoft.Maps.Location(startlong, endlong) }));

		//console.log(dm);
		Microsoft.Maps.Events.addHandler(dm, 'directionsUpdated', function (args) {
			var route = args.routeSummary;
			showRoute(route);
			//dm.dispose();
			//dm.clearAll();
		});

		dm.calculateDirections();
		dm.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });


	});

}

function showRoute(route) {
	//console.log(route);

	//for (var i = 0; i < locations.length; i++) {

	var distance = Math.round(route[0].distance * 100) / 100;
	var time = Math.round(route[0].time / 60);
	var timeWithTraffic = Math.round(route[0].timeWithTraffic / 60);

	//Get the distance units used to calculate the route.
	var units = dm.getRequestOptions().distanceUnit;
	console.log(units)
	var distanceUnits = '';

	if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
		distanceUnits = 'km';
	} else {
		//Must be in miles
		distanceUnits = 'miles';
	}
	var destination = '';
	var origin = locations[0].titles;
	if (countRoute < locations.length) {
		destination = locations[countRoute + 1].titles;
		console.log(distance);
		countRoute++;
	}
	routeinfo += '<b>From: ' + origin + ' To: ' + destination + '</b> Distance: ' + distance + ' ' + distanceUnits + ' Time: ' + time + ' minutes' + ' Time Traffic: ' + timeWithTraffic + ' minutes <br/>';
	//console.log(routeinfo);
	document.getElementById('printoutPanel').innerHTML = routeinfo;
	//dm.dispose();
}


function getDistanceMatrix() {
	console.log("getDistanceMatrix");
	var data = JSON.stringify({
		"origins": [{
			"latitude": 51.506420,
			"longitude": -0.127210
		}],
		"destinations": [{
			"latitude": 51.489876,
			"longitude": -0.163259
		},
		{
			"latitude": 51.479721,
			"longitude": - 0.157594
		},
		{
			"latitude": 51.478010,
			"longitude": - 0.203428
		},
		{
			"latitude": 51.486776,
			"longitude": -0.115022
		}],
		"travelMode": "driving"
	}
	);

	var xhr = new XMLHttpRequest();
	var distance;
	var time;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
			var result = this.responseText;
			var resultJSON = JSON.parse(result).resourceSets[0].resources[0].results;
			console.log(resultJSON);
			for (var i = 0; i < resultJSON.length; i++) {
				console.log(resultJSON[i].travelDistance);
				console.log(resultJSON[i].travelDuration);
				distance = Math.round(resultJSON[i].travelDistance * 100) / 100;
				time = Math.round(resultJSON[i].travelDuration);

				console.log('distance=' + distance);
				console.log('time=' + time);
				routeinfo += 'Distance: ' + distance + ' km' + ' Time: ' + time + ' minutes  <br/>';
				//console.log(routeinfo);
				document.getElementById('printoutPanel').innerHTML = routeinfo;
			}
		}
	});

	var url = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=" + credentials;

	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);

}