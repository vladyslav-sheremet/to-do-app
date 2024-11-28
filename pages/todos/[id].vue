<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <h1>User name: {{ userName }}</h1>

    <ul>
      <TodoItem
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
const fetchTodos = useFetchTodos();
const { userName, todos, isLoading, goToUsers } = fetchTodos;
</script>
