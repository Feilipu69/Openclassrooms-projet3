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
		this.loadPage();
		this.bookingOk();
	},

	// Affiche la carte et les marqueurs
	displayMap(){
		this.townMap = L.map("mapid").setView([this.lat, this.lng], this.zoom); 

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiZmVpbGlwdSIsImEiOiJjanBzMWZzNDAxN2k1NDlydGxlZDBxc3NpIn0.RlZuwwtK8np2fBxYn_HKAg'
		}).addTo(this.townMap);

		this.markers();
	},

	// Données des stations de la ville et couleur des marqueurs
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

	// Supprime le nombre de la station
	deleteTheStationNumber(nameStation){ 
		return nameStation.replace(/#\d+ *-/, "");
	}, 

	// Ajout des marqueurs à la carte et affichage des informations lors du clique sur un marqueur
	markersDatas(data, color){
		L.marker(data.position, color).addTo(this.townMap).on("click", function(){
			$("#data").css("display", "block");
			$("#name").text("Station : " + this.deleteTheStationNumber(data.name)); 
			$("#status").text("statut : " + data.status);
			$("#address").text("Adresse : " + this.deleteTheStationNumber(data.address));
			$("#place").text(data.bike_stands + " places.");
			$("#available").text(data.available_bike_stands + " places disponibles.");
			$("#bike").text(data.available_bikes + " vélos disponibles.");
			this.availableBikes(data);
			this.sendBooking(data);
		}.bind(this));
	},

	// Si aucun vélo n'est disponible affiche un message 
	// Si le nom et le prénom sont stockés, le formulaire est prérempli 
	// Sinon affiche le formulaire vierge.
	availableBikes(data){
		if(data.available_bikes === 0){
			$("#identity").css("display", "none");
			$("#noBike").css("display", "block");
			$("#noBike").text("Il n'y pas de vélo disponible. Nous vous invitons à louer un vélo dans une autre station ou bien à revenir plus tard.");
		} else if (localStorage.getItem("lastName") && localStorage.getItem("firstName")){
			$("#lastName").val(localStorage.getItem("lastName"));
			$("#firstName").val(localStorage.getItem("firstName"));
			$("#identity").css("display", "block");
			$("#noBike").css("display", "none");
		} else {
			$("#identity").css("display", "block");
			$("#noBike").css("display", "none");
		}
	},

	// Evénement clic sur le bouton réservation 
	sendBooking(data){
		$("#sendIdentity").click(function(){
			localStorage.setItem("firstName", $("#firstName").val());
			localStorage.setItem("lastName", $("#lastName").val());
			sessionStorage.setItem("lieu", data.name);
			sessionStorage.setItem("temps", Date.now());
			sessionStorage.setItem("bike", 1);
			$("#bike").text((data.available_bikes - 1 ) + " vélo(s) disponible(s).");
			this.booking();
		}.bind(this));
	},

	// Affiche le bloc réservation avec les nom, prénom et la station et le canvas
	booking(){
		$("#booking").css("display", "block");
		$("#addressAndName").text("Vélo réservé à la station " + sessionStorage.getItem("lieu").replace(/#\d+ *-/, "") + " par " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));
		$("#countdown").css("display", "none");
		$("#canvas").css("display", "block");
	},

	// calcul du temps restant entre la réservation et le rafraichissement de la page
	calculateTime(){
		let time1 = sessionStorage.getItem("temps") / 1000;
		let time2 = Date.now() / 1000;
		let time3 = (Math.floor(1200 - (time2 - time1)));
		let minutes = Math.floor(time3 / 60);
		let seconds = (time3 - (minutes * 60));
		return [minutes, seconds];
	},

	// Affiche le compteur
	timer(minutes, seconds){
		let time = Object.create(Chrono);
		time.init(minutes, seconds);
		$("#countdown").css("display", "block");
	},

	// Validation de la réservation
	bookingOk(){
		$("#validation").on("click", function(){
			this.timer(20, 0);
		}.bind(this));
	},
	
	// Bloc réservation et compteur si une réservation est en cours
	loadPage(){
		if(localStorage.getItem("lastName") && localStorage.getItem("firstName") && sessionStorage.getItem("temps")){ 
			$("#booking").css("margin", "auto");
			$("#booking").css("margin-top", "30px");
			$("#signature").css("display", "none");
			this.booking();
			this.timer(this.calculateTime()[0], this.calculateTime()[1]);
		}
	}
};
