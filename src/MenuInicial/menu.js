import kaboom from 'kaboom';
kaboom({ scale: 2 });
function menu() {
  loadSprite('bloco', 'sprites/bloco.png');
  loadSprite('tijolos', 'sprites/tijolos.png');
  loadSprite('bg', 'sprites/i282364(9).png');
  // loadSprite('mato', 'sprites/i282364(1).png');

  scene('game', () => {
    // layers(['bg', 'obj', 'ui'], 'obj');
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
      '2                                2',
      '1111111111111111111111111111111111',
    ];
    const levelCfg = {
      tileWidth: 20,
      tileHeight: 20,
      tiles: {
        1: () => [sprite('bloco'), area()],
        2: () => [sprite('tijolos'), area()],
      },
    };
    add([sprite('bg')]);
    const gameLevel = addLevel(maps, levelCfg);
  });
  go('game');
  // function addButton(txt, p, f) {
  //   const btn = add([
  //     rect(100, 50, { radius: 8 }),
  //     pos(p),
  //     area(),
  //     scale(1),
  //     anchor('center'),
  //     outline(6),
  //     color(0, 0, 0),
  //   ]);
  //   btn.add([
  //     text(txt, {
  //       size: 35,
  //     }),
  //     anchor('center'),
  //     color(255, 255, 255),
  //   ]);
  //   btn.onHoverUpdate(() => {
  //     setCursor('pointer');
  //     color(0, 0, 0);
  //     btn.color = rgb(0, 0, 0);
  //     btn.scale = vec2(1.5);
  //   });
  //   btn.onHoverEnd(() => {
  //     btn.scale = vec2(1);
  //     setCursor('default');
  //   });

  //   return btn;
  // }

  // addButton('Start', vec2(360, 200), () => debug.log('oh hi'));
  // addButton('Quit', vec2(360, 250), () => debug.log('bye'));
}
export default menu;
