import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import type { User } from "~/types/user";

import { useUsersStore } from "~/store/users";

const useFetchUsers = () => {
    const filteredUsers = ref<User[]>([]);

    const usersStore = useUsersStore();
    const { users, isLoading, currentPage, itemsPerPage } =
        storeToRefs(usersStore);
    const { getUsers } = usersStore;

    const router = useRouter();
    const route = useRoute();

    const initializePage = async () => {
        if (route.query.page) {
            currentPage.value = parseInt(String(route.query.page), 10);
        }

        await getUsers();
        filteredUsers.value = paginate(
            users.value,
            currentPage.value,
            itemsPerPage.value,
        );
    };

    onMounted(async () => {
        await initializePage();
    });

    const paginate = (data: User[], page: number, itemsPerPage: number) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    watch(currentPage, async (newPage) => {
        filteredUsers.value = paginate(
            users.value,
            currentPage.value,
            itemsPerPage.value,
        );
        await router.push({ query: { ...route.query, page: newPage } });
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
        if (foundUsers.length > itemsPerPage.value) {
            filteredUsers.value = paginate(
                foundUsers,
                currentPage.value,
                itemsPerPage.value,
            );
        } else {
            filteredUsers.value = foundUsers;
        }
    };

    return { filteredUsers, isLoading, searchHandler };
};

export default useFetchUsers;
