import { createApp } from "vue";
import { createPinia } from "pinia";
// import "bootstrap";
import "bootstrap/scss/bootstrap.scss";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";
console.log('load DB')
import "./db.js"
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
