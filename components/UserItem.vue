<template>
  <tr>
    <td>
      <NuxtLink :to="`/todos/${id}`">
        {{ name }}
      </NuxtLink>
    </td>
    <td>{{ email }}</td>
    <td>{{ phone }}</td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  email: string;
  phone: string;
  id: number;
}>();
</script>