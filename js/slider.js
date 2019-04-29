const Slider = {
	slideIndex: 0,
	timer: null,

	init: function(mySlides, prev, next, start, stop){
		this.slide = mySlides; // this.slide.length = 4 pour les 4 images du diaporama
		this.btnPrev = prev; // btn = button
		this.btnNext = next;
		this.btnStart = start;
		this.btnStop = stop;
		this.previous();
		this.next();
		this.automatic(); // défilement du diaporama 
		this.playStop(); // boutons play et stop
	},

	// retrait de 1 à l'indice de l'objet this.slide
	indexMinus: function(){
		this.slideIndex -= 1;
		this.showSlide();
	},

	// Ajout de 1 à l'indice de l'objet this.slide
	indexPlus: function(){
		this.slideIndex += 1;
		this.showSlide();
	},

	// Affiche d'une image selon l'indice
	showSlide: function(){
		this.slide.hide(); // tout le diaporama est caché

		if (this.slideIndex < 0) { // si l'indice < 0 affiche la dernière image
			this.slideIndex = this.slide.length - 1;
		}

		if (this.slideIndex > this.slide.length - 1) { // si l'indice est > 4 affiche la première image
			this.slideIndex = 0;
		}

		this.slide[this.slideIndex].style.display = "block"; // affiche une image avec un indice précis
	},

	previous: function(){
		// bouton image précédente
		this.btnPrev.click(function(){
			this.indexMinus(); // retire 1 à l'indice 
		}.bind(this));

		// flèche gauche du clavier
		$("body").keydown(function(e){
			if (e.keyCode === 37) {
				this.indexMinus();
			}
		}.bind(this));
	},

	next: function(){
		// bouton image suivante
		this.btnNext.click(function(){
			this.indexPlus();
		}.bind(this));

		// flèche droite du clavier
		$("body").keydown(function(e){
			if (e.keyCode === 39) {
				this.indexPlus();
			}
		}.bind(this));
	},

	// défilement du diaporama toutes les 5 secondes
	automatic: function(){
		this.showSlide();
		this.timer = setInterval(function(){
			this.indexPlus(); // ajout de 1 à l'indice toutes les 5s
		}.bind(this), 5000);
	},

	playStop: function(){
		// mise en route du diaporama lors du clique sur le bouton play
		this.btnStart.click(function(){
			this.automatic();
		}.bind(this));

		// arrêt du diaporama lors du clique sur le bouton stop
		this.btnStop.click(function(){
			clearInterval(this.timer);
		}.bind(this));
	}
};
