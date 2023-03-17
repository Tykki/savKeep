<template>
  <div class="col-md-4 col-6 col-lg-3" id="icons">
    <button
      class="btn border-0 rounded-circle fs-5 fs-sm-4 btn-outline-secondary d-md-none d-inline-block"
      type="button"
    >
      <span class="mdi mdi-magnify"></span>
    </button>
    <section class="btn-group dropstart">
      <button
        class="border-0 rounded-circle fs-5 fs-sm-4 btn btn-outline-secondary"
        data-bs-toggle="dropdown"
      >
        <span class="mdi mdi-cog"></span>
      </button>

      <ul class="dropdown-menu shadow">
        <li>
          <a class="dropdown-item" href="#" @click="changeTheme"
            >Change Theme</a
          >
        </li>
        <li><a class="dropdown-item" href="#">Donate</a></li>
        <li>
          <a class="dropdown-item" href="#">Download App</a>
        </li>
      </ul>
    </section>
    <button
      class="border-0 rounded-circle fs-4 btn btn-outline-secondary d-none d-sm-inline-block"
    >
      <span class="mdi mdi-grid"></span>
    </button>

    <section class="btn-group dropstart">
      <button
        class="btn border-0 rounded-circle fs-5 fs-sm-4 btn-outline-secondary"
        data-bs-toggle="dropdown"
      >
        <span v-if="!user" class="mdi mdi-account-circle"></span>
        <img
          v-else
          :src="user.photoURL"
          alt=""
          class="rounded-circle user-img"
        />
      </button>

      <ul class="dropdown-menu shadow">
        <li v-if="!user">
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            href="#"
            data-bs-target="#signInModal"
          >
            Sign In
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            data-bs-toggle="modal"
            href="#"
            data-bs-target="#acctSettingsModal"
            >Account Settings</a
          >
        </li>
        <li v-if="user">
          <RouterLink class="dropdown-item" @click="signOutUser" href="#" to="/"
            >Sign Out</RouterLink
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
defineProps(["user", "signOutUser"]);

const changeTheme = () => {
  if (document.querySelector("body").attributes[0].value === "dark") {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
  } else {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
  }
};
</script>

<style lang="scss" scoped>
#icons {
  display: inline-block;
}
.user-img {
  width: 30px;
}
@media screen and (max-width: 332px) {
  .user-img {
    width: 24px;
  }
}
</style>
