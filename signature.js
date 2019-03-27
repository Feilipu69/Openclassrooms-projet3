const Signature = {
	drawing: false,
	mousePos: {x: 0, y: 0},
	lastPos: this.mousePos,

	init(canvas, ctx, color, line){
		this.canvas = canvas;
		this.context = this.canvas.getContext(ctx);
		this.context.strokeStyle = color;
		this.context.lineWidth = line;
		this.mouseDown();
		this.mouseUp();
		this.mouseMove();
		this.cancelSignature();
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

	// Annulation de la signature
	cancelSignature(){
		$("#cancel").click(function(){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}.bind(this));

	}
};
