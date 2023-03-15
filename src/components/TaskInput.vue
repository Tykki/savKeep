<template lang="">
  <div>
    <TaskOptions v-if="!makingTask" @click="makingTask = true" />

    <TaskForm :user="user" :tags="tags"  v-else @createTask="taskCreated($event)" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import TaskOptions from "./TaskOptions.vue";
import TaskForm from "./TaskForm.vue";
import { useTaskStore } from "@/stores/taskStore.js";
defineProps(['tags', 'user'])

const taskStore = useTaskStore;
const makingTask = ref(false);


const taskCreated = (task) => {
  makingTask.value = false;
  if (task.title || task.detail) {
    console.log(task)
    taskStore().addTask(task);
  }

};
</script>
<style lang="scss" scoped></style>
