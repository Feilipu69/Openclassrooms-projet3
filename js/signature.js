const Signature = {
	drawing: false,
	mousePos: {x: 0, y: 0},
	lastPos: this.mousePos,

	init(canvas, color, line){
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.context.strokeStyle = color;
		this.context.lineWidth = line;
		this.mouseDown();
		this.mouseUp();
		this.mouseMove();
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
		let rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	},

	// Dessin 
	renderCanvas(){
		if(this.drawing){ // Si this.drawing = true càd événement mousedown.
			this.context.beginPath(); // Commence un nouveau chemin de dessin
			this.context.moveTo(this.lastPos.x, this.lastPos.y); // Emplacement du point de départ du chemin
			this.context.lineTo(this.mousePos.x, this.mousePos.y); // Points successifs du chemin
			this.context.stroke(); // Tracé du chemin
			this.lastPos = this.mousePos;
		}
	},

	emptyRect(){
		let empty = document.getElementById("canvas").toDataURL();
		sessionStorage.setItem("emptyCanvas", empty);
	},

	// Message si pas de signature
	noSignature(){
		this.context.font = "25px Arial";
		this.context.fillStyle = "red";
		this.context.fillText("Vous avez oublié de signer.", 7, 80);
		setTimeout(function(){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}.bind(this), 2000);
	}
};
