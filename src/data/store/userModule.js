const userModule = {
  state: () => ({
    userId: "",
    userEmail: "",
  }),

  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUser(state, user) {
      state.userId = user.uid;
      state.userEmail = user.email;
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", user.email);
    },
    unsetUser(state) {
      state.userId = null;
      state.userEmail = null;
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
    },
  },

  actions: {
    getUserFromLs({ commit }) {
      commit("setUserId", localStorage.getItem("uid"));
      commit("setUserEmail", localStorage.getItem("email"));
    },
  },
  namespaced: true,
};

export default userModule;
