<template>
  <footer>
    <custom-button color="secondary" @click="showAddModal = true">
      Add
    </custom-button>
    <custom-button color="secondary" @click="showJoinModal = true">
      Join
    </custom-button>
    <custom-modal v-model="showAddModal">
      <custom-input
        v-model="chatName"
        @keydown.enter="createChatRoom"
        v-focus
        type="text"
        placeholder="Name"
        color="primary"
      />
      <div class="buttons">
        <custom-button color="primary" @click="showAddModal = false">
          Cancel
        </custom-button>
        <custom-button color="primary" @click="createChatRoom">
          Add
        </custom-button>
      </div>
    </custom-modal>
    <custom-modal v-model="showJoinModal">
      <custom-input
        v-model="chatID"
        @keydown.enter="joinChatRoom"
        v-focus
        type="text"
        placeholder="Chat ID"
        color="primary"
      />
      <div class="buttons">
        <custom-button color="primary" @click="showJoinModal = false">
          Cancel
        </custom-button>
        <custom-button color="primary" @click="joinChatRoom">
          Join
        </custom-button>
      </div>
    </custom-modal>
  </footer>
</template>

<script>
import { createChatRoom, joinChatRoom } from "@/data/api/chat-rooms";

export default {
  data() {
    return {
      chatName: "",
      chatID: "",
      showAddModal: false,
      showJoinModal: false,
    };
  },

  methods: {
    createChatRoom() {
      createChatRoom(this.chatName, localStorage.getItem("uid"));
      this.showAddModal = false;
      this.chatName = null;
    },

    async joinChatRoom() {
      joinChatRoom(this.chatID, localStorage.getItem("uid"));
      this.showJoinModal = false;
      this.chatID = null;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
    flex: 0 0 48%;
  }
}
.modal_content .buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
  button {
    width: calc(50% - 5px);
  }
}
</style>
