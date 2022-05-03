<template>
  <div
    class="app"
    :class="{
      'dark-theme': this.$store.state.darkTheme,
    }"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ChatMegaChat",
};
</script>

<style src="./theme.css"></style>
<style>
*,
*:after,
*:before {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial;
}
.app {
  background: var(--bg-main-color);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  margin: 0;
}

ul {
  margin: 0;
}
</style>
