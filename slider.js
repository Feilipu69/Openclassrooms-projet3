// Slider
var Slider = {
	slideIndex: 0,
	timer: null,

	init: function(mySlides, prev, next, start, stop){
		this.slide = mySlides;
		this.btnPrev = prev; // btn = button
		this.btnNext = next;
		this.btnStart = start;
		this.btnStop = stop;
		this.previous();
		this.next();
		this.automatic(); // this.showSlide() in this method, displays images.
		this.playStop();
	},

	indexMinus: function(){
		this.slideIndex -= 1;
		this.showSlide();
	},

	indexPlus: function(){
		this.slideIndex += 1;
		this.showSlide();
	},

	showSlide: function(){
		this.slide.hide();

		if (this.slideIndex < 0) {
			this.slideIndex = this.slide.length - 1;
		}

		if (this.slideIndex > this.slide.length - 1) {
			this.slideIndex = 0;
		}

		this.slide[this.slideIndex].style.display = "block";
	},

	// previous & next
	previous: function(){
		this.btnPrev.click(function(){
			this.indexMinus();
		}.bind(this));

		$("body").keydown(function(e){
			if (e.keyCode === 37) {
				this.indexMinus();
			}
		}.bind(this));
	},

	next: function(){
		this.btnNext.click(function(){
			this.indexPlus();
		}.bind(this));

		$("body").keydown(function(e){
			if (e.keyCode === 39) {
				this.indexPlus();
			}
		}.bind(this));
	},

	// automatic
	automatic: function(){
		this.showSlide();
		this.timer = setInterval(function(){
			this.indexPlus();
		}.bind(this), 5000);
	},

	playStop: function(){
		this.btnStart.click(function(){
			this.automatic();
		}.bind(this));

		this.btnStop.click(function(){
			clearInterval(this.timer);
		}.bind(this));
	}
};
