<template>
  <!-- <div class="popup_wrapper" v-if="isOpen" @click="close">
    <div class="popup_content" @click.stop> -->
  <custom-modal v-model="isOpen">
    <h5>{{ popup_title ?? "Вы уверены?" }}</h5>
    <div class="actions">
      <custom-button color="primary" @click="close">
        {{ cancle_button ?? "Отмена" }}
      </custom-button>
      <custom-button color="primary" @click="confirm">
        {{ ok_button ?? "Да" }}
      </custom-button>
    </div>
  </custom-modal>
</template>

<script>
export default {
  name: "confirmation-popup",

  data() {
    return {
      isOpen: false,
    };
  },

  props: {
    popup_title: {
      type: String,
      required: false,
    },
    cancle_button: {
      type: String,
      required: false,
    },
    ok_button: {
      type: String,
      required: false,
    },
  },

  popupController: null,

  methods: {
    open() {
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail) => {
        resolve = ok;
        reject = fail;
      });

      this.$options.popupController = { resolve, reject };
      this.isOpen = true;

      return popupPromise;
    },

    confirm() {
      this.$options.popupController.resolve(true);
      this.isOpen = false;
    },

    close() {
      this.$options.popupController.resolve(false);
      this.isOpen = false;
    },
  },
};
</script>

<style lang="sass" scoped>
h5
  margin:0
  font-size: 18px
  line-height: 1.5
  font-weight: 500
  text-align: center
.actions
  display: flex
  justify-content: space-between
  width: 100%
  margin-top: 20px
  button
    width: 48%
    height: 40px
</style>
