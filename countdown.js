const Chrono = {
	timeId: null,

	init: function(minutes, seconds){
		this.minutes = minutes;
		this.seconds = seconds;
		this.start();
		this.stop();
	},

	countDown: function(){
		this.timeId = setInterval(function(){
			this.seconds -= 1;

			if(this.seconds < 0){
				this.seconds = 59;
			}

			if(this.seconds === 59){
				this.minutes -= 1;
			}

			$("#sec").text(this.seconds);	
			$("#min").text(this.minutes);

			if(this.minutes < 10){
				$("#min").text("0" + this.minutes);
			}

			if(this.seconds < 10){
				$("#sec").text("0" + this.seconds);
			}

			if(this.minutes === 0 && this.seconds === 0){
				clearInterval(this.timeId);
				sessionStorage.clear();
				$("#booking").css("display", "none");
			}
		}.bind(this), 1000);
	},

	start: function(){
		$("#min").text(this.minutes);
		$("#sec").text(this.seconds);
		this.reset(); 
		$("#countdown").css("display", "block");
		this.countDown(); // maintenant le chrono est lancé
	},

	reset: function(){ // a chaque clique sur le bouton reservation le compteur redémarre à 0
		$("#sendIdentity").click(function(){
			clearInterval(this.timeId);
			$("min").text(this.minutes);
			$("sec").text(this.seconds);
		}.bind(this));
	},

	stop: function(){
		$("#cancel").click(function(){
			clearInterval(this.timeId);
			sessionStorage.clear();
		}.bind(this));

	},
};
