import { createStore } from "vuex";
import userModule from "./userModule";

const store = createStore({
  state() {
    return {
      darkTheme: false,
      currentChatId: "",
    };
  },
  mutations: {
    setCurrentChatId(state, id) {
      state.currentChatId = id;
    },
  },
  modules: {
    user: userModule,
  },
});

export default store;
