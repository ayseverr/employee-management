import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "quasar/dist/quasar.css";
import store from "./store";

createApp(App).use(Quasar, { plugins: {} }).use(store).mount("#app");
