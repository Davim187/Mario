import kaboom from "kaboom"

kaboom({ scale: 2 });

function menu(){
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/background.png');
  // loadSprite('mario', 'sprites/mario.png');
  loadSprite('cano', 'sprites/cano.png');

  loadSprite('mario', 'sprites/marioAndando.png',{
    sliceX:3.9,
    anims:{
      idle:{
        from:0,
        to:0
      },
      move:{
        from:1,
        to:2
      }
    }
  });

  
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
    '2              222               2',
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
        
    sprite("mario", {
        animSpeed: 1,
        frame: 0
    }),
    solid(),
    area(),
    body(),
    pos(60,0),
    origin('bot'),
    {
        speed: 120
    }
])
  onKeyDown('left',()=>{
    player.move(-120, 0)
    player.flipX(true)
  })

  onKeyDown('right',()=>{
    player.move(120, 0)
    player.flipX(false)
  })

  onKeyPress('space',()=>{
    if(player.isGrounded()){
      player.jump(440)
    }
  })


  keyPress('left', () => {
    player.flipX(true)
    player.play('move')
})

keyPress('right', () => {
    player.flipX(false)
    player.play('move')
})    

//////////////////////

// animar parado //
keyRelease('left', () => {
    player.play('idle')
})

keyRelease('right', () => {
    player.play('idle')
})

  const gameLevel = addLevel(maps, levelCfg);
})
go('game');




}

export default menu