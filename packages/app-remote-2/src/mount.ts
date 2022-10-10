import { createApp } from "vue";
import App from "./App.vue";

export const mountAppRemote2 = () => {
  const id = "app-remote-2";
  const rootContainer =
    document.getElementById(id) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id })
    );

  const app = createApp(App);
  app.mount(rootContainer);

  return app;
};
