<template>
  <main v-if="this.$store.state.currentChatId">
    <chat-main-header />
    <chat-main-messages />
    <chat-main-footer />
  </main>
</template>

<script>
import ChatMainFooter from "./ChatMainFooter.vue";
import ChatMainHeader from "./ChatMainHeader.vue";
import ChatMainMessages from "./ChatMainMessages.vue";

export default {
  name: "chat-main",

  components: {
    ChatMainHeader,
    ChatMainMessages,
    ChatMainFooter,
  },
};
</script>

<style lang="scss" scoped>
main {
  flex-grow: 2;
  height: 100vh;
  font-size: 15px;
  vertical-align: top;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
