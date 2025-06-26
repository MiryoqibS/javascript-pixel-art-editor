import "./style.scss";
import { App } from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  const app = new App(root);
  app.init();
});
