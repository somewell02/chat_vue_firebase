<template>
  <header v-if="currentChat">
    <div class="chat_info">
      <img
        :src="
          currentChat.chatIcon ??
          'https://img.freepik.com/free-vector/chat-speech-bubble-icon_23-2147501656.jpg?1'
        "
        alt="avatar"
      />
      <div class="chat_info_content">
        <h2>{{ currentChat.name }} - {{ currentChat.chatRoomId }}</h2>
        <h3>
          {{
            currentChat.users.length +
            " " +
            (currentChat.users.length > 1 ? "users" : "user")
          }}
        </h3>
      </div>
    </div>
    <div class="actions">
      <img
        src="@/assets/image-edit.svg"
        alt="edit avatar"
        @click="showEditModal = true"
      />
      <img
        src="@/assets/sign-out-purple.svg"
        alt="leave"
        @click="leaveFromChatRoom"
      />
      <img src="@/assets/delete.svg" alt="delete" @click="deleteChatRoom" />

      <confirmation-popup
        ref="deleteConfirmation"
        popup_title="Вы уверены, что хотите удалить чат?"
      />
      <confirmation-popup
        ref="leaveConfirmation"
        popup_title="Вы уверены, что хотите покинуть чат?"
      />

      <custom-modal v-model="showEditModal">
        <label class="chat_avatar_btn">
          <input @change="uploadImage" type="file" accept="image/*" />
          {{ uploadText }}
        </label>
        <div class="buttons">
          <custom-button color="primary" @click="showEditModal = false">
            Cancel
          </custom-button>
          <custom-button color="primary" @click="editAvatar">
            Edit
          </custom-button>
        </div>
      </custom-modal>
    </div>
  </header>
</template>

<script>
import {
  deleteChatRoom,
  leaveFromChatRoom,
  getChatRoomById,
  editChatAvatar,
} from "@/data/api/chat-rooms";

import { mapState } from "vuex";

export default {
  data() {
    return {
      currentChat: null,
      imageData: null,
      uploadText: "Upload image",
      showEditModal: false,
    };
  },

  computed: {
    ...mapState({
      currentChatId: "currentChatId",
      user: "user",
    }),
  },

  created() {
    this.getChat();
  },

  methods: {
    async getChat() {
      if (this.currentChatId) {
        this.currentChat = await getChatRoomById(this.currentChatId);
      } else {
        this.currentChat = null;
      }
    },

    async deleteChatRoom() {
      const popupResult = await this.$refs.deleteConfirmation.open();
      if (popupResult) {
        deleteChatRoom(this.currentChatId);
        this.$store.commit("setCurrentChatId", "");
      }
    },

    async leaveFromChatRoom() {
      const popupResult = await this.$refs.leaveConfirmation.open();
      if (popupResult) {
        leaveFromChatRoom(this.currentChatId, this.user.userId);
        this.$store.commit("setCurrentChatId", "");
      }
    },

    async editAvatar() {
      this.showEditModal = false;
      await editChatAvatar(this.currentChatId, this.imageData);
      this.getChat();
      this.chatName = null;
      this.imageData = null;
      this.uploadText = "Upload image";
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

  watch: {
    currentChatId() {
      this.getChat();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 110px;
  padding: 30px 20px 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .chat_info img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
  .actions {
    display: flex;
    img {
      width: 24px;
      margin-top: 8px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .chat_info {
    display: flex;
  }
  .chat_info_content {
    margin: 0;
    padding-left: 25px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 13px;
    font-weight: normal;
    color: #7e818a;
    margin-top: 5px;
  }
}
</style>
