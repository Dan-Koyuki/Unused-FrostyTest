class Overworld{
	constructor(config){
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	startGameLoop(){
		const step = () => {

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// Establish Camera
			const cameraPerson = this.map.gameObjects.hero;

			// Update Object
			Object.values(this.map.gameObjects).forEach(object => {
				object.update({
					arrow: this.directionInput.direction,
					map: this.map,
				});
			})

			// Draw Lower Layer
			this.map.drawLowerImage(this.ctx, cameraPerson);

			// Draw Game Object
			Object.values(this.map.gameObjects).forEach(object => {
				object.sprite.draw(this.ctx, cameraPerson);
			})

			// Draw Upper Layer
			this.map.drawUpperImage(this.ctx, cameraPerson);

			requestAnimationFrame(() => {
				step();
			})
		}
		step();
	}

	init(){

		this.map = new OverworldMap(window.OverworldMaps.PokemonCenter);
		this.map.mountObject();

		this.directionInput = new DirectionInput();
		this.directionInput.init();

		this.startGameLoop();

		

	}
}