<template>
    <div
    class="modal fade"
    id="taskUpdateModal"
    tabindex="-1"
    aria-labelledby="taskUpdateModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="card-body p-2">

      <section class="">
        <div class="text-start px-2 fs-6 fw-bold title-row">
          <section v-show="titlePlaceholder" class="title-overlay">
            Title...
          </section>
          <section @keydown="handleTitleInputKD" @keyup="handleTitleInputKU" id="titleInputUpdate" contenteditable=true class="task-input">       
          {{titleInput}}
          </section>
        </div>
        <button
          class="btn btn-outline-secondary border-0 fs-5 rounded-circle float-end"
          type="button"
          @click="togglePin(task.id) && (pinned = !pinned)"
        >
          <span v-if="pinned" class="mdi mdi-pin"></span>
          <span v-else class="mdi mdi-pin-outline"></span>
        </button>
      </section>

      <section class="text-start py-3">
        <div v-show="detailPlaceholder" class="detail-overlay">
          Take a note...
        </div>
        <div @keydown="handleDetailInputKD" @keyup="handleDetailInputKU" id="detailInputUpdate" contenteditable=true class="task-input">
          {{detailInput}}
        </div>
      </section>

      <section v-if="tagsInput[0]" class="text-start ps-3">
        <span v-for="tag of tagsInput" :key="tag.id" class="badge rounded-pill border me-1">{{tag.name}} <button @click="removeTag(tag.name, tag.id)" type="button" style="font-size: .75em" class="btn-close" aria-label="Close"></button></span>
      </section>

      <section class="d-flex mt-1 justify-content-around">
        <button
          class="border-0 rounded-circle btn btn-outline-secondary"
        >
          <span class="mdi mdi-checkbox-outline"></span>
        </button>

        <button @mousedown="handleDelete"
        data-bs-dismiss="modal"
          class="border-0 rounded-circle btn btn-outline-secondary"
        >
          <span class="mdi mdi-trash-can"></span>
        </button>

        <button
          class="border-0 rounded-circle btn btn-outline-secondary"
        >
          <span class="mdi mdi-archive-arrow-down-outline"></span>
        </button>
        <button data-bs-toggle="dropdown" data-bs-auto-close="outside"
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
            <li v-for="tag, i of tags" :key="i"
              class="dropdown-item"
              @click="toggleTag(tag, i, $event)"
              v-show="searchTag().includes(tag)">
              <a class="form-check dropdown-item">
                <input class="form-check-input bg-body" type="checkbox" :value="tag" :id="`t-${i}`">
                <label class="form-check-label" :for="`t-${i}`">
                {{tag}}
                </label>

              </a>
            </li>

          </div>
        <li v-if="tagSearch" @click="createTag(tagSearch)" class="dropdown-item">
          <a>+ Create "{{tagSearch}}"</a>
        </li>
        </ul>

        <div @click="focus" class="w-50">

        </div>
        <button id="closeBtn"
          data-bs-dismiss="modal"
          class="border-0 btn btn-outline-secondary"
        >
          Close
        </button>
      </section>
    </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(['tags', 'task', 'togglePin', 'updateTask', 'deleteTask', 'clearUpdate'])

// vars
const titleInput = ref("");
const detailInput = ref("");
const tagsInput = ref([]);
const tagSearch = ref("")
const pinned = ref(false);
const titlePlaceholder = ref(true)
const detailPlaceholder = ref(true)
const deleted = ref(false)


const clearForm = () => {
  titleInput.value = ''
  detailInput.value = ''
  clearTags()
  pinned.value = false
  titlePlaceholder.value = true
  detailPlaceholder.value = true
  deleted.value = false
  props.clearUpdate()
}

const handleUpdate = () => {
  let updates = 0
  titleInput.value !== props.task.title ? props.updateTask('title', titleInput.value) && updates++ : false
  detailInput.value !== props.task.detail ? props.updateTask('detail', detailInput.value) && updates++ : false
  tagsInput.value.map(t => t.name).sort().toString() !== props.task.tags.sort().toString() ? props.updateTask('tags', tagsInput.value.map(t => t.name)) && updates++ : false
  updates ? props.updateTask('timestamp', null) : false
}

const fillTags = () => {
  // tagsInput.value = props.task.tags.map((t, i) =>({name: t, id: 'u'+i }))
  // console.log('tags test', props.task.tags.map((t, i) =>({name: t, id: 'u'+i })))
  for (const tag of props.task.tags) {
    toggleTag(tag, props.tags.indexOf(tag))
  }
}

const clearTags = () => {
  for (const tag of tagsInput.value) {
    removeTag(tag.name, tag.id)
  }
  tagsInput.value = [];
}

// handle type inputs into divs
const handleTitleInputKU = () => {
  titleInput.value = document.querySelector('#titleInputUpdate').textContent
  if (titleInput.value === "") {
    titlePlaceholder.value = true
  }
}
const handleTitleInputKD = (e) => {
  if (e.keyCode === 13 || e.keyCode === 9) {
    e.preventDefault();
    document.querySelector('#detailInputUpdate').focus()
  } else{
    titlePlaceholder.value = false
  }
}

const  handleDetailInputKU = () => {
  detailInput.value = document.querySelector('#detailInputUpdate').textContent
  if (detailInput.value === "") {
    detailPlaceholder.value = true
  } 
}
const  handleDetailInputKD = (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();
    document.querySelector('#closeBtn').focus()
  } else{
    detailPlaceholder.value = false
  }
}

// Adding Tags
const toggleTag = (tag, id, e) => {
 if (!e){
    document.querySelector(`input#${`t-${id}`}`).checked ^= 1
    }else if(e.target.classList.contains('dropdown-item')){
    document.querySelector(`input#${`t-${id}`}`).checked ^= 1
    } else if (e.target.classList.contains('form-check-label')) {
      e.preventDefault()
      document.querySelector(`input#${`t-${id}`}`).checked ^= 1
    }

  if (document.querySelector(`input#${`t-${id}`}`).checked) {
    tagsInput.value.push({name: tag, id: id})
  } else {
    removeTag(tag, id)
  }
}

  // Custom tags
  const createTag = (tag) => {
    if (props.tags.filter((t)=>t === tag).length) {
      toggleTag(tag, props.tags.indexOf(tag))
    } 
    else if (tagsInput.value.filter(t=>t.name === tag).length){
      removeTag(tag, null)
    }
    else {
      tagsInput.value.push({name: tag, id: null})

    }
    tagSearch.value = ""
  }

// Search tags
const searchTag = (e) => {
  if (!e) {
    return props.tags.filter(t => t.includes(tagSearch.value))
  } else if (e.keyCode === 13) {
    createTag(tagSearch.value)
  } else {
    return props.tags.filter(t => t.includes(tagSearch.value)) 
  }
}
// deleteTags
const removeTag = (tag, id) => {
  if (id || id === 0) {
    document.querySelector(`input#${`t-${id}`}`).checked = false
  } 
    tagsInput.value = tagsInput.value.filter((v) => v.name !== tag )
}

// deleting task
const handleDelete = () => {
  deleted.value = true
  props.deleteTask(props.task.id)
}

// set the cursor on the div input
onMounted(() => {
  const modal = document.querySelector('#taskUpdateModal')

  modal.addEventListener('shown.bs.modal', e =>{
  props.task.title ? (titleInput.value = props.task.title) && (titlePlaceholder.value = false) : titlePlaceholder.value = true
 props.task.detail ? (detailInput.value = props.task.detail) && (detailPlaceholder.value = false) : detailPlaceholder.value = true
  props.task.tags.length ? fillTags() : tagsInput.value = []
  pinned.value = props.task.pinned
  document.querySelector('#detailInputUpdate').focus()
})

modal.addEventListener('hide.bs.modal', e =>{
  deleted.value ? true : handleUpdate()
  clearForm()
})
})
</script>

<style lang="scss" scoped>
.card-body{
  z-index: 1;
}
.form-control:focus{
box-shadow: none;
}
#spacer{
  width: 50%
}

.title-row{
  width: 90%;
  display: inline-block;
}
.task-input:focus-visible{
  outline: none;
}

.title-overlay{
    position: absolute;
    width: 100%;
    // left: 0;
    top: 5px;
    z-index: -10;
    
}

.detail-overlay{
  position: absolute;
  width: 100%;
  z-index: -10;

}
section.text-start:has(div.detail-overlay){
  padding-left: .8rem;
}
// for firefox
section.text-start.py-3{
  padding-left: .8rem;
}

.tag-menu{
  max-height: 240px;
  overflow: auto;
}

@media screen and (max-width: 515px) {
  .title-row{
    width: 83%;
  }
}
</style>