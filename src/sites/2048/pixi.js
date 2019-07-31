import _ from 'lodash';
import * as PIXI from 'pixi.js'
import {TouchDirection} from './touch';
import store, {initStore} from './pixi-store';
import {hitTestRectangle, keyboard, randomInt, strip, transform} from './pixi-util';

let {dimension, margin, speed} = store;
let viewWidth = 0;
let app = new PIXI.Application({
  width: viewWidth,
  height: viewWidth
});
const pixi = {
  isInitRandomSprite: false,
  isMoving: false,
  spriteWidth: strip(viewWidth / dimension - 2 * margin),
  probability: 90,
  sprites: [],
  mergeSprites: [],
  textures: [],
  chessBgStage: [], // for stage bg view
  moveDirection: 0,
  moveSteps: [],
  rectContainer: null, //for rect container
  spriteContainer: null, //for sprite container
  isReserve: false, // sprites is revers
  left: keyboard(37),
  up: keyboard(38),
  right: keyboard(39),
  down: keyboard(40),
  moveSprite,
  initView,
  drawRectSprite
};

export default {
  initView
};
window.pixi = pixi;
function initData () {
  initStore();
  viewWidth = store.width * 0.9;
  let n = dimension;
  pixi.spriteWidth = strip(viewWidth / n - 2 * margin);
  // use the fastest speed
  store.speed = strip(pixi.spriteWidth + store.margin);
  pixi.isInitRandomSprite = false;
  pixi.isReserve = false;
  pixi.moveSteps = [];
  pixi.sprites = [];
  pixi.textures = [];
  pixi.chessBgStage = [];
  pixi.moveDirection = 0;

  pixi.chessBgStage = _.fill(Array(n * n), 0, 0, n * n);
}
function initView () {
  initData();

  app = new PIXI.Application({
    width: viewWidth,
    height: viewWidth
  });
  document.getElementById('pixi').replaceWith(app.view);

  app.renderer.view.id = 'pixi';
  app.renderer.backgroundColor = 0xBBADA0;
  app.renderer.view.style.margin = 0;
  app.renderer.view.style.padding = 0;
  app.renderer.view.style.verticalAlign = 'top';

  pixi.rectContainer = new PIXI.Container();
  pixi.spriteContainer = new PIXI.Container();

  app.loader
    .add([{name: 'numberJson', url: '/game-img/2048/number.json'}])
    .on('progress', loadProgressHandler)
    .load(() => {
      createIdTexture();
      gameStart();
      app.ticker.add(play);
    });
}

function gameStart() {
  drawRectView(pixi.chessBgStage);
  moveHandler();

  initRandomSprite();
  pixi.isInitRandomSprite = false;
  initRandomSprite();
}

function createIdTexture () {
  pixi.textures = app.loader.resources['numberJson'].textures;
}

function drawRectView (chess) {
  chess.forEach((e, index) => {
    drawRect(transform(index, dimension));
  });
  app.stage.addChild(pixi.rectContainer);
  app.stage.addChild(pixi.spriteContainer);
  pixi.sprites = app.stage.children[1].children;
}

function drawRect ({x, y}) {
  const rectangle = new PIXI.Graphics();
  const spriteX = strip(margin + (pixi.spriteWidth + 2 * margin) * x);
  const spriteY = strip(margin + (pixi.spriteWidth + 2 * margin) * y);
  rectangle.beginFill(0xCCC0B3);
  rectangle.drawRoundedRect(spriteX, spriteY, pixi.spriteWidth, pixi.spriteWidth, 20);
  rectangle.endFill();
  pixi.rectContainer.addChild(rectangle);
}

function drawRectSprite ({x, y, value}) {
  const spriteX = strip(margin + (pixi.spriteWidth + 2 * margin) * x);
  const spriteY = strip(margin + (pixi.spriteWidth + 2 * margin) * y);
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
  sprite2.width = pixi.spriteWidth;
  sprite2.height = pixi.spriteWidth;
  sprite2.aid = _.uniqueId();

  pixi.spriteContainer.addChild(sprite2);
}

function loadProgressHandler (loader, resources) {
  console.log("loading: " + resources.url);
  console.log("progress: " + loader.progress + "%");
}


function chunk (s, d) {
    let r = [[s[0]]];
    for (let i = 1; i < s.length; i++) {
      if (!s[i]) break;
      if (_.last(_.last(r))[d] === s[i][d]) {
        _.last(r).push(s[i]);
        continue;
      }
      r.push([s[i]]);
    }
    return r;
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
  if (pixi.sprites.every(sprite => {
    return sprite.vx === 0 && sprite.vy === 0
  })) {
    pixi.isMoving = false;
    // nothing can be moved
    if (!pixi.sprites.every(sprite => {
      return Math.abs(sprite.x - sprite.x1) < 1 && Math.abs(sprite.y - sprite.y1) < 1
    })) {
      // one step is over
      initRandomSprite();
      if (isGameOver()) {
        store.isGameOver = true;
      }
    }
    return;
  }
  const right = strip(viewWidth - pixi.spriteWidth - margin);
  const operator = pixi.moveDirection === 2 || pixi.moveDirection === 8 ? 1 : -1;

  sortByXY(pixi.moveDirection).forEach(e => {
    for (let i = 0; i < e.length; i++) {
      let sprite = e[i];

      if (pixi.moveDirection === 2 && sprite.x <= margin) {
        sprite.x = margin;
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
      if (pixi.moveDirection === 8 && sprite.y <= margin) {
        sprite.y = margin;
        sprite.vy = 0;
        continue;
      }
      let hitSprite = e[i - 1];
      if (hitSprite) {
        let c = false;
        if (pixi.moveDirection === 2) {
          c =
          sprite.x + sprite.vx <= hitSprite.x + (pixi.spriteWidth + margin) * operator
        }
        else if (pixi.moveDirection === 8) {
          c =
          sprite.y + sprite.vy <= hitSprite.y + (pixi.spriteWidth + margin) * operator;
        }
        else if (pixi.moveDirection === 4) {
          c =
          sprite.x + sprite.vx >= hitSprite.x + (pixi.spriteWidth + margin) * operator
        } else {
          c =
          sprite.y + sprite.vy >= hitSprite.y + (pixi.spriteWidth + margin) * operator
        }
        if (
          !hitSprite.vx && !hitSprite.vy &&
          c &&
          (sprite.value !== hitSprite.value || hitSprite.isNew || sprite.isNew)
        ){
          if (pixi.moveDirection === 2) {
            sprite.x = strip(hitSprite.x + pixi.spriteWidth + margin * 2);
            sprite.vx = 0;
          }
          if (pixi.moveDirection === 4) {
            sprite.x = strip(hitSprite.x - pixi.spriteWidth - margin * 2);
            sprite.vx = 0;
          }
          if (pixi.moveDirection === 8) {
            sprite.y = strip(hitSprite.y + pixi.spriteWidth + margin * 2);
            sprite.vy = 0;
          }
          if (pixi.moveDirection === 16) {
            sprite.y = strip(hitSprite.y - pixi.spriteWidth - margin * 2);
            sprite.vy = 0;
          }
          continue;
        }
        let cc = (
          (pixi.moveDirection === 2 || pixi.moveDirection === 4) && Math.abs(hitSprite.x - sprite.x) <= speed ||
          (pixi.moveDirection === 8 || pixi.moveDirection === 16) && Math.abs(hitSprite.y - sprite.y) <= speed
          );
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
  })


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

  let index = randomInt(0, dimension * dimension - 1);
  pixi.randomSpriteIndex = index;
  console.log(`初始随机位置：${index}`)

  index = getOnlyRandomIndex(index);
  console.log(`去重后随机位置：${index}`)
  let randomNum = randomInt(0, 100) > pixi.probability ? 4 : 2;
  pixi.drawRectSprite({...transform(index, dimension), value: randomNum});
}


function getOnlyRandomIndex(index) {
  const isRepeat = checkIsRepeat(index);
  console.log(`是否位置重叠：${isRepeat}`);
  if (isRepeat) {
    index += 1;
    index = index % (dimension * dimension);
    return getOnlyRandomIndex(index);
  }
  return index;
}

function checkIsRepeat(index) {
  const {x, y} = transform(index, dimension);
  console.log(`随机位置对应的x：${x}, y: ${y}`)
  // judge is repeat
  const spriteX = strip(margin + (pixi.spriteWidth + 2 * margin) * x);
  const spriteY = strip(margin + (pixi.spriteWidth + 2 * margin) * y);
  return pixi.sprites.find(sprite => Math.abs(sprite.x - spriteX) < 1 && Math.abs(sprite.y - spriteY) < 1);

}

function isGameOver () {
  if (pixi.sprites.length === dimension * dimension) {
    // chess is full
    let sortedSprites = _.sortBy(pixi.sprites, ['y', 'x']);
    let canBeMerged = sortedSprites.find((sprite, i) => {
      if (sortedSprites[i+1]) {
        return sprite.y === sortedSprites[i+1].y && sprite.value === sortedSprites[i+1].value
      }
      return false;
    });
    if (!canBeMerged) {
      sortedSprites = _.sortBy(pixi.sprites, ['x', 'y']);
      canBeMerged = sortedSprites.find((sprite, i) => {
        if (sortedSprites[i+1]) {
          return sprite.x === sortedSprites[i+1].x && sprite.value === sortedSprites[i+1].value
        }
        return false;
      });
    }
    return !canBeMerged;
  }
  return false;
}

function moveSprite (direction) {
  if (pixi.isMoving) return;
  pixi.isMoving = true;
  pixi.isInitRandomSprite = false;
  pixi.moveDirection = direction;
  pixi.moveSteps.push(direction);
  pixi.sprites.forEach(s => s.isNew = false);
  console.warn(`方向：${direction}`);
  if (
    (pixi.isReserve && (direction === 2 || direction === 8)) ||
    (!pixi.isReserve && (direction === 4 || direction === 16))
    ) {
      pixi.sprites.reverse();
      pixi.isReserve = true;
    } else {
      pixi.isReserve = false;
    }
  pixi.sprites.forEach(sprite => {
    sprite.isNew = false;

    sprite.x1 = sprite.x;
    sprite.y1 = sprite.y;

    if (direction === 2) {
      sprite.vx = -speed;
    }
    if (direction === 4) {
      sprite.vx = speed;
    }
    if (direction === 8) {
      sprite.vy = -speed;
    }
    if (direction === 16) {
      sprite.vy = speed;
    }
  });
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

function moveHandler () {
  TouchDirection(document.getElementById('pixi'))
    .on('swipe', (e) => {
      moveSprite(e.offsetDirection);
    });

  pixi.left.release = () => {
    moveSprite(2);
  };
  pixi.right.release = () => {
    moveSprite(4);
  };
  pixi.down.release = () => {
    moveSprite(16);
  };
  pixi.up.release = () => {
    moveSprite(8);
  };
}

