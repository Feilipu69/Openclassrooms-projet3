function Diaporama(){
	this.prevNext = function(){
		var slideIndex = 0;
		showSlides(slideIndex);

		// Next/previous controls
		document.querySelector(".prev").addEventListener("click", function() {
			showSlides(slideIndex += -1);
		});

		document.querySelector(".next").addEventListener("click", function() {
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
			if (n > slides.length - 1) {
				slideIndex = 0;
			}

			if (n < 0) {
				slideIndex = slides.length -1;
			}

			for (i = 0; i < slides.length; i++) {
					slides[i].style.display = "none";
			}

			slides[slideIndex].style.display = "block";
		}
	};

	// slider automatic
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

	this.addPicture = function(src){
		var figureElt = document.createElement("figure");
		figureElt.setAttribute("class", "mySlides");
		var imgElt = document.createElement("img");
		imgElt.setAttribute("src", src);
		imgElt.setAttribute("alt", "vélo");
		figureElt.appendChild(imgElt);
		document.querySelector(".slideshow-container").appendChild(figureElt);
	}
}

var diapo1 = new Diaporama();
diapo1.automatic();
diapo1.prevNext();
diapo1.addPicture("veloQuatre.jpg");
