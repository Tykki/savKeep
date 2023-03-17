<script setup>
import Icons from "./HeaderIcons.vue";

defineProps(["signOutUser", "user"]);
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="container-fluid text-center d-inline-block">
        <section class="row">
          <div class="col-md-4 col-6 col-lg-3">
            <button
              class="border-0 fs-4 rounded-circle btn btn-outline-secondary d-none d-md-inline-block"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sideMenu"
              aria-controls="sideMenu"
            >
              <span class="mdi mdi-menu"></span>
            </button>
            <button
              class="border-0 fs-4 rounded-circle btn btn-outline-secondary d-md-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sideMenu"
              aria-controls="sideMenu"
            >
              <span class="mdi mdi-menu"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img class="header-logo" src="@/assets/logo.png" alt="" />
              <span class="d-none d-sm-inline-block">Sav Keep</span></a
            >
          </div>

          <div class="col-md-4 col-lg-6 my-auto d-none d-md-block">
            <section class="input-group align-middle">
              <button class="btn btn-secondary nav-search" type="button">
                <span class="mdi mdi-magnify"></span>
              </button>
              <input
                type="text"
                class="form-control bg-secondary nav-search w-50"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-secondary nav-search" type="button">
                <span class="mdi mdi-close"></span>
              </button>
            </section>
          </div>

          <Icons :user="user" :signOutUser="signOutUser" />
        </section>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.nav-search {
  &:focus {
    background-color: white !important;
    color: black !important;
  }
  &::placeholder {
    color: white !important;
  }
}
.jc-none {
  justify-content: unset;
}
header {
  border-bottom: 1px solid #585c60;
}
.header-logo {
  max-height: 50px;
}
</style>
