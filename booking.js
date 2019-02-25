const Booking = {
	init(prenom, nom, station, availableBikes){
		this.prenom = localStorage.setItem("firstName", prenom);
		this.nom = localStorage.setItem("lastName", nom);
		this.station = station;
		this.availableBikes = availableBikes;
		this.affichage();
		this.tempus();
	},

	tempus(){
		let timer = Object.create(Chrono);
		timer.init(20, 0);
		$("#chronos").css("display", "block");
	},

	affichage(){
		$("#booking").css("display", "block");
		$("#velo").text((this.availableBikes - 1 ) + " vélo(s) disponible(s).");
		$("#addressAndName").text("Vélo réservé à la station " + this.station.replace(/#\d+ *-/, "") + " par " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));  
	}
};

