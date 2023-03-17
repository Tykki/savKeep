<template lang="">
  <section
    
    @mousedown="checkValid"
    @mouseup="checkValid"
    id="taskForm"
    class="pb-1"
  >
    <div class="card-body p-1">
      <section class="">
        <div class="text-start px-2 fs-6 fw-bold title-row">
          <section v-show="titlePlaceholder" class="title-overlay">
            Title...
          </section>
          <section
            @keydown="handleTitleInputKD"
            @keyup="handleTitleInputKU"
            id="titleInput"
            contenteditable="true"
            class="task-input"
          ></section>
        </div>
        <button
          class="btn btn-outline-secondary border-0 fs-5 rounded-circle float-end"
          type="button"
          @click="pinned = !pinned"
        >
          <span v-if="pinned" class="mdi mdi-pin"></span>
          <span v-else class="mdi mdi-pin-outline"></span>
        </button>
      </section>

      <section class="text-start py-3">
        <div v-show="detailPlaceholder" class="detail-overlay">
          Take a note...
        </div>
        <div
          @keydown="handleDetailInputKD"
          @keyup="handleDetailInputKU"
          id="detailInput"
          contenteditable="true"
          class="task-input"
        ></div>
      </section>

      <section v-if="tagsInput[0]" class="text-start ps-3">
        <span v-for="tag of tagsInput" class="badge rounded-pill border me-1"
          >{{ tag.name }}
          <button
            @click="removeTag(tag.name, tag.id)"
            type="button"
            style="font-size: 0.75em"
            class="btn-close"
            aria-label="Close"
          ></button
        ></span>
      </section>

      <section class="d-flex mt-1 justify-content-around">
        <button class="border-0 rounded-circle btn btn-outline-secondary">
          <span class="mdi mdi-checkbox-outline"></span>
        </button>

        <button
          @mousedown="close"
          class="border-0 rounded-circle btn btn-outline-secondary"
        >
          <span class="mdi mdi-trash-can"></span>
        </button>

        <button class="border-0 rounded-circle btn btn-outline-secondary">
          <span class="mdi mdi-archive-arrow-down-outline"></span>
        </button>
        <button
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          class="border-0 rounded-circle btn btn-outline-secondary"
        >
          <span class="mdi mdi-pound"></span>
        </button>
        <ul class="dropdown-menu shadow">
          <input
            v-model="tagSearch"
            @keydown="searchTag"
            type="text"
            class="form-control bg-body border-0"
            placeholder="Enter Tag Name"
            aria-label="Search"
          />
          <div class="tag-menu">
            <li
              v-for="(tag, i) of tags"
              :key="i"
              class="dropdown-item"
              @click="toggleTag(tag, i, $event)"
              v-show="searchTag().includes(tag)"
            >
              <a class="form-check dropdown-item">
                <input
                  class="form-check-input bg-body"
                  type="checkbox"
                  :value="tag"
                  :id="`t-${i}`"
                />
                <label class="form-check-label" :for="`t-${i}`">
                  {{ tag }}
                </label>
              </a>
            </li>
          </div>
          <li
            v-if="tagSearch"
            @click="createTag(tagSearch)"
            class="dropdown-item"
          >
            <a>+ Create "{{ tagSearch }}"</a>
          </li>
        </ul>

        <div @click="focus" class="w-50"></div>
        <button
          id="closeBtn"
          @click="createTask()"
          class="border-0 btn btn-outline-secondary"
        >
          Close
        </button>
      </section>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(["tags", "user"]);

// vars
const titleInput = ref("");
const detailInput = ref("");
const tagsInput = ref([]);
const tagSearch = ref("");
const pinned = ref(false);
const emit = defineEmits(["createTask"]);
const titlePlaceholder = ref(true);
const detailPlaceholder = ref(true);
const valid = ref(false);

// click controls for closing form on focusout
const focus = (e) => {
  valid.value = true;
  document.querySelector("#detailInput").focus();
  valid.value = false;
};
const checkValid = () => {
  valid.value = !valid.value;
};
const handleFocus = (e) => {
  if (valid.value === false) {
    createTask();
  }
};

// handle type inputs into divs
const handleTitleInputKU = () => {
  titleInput.value = document.querySelector("#titleInput").textContent;
  if (titleInput.value === "") {
    titlePlaceholder.value = true;
  }
};
const handleTitleInputKD = (e) => {
  if (e.keyCode === 13 || e.keyCode === 9) {
    e.preventDefault();
    valid.value = true;
    document.querySelector("#detailInput").focus();
  } else {
    titlePlaceholder.value = false;
  }
  valid.value = false;
};

const handleDetailInputKU = () => {
  detailInput.value = document.querySelector("#detailInput").textContent;
  if (detailInput.value === "") {
    detailPlaceholder.value = true;
  }
};
const handleDetailInputKD = (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();
    valid.value = true;
    document.querySelector("#closeBtn").focus();
  } else {
    detailPlaceholder.value = false;
  }
  valid.value = false;
};

// Adding Tags
const toggleTag = (tag, id, e) => {
  if (!e) {
    document.querySelector(`input#${`t-${id}`}`).checked ^= 1;
  } else if (e.target.classList.contains("dropdown-item")) {
    document.querySelector(`input#${`t-${id}`}`).checked ^= 1;
  } else if (e.target.classList.contains("form-check-label")) {
    e.preventDefault();
    document.querySelector(`input#${`t-${id}`}`).checked ^= 1;
  }

  if (document.querySelector(`input#${`t-${id}`}`).checked) {
    tagsInput.value.push({ name: tag, id: id });
  } else {
    removeTag(tag, id);
  }
};

// Custom tags
const createTag = (tag) => {
  if (props.tags.filter((t) => t === tag).length) {
    toggleTag(tag, props.tags.indexOf(tag));
  } else if (tagsInput.value.filter((t) => t.name === tag).length) {
    removeTag(tag, null);
  } else {
    tagsInput.value.push({ name: tag, id: null });
  }
  tagSearch.value = "";
};

// Search tags
const searchTag = (e) => {
  if (!e) {
    return props.tags.filter((t) => t.includes(tagSearch.value));
  } else if (e.keyCode === 13) {
    createTag(tagSearch.value);
  } else {
    return props.tags.filter((t) => t.includes(tagSearch.value));
  }
};
// deleteTags
const removeTag = (tag, id) => {
  if (id || id === 0) {
    document.querySelector(`input#${`t-${id}`}`).checked = false;
  }
  tagsInput.value = tagsInput.value.filter((v) => v.name !== tag);
  focus();
};

// Creating Task
const createTask = () => {
  valid.value = true;
  if (titleInput.value || detailInput.value) {
    const task = {
      pinned: pinned.value,
      title: titleInput.value,
      detail: detailInput.value,
      tags: tagsInput.value.map((t) => t.name),
      createdBy: props.user ? props.user.uid : null,
    };
    emit("createTask", task);
  } else {
    close();
  }
};

// deleting task
const close = () => {
  valid.value = true;
  emit("createTask", {});
};

// set the cursor on the div input
onMounted(() => {
  document.querySelector("#detailInput").focus();
});
</script>
<style lang="scss" scoped>
.form-control:focus {
  box-shadow: none;
}
#taskForm {
  z-index: 1;
}
#spacer {
  width: 50%;
}

.title-row {
  width: 90%;
  display: inline-block;
}


.task-input {
  max-height: 30em;
  overflow: auto;
  &:focus-visible {
    outline: none;
  }
}


.title-overlay {
  position: absolute;
  width: 100%;
  top: 5px;
  z-index: -10;
}

.detail-overlay {
  position: absolute;
  width: 100%;
  z-index: -10;
}
section.text-start:has(div.detail-overlay) {
  padding-left: 0.8rem;
}
// for firefox
section.text-start.py-3 {
  padding-left: 0.8rem;
}

.tag-menu {
  max-height: 240px;
  overflow: auto;
}

@media screen and (max-width: 515px) {
  .title-row {
    width: 83%;
  }
}
</style>
