const Chrono = {
	time: null,

	init: function(minutes, secondes/* ajouter la date*/){
		this.minutes = minutes;
		this.secondes = secondes;
		this.start();
		this.stop();
	},

	countDown: function(){
		this.time = setInterval(function(){
			this.secondes -= 1;

			if(this.secondes < 0){
				this.secondes = 59;
			}

			if(this.secondes === 59){
				this.minutes -= 1;
			}

			$("#sec").text(this.secondes);	
			$("#min").text(this.minutes);

			if(this.minutes < 10){
				$("#min").text("0" + this.minutes);
			}

			if(this.secondes < 10){
				$("#sec").text("0" + this.secondes);
			}

			if(this.minutes === 0 && this.secondes === 0){
				clearInterval(this.time);
				$("#chronos").css("display", "none");
				$("#terminus").css("display", "block").text("Votre réservation a pris fin.");
			}
		}.bind(this), 1000);
	},

	start: function(){
		$("#min").text(this.minutes);
		$("#sec").text("0" + this.secondes);
		this.reset(); 
		$("#terminus").css("display", "none");
		this.countDown(); // maintenant le chrono est lancé
	},

	reset: function(){
		$("#send").click(function(){
			clearInterval(this.time);
			$("min").text(this.minutes);
			$("sec").text("0" + this.secondes);
		}.bind(this));
	},

	stop: function(){
		$("#reset").click(function(){
			clearInterval(this.time);
		}.bind(this));

	},
};
