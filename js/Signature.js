const Signature = {
	context: this.canvas.getContext("2d"),
	drawing: false,
	mousePos: {x: 0, y: 0},
	lastPos: this.mousePos,

	init(canvasElt, color, line){
		this.canvas = canvasElt;
		this.context.strokeStyle = color;
		this.context.lineWidth = line;
		this.mouseDown();
		this.mouseUp();
		this.mouseMove();
		this.touchStart();
		this.touchEnd();
		this.touchMove();
		this.scrollStart();
		this.scrollEnd();
		this.scrollMove();
	},

	// Evénement clic bouton de la souris
	mouseDown(){
		this.canvas.addEventListener("mousedown", function(e){
			this.drawing = true;
			this.lastPos = this.getMousePos(this.canvas, e);
		}.bind(this));
	},

	// Evénement relachement bouton de la souris
	mouseUp(){
		this.canvas.addEventListener("mouseup", function(e){
			this.drawing = false;
		}.bind(this));
	},

	// Evénement déplacement de la souris
	mouseMove(){
		this.canvas.addEventListener("mousemove", function(e){
			this.mousePos = this.getMousePos(this.canvas, e);
			this.renderCanvas();
		}.bind(this));
	},

	// Coordonnées du pointeur de la souris dans le canvas
	getMousePos(canvasDom, mouseEvent){
		let rect = canvasDom.getBoundingClientRect(); // renvoie la taille et la position du canvas par rapport à la zone d'affichage 
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	},

	// Dessin 
	renderCanvas(){
		if(this.drawing){ // Si this.drawing = true càd événement mousedown.
			this.context.beginPath(); // Commence un nouveau chemin de dessin
			this.context.moveTo(this.lastPos.x, this.lastPos.y); // Point A du chemin 
			this.context.lineTo(this.mousePos.x, this.mousePos.y); // Point B du chemin
			this.context.stroke(); // Tracé du chemin du point A au point B
			this.lastPos = this.mousePos;// La dernière position du pointeur devient le point A, ce qui permet de tracer une ligne point par point. 
		}
	},

	// Evénements touch pour mobiles et tablettes
	
	// Evénement de contact sur l'écran
	touchStart(){
		this.canvas.addEventListener("touchstart", function(e){
			this.drawing = true;
			this.lastPos = this.getTouchPos(this.canvas, e);
		}.bind(this), {passive: true});
	},

	// Evénement de fin de contact avec l'écran
	touchEnd(){
		this.canvas.addEventListener("touchend", function(){
			this.drawing = false;
		}.bind(this));
	},

	// Evénement de mouvement sur l'écran
	touchMove(){
		this.canvas.addEventListener("touchmove", function(e){
			this.mousePos = this.getTouchPos(this.canvas, e);
			this.renderCanvas();
		}.bind(this), {passive: true});
	},

	// coordonnées du point de contact dans le canvas
	getTouchPos(canvasDom, touchEvent){
		let rect = canvasDom.getBoundingClientRect();
		return {
			x: touchEvent.touches[0].clientX - rect.left, // touches[0] : un seul medium touche l'écran (stylet ou doigt)
			y: touchEvent.touches[0].clientY - rect.top
		};
	},

	// Prévient le scrolling lors du contact avec l'écran
	scrollStart(){
		window.addEventListener("touchstart", function(e){
			if(e.target === this.canvas){
				e.preventDefault(); // annule le scroll lorsqu'on est dans le canvas
			}
		}.bind(this), {passive: false}); // preventDefault() est autorisé
	},

	scrollEnd(){
		window.addEventListener("touchend", function(e){
			if(e.target === this.canvas){
				e.preventDefault(); // annule l'événement 
			}
		}.bind(this));
	},

	scrollMove(){
		window.addEventListener("touchmove", function(e){
			if(e.target === this.canvas){
				e.preventDefault(); // annule le scroll lorsqu'on est dans le canvas
			}
		}.bind(this), {passive: false}); // preventDefault() est autorisé.
	},

	// Enregistre le canvas vide
	emptyRect(){
		let empty = document.getElementById("canvas").toDataURL();
		sessionStorage.setItem("emptyCanvas", empty);
	},

	// Affiche un message si il manque une information du client
	noSignature(){
		this.context.font = "25px Arial";
		this.context.fillStyle = "red";
		this.context.fillText("Informations incomplètes.", 7, 80);
		setTimeout(function(){ // retrait du message après deux secondes
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}.bind(this), 2000);
	}
};
