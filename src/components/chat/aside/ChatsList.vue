<template>
  <ul>
    <li
      v-for="chatRoom in chats"
      :key="chatRoom.id"
      :class="{
        active: isChatActive(chatRoom),
      }"
      @click="selectChatRoom(chatRoom)"
    >
      <img
        :src="
          chatRoom.chatIcon ??
          'https://img.freepik.com/free-vector/chat-speech-bubble-icon_23-2147501656.jpg?1'
        "
        alt="avatar"
      />
      <div>
        <h2>{{ chatRoom.name }}</h2>
        <h3>
          {{ sliceText(chatRoom.chatLastMessage, 45) }}
        </h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    chats: {
      type: Array,
      required: true,
    },
  },

  methods: {
    isChatActive(chatRoom) {
      return (
        chatRoom.chatRoomId ===
        (this.$store.state.currentChatId != -1
          ? this.$store.state.currentChatId
          : -1)
      );
    },

    selectChatRoom(chatRoom) {
      if (!this.isChatActive(chatRoom)) {
        this.$store.commit("setCurrentChatId", chatRoom.id);
      }
    },

    sliceText(text, length) {
      return text.slice(0, length).length >= text.length
        ? text
        : text.slice(0, length) + "...";
    },
  },
};
</script>

<style lang="sass" scoped>
ul
  padding-left: 0
  list-style-type: none
  overflow-y: auto
  flex-grow: 3
  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-track
    border: none
    background: none
  &::-webkit-scrollbar-thumb
    border-radius: 2px
    background: white
    border: 1px solid #ac83f0
  li
    padding: 10px 20px
    display: flex
    align-items: center
    cursor: pointer
    color: var(--secondary-color)
    &:hover
      border: solid var(--secondary-color)
      border-width: 2px 0
      padding: 8px 20px
    &.active
      background-color: var(--secondary-color)
      color: var(--primary-color)
    img
      border-radius: 50%
      margin-right: 15px
      width: 60px
      height: 60px
      object-fit: cover
    h2
      font-size: 14px
      font-weight: 600
      margin-bottom: 5px
    h3
      font-size: 12px
      font-weight: 400
</style>
