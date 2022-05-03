<template>
  <input :value="modelValue" @input="updateInput" :class="inputClass" />
</template>

<script>
export default {
  name: "custom-input",
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    color: {
      type: String,
      default: "",
      required: false,
    },
  },

  computed: {
    inputClass() {
      const colors = ["primary", "secondary", "accent"];
      if (this.color == null || !colors.includes(this.color)) return "primary";
      else return this.color;
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 15px 20px;
  background: transparent;
  border: none;
  border-radius: 3px;
  &.primary {
    color: var(--primary-color);
    outline: 1px solid var(--primary-color);
    &:focus {
      outline: 2px solid var(--primary-color);
    }
    &::placeholder {
      color: var(--primary-color);
    }
  }
  &.secondary {
    color: var(--secondary-color);
    outline: 1px solid var(--secondary-color);
    &:focus {
      outline: 2px solid var(--secondary-color);
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}
</style>
