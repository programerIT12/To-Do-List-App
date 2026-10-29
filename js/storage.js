export const getTodoFromStorage = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

export const setTodoToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

