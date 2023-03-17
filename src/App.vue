<script setup>
import { RouterView } from "vue-router";
import { useStore } from "./stores/store.js";
import { useTaskStore } from "./stores/taskStore.js";
import { useAuthStore } from "./stores/authStore.js";
import HeaderMenu from "./components/Header.vue";
import SignIn from "./components/SignInForm.vue";
import AcctSet from "./components/AccountSettings.vue";
import TaskUpdate from "./components/TaskUpdate.vue";
import SideMenu from "./components/SideMenu.vue";

const store = useStore();
const taskStore = useTaskStore();
const authStore = useAuthStore();
taskStore.getTasks();
authStore.initFirebaseAuth();
</script>

<template>
  <div class="container-fluid">
    <HeaderMenu
      class="row"
      :tags="taskStore.tags"
      :signOutUser="authStore.signOutUser"
      :user="authStore.user"
    />
    <section class="row">
      <SideMenu :tags="taskStore.tags" :user="authStore.user" class="col-2" />
      <RouterView
        class="col"
        :tasks="taskStore.tasks"
        :tag="taskStore.tag"
        :tags="taskStore.tags"
        :userTasks="taskStore.userTasks"
        :togglePin="taskStore.togglePin"
        :deleteTask="taskStore.deleteTask"
        :user="authStore.user"
        :toggleUpdate="taskStore.toggleUpdate"
      />
    </section>
    <SignIn />
    <AcctSet :user="authStore.user" />
    <TaskUpdate
      :task="taskStore.toUpdate"
      :togglePin="taskStore.togglePin"
      :updateTask="taskStore.updateTask"
      :deleteTask="taskStore.deleteTask"
      :user="authStore.user"
      :tags="taskStore.tags"
      :clearUpdate="taskStore.clearUpdate"
    />
  </div>
</template>

<style lang="scss">
// @import "node_modules/bootstrap/scss/bootstrap";

.dropdown-item:active {
  background-color: var(--bs-purple);
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5) !important;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: var(--bs-purple) var(--bs-body-bg);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: var(--bs-body-bg);
}

*::-webkit-scrollbar-thumb {
  background-color: var(--bs-purple);
  border-radius: 10px;
  border: 3px solid var(--bs-body-bg);
}
</style>
