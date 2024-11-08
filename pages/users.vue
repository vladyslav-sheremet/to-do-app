<template>
  <div class="users">
    <h1>Users page</h1>

    <div v-if="isLoading">Loading...</div>

    <template v-else>
      <search-user @search="searchHandler" />
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
          <user-item
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

      <pagination-controls />
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import PaginationControls from "~/components/PaginationControls.vue";
import SearchUser from "~/components/SearchUser.vue";
import UserItem from "~/components/UserItem.vue";
import { useUsersStore } from "~/store/users";
import { User } from "~/types/user";

const filteredUsers = ref<User[]>([]);

const usersStore = useUsersStore();
const { users, isLoading, currentPage, itemsPerPage } = storeToRefs(usersStore);
const { getUsers } = usersStore;

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (route.query.page) {
    currentPage.value = parseInt(String(route.query.page), 10);
  }

  await getUsers();
  filteredUsers.value = paginate(
      users.value,
      currentPage.value,
      itemsPerPage.value,
  );
});

const paginate = (data: User[], page: number, itemsPerPage: number) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

watch(currentPage, (newPage) => {
  filteredUsers.value = paginate(
      users.value,
      currentPage.value,
      itemsPerPage.value,
  );
  router.push({ query: { ...route.query, page: newPage } });
  localStorage.setItem("currentPage", String(newPage));
});

watch(
    () => route.query.page,
    (page) => {
      currentPage.value = page ? parseInt(String(page), 10) : 1;
    },
);

const searchHandler = (name: string) => {
  const foundUsers = users.value.filter((user: User) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (foundUsers.length > 5) {
    filteredUsers.value = paginate(
        foundUsers,
        currentPage.value,
        itemsPerPage.value,
    );
  } else {
    filteredUsers.value = foundUsers;
  }
};
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
