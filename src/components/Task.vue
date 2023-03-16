<template lang="">
  <!-- <section class="container-fluid"> -->
  <div
    class="text-start note opts-hover card mx-2 mb-4 d-inline-flex border-secondary"
  >
    <div class="card-body" @click="toggleUpdate(task)">
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">{{ task.detail }}</p>
    </div>
    <div class="ms-1 mb-1 opts">
      <button
        @click="deleteTask(task.id)"
        class="border-0 rounded-circle btn btn-outline-secondary">
        <span class="mdi mdi-trash-can"></span>
      </button>
      <button
        @click="togglePin(task.id)"
        class="border-0 rounded-circle btn btn-outline-secondary"
        type="button"
      >
        <span v-if="task.pinned" class="mdi mdi-pin"></span>
        <span v-else class="mdi mdi-pin-outline"></span>
      </button>

    </div>
  </div>

  <!-- </section> -->
</template>
<script setup scoped>
defineProps(["task", "deleteTask", "togglePin", 'toggleUpdate']);
</script>
<style lang="scss" scoped>
.opts-hover {
  .opts {
    opacity: 0;
    transition: all 0.5s ease;
  }
  &:hover {
    .opts {
      opacity: 1;

    }
  }
}
.note {
  max-width: 14%;
  min-width: 150px;
}
</style>
