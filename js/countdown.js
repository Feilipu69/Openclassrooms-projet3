const Chrono = {
	timeId: null,
	text: "hello",

	init: function(minutes, seconds){
		this.minutes = minutes;
		this.seconds = seconds;
		this.start();
		//this.stop();
		this.reset();
	},

	countDown(){
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

	start(){
		$("#min").text(this.minutes);
		$("#sec").text(this.seconds);
		this.reStart();
		$("#countdown").css("display", "block");
		this.countDown(); // maintenant le chrono est lancé
	},

	reStart(){
		$("#validation").click(function(){
			clearInterval(this.timeId);
			$("min").text(this.minutes);
			$("sec").text(this.seconds);
		}.bind(this));
	},

	reset(){ // a chaque clique sur le bouton validation le compteur redémarre à 0
		$("#cancel").click(function(){
			clearInterval(this.timeId);
			$("min").text(this.minutes);
			$("sec").text(this.seconds);
			sessionStorage.clear();
			$("#countdown").css("display", "none");
		}.bind(this));
	}

	/*stop(){
		$("#cancel").click(function(){
			clearInterval(this.timeId);
			sessionStorage.clear();
			$("#countdown").css("display", "none");
		}.bind(this));
	}*/
};
