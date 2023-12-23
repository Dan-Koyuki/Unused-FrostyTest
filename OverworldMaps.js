class OverworldMap{
  constructor(config){
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};
    
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson){
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(13) - cameraPerson.x, 
      utils.withGrid(7) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson){
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(13) - cameraPerson.x,
      utils.withGrid(7) - cameraPerson.y
    )
  }

  isSpaceTaken (currentX, currentY, direction){
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObject(){
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      object.mount(this)
    })
  }

  addWalls(x, y){
    this.walls[`${x},${y}`] = true;
  }

  removeWalls(x, y){
    delete this.walls[`${x},${y}`];
  }

  moveWalls(wasX, wasY, direction){
    this.removeWalls(wasX, wasY);
    const {x, y} = utils.nextPosition(wasX, wasY, direction);
    this.addWalls(x, y);
  }

}

window.OverworldMaps = {
  PokemonCenter: {
    lowerSrc: "./images/maps/maplower.png",
    upperSrc: "./images/maps/mapupper.png",
    gameObjects: {
      npc1: new Person({
        x: utils.withGrid(27),
        y: utils.withGrid(8),
        src: "./images/character/people/NPC 01.png",
        behaviourLoop: [
          { type: "stand", direction: "up", duration: 800},
          { type: "stand", direction: "left", duration: 800},
          { type: "stand", direction: "down", duration: 800},
          { type: "stand", direction: "right", duration: 800}

        ]
      }),
      npc2: new Person({
        x: utils.withGrid(30),
        y: utils.withGrid(10),
        src: "./images/character/people/NPC 02.png",
        behaviourLoop: [
          { type: "walk", direction: "left"},
          { type: "stand", direction: "up", duration: 800},
          { type: "walk", direction: "up"},
          { type: "walk", direction: "right"},
          { type: "walk", direction: "down"}
        ]
      }),
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(27),
			  y: utils.withGrid(13)
      })
    },
    walls: {
      [utils.asGridCoord(19,14)] : true,
      [utils.asGridCoord(20,14)] : true,
      [utils.asGridCoord(19,15)] : true,
      [utils.asGridCoord(20,15)] : true,
      [utils.asGridCoord(34,14)] : true,
      [utils.asGridCoord(35,14)] : true,
      [utils.asGridCoord(34,15)] : true,
      [utils.asGridCoord(35,15)] : true,
    }
  },
  SmallTown: {
    lowerSrc: "./images/maps/smallworldlower.png",
    upperSrc: "./images/maps/smallworldupper.png",
    gameObjects: {
      npc0: new Person({
        x: utils.withGrid(27),
			  y: utils.withGrid(13),
        src: "./images/character/people/NPC 02.png"
      }),
      npc1: new Person({
        x: utils.withGrid(27),
        y: utils.withGrid(8),
        src: "./images/character/people/NPC 01.png"
      })
    },
    walls: {
      [utils.asGridCoord(19,14)] : true,
      [utils.asGridCoord(20,14)] : true,
      [utils.asGridCoord(19,15)] : true,
      [utils.asGridCoord(20,15)] : true,
      [utils.asGridCoord(34,14)] : true,
      [utils.asGridCoord(35,14)] : true,
      [utils.asGridCoord(34,15)] : true,
      [utils.asGridCoord(35,15)] : true,
    }
  }
}