import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router/router";
import store from "@/data/store/store";

import UiComponents from "@/components/ui/ui";
import directives from "@/directives/directives";

const app = createApp(App);

UiComponents.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(router).use(store).mount("#app");
