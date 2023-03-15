<template>
    <div v-if="width > 768" id="sideMenu" class="collapse collapse-horizontal show">
        <div id="sideMenu-nav" class="list-group border-0">
            <li v-if="user"
                :class="{active: route.params.id === user.uid}"
                class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink :to="`/user/${user.uid}`" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-home-account"></span><b class="my-auto ms-4">User Tasks</b> </RouterLink>
            </li>

            <li :class="{active: !route.params.id}"
            class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink to="/" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-home"></span><b class="my-auto ms-4">All Tasks</b> </RouterLink>
            </li>

            <li v-for="tag of tags" :key="tag"
            :class="{active: route.params.id === tag}"
            class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink :to="`/${tag}`" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-pound"></span><b class="my-auto ms-4">{{tag}}</b> </RouterLink>
            </li>
        </div>
    </div>
    <div v-else id="sideMenu" class="offcanvas offcanvas-start" data-bs-scroll="true">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Tags</h5>
            <button id="smc" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div @click="autoClose" id="sideMenu-nav" class="list-group border-0">
            <li v-if="user" :class="{active: route.params.id === user.uid}" class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink :to="`/user/${user.uid}`" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-home-account"></span><b class="my-auto ms-4">User Tasks</b> </RouterLink>
            </li>

            <li :class="{active: !route.params.id}" class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink to="/" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-home"></span><b class="my-auto ms-4">All Tasks</b> </RouterLink>
            </li>

            <li v-for="tag of tags" :key="tag"
            :class="{active: route.params.id === tag}"
            class="nav-item btn btn-outline-secondary rounded-end-pill border-0 row">
            <RouterLink :to="`/${tag}`" class="nav-link d-inline-flex">
                <span class="float-start fs-3 mdi mdi-pound"></span><b class="my-auto ms-4">{{tag}}</b> </RouterLink>
            </li>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from "vue"
import {useRoute} from 'vue-router'

defineProps(['tags', 'user'])
const route = useRoute();

const autoClose = () => {
    document.querySelector('#smc').click()
}
    const width = ref(null)
const onResize = () => {
    width.value = window.innerWidth
}
onMounted(()=>{
    width.value = window.innerWidth
    window.addEventListener('resize', onResize)
    // console.log(width)

})
</script>

<style lang="scss" scoped>

</style>