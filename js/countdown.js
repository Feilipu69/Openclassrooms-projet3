const Chrono = {
	timeId: null,

	init: function(minutes, seconds){
		this.minutes = minutes;
		this.seconds = seconds;
		this.start();
		this.calculateTime();
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
	},

	calculateTime(){
		let time1 = sessionStorage.getItem("clock") / 1000;
		let time2 = Date.now() / 1000;
		let time3 = (Math.floor(1200 - (time2 - time1)));
		let minutes = Math.floor(time3 / 60);
		let seconds = (time3 - (minutes * 60));
		return [minutes, seconds];
	}
};
