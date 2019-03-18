const Booking = {
	init(prenom, nom, station, availableBikes){
		this.prenom = localStorage.setItem("firstName", prenom);
		this.nom = localStorage.setItem("lastName", nom);
		this.station = station;
		this.availableBikes = availableBikes;
		this.displayBookingInformations();
	},

	displayBookingInformations(){
		$("#booking").css("display", "block");
		$("#bike").text((this.availableBikes - 1 ) + " vélo(s) disponible(s).");
		$("#addressAndName").text("Vélo réservé à la station " + this.station/*.replace(/#\d+ *-/, "") */+ " par " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));  
	}
}
