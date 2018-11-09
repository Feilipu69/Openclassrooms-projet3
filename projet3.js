function Diaporama(){
	this.prevNext = function(){
		var slideIndex = 1;
		showSlides(slideIndex);

		// Next/previous controls
		document.querySelector(".prev").addEventListener("click", function plusSlides(n) {
			showSlides(slideIndex += -1);
		});

		document.querySelector(".next").addEventListener("click", function plusSlides(n) {
			showSlides(slideIndex += 1);
		});

		// keybord left/right
		document.addEventListener("keydown", function(e){
			if (e.keyCode === 37) {
				showSlides(slideIndex += -1);
				}
		});

		document.addEventListener("keydown", function(e){
			if (e.keyCode === 39) {
				showSlides(slideIndex += 1);
				}
		});


		function showSlides(n) {
			var i;
			var slides = document.getElementsByClassName("mySlides");
			if (n > slides.length) {slideIndex = 1}
			if (n < 1) {slideIndex = slides.length}
			for (i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";
			}
			slides[slideIndex-1].style.display = "block";
		}
	};

	this.automatic = function(){
		var slideIndex = 0;
			var showSlidesId = setInterval(showSlides, 2000);
			showSlides(); // sinon il y a le temps de l'interval en secondes avant l'affichage

			function showSlides() {
				var slides = document.getElementsByClassName("mySlides");
				for (var i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";
				}
				slideIndex++;
				if (slideIndex > slides.length) {
					slideIndex = 1;
				}
				slides[slideIndex - 1].style.display = "block";
			}

			/* click event. stop and restart */
			var click = true;

			document.querySelector(".slideshow-container").addEventListener("click", function() {
				if (click) {
					clearInterval(showSlidesId);
				} else {
					showSlidesId = setInterval(showSlides, 2000);
				}
				click = !click;
			});
	};
}

var diapo1 = new Diaporama();
diapo1.prevNext();
