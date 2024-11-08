<template>
  <form class="form" @submit.prevent="searchHandler">
    <input class="form__input" type="text" v-model="nameModel" />
    <button>Search</button>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<(e: "search", text: string) => void>();

const nameModel = ref<string>("");
const searchHandler = () => {
  emit("search", nameModel.value);
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;

  &__input {
    all: unset;
    border-radius: 4px;
    background-color: gray;
    padding: 0 10px;
  }
}
</style>
