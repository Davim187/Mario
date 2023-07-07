function levelUm() {
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/background.png');
  loadSprite('cano', 'sprites/cano.png');
  loadSprite('cogumeloE', 'sprites/cogumeloE.png');
  loadSprite('cogumeloD', 'sprites/cogumeloD.png');
  loadSprite('flor', 'sprites/flor.png');
  loadSprite('mario', 'sprites/marioAndando.png', {
    sliceX: 3.9,
    anims: {
      idle: {
        from: 0,
        to: 0,
        loop: true,
      },
      move: {
        from: 1,
        to: 2,
        loop: true,
      },
    },
  });

  let direction = 1;
  let direction1 = 1;
  let speed = 25;

  function moverCogumelos() {
    function invertDirectionE() {
      direction1 *= -1;
    }
    function invertDirection() {
      direction *= -1;
    }

    var cogumelo = add([
      sprite('cogumeloE'),
      area(),
      solid(),
      pos(250, 300),
      origin('bot'),
      'cogumelo',
    ]);
    cogumelo.action(() => {
      cogumelo.move(speed * direction, 0);
    });

    cogumelo.collides('cano', () => {
      invertDirection();
    });
    cogumelo.collides('tijolos', () => {
      invertDirection();
    });
    cogumelo.collides('cogumelo1', () => {
      invertDirectionE();
    });

    var cogumelo2 = add([
      sprite('cogumeloE'),
      area(),
      solid(),
      pos(250, 300),
      origin('bot'),
      'cogumelo1',
    ]);
    cogumelo2.action(() => {
      cogumelo2.move(-speed * direction1, 0);
    });

    cogumelo2.collides('cano', () => {
      invertDirectionE();
    });
    cogumelo2.collides('tijolos', () => {
      invertDirectionE();
    });
    cogumelo2.collides('cogumelo', () => {
      invertDirection();
    });
  }

  scene('game', () => {
    add([sprite('bg'), pos(0, -21)]);
    const maps = [
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
      '2              4                 2',
      '2           2222                 2',
      '2                                2',
      '2     222                        2',
      '2                                2',
      '2                                2',
      '2    2                         3 2',
      '2    2                           2',
      '1111111111111111111111111111111111',
      '1111111111111111111111111111111111',
    ];

    const levelCfg = {
      width: 20,
      height: 20,
      1: () => [sprite('bloco'), solid(), area()],
      2: () => [sprite('tijolos'), solid(), area(), 'tijolos'],
      3: () => [sprite('cano'), solid(), area(), 'cano'],
      4: () => [sprite('flor'), solid(), area(), 'flor'],
    };
    moverCogumelos();
    const player = add([
      sprite('mario', {
        animSpeed: 1,
        frame: 0,
      }),
      solid(),
      area(),
      body(),
      pos(60, 0),
      origin('bot'),
    ]);

    player.onCollide('cano', () => {
      keyPress('down', () => {
        go('game');
      });
    });
    player.onCollide('cogumelo', () => {
      keyPress('down', () => {
        go('game');
      });
    });

    onKeyDown('left', () => {
      player.flipX(true);
      player.move(-120, 0);
    });
    onKeyDown('right', () => {
      player.move(120, 0);
      player.flipX(false);
    });
    onKeyPress('space', () => {
      if (player.isGrounded()) {
        player.jump(440);
      }
    });

    onKeyPress(['left', 'right'], () => {
      player.play('move');
    });

    keyRelease('left', () => {
      player.play('idle');
    });
    keyRelease('right', () => {
      player.play('idle');
    });

    const gameLevel = addLevel(maps, levelCfg);
  });
  go('game');
}
export default levelUm;
