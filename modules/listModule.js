import { ItemModule } from "./itemModule.js";
export const ListModule = (() => {
    const { addTodoElement } = ItemModule;
    let todoList = localStorage.getItem("list");
    const renderTodoList = (list, todoContainer) => {
        if (todoList !== null) {
            list.forEach((item) => {
                // create a todo
                const todo = addTodoElement({
                    id: item.id,
                    content: item.content,
                    dateTime: item.dateTime,
                    completed: item.completed,
                });
                if (item.completed) todo.classList.add("done");
                todoContainer.appendChild(todo);
            });
        }
    };

    return {
        renderTodoList,
    };
})();

