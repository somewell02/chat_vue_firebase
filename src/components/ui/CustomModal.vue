<template>
  <div class="modal_wrapper" v-if="modelValue" @click="hide">
    <div @click.stop class="modal_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-modal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },

  methods: {
    hide() {
      this.$emit("update:modelValue", false);
    },
    handleKeydown(e) {
      if (e.key == "Escape") {
        this.$emit("update:modelValue", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .modal_content {
    display: flex;
    flex-direction: column;
    background: var(--bg-main-color);
    padding: 30px;
    border-radius: 5px;
    z-index: 2;
  }
}
</style>
