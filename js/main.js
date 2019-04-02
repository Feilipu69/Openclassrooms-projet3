// slider
let slide = Object.create(Slider);
slide.init($(".mySlides"), $(".prev"), $(".next"), $(".play"), $(".stop"));

// Town's map
let town = Object.create(Map);
town.init("nantes", 47.217, -1.553, 12);

// signature
let sign = Object.create(Signature);
sign.init(document.getElementById("canvas"), "white", 2);
