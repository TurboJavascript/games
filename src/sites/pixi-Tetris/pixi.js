import * as PIXI from 'pixi.js'
import _ from 'lodash';
import one from './assets/one.png';
import store, {initStore} from './pixi-store';
import {keyboard, randomInt, strip, transform, chunk, setAnimation, hitTestRectangle, contain} from './pixi-util';

const tetris = [
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}],
  [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}],
  [{x: 0, y: 1}, {x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
  [{x: 0, y: 1}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
  [{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 1}],
  [{x: 0, y: 0}, {x: 3, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 0}],
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 1}]
];

let app = null;

const game = {
  app: getApp,
  pause,
  isPause: false,
  delayId: null
};

function getApp () {
  initStore();
  game.dpr = window.devicePixelRatio;
  game.width = document.getElementById(store.boxId).clientWidth * game.dpr;
  game.spriteWidth = strip(game.width / 10);
  game.containerOffset = 3;
  game.speed = game.spriteWidth;
  game.movingContainer = new PIXI.Container();
  containerHandler();

  app = new PIXI.Application({
    width: this.width,
    height: this.width * 2,
    transparent: true
  });
  document.getElementById(store.docId).replaceWith(app.view);

  app.renderer.view.id = store.docId;
  app.renderer.view.style.verticalAlign = 'top';
  app.renderer.view.style.transform = `scale(${1/game.dpr})`;
  app.renderer.view.style.transformOrigin = `0 0`;
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.top = '0'
  app.renderer.view.style.left = '0'

  app.stage.addChild(game.movingContainer);

  app.loader
    .add([one])
    .on('progress', loadProgressHandler)
    .load(() => {
      createIdTexture();
      gameStart();
      let s = app.ticker.add(play);
      // s.minFPS = 0.5;
      // s.maxFPS = 0.5;
    });
}

function loadProgressHandler (loader, resources) {
  console.log("loading: " + resources.url);
  console.log("progress: " + loader.progress + "%");
}

function gameStart () {
  makeTetris(randomInt(0, tetris.length - 1));
  eventHandler();
}

function play() {
  if (game.delayId) return;
  game.delayId = setTimeout(() => {
    game.delayId = null;
  }, store.delay);

  if (game.isPause) return;

  if (isGameOver()) {
    store.isGameOver = true;
    return;
  }
  updateTetris();
  game.movingContainer.y += game.movingContainer.vy;
}

function updateTetris() {
  if (checkHit()) {
    store.delay = 1000;
    removeContainer();
    checkHasOneLine();
    makeTetris(randomInt(0, tetris.length - 1))
  }
}

function isGameOver() {
  return !!app.stage.children.filter(sprite => sprite.isSprite)
  .filter(sprite =>
    sprite.x >= game.spriteWidth * game.containerOffset && sprite.x * game.spriteWidth * (game.containerOffset + 4) && sprite.y <= 2
  ).length
}

function pause() {
  game.isPause = !game.isPause;
}

function createIdTexture () {
  game.texture = PIXI.Texture.from(one);
}

function setupSprite ({x, y}) {
  let sprite2 = new PIXI.Sprite(game.texture);
  sprite2.x = strip(x);
  sprite2.y = strip(y);
  sprite2.width = game.spriteWidth;
  sprite2.height = game.spriteWidth;
  sprite2.aid = _.uniqueId();
  return sprite2;
}

function makeTetris (index = 0) {
  tetris[index].slice(0, 4).map(t => {
    return setupSprite({
      x: t.x * game.spriteWidth,
      y: t.y * game.spriteWidth,
      v: {
        vx: 0,
        vy: 0
      },
      originX: _.last(tetris[index]).x,
      originY: _.last(tetris[index]).y
    })
  }).forEach(sprite => {
    game.movingContainer.addChild(sprite);
  });
  game.movingContainer.vy = game.speed;
  game.movingContainer.x = strip(game.spriteWidth * game.containerOffset);
  game.movingContainer.y = -2 * game.spriteWidth;
  game.isDowning = false;
}

function checkHasOneLine() {

  console.log(game.movingContainer)
  console.log(app.stage.children)
  let sprites = _.sortBy(app.stage.children.filter(child => child.isSprite), ['y']).reverse();
  if (!sprites.length) return;
  let sortByY = [[sprites[0]]];
  sprites.slice(1).forEach(sprite => {
    let index = sortByY.findIndex(sprites =>{
      return Math.abs(sprites[0].y - sprite.y) < 2
    })
    if (index === -1) {
      let l = [sprite];
      sortByY.push(l);
      return;
    };
    sortByY[index].push(sprite);
  });
  sortByY.forEach((sortSprites, i) => {
    if (sortSprites.length === 10) {
      sortSprites.forEach(sprite => {
        app.stage.removeChild(sprite);
      });
      sortByY.slice(i).forEach(s => {
        s.forEach(sprite => {
          sprite.y += game.spriteWidth;
        })
      })
    }
  })
}

function checkHit () {
  game.movingContainer.children.forEach(e => e.tint = 0xFFFFFF);
  let sprites = app.stage.children.filter(e => e.isSprite);
  if (sprites.length) {
    let xs = [...new Set(game.movingContainer.children.map(t => t.x + game.movingContainer.x))];
    let movingSprites = xs.map(x =>
      _.last(_.sortBy(game.movingContainer.children.filter(sprite => sprite.x + game.movingContainer.x === x), ['y']))
    );

    let allInX = sprites.filter(t =>
      xs.find(x => Math.abs(x - t.x) < 2)
    );

    if (allInX.length) {
      let hitSprites = movingSprites.map(movingSprite =>
         _.first(_.sortBy(allInX.filter(sprite =>
           Math.abs(sprite.x - movingSprite.x - game.movingContainer.x) < 2), ['y']))
      );

      return hitMovingBottom(hitSprites, movingSprites);
    }

    app.stage.children.filter(sprite => sprite.isSprite).forEach(sprite => sprite.tint = 0xFFFFFF);

    return hitWithBottom();
  }
  return hitWithBottom();
}

function checkHitRight () {
  game.movingContainer.children.forEach(e => e.tint = 0xFFFFFF);

  let sprites = app.stage.children.filter(e => e.isSprite);
  if (sprites.length) {
    let ys = [...new Set(game.movingContainer.children.map(t => t.y + game.movingContainer.y))];
    let movingSprites = ys.map(y =>
      _.last(_.sortBy(game.movingContainer.children.filter(sprite => sprite.y + game.movingContainer.y === y), ['x']))
      );
    let allInY = sprites.filter(t => ys.find(y => Math.abs(y - t.y) < 2))

    if (allInY.length) {
      let hitSprites = movingSprites.map(movingSprite =>
        _.first(_.sortBy(allInY.filter(sprite =>
          Math.abs(sprite.y - movingSprite.y - game.movingContainer.y) < 2), ['x']))
        );
        return hitMovingRight(hitSprites, movingSprites);
    }
    return null;
  }
  return null;
}

function checkHitLeft () {
  game.movingContainer.children.forEach(e => e.tint = 0xFFFFFF);

  let sprites = app.stage.children.filter(e => e.isSprite);
  if (sprites.length) {
    let ys = [...new Set(game.movingContainer.children.map(t => t.y + game.movingContainer.y))];
    let movingSprites = ys.map(y =>
      _.first(_.sortBy(game.movingContainer.children.filter(sprite => sprite.y + game.movingContainer.y === y), ['x']))
      );
    let allInY = sprites.filter(t => ys.find(y => Math.abs(y - t.y) < 2))

    if (allInY.length) {
      let hitSprites = movingSprites.map(movingSprite =>
        _.last(_.sortBy(allInY.filter(sprite =>
          Math.abs(sprite.y - movingSprite.y - game.movingContainer.y) < 2), ['x']))
        );
        return hitMovingLeft(hitSprites, movingSprites);
    }
    return null;
  }
  return null;
}

function hitMovingBottom (hit, moving) {
  app.stage.children.filter(sprite => sprite.isSprite).forEach(sprite => sprite.tint = 0xFFFFFF);
  if (game.movingContainer) {
    game.movingContainer.children.forEach(sprite => sprite.tint = 0xFFFFFF);
  }
  return moving.some(movingSprite => {
    if (!movingSprite) return false;
    let hitSprite = hit.find(sprite => sprite && Math.abs(movingSprite.x + game.movingContainer.x - sprite.x) < 2);
    if (!hitSprite) return false;
    store.guide && (hitSprite.tint = 0xFF0000);
    store.guide && (movingSprite.tint = 0x01FF00);
    return hitTestRectangle(hitSprite, {
      x: movingSprite.x + game.movingContainer.x,
      y: movingSprite.y + game.movingContainer.y,
      width: movingSprite.width,
      height: movingSprite.height
    }, 'down')
  }) ? 'hit' : null;
}

function hitMovingRight (hit, moving) {
  app.stage.children.filter(sprite => sprite.isSprite).forEach(sprite => sprite.tint = 0xFFFFFF);
  if (game.movingContainer) {
    game.movingContainer.children.forEach(sprite => sprite.tint = 0xFFFFFF);
  }
  return moving.some(movingSprite => {
    if (!movingSprite) return false;
    let hitSprite = hit.find(sprite => sprite && Math.abs(movingSprite.y + game.movingContainer.y - sprite.y) < 2);
    if (!hitSprite) return false;
    store.guide && (hitSprite.tint = 0x9000A8);
    store.guide && (movingSprite.tint = 0x01FF00);
    return hitTestRectangle(hitSprite, {
      x: movingSprite.x + game.movingContainer.x,
      y: movingSprite.y + game.movingContainer.y,
      width: movingSprite.width,
      height: movingSprite.height
    }, 'right')
  }) ? 'hit-right' : null;
}

function hitMovingLeft (hit, moving) {
  app.stage.children.filter(sprite => sprite.isSprite).forEach(sprite => sprite.tint = 0xFFFFFF);
  if (game.movingContainer) {
    game.movingContainer.children.forEach(sprite => sprite.tint = 0xFFFFFF);
  }
  return moving.some(movingSprite => {
    if (!movingSprite) return false;
    let hitSprite = hit.find(sprite => sprite && Math.abs(movingSprite.y + game.movingContainer.y - sprite.y) < 2);
    if (!hitSprite) return false;
    store.guide && (hitSprite.tint = 0x003D82);
    store.guide && (movingSprite.tint = 0x01FF00);
    return hitTestRectangle(hitSprite, {
      x: movingSprite.x + game.movingContainer.x,
      y: movingSprite.y + game.movingContainer.y,
      width: movingSprite.width,
      height: movingSprite.height
    }, 'left')
  }) ? 'hit-left' : null;
}

function hitWithBottom () {
  return contain(game.movingContainer, {
    x: 0,
    y: 0,
    width: app.renderer.width,
    height: app.renderer.height
  });
}

function removeContainer () {
  while(game.movingContainer.children[0]) {
    let sprite = game.movingContainer.children[0];
    sprite.y += game.movingContainer.y;
    sprite.x += game.movingContainer.x;
    sprite.tint = 0xFFFFFF;
    app.stage.addChild(sprite);
  }
}

function eventHandler() {
  keyboard(37).release = game.movingContainer.left;
  keyboard(38).release = game.movingContainer.up;
  keyboard(39).release = game.movingContainer.right;
  keyboard(40).release = game.movingContainer.down;
}

function containerHandler() {
  game.movingContainer.left = function () {
    if (game.isDowning || game.isPause) return;
    if (game.movingContainer.x - game.spriteWidth < -1) return;
    if (checkHitLeft()) return;
    game.movingContainer.x = strip(game.movingContainer.x - game.spriteWidth);
    updateTetris();
  }
  game.movingContainer.right = function () {
    if (game.isDowning || game.isPause) return;
    if (game.movingContainer.x + game.movingContainer.width > game.width - 1) return;
    if (checkHitRight()) return;

    game.movingContainer.x += game.spriteWidth;
    updateTetris();
  }
  game.movingContainer.down = function() {
    if (game.isDowning || game.isPause) return;
    game.isDowning = true;
    store.delay = 10;
    clearTimeout(game.delayId);
    game.delayId = null;
    updateTetris();
  }
}

export default game;
