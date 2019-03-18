const Map = {
	redMarkerIcons: L.icon({
		iconUrl: "images/map-marker-red.png",
		iconSize: [35, 35]
	}),

	init(town, lat, lng, zoom){ 
		this.town = town;
		this.lat = lat;
		this.lng = lng;
		this.zoom = zoom;
		this.displayMap();
		this.chargement();
	},

	calculTemps(){
		let time1 = sessionStorage.getItem("temps") / 1000;
		let time2 = Date.now() / 1000;
		let time3 = (Math.floor(1200 - (time2 - time1)));
		let minutes = Math.floor(time3 / 60);
		let seconds = (time3 - (minutes * 60));
		return [minutes, seconds];
	},

	chargement(){
		$(window).on("load", function(){
			if(localStorage.getItem("lastName") && localStorage.getItem("firstName") && sessionStorage.getItem("temps")){ 
				this.booking(data);
				this.timer(this.calculTemps()[0], this.calculTemps()[1]);
			}
		}.bind(this));
	},

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
	},

	markers(){
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.town + "&apiKey=1d19770d3b8d7e4e0b8de68d91b39e7badac5e5c", function(response){
			let datas = JSON.parse(response);
			datas.forEach(function(data){
				if(data.available_bikes === 0){
					this.markersDatas(data, {icon: this.redMarkerIcons});
				} else {
					this.markersDatas(data, null);
				}
			}.bind(this));
		}.bind(this));
	},

	deleteTheStationNumber(nameStation){ 
		return nameStation.replace(/#\d+ *-/, "");
	}, 

	markersDatas(data, color){
		L.marker(data.position, color).addTo(this.townMap).on("click", function(){
			$("#data").css("display", "block");
			$("#name").text("Station : " + this.deleteTheStationNumber(data.name)); 
			$("#status").text("statut : " + data.status);
			$("#address").text("Adresse : " + this.deleteTheStationNumber(data.address));
			$("#place").text(data.bike_stands + " places.");
			$("#available").text(data.available_bike_stands + " places disponibles.");
			$("#bike").text(data.available_bikes + " vélos disponibles.");
			$("#booking").css("display", "none");
			$("#countdown").css("display", "none");
			this.availableBikes(data);
		}.bind(this));
	},

	availableBikes(data){
		if(data.available_bikes === 0){
			$("#identity").css("display", "none");
			$("#noBike").css("display", "block");
			$("#booking").css("display", "none");
			$("#noBike").text("Il n'y pas de vélo disponible. Nous vous invitons à louer un vélo dans une autre station ou bien à revenir plus tard.");
		} else {
			$("#identity").css("display", "block");
			$("#noBike").css("display", "none");
			$("#sendIdentity").click(function(){
				sessionStorage.setItem("temps", Date.now());
				this.booking(data);
				this.timer(20,0);
			}.bind(this));
		}
	},

	booking(data){
		let booking = Object.create(Booking);
		booking.init($("#firstName").val(), $("#lastName").val(), data.name, data.available_bikes);
	},

	timer(minutes, seconds){
		let time = Object.create(Chrono);
		time.init(minutes, seconds);
		$("#countdown").css("display", "block");
	}
};
