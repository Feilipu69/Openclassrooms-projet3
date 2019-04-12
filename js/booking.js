const Booking = {
	signature(){
		$("#canvas").css("display", "block");
		Signature.emptyRect();
	},

	// Validation de la réservation
	bookingOk(){
		$("#booking").on("click", function(){
			if(sessionStorage.getItem("emptyCanvas") === document.getElementById("canvas").toDataURL()){
				Signature.noSignature();
			} else {
				localStorage.setItem("firstName", $("#firstName").val());
				localStorage.setItem("lastName", $("#lastName").val());
				sessionStorage.setItem("clock", Date.now());
				$("#bike").text((sessionStorage.getItem("bikes") - 1) + " vélo(s) disponible(s).");
				$("#bookingData").css("display", "flex");
				$("#addressAndName").text("Un vélo est reservé à la station " + sessionStorage.getItem("station") + " pour " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"));
				$("#countdown").css("display", "block");
				Chrono.init(20, 0);
			}
		}.bind(this));
	}
};
