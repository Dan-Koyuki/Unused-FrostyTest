class Sprite{
  constructor(config){

    // Set Up Images
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    // Set Up Images Shadow
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow){
      this.shadow.src = "./images/character/1.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    // Animation & Initial State Configuration
    this.animations = config.animations || {
      "idle-down": [ [0,0] ],
      "idle-right": [ [0,2] ],
      "idle-up": [ [0,3] ],
      "idle-left": [ [0,1] ],
      "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
      "walk-right": [ [1,2], [0,2], [3,2], [0,2] ],
      "walk-up": [ [1,3], [0,3], [3,3], [0,3] ],
      "walk-left": [ [1,1], [0,1], [3,1], [0,1] ]
    }
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // Reference Game Object
    this.gameObject = config.gameObject;

  }

  get frame(){
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key){
    if (this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress(){
    // Downtick Frame Progress
    if (this.animationFrameProgress > 0){
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset Progress
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined){
      this.currentAnimationFrame = 0;
    }

  }

  draw(ctx, cameraPerson){
    const x = this.gameObject.x + utils.withGrid(13) - cameraPerson.x;
    const y = this.gameObject.y - 16 + utils.withGrid(7) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(
      this.shadow,
      0, 0,
      52, 16,
      x, y + 34,
      32, 16
    )

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * 32, frameY * 48,     // start cropping from
      32, 48,   // crop size
      x, y,     // position
      32, 48    // size of the crop
    )

    this.updateAnimationProgress();
  }
}