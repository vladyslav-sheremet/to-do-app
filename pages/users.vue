<template>
  <div class="users">
    <h1>Users page</h1>

    <div v-if="isLoading">Loading...</div>

    <template v-else>
      <SearchUser @search="searchHandler" />
      <table class="users__table">
        <thead>
        <tr>
          <td class="users__thead-item">name</td>
          <td class="users__thead-item">email</td>
          <td class="users__thead-item">phone</td>
        </tr>
        </thead>
        <tbody>
        <template v-if="filteredUsers.length">
          <UserItem
              v-for="user in filteredUsers"
              :key="user.id"
              :name="user.name"
              :email="user.email"
              :phone="user.phone"
              :id="user.id"
          />
        </template>

        <tr v-else>
          <td class="users__text">Nothing found</td>
        </tr>
        </tbody>
      </table>

      <PaginationControls :amount-of-items="filteredUsers.length" />
    </template>
  </div>
</template>

<script setup lang="ts">
import PaginationControls from "~/components/PaginationControls.vue";
import SearchUser from "~/components/SearchUser.vue";
import UserItem from "~/components/UserItem.vue";
import useFetchUsers from "~/composables/useFetchUsers";

const fetchUsers = useFetchUsers();
const { filteredUsers, isLoading, searchHandler } = fetchUsers;
</script>

<style lang="scss" scoped>
.users {
  max-width: 620px;
  width: 100%;

  &__table {
    margin-bottom: 10px;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px;
  }

  &__thead-item {
    width: 200px;
  }
}
</style>
