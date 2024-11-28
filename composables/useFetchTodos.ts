import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { useTodosStore } from "~/store/todos";
import { useUsersStore } from "~/store/users";

const useFetchTodos = () => {
    const route = useRoute();
    const router = useRouter();

    const usersStore = useUsersStore();
    const { userName, currentPage } = storeToRefs(usersStore);
    const { getName } = usersStore;

    const todosStore = useTodosStore();
    const { todos, isLoading } = storeToRefs(todosStore);
    const { getTodos } = todosStore;

    const initializePage = async () => {
        await getTodos(+route.params.id);
        await getName(+route.params.id);

        if (route.query.page) {
            currentPage.value = parseInt(String(route.query.page), 10);
            localStorage.setItem("currentPage", currentPage.value.toString());
        } else {
            const savedPage = localStorage.getItem("currentPage");
            if (savedPage) {
                currentPage.value = parseInt(savedPage, 10);
            }
        }
    };

    onMounted(async () => {
        await initializePage();
    });

    const goToUsers = async () => {
        const page = currentPage.value;

        await router.push({ path: "/users", query: { page } });
    };

    return { userName, todos, isLoading, goToUsers };
};

export default useFetchTodos;
