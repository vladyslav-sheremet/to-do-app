<template>
  <div class="pagination-controls">
    Current page: {{ currentPage }}
    <button @click="prevHandler" :disabled="currentPage === 1">prev</button>
    <button @click="nextHandler" :disabled="isNextDisabled">next</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useUsersStore } from "~/store/users";

const usersStore = useUsersStore();
const { currentPage, itemsPerPage, users } = storeToRefs(usersStore);
const { prevHandler, nextHandler } = usersStore;

const isNextDisabled = computed(() => {
  return currentPage.value * itemsPerPage.value >= users.value.length
})
</script>

<style lang="scss" scoped>
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
