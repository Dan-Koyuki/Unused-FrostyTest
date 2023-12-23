class GameObject{
  constructor(config){
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/character/people/HERO 01.png",
    });

    this.behaviourLoop = config.behaviourLoop || [];
    this.behaviourLoopIndex = 0;

  }

  mount(map){
    console.log("hello");
    this.isMounted = true;
    map.addWalls(this.x, this.y);

    setTimeout(() => {
      this.doBehaviourEvent(map);
    }, 10)

  }

  update(){
  }

  async doBehaviourEvent(map) {

    // check for behaviour or cutscene
    if (map.isCutscenePlaying || this.behaviourLoop.length === 0) {
      return;
    }

    // config of the event to run
    let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
    eventConfig.who = this.id;

    // create new event instance for the event
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    // config next event to run
    this.behaviourLoopIndex += 1;
    if (this.behaviourLoopIndex == this.behaviourLoop.length) {
      this.behaviourLoopIndex = 0;
    }

    // iterate
    this.doBehaviourEvent(map);

  }

}