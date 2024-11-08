import { defineStore } from "pinia";

import type { User } from "~/types/user";

interface State {
    users: User[];
    userName: string;
    isLoading: boolean;
    currentPage: number;
    itemsPerPage: number;
}

const initialState: State = {
    users: [],
    userName: "",
    isLoading: true,
    currentPage: 1,
    itemsPerPage: 5,
};

export const useUsersStore = defineStore("users", {
    state: () => ({ ...initialState }),
    actions: {
        async getUsers() {
            this.isLoading = true;
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users",
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                this.users = await response.json();
                console.log("this.users", this.users);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                this.isLoading = false;
            }
        },
        async getName(id: number) {
            await this.getUsers();
            this.userName =
                this.users.find((user: User) => user.id === id)?.name ?? "";
        },
        prevHandler() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextHandler() {
            if (this.currentPage * this.itemsPerPage < this.users.length) {
                this.currentPage++;
            }
        },
    },
});
