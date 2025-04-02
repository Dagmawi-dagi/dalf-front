<script setup>
// comps
import topnavs from '../../components/Nav/topnavs.vue';
import footer1 from '../footer/footer1.vue';
// router
import { RouterView } from 'vue-router';
</script>  

<template>
    <topnavs v-if="!$route.meta.other_info || $route.meta.other_info.navbar !== false" />
    <div style="min-height: 80vh;">
      <RouterView ></RouterView>
    </div>
    <footer1 v-if="!$route.meta.other_info || $route.meta.other_info.footer !== false" />
</template>

<style scoped lang="scss">
  @import './style/main-container.scss';
</style>