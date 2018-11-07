function Essai(image1, image2, image3){
	this.image1 = document.getElementsByTagName("img")[0].setAttribute("src", image1);
	this.image2 = document.getElementsByTagName("img")[1].setAttribute("src", image2);
	this.image3 = document.getElementsByTagName("img")[2].setAttribute("src", image3);

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

}

var slide1 = new Essai("veloUn.jpeg", "veloDeux.jpeg", "veloTrois.jpeg");
//var slide2 = new Essai("veloQuatre.jpg", "veloCinq.jpg", "veloSix.jpg");
//var slide3 = new Essai("veloSept.jpg", "veloHuit.jpg", "veloNeuf.jpg");
