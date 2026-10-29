import { todoKeys } from "./constance.js";

import { setTodoToLocalStorage } from "./storage.js";

import {
  createTodo,
  completeTodoById,
  deleteTodoById,
} from "./todo-service.js";

const form = document.querySelector(".form");

const input = document.querySelector(".input");

const todoslist = document.querySelector(".todos");

const createTodoElement = (text) => {
  const todo = document.createElement("li");
  todo.classList.add("todo");
  todo.dataset.id = text[todoKeys.id];
  todo.innerHTML = `<div class="todo-text">${text[todoKeys.text]}</div>
    <div class="todo-actions">
    <button class="button-complete button">&#10004;</button>
    <button class="button-delete button">&#10006;</button>
    </div>`;

  return todo;
};

export const renderTodos = (todos) => {
  todoslist.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    if (todo[todoKeys.is_completed]) {
      todoElement.classList.add("completed");
    }
    todoslist.prepend(todoElement);
  });
};

const handleCreateTodo = (todos, text) => {
  const toDo = createTodo(todos, text);
  const todoElement = createTodoElement(toDo);
  setTodoToLocalStorage(todos);
  todoslist.append(todoElement);
};

export const initTodoHandlerts = (todos) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    handleCreateTodo(todos, text);
    input.value = "";
  });

  todoslist.addEventListener("click", ({ target }) => {
    const todoEl = target.closest(".todo");
    if (!todoEl) return;

    const todoId = Number(todoEl.dataset.id);

    if (target.matches(".button-complete")) {
      completeTodoById(todos, todoId);
      setTodoToLocalStorage(todos);
      todoEl.classList.toggle("completed");
    }
    if (target.matches(".button-delete")) {
      deleteTodoById(todos, todoId);
      setTodoToLocalStorage(todos);
      todoEl.remove();
    }
  });
};
