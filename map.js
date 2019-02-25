const Map = {
	// red markers icon
	// marqueurs rouges
	redMarker: L.icon({
		iconUrl: "images/map-marker-red.png",
		iconSize: [35, 35]
	}),

	init(town, lat, lng, zoom){ 
		this.town = town;
		this.lat = lat;
		this.lng = lng;
		this.zoom = zoom;
		this.displayMap();
	},

	// Retrait du dièse et du nombre précédent le nom de la ville
	regex(nameStation){ 
		// regex delete the number of the station
		return nameStation.replace(/#\d+ *-/, "");
	}, 

	// Instanciation de l'objet permettant la réservation
	booking(data){
		let booking = Object.create(Booking);
		booking.init($("#firstName").val(), $("#lastName").val(), data.name, data.available_bikes);
	},

	send(data){
		$("#send").click(function(){
			this.booking(data);
		}.bind(this));
	},

	// Markers datas
	// Affichage des données liées au marqueur sur lequel on clique.
	markersDatas(data, color){
		L.marker(data.position, color).addTo(this.townMap).on("click", function(){
			$("#data").css("display", "block");
			$("#name").text(this.regex(data.name)); 
			$("#status").text("statut : " + data.status);
			$("#address").text("Adresse : " + data.address);
			$("#place").text(data.bike_stands + " places.");
			$("#dispo").text(data.available_bike_stands + " places disponibles.");
			$("#velo").text(data.available_bikes + " vélos disponibles.");
			$("#booking").css("display", "none");
			$("#chronos").css("display", "none");

			this.send(data);
		}.bind(this));
	},

	// markers
	// marqueurs bleus ou rouges selon le nombre de vélos disponibles.
	markers(){
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.town + "&apiKey=1d19770d3b8d7e4e0b8de68d91b39e7badac5e5c", function(response){
			let datas = JSON.parse(response);
			datas.forEach(function(data){
				if(data.available_bikes === 0){
					this.markersDatas(data, {icon: this.redMarker});
				} else {
					this.markersDatas(data, null);
				}
			}.bind(this));
		}.bind(this));
	},

	// display map and markers
	// Affiche la carte et les marqueurs
	displayMap(){
		this.townMap = L.map("mapid").setView([this.lat, this.lng], this.zoom); // display the map

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiZmVpbGlwdSIsImEiOiJjanBzMWZzNDAxN2k1NDlydGxlZDBxc3NpIn0.RlZuwwtK8np2fBxYn_HKAg'
		}).addTo(this.townMap);

		// display markers
		this.markers();
	}
};
