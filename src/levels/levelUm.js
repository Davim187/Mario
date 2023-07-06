function levelUm() {
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/background.png');
  loadSprite('cano', 'sprites/cano.png');
  loadSprite('cogumeloE', 'sprites/cogumeloE.png', {
    anims: {
      idle: {
        from: 0,
        to: 0,
        loop: true,
      },
    },
  });
  loadSprite('cogumeloD', 'sprites/cogumeloD.png');
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

  function addButton(txt, p, f) {
    const btn = add([
      text(txt, { size: 28 }),
      pos(p),
      area(),
      scale(1),
      origin('center'),
    ]);

    btn.onClick(f);

    btn.onUpdate(() => {
      if (btn.isHovering()) {
        btn.scale = vec2(1.2);
      } else {
        btn.scale = vec2(1);
        btn.color = rgb();
      }
    });

    return btn;
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
      '2                                2',
      '2           2222                 2',
      '2                                2',
      '2     222                        2',
      '2                                2',
      '2                                2',
      '2    2                         3 2',
      '2    2                           2',
      '1111111111111111111111111111111111',
      '1111111111111111111111111111111111',
      '1111111111111111111111111114111111',
    ];

    const levelCfg = {
      width: 20,
      height: 20,
      1: () => [sprite('bloco'), solid(), area()],
      2: () => [sprite('tijolos'), solid(), area(), 'tijolos'],
      3: () => [sprite('cano'), solid(), area(), 'cano'],
      4: () => [sprite('cogumeloE'), solid(), area(), 'cogumelo'],
    };

    const cogumeloE = add([
      sprite('cogumeloE'),
      solid(),
      area(),
      body(),
      pos(250, 300),
      origin('bot'),
    ]);

    action('cogumelo', () => {
      cogumeloE.move(-20, 0);
      // cogumeloE.flipX(false);
      cogumeloE.collides('tijolos', () => {
        cogumeloE.play('idle');
        cogumeloE.flipX(true);
        if (cogumeloE.flipX(true)) {
          cogumeloE.move(20, 0);
        }
      });
    });
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
