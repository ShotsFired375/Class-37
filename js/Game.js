class Game {
  constructor(){

  }
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(35);
    text("Game Starting!", 100, 70);
    Player.getPlayerInfo();
    if (allPlayers !== undefined) {
      var display_pos = 130;
      for (var plr in allPlayers) {
        if (plr == "player"+player.index) {
          fill("blue");
        }  else fill("orange");
      
      display_pos += 30;
      text(allPlayers[plr].name+": "+allPlayers[plr].distance, 200, display_pos);
    }
  }



  if (keyIsDown(UP_ARROW) && player.index !== null) {
    player.distance += 50;
    player.update();
  }

}
}
