class Person extends GameObject{
  constructor(config){
    super(config);
    this.movingProgressRamaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate ={
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    }

  }

  update(state){
    if (this.movingProgressRamaining > 0){
      this.updatePosition();
    } else {
      // Case: Keyboard Ready and have Arrow Pressed
      if (this.isPlayerControlled && state.arrow){
        this.startBahaviour(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state);
    }
  }

  startBahaviour(state, behaviour){
    // Set Character direction
    this.direction = behaviour.direction;
    if (behaviour.type === "walk"){
      // Check if the space is free or not
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
        return;
      }

      // Ready to walk
      state.map.moveWalls(this.x, this.y, this.direction);
      this.movingProgressRamaining = 32;
    }
  }

  updatePosition(){
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRamaining -= 1;

      if (this.movingProgressRamaining === 0) {
        
      }

  }

  updateSprite(){
    if (this.movingProgressRamaining > 0){
      this.sprite.setAnimation("walk-"+this.direction);
      return;
    }

    this.sprite.setAnimation("idle-"+this.direction);
  }
}