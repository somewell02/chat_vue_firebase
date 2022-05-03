<template>
  <ul ref="chat" id="chat">
    <li
      v-for="message in currentChatMessages"
      :key="message.id"
      :class="message.email == this.user.userEmail ? 'me' : 'you'"
    >
      <div class="entete">
        <span class="status green"></span>
        <h2>{{ message.sendBy }}</h2>
        <h3>{{ msToDate(message.time) }}</h3>
      </div>
      <div class="message">
        {{ message.message }}
      </div>
    </li>
  </ul>
</template>

<script>
import { getChatRoomMessages } from "@/data/api/chat-messages";

import { mapState } from "vuex";

export default {
  data() {
    return {
      currentChatMessages: null,
    };
  },

  created() {
    this.getMessages();
  },

  computed: {
    ...mapState({
      currentChatId: "currentChatId",
      user: "user",
    }),
  },

  updated() {
    const chat = this.$refs.chat;
    chat.scrollTop = chat.scrollHeight;
  },

  methods: {
    async getMessages() {
      if (this.currentChatId) {
        this.currentChatMessages = await getChatRoomMessages(
          this.currentChatId
        );
      } else {
        this.currentChatMessages = null;
      }
    },

    msToDate(ms) {
      var date = new Date(ms);
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      var result = date.toLocaleDateString("ru", options);

      return result.toString();
    },
  },

  watch: {
    currentChatId() {
      this.getMessages();
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 7px;
  &.green {
    background-color: #58b666;
  }
  &.orange {
    background-color: #ff725d;
  }
  &.blue {
    background-color: #6fbced;
    margin-right: 0;
    margin-left: 7px;
  }
}

#chat {
  padding-left: 0;
  margin: 0;
  list-style-type: none;
  overflow-y: auto;
  height: 100%;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    border: none;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ac83f0;
  }

  li {
    padding: 10px 20px;
    position: relative;
  }
  h2,
  h3 {
    display: inline-block;
    font-size: 13px;
    font-weight: normal;
  }
  h3 {
    color: #bbb;
    margin-left: 10px;
  }
  .entete {
    margin-bottom: 5px;
  }
  .message {
    padding: 10px 20px;
    line-height: 1.3;
    max-width: 70%;
    display: inline-block;
    text-align: left;
  }
  .me {
    text-align: right;
  }
  .you .message {
    background-color: white;
    border-radius: 0 10px 10px 10px;
    color: #ac83f0;
  }
  .me .message {
    background-color: #ac83f0;
    border-radius: 10px 0 10px 10px;
    color: #fff;
  }
}
</style>
