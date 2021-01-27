import Vue from "vue";
import Vuex from "vuex";
import { getModule } from 'vuex-module-decorators';
import VuexPersistence from 'vuex-persist';
import localForage from 'localforage';

import userModule from './modules/userModule';

const vuexLocal = new VuexPersistence({
  asyncStorage: true,
  storage: (localForage) as unknown as Storage
})

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userModule
  },
  plugins: [vuexLocal.plugin]
});

export default store;

export const UserModule = getModule(userModule, store);