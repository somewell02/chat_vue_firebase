<template>
  <div id="chat_wrap">
    <chat-bar />
    <chat-main />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ChatBar from "@/components/chat/aside/ChatBar";
import ChatMain from "@/components/chat/main/ChatMain";

export default {
  name: "ChatView",

  data() {
    return {};
  },

  components: {
    ChatBar,
    ChatMain,
  },

  created() {
    if (!localStorage.getItem("uid")) {
      this.$router.push("/");
    }

    this.getUserFromLs();
  },

  methods: {
    ...mapActions({
      getUserFromLs: "user/getUserFromLs",
    }),
  },
};
</script>

<style lang="scss" scoped>
#chat_wrap {
  width: 900px;
  height: 100vh;
  background: var(--bg-chat-color);
  margin: 0 auto;
  font-size: 0;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
}
</style>
