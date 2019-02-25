// slider
let slide = Object.create(Slider);
slide.init($(".mySlides"), $(".prev"), $(".next"), $(".play"), $(".stop"));

// Town's map
let nantes = Object.create(Map);
nantes.init("nantes", 47.217, -1.553, 12);
