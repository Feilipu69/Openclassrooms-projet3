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
<<<<<<< HEAD
		this.displayMap();
		Booking.bookingOk();
=======
<<<<<<< HEAD
		this.displayMap();
		Booking.bookingOk();
=======
>>>>>>> d343a08cd2c202f841028f61df8619cd63bf1ccd
>>>>>>> 83742325bde1745e0131545abb0db2e9fdf753b9
	},
	
	// Regex pour supprimer le numéro de la station
	deleteTheStationNumber(nameStation){ 
		return nameStation.replace(/#\d+ *-/, "");
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

	// SI une réservation est en cours affiche le bloc réservation et le compteur
	loadPage(){
		if(sessionStorage.getItem("clock")){ 
			$("#bookingData").css("display", "flex");
<<<<<<< HEAD
			$("#bookingData").css("margin-top", "30px");
=======
<<<<<<< HEAD
			$("#bookingData").css("margin-top", "30px");
=======
>>>>>>> d343a08cd2c202f841028f61df8619cd63bf1ccd
>>>>>>> 83742325bde1745e0131545abb0db2e9fdf753b9
			$("#addressAndName").text("Un vélo réservé à la station " + sessionStorage.getItem("station") + " pour " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));
			Chrono.init(Chrono.calculateTime()[0], Chrono.calculateTime()[1]);
		}
	},

	// Accès aux données des stations et affiche les marqueurs bleus et rouges.
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

	
	// CLIC SUR UN MARQUEUR affiche les informations 
	markersDatas(data, color){
		L.marker(data.position, color).addTo(this.townMap).on("click", function(){
			sessionStorage.clear(); // initialise sessionStorage
			sessionStorage.setItem("station", this.deleteTheStationNumber(data.name));
			sessionStorage.setItem("bikes", data.available_bikes);
			sign.context.clearRect(0, 0, sign.canvas.width, sign.canvas.height);
			$("#data").css("display", "block");
			$("#name").text("Station : " + sessionStorage.getItem("station")); 
			$("#status").text("statut : " + data.status);
			$("#address").text("Adresse : " + this.deleteTheStationNumber(data.address));
			$("#place").text(data.bike_stands + " places.");
			$("#available").text(data.available_bike_stands + " places disponibles.");
			$("#bike").text(data.available_bikes + " vélos disponibles.");
			$("#bookingData").css("display", "none");
			this.availableBikes(data);
		}.bind(this));
	},

	// Si aucun vélo n'est disponible affiche un message 
	// Si le nom et le prénom sont stockés, le formulaire est prérempli 
	// Sinon affiche le formulaire vierge.
	availableBikes(data){
		if(data.available_bikes === 0){
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
			$("#noBike").css("display", "none");
		} else {
			$("#identity").css("display", "block");
			$("#noBike").css("display", "none");
			Booking.signature();
		}
<<<<<<< HEAD
	}
=======
<<<<<<< HEAD
	}
=======
	},

	// Affiche les données pour une réservation
	bookingData(){
		$("#bookingSignature").css("display", "flex");
		$("#bookingData").css("display", "flex");
		$("#addressAndName").text("Un vélo demandé à la station " + sessionStorage.getItem("station") + " par " + $("#firstName").val() + " " + $("#lastName").val());
		$("#countdown").css("display", "none");
		$("#canvas").css("display", "block");
		sign.emptyRect(); // stockage de l'image du canvas vide
	},
	
	// Validation de la réservation
	bookingOk(){
		$("#booking").on("click", function(){
			if(sessionStorage.getItem("emptyCanvas") === document.getElementById("canvas").toDataURL()){
				sign.noSignature();
			} else {
				localStorage.setItem("firstName", $("#firstName").val());
				localStorage.setItem("lastName", $("#lastName").val());
				sessionStorage.setItem("clock", Date.now());
				$("#bike").text((sessionStorage.getItem("bikes") - 1) + " vélo(s) disponible(s).");
				$("#addressAndName").text("Un vélo est reservé à la station " + sessionStorage.getItem("station") + " pour " + $("#firstName").val() + " " + $("#lastName").val());
				$("#countdown").css("display", "block");
				Chrono.init(20, 0);
			}
		}.bind(this));
	},
>>>>>>> d343a08cd2c202f841028f61df8619cd63bf1ccd
>>>>>>> 83742325bde1745e0131545abb0db2e9fdf753b9
};
