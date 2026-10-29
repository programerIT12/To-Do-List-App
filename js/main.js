import { getTodoFromStorage } from "./storage.js";
import { renderTodos, initTodoHandlerts } from "./dom.js";

const todos = getTodoFromStorage() || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  initTodoHandlerts(todos);
});
