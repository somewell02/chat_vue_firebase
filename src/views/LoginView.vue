<template>
  <div class="auth_wrapper">
    <h1>Authorization in MegaChat</h1>
    <button @click="googleLogin">Login with Google</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getUserById, createUser } from "@/data/api/users";

import { mapMutations } from "vuex";

export default {
  name: "LoginView",

  created() {
    if (localStorage.getItem("uid")) {
      this.$router.push("/chat");
    }
  },

  methods: {
    ...mapMutations({
      setUser: "user/setUser",
    }),
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          if (getUserById(res.user.uid) == null) {
            createUser(res.user);
          }
          this.setUser(res.user);
          this.$router.push({ name: "chat" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.auth_wrapper
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  button
    cursor: pointer
    margin-top: 20px
    background: #ac83f0
    color: white
    border: 0
    border-radius: 5px
    outline: none
    display: flex
    align-items: center
    justify-content: center
    width: 250px
    height: 45px
    &:hover
      background: none
      color: #ac83f0
      border: 1px solid #ac83f0
</style>
