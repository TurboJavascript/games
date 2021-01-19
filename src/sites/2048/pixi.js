import * as PIXI from 'pixi.js'
import _ from 'lodash';
import {TouchDirection} from './touch';
import {keyboard, randomInt, strip, transform, chunk, setAnimation} from './pixi-util';
let dpr = window.devicePixelRatio;
let viewWidth = 0;
let app = new PIXI.Application({
  width: viewWidth,
  height: viewWidth
});
let pixi = {};

export default {
  initView
};

function initData (store) {
  app.resize();
  const  {
    dimension,
    margin,
    speed,
    currentScore,
    highestScore,
    isGameOver,
  } = store

  pixi = {
    correction: 0, // fix the anchor side effect
    isInitRandomSprite: false,
    isMoving: false,
    spriteWidth: strip(viewWidth / dimension - 2 * margin),
    probability: 90,
    sprites: [],
    mergeSprites: [],
    moveSteps: [],
    textures: [],
    chessBgStage: [], // for stage bg view
    moveDirection: 0,
    rectContainer: null, //for rect container
    spriteContainer: null, //for sprite container
    left: keyboard(37),
    up: keyboard(38),
    right: keyboard(39),
    down: keyboard(40),
    moveSprite,
    initView,
    drawRectSprite,
    ...store
  }
  viewWidth = store.width * 0.9 * dpr;
  store.margin = margin * dpr;
  let n = dimension;
  pixi.spriteWidth = strip(viewWidth / n - 2 * margin);
  pixi.correction = pixi.spriteWidth / 2;
  // use the fastest speed
  store.speed = strip(pixi.spriteWidth / 5);
  pixi.isInitRandomSprite = false;
  pixi.moveSteps = [];
  pixi.sprites = [];
  pixi.textures = [];
  pixi.chessBgStage = [];
  pixi.moveDirection = 0;

  pixi.chessBgStage = _.fill(Array(n * n), 0, 0, n * n);
}
function initView (store) {
  initData(store);

  app = new PIXI.Application({
    width: viewWidth,
    height: viewWidth
  });
  document.getElementById('pixi').replaceWith(app.view);

  app.renderer.view.id = 'pixi';
  app.renderer.backgroundColor = 0xBBADA0;
  app.renderer.view.style.verticalAlign = 'top';
  app.renderer.view.style.transform = `scale(${1/dpr})`;
  app.renderer.view.style.position = `absolute`;
  app.renderer.view.style.left = `4%`;
  app.renderer.view.style.transformOrigin = `0 0`;
  app.renderer.view.style.border = `${pixi.margin}px solid #bbada0`;

  pixi.rectContainer = new PIXI.Container();
  pixi.spriteContainer = new PIXI.Container();
  app.loader
    .add([{name: 'numberJson', url:  './game-img/2048/number.json'}])
    .on('progress', loadProgressHandler)
    .load(() => {
      createIdTexture();
      gameStart(store);
      app.ticker.add(play);
    });
}

function gameStart(store) {
  drawRectView(pixi.chessBgStage);
  moveHandler(store);

  initRandomSprite();
  pixi.isInitRandomSprite = false;
  initRandomSprite();
}

function createIdTexture () {
  pixi.textures = app.loader.resources['numberJson'].textures;
}

function drawRectView (chess) {
  chess.forEach((e, index) => {
    drawRect(transform(index, pixi.dimension));
  });
  app.stage.addChild(pixi.rectContainer);
  app.stage.addChild(pixi.spriteContainer);
  pixi.sprites = app.stage.children[1].children;
}

function drawRect ({x, y}) {
  const rectangle = new PIXI.Graphics();
  const spriteX = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * x);
  const spriteY = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * y);
  rectangle.beginFill(0xCCC0B3);
  rectangle.drawRoundedRect(spriteX, spriteY, pixi.spriteWidth, pixi.spriteWidth, 20);
  rectangle.endFill();
  pixi.rectContainer.addChild(rectangle);
}

function drawRectSprite ({x, y, value}) {
  const spriteX = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * x + pixi.correction);
  const spriteY = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * y + pixi.correction);
  setupSprite({
    x: spriteX,
    y: spriteY,
    value
  });
}

function setupSprite ({x, y, value, v = {vx: 0, vy: 0}}) {
  let sprite2 = new PIXI.Sprite(pixi.textures[`n${value}.png`]);
  sprite2.x = strip(x);
  sprite2.x1 = sprite2.x * 2;
  sprite2.vx = v.vx;
  sprite2.vy = v.vy;
  sprite2.y = strip(y);
  sprite2.y1 = sprite2.y * 2;
  sprite2.value = value;
  sprite2.isNew = true;
  sprite2.visible = false;
  sprite2.width = pixi.spriteWidth;
  sprite2.height = pixi.spriteWidth;
  sprite2.anchor.set(0.5, 0.5);
  sprite2.aid = _.uniqueId();

  pixi.spriteContainer.addChild(sprite2);
  setAnimation(sprite2, sprite2.scale.x);
}

function loadProgressHandler (loader, resources) {
  console.log("loading: " + resources.url);
  console.log("progress: " + loader.progress + "%");
}

function sortByXY (direction) {
  if (direction === 2) {
    let s = _.sortBy(pixi.sprites, ['y', 'x']);
    return chunk(s, 'y');
  }
  if (direction === 4) {
    let s = _.sortBy(pixi.sprites, ['y', (s) => -s.x]);
    return chunk(s, 'y');
  }
  if (direction === 8) {
    let s = _.sortBy(pixi.sprites, ['x', 'y'])
    return chunk(s, 'x');
  }
  if (direction === 16) {
    let s = _.sortBy(pixi.sprites, ['x', (s) => -s.y])
    return chunk(s, 'x');
  }
}

function play () {
  if (pixi.sprites.every(sprite => sprite.vx === 0 && sprite.vy === 0)) {
    pixi.isMoving = false;
    // nothing can be moved
    if (!pixi.sprites.every(sprite => {
      return Math.abs(sprite.x - sprite.x1) < 1 && Math.abs(sprite.y - sprite.y1) < 1
    })) {
      // one step is over
      initRandomSprite();
      if (isGameOver()) {
        pixi.isGameOver = true;
      }
    }
    return;
  }
  const right = strip(viewWidth - pixi.spriteWidth - pixi.margin + pixi.correction);
  const operator = pixi.moveDirection === 2 || pixi.moveDirection === 8 ? 1 : -1;
  sortByXY(pixi.moveDirection).forEach(e => {
    for (let i = 0; i < e.length; i++) {
      let sprite = e[i];

      if (pixi.moveDirection === 2 && sprite.x <= pixi.margin+ pixi.correction) {
        sprite.x = pixi.margin + pixi.correction;
        sprite.vx = 0;
        continue;
      }
      if (pixi.moveDirection === 4 && sprite.x >= right) {
        sprite.x = right;
        sprite.vx = 0;
        continue;
      }
      if (pixi.moveDirection === 16 && sprite.y >= right) {
        sprite.y = right;
        sprite.vy = 0;
        continue;
      }
      if (pixi.moveDirection === 8 && sprite.y <= pixi.margin+ pixi.correction) {
        sprite.y = pixi.margin+ pixi.correction;
        sprite.vy = 0;
        continue;
      }
      let hitSprite = e[i - 1];
      if (hitSprite) {
        let c = false;
        if (pixi.moveDirection === 2) {
          c =
          sprite.x + sprite.vx <= hitSprite.x + (pixi.spriteWidth + pixi.margin) * operator;
        }
        else if (pixi.moveDirection === 8) {
          c =
          sprite.y + sprite.vy <= hitSprite.y + (pixi.spriteWidth + pixi.margin) * operator;
        }
        else if (pixi.moveDirection === 4) {
          c =
          sprite.x + sprite.vx >= hitSprite.x + (pixi.spriteWidth + pixi.margin) * operator;
        } else {
          c =
          sprite.y + sprite.vy >= hitSprite.y + (pixi.spriteWidth + pixi.margin) * operator;
        }
        if (
          !hitSprite.vx && !hitSprite.vy &&
          c &&
          (sprite.value !== hitSprite.value || hitSprite.isNew || sprite.isNew)
        ){
          if (pixi.moveDirection === 2) {
            sprite.x = strip(hitSprite.x + pixi.spriteWidth + pixi.margin * 2);
            sprite.vx = 0;
          }
          if (pixi.moveDirection === 4) {
            sprite.x = strip(hitSprite.x - pixi.spriteWidth - pixi.margin * 2);
            sprite.vx = 0;
          }
          if (pixi.moveDirection === 8) {
            sprite.y = strip(hitSprite.y + pixi.spriteWidth + pixi.margin * 2);
            sprite.vy = 0;
          }
          if (pixi.moveDirection === 16) {
            sprite.y = strip(hitSprite.y - pixi.spriteWidth - pixi.margin * 2);
            sprite.vy = 0;
          }
          continue;
        }
        let cc =
          ((pixi.moveDirection === 2 || pixi.moveDirection === 4) && Math.abs(hitSprite.x - sprite.x) <= pixi.speed) ||
          ((pixi.moveDirection === 8 || pixi.moveDirection === 16) && Math.abs(hitSprite.y - sprite.y) <= pixi.speed);
        if (
          hitSprite.value === sprite.value &&
          cc &&
          !hitSprite.isNew && !sprite.isNew
          ) {
          // merge
            console.log(`will be push in hitMerge arr s1:${sprite.aid}, x: ${sprite.x}, y: ${sprite.y}, value: ${sprite.value}, vx: ${sprite.vx}, vy: ${sprite.vy}`);
            console.log(`will be push in hitMerge arr s2:${hitSprite.aid}, x: ${hitSprite.x}, y: ${hitSprite.y}, value: ${hitSprite.value}, vx: ${hitSprite.vx}, vy: ${hitSprite.vy}`);
          // pixi.mergeSprites.push({s1: hitSprite, s2: sprite});
          hitMerge(hitSprite, sprite);
          i++;
        }
      }

      sprite.x += sprite.vx;
      sprite.y += sprite.vy;
    }
  });

  pixi.mergeSprites.forEach(merge => {
    console.log(`foreach hitMerge arr s1:${merge.s1.aid}, x: ${merge.s1.x}, y: ${merge.s1.y}, value: ${merge.s1.value}`);
    console.log(`foreach hitMerge arr s2:${merge.s2.aid}, x: ${merge.s2.x}, y: ${merge.s2.y}, value: ${merge.s2.value}`);
    hitMerge(merge.s1, merge.s2);
  });
  pixi.mergeSprites = [];
}

function initRandomSprite () {
  if (pixi.isInitRandomSprite) return;
  pixi.isInitRandomSprite = true;
  console.log(`数组长度：${pixi.sprites.length}`)

  let index = randomInt(0, pixi.dimension * pixi.dimension - 1);
  pixi.randomSpriteIndex = index;
  console.log(`初始随机位置：${index}`)

  index = getOnlyRandomIndex(index);
  console.log(`去重后随机位置：${index}`)
  let randomNum = randomInt(0, 100) > pixi.probability ? 4 : 2;
  drawRectSprite({...transform(index, pixi.dimension), value: randomNum});
}

function getOnlyRandomIndex(index) {
  if (checkIsRepeat(index)) {
    index = ++index % (pixi.dimension * pixi.dimension);
    return getOnlyRandomIndex(index);
  }
  return index;
}

function checkIsRepeat(index) {
  const {x, y} = transform(index, pixi.dimension);
  console.log(`随机位置对应的x：${x}, y: ${y}`)
  // judge is repeat
  const spriteX = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * x + pixi.correction);
  const spriteY = strip(pixi.margin + (pixi.spriteWidth + 2 * pixi.margin) * y + pixi.correction);
  return pixi.sprites.find(sprite => Math.abs(sprite.x - spriteX) < 1 && Math.abs(sprite.y - spriteY) < 1);

}

function isGameOver () {
  if (pixi.sprites.length === pixi.dimension * pixi.dimension) {
    // chess is full
    let sortedSprites = _.sortBy(pixi.sprites, ['y', 'x']);

    let canBeMerged = findCanBeMerged(sortedSprites, 'y');
    if (!canBeMerged) {
      sortedSprites = _.sortBy(pixi.sprites, ['x', 'y']);
      canBeMerged = findCanBeMerged(sortedSprites, 'x');
    }
    return !canBeMerged;
  }
  return false;
}

function findCanBeMerged (sortedSprites, d) {
  return sortedSprites.find((sprite, i) => {
    if (sortedSprites[i+1]) {
      return sprite[d] === sortedSprites[i+1][d] && sprite.value === sortedSprites[i+1].value
    }
    return false;
  });
}

function moveSprite (direction, store) {
  if (pixi.isMoving) return;
  pixi.isMoving = true;
  pixi.isInitRandomSprite = false;
  pixi.moveDirection = direction;
  pixi.moveSteps.push(direction);
  pixi.sprites.forEach(s => s.isNew = false);
  console.warn(`方向：${direction}`);
  pixi.sprites.forEach(sprite => {
    sprite.isNew = false;

    sprite.x1 = sprite.x;
    sprite.y1 = sprite.y;

    if (direction === 2) {
      sprite.vx = -pixi.speed;
    }
    if (direction === 4) {
      sprite.vx = pixi.speed;
    }
    if (direction === 8) {
      sprite.vy = -pixi.speed;
    }
    if (direction === 16) {
      sprite.vy = pixi.speed;
    }
  });
  store.stepsLength ++;
}

function hitMerge(s1, s2) {
  // s1 is the current sprite
  // s2 is the hit sprite
  console.log(`hitMerge-s1: aid: ${s1.aid}, x: ${s1.x}, y: ${s1.y}, value: ${s1.value}`)
  console.log(`hitMerge-s2: aid: ${s2.aid}, x: ${s2.x}, y: ${s2.y}, value: ${s2.value}`)
  // setupSprite({x: s1.x, y: s1.y, value: s1.value * 2, v: {vx:s1.vx, vy:s1.vy}});
  s2.value = s2.value * 2;
  s2.isNew = true;
  s2.texture = pixi.textures[`n${s2.value}.png`];
  s1.visible = false;
  let aid1 = app.stage.children[1].removeChild(s1)
  console.log(`removeChild-s1: aid: ${aid1 && aid1.aid}`);
  // let aid2 = app.stage.children[1].removeChild(s2)
  // console.log(`removeChild-s2: aid: ${aid2 && aid2.aid}`);
}

function moveHandler (store) {
  TouchDirection(document.getElementById('pixi'))
    .on('swipe', (e) => {
      moveSprite(e.offsetDirection, store);
    });

  pixi.left.release = () => {
    moveSprite(2, store);
  };
  pixi.right.release = () => {
    moveSprite(4, store);
  };
  pixi.down.release = () => {
    moveSprite(16, store);
  };
  pixi.up.release = () => {
    moveSprite(8, store);
  };
}

