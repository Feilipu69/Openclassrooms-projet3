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
		this.loadPage();
		this.displayMap();
		Booking.bookingOk();
	},
	
	// Regex pour supprimer le numéro de la station
	deleteTheStationNumber(nameStation){ 
		return nameStation.replace(/#\d+ *-/, "");
	}, 

	// Affiche la carte et les marqueurs
	displayMap(){
		this.townMap = L.map("mapid").setView([this.lat, this.lng], this.zoom); 

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoiZmVpbGlwdSIsImEiOiJjanBzMWZzNDAxN2k1NDlydGxlZDBxc3NpIn0.RlZuwwtK8np2fBxYn_HKAg'
		}).addTo(this.townMap);

		this.markers();
	},

	// SI une réservation est en cours affiche le bloc réservation et le compteur
	loadPage(){
		if(sessionStorage.getItem("clock")){ 
			$("#bookingData").css("display", "flex");
			$("#bookingData").css("margin-top", "30px");
			$("#addressAndName").text("Un vélo réservé à la station " + sessionStorage.getItem("station") + " pour " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));
			Chrono.init(Chrono.calculateTime()[0], Chrono.calculateTime()[1]);
		}
	},

	// Accès aux données des stations et affiche les marqueurs bleus et rouges.
	markers(){
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.town + "&apiKey=1d19770d3b8d7e4e0b8de68d91b39e7badac5e5c", function(response){
			let stationsDatas = JSON.parse(response); // Transforme la chaine de caractères au format JSON obtenue en objet JavaScript
			stationsDatas.forEach(function(stationData){
				if(stationData.available_bikes === 0){
					this.markersDatas(stationData, {icon: this.redMarkerIcons});
				} else {
					this.markersDatas(stationData, null);
				}
			}.bind(this));
		}.bind(this));
	},

	
	// CLIC SUR UN MARQUEUR affiche les informations 
	markersDatas(stationData, color){
		L.marker(stationData.position, color).addTo(this.townMap).on("click", function(){
			sessionStorage.clear(); // initialise sessionStorage
			sessionStorage.setItem("station", this.deleteTheStationNumber(stationData.name));
			sessionStorage.setItem("bikes", stationData.available_bikes);
			Signature.context.clearRect(0, 0, 320, 160);
			$("#data").css("display", "block");
			$("#name").text("Station : " + sessionStorage.getItem("station")); 
			$("#status").text("statut : " + stationData.status);
			$("#address").text("Adresse : " + this.deleteTheStationNumber(stationData.address));
			$("#place").text(stationData.bike_stands + " places.");
			$("#available").text(stationData.available_bike_stands + " places disponibles.");
			$("#bike").text(stationData.available_bikes + " vélos disponibles.");
			$("#bookingData").css("display", "none");
			this.availableBikes(stationData);
		}.bind(this));
	},

	// Si aucun vélo n'est disponible affiche un message 
	// Si le nom et le prénom sont stockés, le formulaire est prérempli 
	// Sinon affiche le formulaire vierge.
	availableBikes(stationData){
		if(stationData.available_bikes === 0){
			$("#identity").css("display", "none");
			$("#bookingData").css("display", "none");
			$("#canvas").css("display", "none");
			$("#noBike").css("display", "block");
			$("#noBike").text("Il n'y pas de vélo disponible. Nous vous invitons à louer un vélo dans une autre station ou bien à revenir plus tard.");
		} else if (localStorage.getItem("lastName") && localStorage.getItem("firstName")){
			$("#lastName").val(localStorage.getItem("lastName"));
			$("#firstName").val(localStorage.getItem("firstName"));
			$("#identity").css("display", "block");
			Booking.signature();
			Signature.init(document.getElementById("canvas"), "white", 2);
			$("#noBike").css("display", "none");
		} else {
			$("#identity").css("display", "block");
			$("#noBike").css("display", "none");
			Booking.signature();
			Signature.init(document.getElementById("canvas"), "white", 2);
		}
	}
};
