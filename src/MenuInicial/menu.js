import kaboom from "kaboom"

kaboom({ scale: 2 });

function menu(){
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/background.png');
  loadSprite('mario', 'sprites/mario.png');
  loadSprite('cano', 'sprites/cano.png');
  
  scene('game', () => {
    add([sprite('bg') ,pos(0, -21)]);
  const maps = [
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2                                2',
    '2               22               2',
    '2                     22         2',
    '2         22          22     2   2',
    '2    2    2           22   22  3 2',
    '2    2    2           22   22    2',
    '1111111111111111111111111111111111',
  ];
  const levelCfg = {
    width: 20,
    height: 20,
    1: () =>[sprite('bloco'), solid(),area()],
    2: () =>[sprite('tijolos'),solid(), area() ],
    3: () =>[sprite('cano'), solid(), area()]
  };
  const player = add([
    sprite("mario"),
    pos(70,0),
    area(),
    body(),
  ])
  onKeyDown('left',()=>{
    player.move(-150, 0)
    player.flipX(true)
  })
  onKeyDown('right',()=>{
    player.move(150, 0)
    player.flipX(false)
  })
  onKeyPress('space',()=>{
    if(player.isGrounded()){
      player.jump(440)
    }
  })
  const gameLevel = addLevel(maps, levelCfg);
})
go('game');




}

export default menu