import { createApp } from "vue";
import App from "./App.vue";

export const mount = () => {
  const id = "app-feed";
  const rootContainer =
    document.getElementById(id) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id })
    );

  const app = createApp(App);
  app.mount(rootContainer);

  return app;
};
