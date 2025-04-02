<!-- <script setup>
// lib
import gsap from 'gsap';
// assets
import { questionThinCardUtil } from '../../assets/thin-card-utils';
// comps
import thinCard from '../Reusable/thinCard/thin-card.vue';
// cmoposables
import { useMousePressed ,useMouseInElement } from '@vueuse/core'
import { use_thinCard } from '../../composables/thin-card';
// store
import { use_util_store } from '../../stores/util-store';
import { storeToRefs } from 'pinia';
// vue
import { ref,watch } from 'vue';

const { HeaderDrawer } = storeToRefs( use_util_store() )
const { OpenedUtilDropDownOpen,edit,comment,user } = use_thinCard()

const drawerOpen = ref(false)

const toggleDrawer = ()=>{
  const maxInnerContentHeight  = document.querySelector('.drawer-content').scrollHeight
  if( !drawerOpen.value ){
    gsap.to('.drawer-content',{ maxHeight: maxInnerContentHeight ,duration:.3}).then(()=>{drawerOpen.value = true})
  } 
  else gsap.fromTo('.drawer-content',{ maxHeight:maxInnerContentHeight },{  maxHeight: 0, duration:.3 }).then(()=>{drawerOpen.value = false})
}

// Animate the drawer toggler
const drawertoggler = ref(null)
const  main = document.querySelector('.RouterView')
const { pressed } = useMousePressed({ target: drawertoggler })
const { elementWidth,elementX,isOutside } = useMouseInElement(main)


watch(elementX,()=>{
  const rightEdge = ( elementX.value <= elementWidth.value - 70)
  if (pressed.value && !isOutside.value  && rightEdge ) gsap.to('.drawer-toggler',{  left:elementX.value,duration: .1 })
})

// onthin card resize the drawer must also resize
const thinCardResizing  = (resizedCardHeight)=> document.querySelector('.drawer-content').style.maxHeight = `${resizedCardHeight + 20}px`;

</script>

<template>
  <div class="drawer"  > 
      <div class="drawer-content"  :style="{ borderTop: drawerOpen ? '1px solid var(--light-blue)': '' }" >
        <div  style="padding: 10px;">
          <span v-if="HeaderDrawer.tabs.length === 0 && HeaderDrawer.thinCardData.length === 0"  style="visibility: hidden; height: 50px; display: block;"/>

          <div class="tabsContainer" v-if="HeaderDrawer.tab" >
            <button  v-for="(tab, i) in HeaderDrawer.tabs" :key="i" class="tab" 
            @click=" $router.push({name: `user ${tab}`.toLowerCase(),params:{ userId: $route.params.userId }}) "> {{ tab }} </button>
          </div>

          <template  v-if="HeaderDrawer.thinCard">
            <thinCard 
              v-for="i in 1" :key="i"
              :items="HeaderDrawer.thinCardData" 
              :For="'q'"  
              :utils="[...questionThinCardUtil]" 
              :utilDropDownOpen="OpenedUtilDropDownOpen === i"
              @user="user( HeaderDrawer.thinCardData.isAnon ? null : HeaderDrawer.thinCardData.author._id )"
              @onResize="thinCardResizing"
              @edit="edit('updateQuestionModal',HeaderDrawer.thinCardData)"
              @comment="comment('commentQuestionModal')"
              @utilDropDown="OpenedUtilDropDownOpen === i ?  OpenedUtilDropDownOpen = '' : OpenedUtilDropDownOpen = i  "   
            />
          </template>
        </div>

        <span class="drawer-toggler" @click="toggleDrawer" ref="drawertoggler" >
          <svg v-if="!drawerOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <svg  v-if="drawerOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </span>  

      </div>  
    </div>
</template>

<style scoped lang="scss">
@import './style/drawer.scss';
</style>

<script>
</script>

<template>
  <div>
    drawer
  </div>
</template> -->