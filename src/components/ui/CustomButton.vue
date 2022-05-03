<template>
  <button :class="btnClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "custom-button",
  props: {
    color: {
      type: String,
      default: "",
      required: false,
    },
  },

  computed: {
    btnClass() {
      const colors = ["primary", "secondary", "accent"];
      if (this.color == null || !colors.includes(this.color)) return "primary";
      else return this.color;
    },
  },
};
</script>

<style lang="sass" scoped>
button
  cursor: pointer
  outline: none!important
  padding: 10px
  border: 0
  margin: 0
  border-radius: 3px
  &.primary
    background: var(--primary-color)
    color: var(--secondary-color)
    &:hover
      background: none
      border: 1px solid var(--primary-color)
      padding: 9px 10px
      color: var(--primary-color)
  &.secondary
    background: var(--secondary-color)
    color: var(--primary-color)
    &:hover
      background: none
      padding: 4px 10px
      border: 1px solid var(--secondary-color)
      color: var(--secondary-color)
</style>
