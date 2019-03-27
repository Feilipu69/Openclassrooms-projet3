// slider
let slide = Object.create(Slider);
slide.init($(".mySlides"), $(".prev"), $(".next"), $(".play"), $(".stop"));

// Town's map
let nantes = Object.create(Map);
nantes.init("nantes", 47.217, -1.553, 12);

// signature
let sign = Object.create(Signature);
sign.init(document.getElementById("canvas"), "2d", "white", 2);
