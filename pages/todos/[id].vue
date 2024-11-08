<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <h1>User name: {{ userName }}</h1>

    <ul>
      <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :title="todo.title"
          :is-completed="todo.completed"
      />
    </ul>

    <button type="button" @click="goToUsers">to users page</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { useTodosStore } from "~/store/todos";
import { useUsersStore } from "~/store/users";

const route = useRoute();
const router = useRouter();

const usersStore = useUsersStore();
const { userName, currentPage } = storeToRefs(usersStore);
const { getName } = usersStore;

const todosStore = useTodosStore();
const { todos, isLoading } = storeToRefs(todosStore);
const { getTodos } = todosStore;

onMounted(async () => {
  await getName(+route.params.id);
  await getTodos(+route.params.id);

  if (route.query.page) {
    currentPage.value = parseInt(String(route.query.page), 10);
    localStorage.setItem("currentPage", currentPage.value.toString());
  } else {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      currentPage.value = parseInt(savedPage, 10);
    }
  }
});

const goToUsers = () => {
  const page = currentPage.value;

  router.push({ path: "/users", query: { page } });
}
</script>

<style scoped></style>
