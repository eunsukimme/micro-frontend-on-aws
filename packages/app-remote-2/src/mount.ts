import { createApp } from "vue";
import App from "./App.vue";

export const mountAppRemote2 = () => {
  const id = "root";
  const rootContainer =
    document.getElementById(id) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id })
    );

  const app = createApp(App);
  app.mount(rootContainer);

  return app;
};
