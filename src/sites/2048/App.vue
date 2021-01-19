<template>
  <div id="app">
    <div class="content">
      <div class="name">2048</div>
      <input class="dimension" type="number" v-model="data.dimension" @keypress.enter="restart"/>
      <div class="name">{{data.stepsLength}}</div>
      <div class="btn" @click="restart">restart</div>
    </div>

    <div id="box" class="box" ref="box">
      <div id="pixi"></div>
    </div>
    <game-over v-show="data.isGameOver"></game-over>
  </div>
</template>

<script>
import pixi from './pixi';
import GameOver from './components/gameover.vue';
import {mapFields} from 'vuex-map-fields-two';
import {BASE_DATA} from '@/sites/2048/pixi-store';
import {cloneDeep, mergeWith} from 'lodash';

export default {
  name: 'Games-2048',
  components: {GameOver},
  data() {
    return {
    }
  },

  computed: {
    ...mapFields([
      'data'
    ])
  },
  mounted() {
    this.data.width = document.getElementById('box').clientWidth;
    pixi.initView(this.data);
  },
  methods: {
    restart() {
      this.data = mergeWith(cloneDeep(BASE_DATA), {dimension: this.data.dimension})
      this.data.width = document.getElementById('box').clientWidth;
      pixi.initView(this.data);
    }
  }
};
</script>

<style lang="scss">
@import '~@/assets/style/base.scss';
</style>

<style lang="scss" scoped>
@import '~@/assets/style/util.scss';
#app {
    margin-left: auto;
    margin-right: auto;
  .content {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      color: #776e65;
      font-weight: 900;
    }
    .dimension {
      width: px2rem(80);
      font-size: px2rem(30);
      background-color: #bbada0;
      padding: px2rem(12);
      outline: none;
      border: none;
    }
    .btn {
      font-size: px2rem(30);
      background-color: #413e35;
      display: inline-block;
      color: #fff;
      border-radius: 5px;
      padding: px2rem(20);
    }
  }
  .box {
    width: 100%;
    margin: 0 auto;
    border-radius: px2rem(40);
    text-align: center;
  }
$moboleWidth: px2rem(640);
$pcMiddleWidth: px2rem(640);
$pcBigWidth: px2rem(450);

  @media screen and (min-width:640px){
    .content{
      width: $pcMiddleWidth;
      .name {
        font-size: px2rem(50);
      }
    }
    .box {
      width: $pcMiddleWidth;
    }
  }
  @media screen and (min-width:1024px){
    .content{
      width: $pcBigWidth;
      .name {
        font-size: px2rem(50);
      }
      .dimension {
        width: px2rem(70);
        line-height: 1;
        font-size: px2rem(16);
      }
      .btn {
        font-size: px2rem(16);
        padding: px2rem(10);
      }
    }
    .box {
      width: $pcBigWidth;
    }
  }
}
</style>
