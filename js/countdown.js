const Chrono = {
	timeId: null,

	init: function(minutes, seconds){
		this.minutes = minutes;
		this.seconds = seconds;
		this.start();
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
				$("#bookingSignature").css("display", "none");
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
		$("#booking").click(function(){
			clearInterval(this.timeId);
			$("min").text(this.minutes);
			$("sec").text(this.seconds);
		}.bind(this));
	}
};
