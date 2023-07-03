kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  background: [0, 0, 0, 1],
});

loadRoot('https://i.imgur.com/');

// Sprites
loadSprite('bloco', 'https://imgur.com/M6rwarW');
// Menu inicial

screen('game', () => {
  layer(['bg', 'obj', 'ui'], 'obj');

  const map = [
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
    '                                   ',
  ];
});

go('game');

function addButton(txt, p, f) {
  const btn = add([
    rect(120, 50, { radius: 8 }),
    pos(p),
    area(),
    scale(1),
    anchor('center'),
    outline(4),
  ]);
  btn.add([
    text(txt, {
      size: 15,
    }),
    anchor('center'),
    color(0, 0, 0),
  ]);
  btn.onHoverUpdate(() => {
    setCursor('pointer');
  });
  btn.onHoverEnd(() => {
    btn.scale = vec2(1);
    btn.color = rgb();
    setCursor('default');
  });

  return btn;
}

addButton('Start', vec2(360, 200), () => debug.log('oh hi'));
addButton('Quit', vec2(360, 250), () => debug.log('bye'));
