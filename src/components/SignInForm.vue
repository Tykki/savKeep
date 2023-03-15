<template>
  <div
    class="modal fade"
    id="signInModal"
    tabindex="-1"
    aria-labelledby="signInModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="signInModalLabel">Sign Into Sav Keep</h1>
          <button
            type="button"
            class="btn-close"
            id="signInClose"
            @click="clearInput"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="form-floating">
              <input
                type="email"
                class="form-control bg-body"
                v-model="email"
                id="email"
                placeholder="Email"
                required
              />
              <label for="email" class="ms-1"
                >Email</label
              >
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control bg-body"
                v-model="password"
                id="password"
                placeholder="Password"
                required
              />
              <label for="password" class="ms-1"
                >Password</label
              >
            </div>
            <p v-if="errMsg">{{ errMsg }}</p>
            <p v-if="successMsg">{{ successMsg }}</p>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="register" class="btn btn-outline-warning">
            Sign Up
          </button>
          <button type="button" @click="authStore.signInG" class="btn btn-outline-primary">
        Use Google</button>
          <button type="button" class="btn btn-primary">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/authStore.js'

const authStore = useAuthStore()
const email = ref("");
const password = ref("");
const errMsg = ref("");
const successMsg = ref("")

const user = ref(authStore.user)

const clearInput = () => {
  email.value = ""
  password.value = ""
  errMsg.value = ""
  successMsg.value = ""
}

const register = () => {
  errMsg.value = ""
  successMsg.value = ""
  authStore.register(email.value, password.value, errMsg, successMsg)
  // if(!errMsg.value){
  //   email.value = ""
  //   password.value = ""
  //   successMsg.value = "Registration Successful"
  // }

  
}


</script>

<style lang="scss" scoped>
.btn-primary{
  background-color: var(--bs-purple);
  outline-color: var(--bs-purple);
  border-color: var(--bs-indigo);
  &:active{
    background-color: var(--bs-indigo);
  }
}
.modal-footer {
  justify-content: space-between !important;
}
</style>
