const Zone = class {
  ordered = false;
  get cards() {}
  peek(number = 0) {}
};

const Hand = class extends Zone {

}

const Deck = class extends Zone {

}

const Graveyard = class extends Zone {

}

const Exile = class extends Zone {

}

const Sideboard = class extends Zone {

};

const Battlefield = class extends Zone {};


const Player = class {
  get hand(): Hand {}
  get deck(): Deck {}
  get graveyard(): Graveyard {}
  get sideboard(): Sideboard {}
  get battlefield(): Battlefield {}
};


const Game = class {
  get currentTurn() {}
};

const Card = class {
  casting_cost = 0;
  onUntap = null;
  onUpkeep = null;
  onPhase;
};


const Effect = class {
  constructor(){

  }
  get controller(){

  }
  get resolve(){

  }
}


const System = {
  GAMEOVER: Symbol("GAMEOVER"),
  TURNOVER: Symbol("TURNOVER"),
  PHASEOVER: Symbol("PHASEOVER"),
}

const playersAfter = function * (first, ...list){
  let going;
  for(const x of list){
    if(going){
      yield x;
    }
    if(x === first){
      going = true;
    }
  }
  for(const x of list){
    yield x;
    if(x === first){
      break;
    }
  }
}

const place = async (effect, players)=> {
  for (const player of playersAfter(effect.controller, players)){
    const response = await player.respondTo(effect);
    if(response){
      await place(response, players);
    }
    effect.resolve();
  }
}

const MainPhase = class {
  constructor(player, ...opponents){
    this.player = player;
    this.opponents = opponents;
  }
  proceed(){
    try{
      while(true){
        await place(this.player._, ...opponents);
      }
    }catch(error){
      if (error.reason !== System.PHASEOVER) {
        throw error;
      }
      console.log('turn over');
    }
  }
}

const CombatPhase = class {

}

const Turn = class {
  constructor(game){
    const { player, opponents } = game.getNext();
    this.player = player;
    this.opponents = opponents;
  }
  async begin(){
    await place(this.player.beginTurn, ...opponents);
  }
  async untap(){
    await place(this.player.untap, ...opponents);
  }
  async draw(){
    await place(this.player.draw, ...opponents);
  }
  async main(){
    const phase = new MainPhase(player, ...opponents);
    await phase.proceed();
  }
  async combat(){
    const phase = new CombatPhase(player, ...opponents);
    await phase.declareAttack();
    await phase.declareBlock();

  }
  async end(){
    await place(this.player.end, ...opponents);
  }
};


export default async function * (...players){
  const game = new Game(...players);
  try {
    while(true){
      try{
        const turn = new Turn(Game);
        await turn.begin();
        await turn.untap();
        await turn.upkeep();
        await turn.draw();
        await turn.main();
        await turn.combat();
        await turn.main();
        await turn.end();
      }catch(error){
        if (error.reason !== System.TURNOVER) {
          throw error;
        }
        console.log('turn over');
      }
    }
  }catch(error){
    if(error.reason !== System.GAMEOVER){
      throw error;
    }
    console.log('game over');
  }
}