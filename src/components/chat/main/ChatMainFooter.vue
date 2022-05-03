<template>
  <footer>
    <textarea
      v-model="currentMessage"
      @keydown.enter.prevent="sendMessage"
      placeholder="Type your message"
    ></textarea>
    <div class="send_button_wrap">
      <custom-button color="primary" @click="sendMessage"> Send </custom-button>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

import { sendMessage } from "@/data/api/chat-messages";

export default {
  data: () => ({
    currentMessage: null,
  }),

  computed: {
    ...mapState({
      currentChatId: "currentChatId",
      user: "user",
    }),
  },

  methods: {
    sendMessage() {
      if (this.currentMessage.trim() != "") {
        sendMessage(
          this.user.userId,
          this.currentChatId,
          this.currentMessage.trim()
        );
        this.currentMessage = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 30px 20px;
  textarea {
    resize: none;
    outline: none;
    border: 1px solid #ac83f0;
    display: block;
    width: 100%;
    height: 80px;
    border-radius: 3px;
    padding: 20px;
    font-size: 13px;
    margin-bottom: 13px;
    &:focus {
      border: 2px solid #ac83f0;
    }
    &::placeholder {
      color: #ddd;
    }
  }
  img {
    height: 30px;
    cursor: pointer;
  }
  .send_button_wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 100px;
    }
  }
}
</style>
