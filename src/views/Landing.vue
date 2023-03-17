<script setup>
import TaskInput from "@/components/TaskInput.vue";
import Task from "@/components/Task.vue";
import { useRoute } from "vue-router";
import { onMounted, onUpdated, ref } from "vue";

const props = defineProps([
  "tasks",
  "tag",
  "tags",
  "deleteTask",
  "togglePin",
  "user",
  "userTasks",
  "toggleUpdate",
]);
const route = useRoute();
const test = () => {
  console.log("test");
};
const setLabels = ref(false);
onUpdated(() => {
  if (route.name === "userTasks") {
    if (props.userTasks(route.params.id).filter((t) => t.pinned).length) {
      setLabels.value = true;
    } else {
      setLabels.value = false;
    }
  } else if (route.params.id) {
    if (props.tag(route.params.id).filter((t) => t.pinned).length) {
      setLabels.value = true;
    } else {
      setLabels.value = false;
    }
  } else {
    if (props.tasks.filter((t) => t.pinned).length) {
      setLabels.value = true;
    } else {
      setLabels.value = false;
    }
  }
});
</script>

<template>
  <main class="pt-5">
    <div class="text-center">
      <TaskInput
        class="w-input mx-auto mb-4 card border-secondary shadow"
        :tags="tags"
        :user="user"
      />

      <section class="pinned">
        <h6 v-if="setLabels" class="text-start ms-5 col-12 w-75">Pinned</h6>
        <Task
          v-if="route.name === 'userTasks'"
          v-for="task of userTasks(route.params.id).filter((t) => t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
        <Task
          v-if="route.params.id"
          v-for="task of tag(route.params.id).filter((t) => t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
        <Task
          v-else
          v-for="task of tasks.filter((t) => t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
      </section>

      <section class="">
        <h6 v-if="setLabels" class="text-start ms-5 col-12 w-75">Others</h6>
        <Task
          v-if="route.name === 'userTasks'"
          v-for="task of userTasks(route.params.id).filter((t) => !t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
        <Task
          v-if="route.params.id"
          v-for="task of tag(route.params.id).filter((t) => !t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
        <Task
          v-else
          v-for="task of tasks.filter((t) => !t.pinned)"
          :key="task.id"
          :task="task"
          :togglePin="togglePin"
          :deleteTask="deleteTask"
          :toggleUpdate="toggleUpdate"
        />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.w-input {
  min-width: 300px;
  max-width: 600px;
}
</style>
