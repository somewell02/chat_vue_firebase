<template>
  <footer>
    <custom-button color="secondary" @click="showAddModal = true">
      Add
    </custom-button>
    <custom-button color="secondary" @click="showJoinModal = true">
      Join
    </custom-button>
    <custom-modal v-model="showAddModal">
      <label class="chat_avatar_btn">
        <input @change="uploadImage" type="file" accept="image/*" />
        {{ uploadText }}
      </label>
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
      <div class="error_message">{{ errorMessage }}</div>
    </custom-modal>
  </footer>
</template>

<script>
import {
  createChatRoom,
  joinChatRoom,
  getChatRoomById,
} from "@/data/api/chat-rooms";

export default {
  data() {
    return {
      chatName: "",
      chatID: "",
      imageData: null,
      uploadText: "Upload image",
      showAddModal: false,
      showJoinModal: false,
      errorMessage: "",
    };
  },

  methods: {
    createChatRoom() {
      createChatRoom(
        this.chatName,
        localStorage.getItem("uid"),
        this.imageData
      );
      this.showAddModal = false;
      this.chatName = null;
      this.imageData = null;
    },

    async joinChatRoom() {
      const chat = await getChatRoomById(this.chatID);
      if (chat) {
        joinChatRoom(this.chatID, localStorage.getItem("uid"));
        this.showJoinModal = false;
        this.chatID = null;
        this.errorMessage = "";
      } else this.errorMessage = "Chat is not exists";
    },

    uploadImage(event) {
      const file = event.target.files[0];
      var allowed_extensions = new Array(
        "image/jpeg",
        "image/png",
        "image/gif"
      );

      if (file) {
        if (allowed_extensions.includes(file.type)) {
          this.imageData = file;
          this.uploadText = "Image: " + file.name;
        } else this.uploadText = "Type error, select again";
      } else this.uploadText = "Upload image";
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

.chat_avatar_btn {
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 15px 20px;
  border-radius: 3px;
  background: var(--primary-color);
  color: var(--secondary-color);
  &:hover {
    background: none;
    border: 1px solid var(--primary-color);
    padding: 14px 20px;
    color: var(--primary-color);
  }
  input {
    display: none;
  }
}

.error_message {
  color: red;
  margin-top: 10px;
}
</style>
