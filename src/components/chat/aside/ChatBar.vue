<template>
  <aside>
    <chat-bar-header
      @search="
        (search) => {
          this.chatSearch = search;
        }
      "
    />
    <chats-list :chats="filteredChatRooms" />
    <chat-bar-footer />
  </aside>
</template>

<script>
import { getChatRoomsByUser } from "@/data/api/chat-rooms";

import ChatBarHeader from "@/components/chat/aside/ChatBarHeader";
import ChatsList from "@/components/chat/aside/ChatsList";
import ChatBarFooter from "@/components/chat/aside/ChatBarFooter";

export default {
  data() {
    return {
      chatSearch: "",
    };
  },

  components: {
    ChatBarHeader,
    ChatsList,
    ChatBarFooter,
  },

  computed: {
    chatRoomsList() {
      return getChatRoomsByUser(this.$store.state.user.userId);
    },
    filteredChatRooms() {
      return this.chatRoomsList.value.filter((chat) =>
        chat.name.toUpperCase().includes(this.chatSearch.toUpperCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  width: 260px;
  flex-shrink: 0;
  height: 100vh;
  background: linear-gradient(to right, #ac83f0, #948cf3);
  display: inline-block;
  font-size: 15px;
  vertical-align: top;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
