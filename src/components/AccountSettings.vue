<template>
  <div
    class="modal fade"
    id="acctSettingsModal"
    tabindex="-1"
    aria-labelledby="acctSettingsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="acctSettingsModalLabel">
            Account Settings
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h4 class="text-center">
            Welcome {{ user ? user.displayName : "Supreme User" }}
          </h4>
          <hr />
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail"
                :value="user ? user.email : 'Guest@Etchie.dev'"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                :value="user ? user.displayName : 'Supreme User'"
                id="inputName"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <p>
            Thank you for supporting this
            <a class="dev-link" href="https://etchie.dev" target="_blank"
              >Developer</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["user"]);
</script>

<style lang="scss" scoped>
.dev-link {
  color: var(--bs-purple);
  font-weight: bold;
  text-decoration: none;
}
</style>
