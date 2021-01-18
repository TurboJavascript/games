import Vue from 'vue';
import Vuex from 'vuex';
import {getField, updateField} from 'vuex-map-fields-two';

// Import the `getField` getter and the `updateField`
// mutation function from the `vuex-map-fields` module.

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      dimension: 4,
      margin: 6,
      speed: 10,
      currentScore: 0,
      highestScore: 0,
      isGameOver: false,
    }
  },
  getters: {
    // Add the `getField` getter to the
    // `getters` of your Vuex store instance.
    getField,
// By wrapping the `getField()` function we're
    // able to provide a specific property of the state.
    // getDataField(state) {
    //   return getField(state.data);
    // },
  },
  mutations: {
    // Add the `updateField` mutation to the
    // `mutations` of your Vuex store instance.
    updateField,
    // Mutating only a specific property of the state
    // can be significantly faster than mutating the
    // whole state every time a field is updated.
    // updateDataField(state, field) {
    //   updateField(state.user, field);
    // },
  },
});
