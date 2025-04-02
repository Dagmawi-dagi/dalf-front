<script setup>
// libs
// comps
import mainContainer from './components/main/main-container.vue';
import producShow from './components/modal/productShow.vue';
import blogpost from './views/blog/blogPost.vue';
import applyVacancy from './views/career/applyVacancy.vue';
// composables
import { use_set_theme } from './composables/set-theme';
import { use_light_box } from './composables/light-box';
import { use_stores_refs } from './composables/stores-ref';
// stores
import { use_util_store } from './stores/util-store';
import { storeToRefs } from 'pinia';

const { global_vue_easy_lightbox,any_open_modal } = storeToRefs(use_util_store())

const { onhide } = use_light_box()
const { init_stores } = use_stores_refs()



init_stores()
use_set_theme()


import { ref } from 'vue';
const schema = ref({
  name: { type: 'text', label: 'Name' },
  email: { type: 'text', label: 'Email' }
})

</script>

<template>
  <mainContainer/>
  
  <transition :name="'fadeIn'">
    <blogpost v-if="any_open_modal.bool && any_open_modal.id === 'blogModal'"  :blog-post="any_open_modal.AnythingTopass"/>
  </transition>
  
  <transition :name="'fadeIn'">
    <producShow  v-if="any_open_modal.bool && any_open_modal.id === 'productModal'"  :product-data="any_open_modal.AnythingTopass" />
  </transition>

  <transition :name="'fadeIn'">
    <applyVacancy  v-if="any_open_modal.bool && any_open_modal.id === 'applyVacancyModal'" :vacancy="any_open_modal.AnythingTopass"/>
  </transition>


  <vue-easy-lightbox 
    :index="global_vue_easy_lightbox.imgIndex" 
    @hide="onhide"
    :maxZoom="4" 
    :scroll-disabled="false" 
    :loop="true" 
    :visible="global_vue_easy_lightbox.display" 
    :imgs="global_vue_easy_lightbox.imgs" 
  />
</template>

<style lang="scss">
@import './style/base';
@import './style/animations';
@import './style/variables';
@import './style/mixins';
@import './style/fonts.scss';
@import './style/global.scss';
</style>