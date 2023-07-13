import levelUm from '../levels/levelUm';
import kaboom from 'kaboom';
function menu() {
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
  function fecharPagina() {
    var red = 'https://2000.kaboomjs.com/#onTouchEnd';
  }
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
      '2                                2',
      '2                                2',
      '2              2222              2',
      '2                     22         2',
      '2         22          22     2   2',
      '2    2    2           22   22  3 2',
      '2    2    2           22   22    2',
      '1111111111111111111111111111111111',
      '1111111111111111111111111111111111',
    ];

    const levelCfg = {
      width: 20,
      height: 20,
      1: () => [sprite('bloco'), solid(), area()],
      2: () => [sprite('tijolos'), solid(), area()],
      3: () => [sprite('cano'), solid(), area(), 'cano'],
    };

    const player = add([
      sprite('mario', {
        animSpeed: 0.5,
        frame: 0,
      }),
      solid(),
      area(),
      body(),
      pos(60, 0),
      origin('bot'),
    ]);

    player.collides('cano', () => {
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

    addButton('Start', vec2(340, 140), () => levelUm());

    add([
      text('[Mario].wavy'),
      {
        width: width(),
        font: 'sinko',
        textSize: 48,
        styles: {
          wavy: (idx, ch) => ({
            color: rgb(255, 255, 255),
            pos: vec2(250, wave(50, 60, time() * 4 + idx * 0.5)),
          }),
        },
      },
    ]);

    const gameLevel = addLevel(maps, levelCfg);
  });
  go('game');
}
export default menu;
