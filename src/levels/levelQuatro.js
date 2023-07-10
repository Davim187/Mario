function levelQuatro(big) {
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/background.png');
  loadSprite('cano', 'sprites/cano.png');
  loadSprite('cogumeloE', 'sprites/cogumeloE.png');
  loadSprite('cogumeloD', 'sprites/cogumeloD.png');
  loadSprite('flor', 'sprites/flor.png');
  loadSprite('caixaSupresa', 'sprites/caixaSupresa.png');
  loadSprite('caixaSupresaDesativada', 'sprites/caixaSupresaDesativada.png');
  loadSprite('moeda', 'sprites/moeda.png');
  loadSprite('caixaSupresacogumelo', 'sprites/cogumeloCrescer.png');
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
  let direction2 = 1;
  let speed = 25;
  let jump = false;
  let isBig = false;

  function movercogumelos() {
    var cogumelo = add([
      sprite('cogumeloE'),
      area(),
      solid(),
      pos(250, 300),
      origin('bot'),
      'cogumelo',
    ]);
    var cogumelo2 = add([
      sprite('cogumeloE'),
      area(),
      solid(),
      pos(550, 300),
      origin('bot'),
      'cogumelo',
    ]);
    action(() => {
      cogumelo.move(speed * direction, 0);
    });

    cogumelo.collides('cano', () => {
      direction *= -1;
    });
    cogumelo.collides('tijolos', () => {
      direction *= -1;
    });
    cogumelo.collides('cogumelo', () => {
      direction *= -1;
    });

    action(() => {
      cogumelo2.move(-speed * direction1, 0);
    });

    cogumelo2.collides('cano', () => {
      direction1 *= -1;
    });
    cogumelo2.collides('tijolos', () => {
      direction1 *= -1;
    });
    cogumelo2.collides('cogumelo', () => {
      direction1 *= -1;
    });
  }

  scene('game', ({ score, big }) => {
    add([sprite('bg'), pos(0, -21)], fixed());
    movercogumelos();
    const scoreLabel = add([
      text('moeda: ' + score, { size: 15 }),
      pos(30, 25),
      layer('ui'),
      {
        value: score,
      },
    ]);
    add([text('level: 3', { size: 15 }), pos(30, 6)]);

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
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
      '2                                2',
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
      5: () => [sprite('caixaSupresa'), solid(), area(), 'caixaSupresa'],
      6: () => [
        sprite('caixaSupresaDesativada'),
        solid(),
        area(),
        'caixaSupresaDesativada',
      ],
      7: () => [sprite('moeda'), area(), 'moeda'],
      8: () => [
        sprite('caixaSupresacogumelo'),
        solid(),
        area(),
        'cogumeloCrescer',
        body(),
      ],
      9: () => [
        sprite('caixaSupresa'),
        solid(),
        area(),
        'caixaSupresacogumelo',
      ],
    };

    //// Mario

    const player = add([
      sprite('mario', {
        animSpeed: 1,
        frame: 0,
      }),
      solid(),
      area(),
      big(),
      body(),
      pos(60, 0),
      origin('bot'),
    ]);

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
        jump = true;
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

    //// Colisoes

    player.collides('moeda', (m) => {
      destroy(m);
      scoreLabel.value++;
      scoreLabel.text = 'moeda: ' + scoreLabel.value;
    });

    player.onCollide('cano', () => {
      keyPress('down', () => {
        go('game', { score: scoreLabel.value, big: isBig });
      });
    });

    player.onCollide('flor', () => {
      go('kill', { score: scoreLabel.value });
    });

    player.onCollide('cogumelo', (c) => {
      if (jump == true) {
        destroy(c);
      } else if (isBig) {
        player.jump(350);
        player.smallify();
      } else {
        go('kill', { score: scoreLabel.value });
      }
    });
    onCollide('cogumeloCrescer', 'cogumelo', (cogumeloCrescer) => {
      destroy(cogumeloCrescer);
    });
    player.onCollide('cogumeloCrescer', (cogumeloCrescer) => {
      destroy(cogumeloCrescer);
      player.biggify();
    });
    //// Moedas
    player.onHeadbutt((obj) => {
      if (obj.is('caixaSupresa')) {
        gameLevel.spawn('7', obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn('6', obj.gridPos.sub(0, 0));
      }
    });
    //// Fazer mario crescer
    function big() {
      return {
        isBig() {
          return isBig;
        },
        smallify() {
          this.scale = vec2(1);
          isBig = false;
        },
        biggify() {
          this.scale = vec2(1.2);
          isBig = true;
        },
      };
    }
    if (isBig) {
      player.biggify();
    }
    player.onHeadbutt((obj) => {
      if (obj.is('caixaSupresacogumelo')) {
        gameLevel.spawn('8', obj.gridPos.sub(0, 1));
        destroy(obj);
        gameLevel.spawn('6', obj.gridPos.sub(0, 0));
      }
    });
    action('cogumeloCrescer', (cogumeloCrescer) => {
      cogumeloCrescer.move(speed * direction, 0);
      cogumeloCrescer.onCollide('tijolos', () => {
        invertDirection();
      });
    });
    //// jump
    action(() => {
      if (player.isGrounded()) {
        jump = false;
      }
    });

    const gameLevel = addLevel(maps, levelCfg);
  });

  scene('kill', ({ score }) => {
    add([
      text('moeda:' + score, { size: 22 }),
      origin('center'),
      pos(width() / 2, height() / 2),
    ]);
    add([
      text('[aperte espaco!!].wavy'),
      {
        font: 'sinko',
        textSize: 18,
        styles: {
          wavy: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(240, 180),
          }),
        },
      },
    ]);
    onKeyPress('space', () => {
      go('game', { score: score, big: isBig });
    });
  });
  go('game', { score: 0, big: isBig });
}
export default levelQuatro;
