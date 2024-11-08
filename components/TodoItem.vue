<template>
  <li class="todo-item" :class="{ 'todo-item--completed': isCompleted }">
    {{ title }}
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  isCompleted: boolean;
}>();
</script>

<style lang="scss" scoped>
.todo-item {
  &--completed {
    text-decoration: line-through;
  }
}
</style>
