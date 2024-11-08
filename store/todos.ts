import { defineStore } from "pinia";

import type { Todo } from "~/types/todo";

interface State {
    todos: Todo[];
    isLoading: boolean;
}

const initialState: State = {
    todos: [],
    isLoading: true,
};

export const useTodosStore = defineStore("todos", {
    state: () => ({ ...initialState }),
    actions: {
        async getTodos(id: number) {
            this.isLoading = true;
            try {
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/todos?userId=${id}`,
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                this.todos = await response.json();
                console.log(this.todos);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
