$(document).ready(function(){ // Tout se lance une fois la page chargée
	// slider
	let slide = Object.create(Slider);
	slide.init($(".mySlides"), $(".prev"), $(".next"), $(".play"), $(".stop"));

	// Town's map
	let town = Object.create(Map);
	town.init("nantes", 47.217, -1.553, 12);
});
