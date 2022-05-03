<template>
  <header>
    <div class="account_info">
      <h1>MegaChat</h1>
      <img src="@/assets/sign-out.svg" alt="sign-out" @click="signOut()" />
    </div>
    <custom-input
      v-model="search"
      @input="searchUpdate"
      type="text"
      placeholder="Search..."
      color="secondary"
      class="search"
    />
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    ...mapMutations({
      unsetUser: "user/unsetUser",
    }),
    signOut() {
      this.unsetUser();
      this.$router.push({ name: "login" });
    },
    searchUpdate() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style lang="sass" scoped>
header
  padding: 30px 20px
  .account_info
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    margin-bottom: 20px
    h1
      color: white
      font-size: 20px
      margin: 0
    img
      width: 30px
      cursor: pointer
      margin-left: 15px

.search
  padding-right: 50px
  background-image: url(@/assets/search.svg)
  background-repeat: no-repeat
  background-position: calc(100% - 15px) center
  background-size: 30px
</style>
