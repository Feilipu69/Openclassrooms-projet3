const Booking = {
	init(prenom, nom, station, availableBikes){
		this.prenom = localStorage.setItem("firstName", prenom);
		this.nom = localStorage.setItem("lastName", nom);
		this.station = station;
		this.availableBikes = availableBikes;
		this.load();
		this.affichage();
		this.timer();
	},

	load(){
		$(window).on("load", function(){
			if(localStorage.getItem("firstName") && localStorage.getItem("lastName")){ 
				this.affichage();
			}
		}.bind(this))
	},

	affichage(){
		$("#booking").css("display", "block");
		$("#chronos").css("display", "block");

		$("#velo").text((this.availableBikes - 1 ) + " vélo(s) disponible(s).");
		$("#addressAndName").text("Vélo réservé à la station " + this.station.replace(/#\d+ *-/, "") + " par " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));  
	},

	timer(){
		let timer = Object.create(Chrono);
		timer.init(20, 0);
	}
};
