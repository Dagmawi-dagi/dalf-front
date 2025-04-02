<script setup>
// vue
import { ref } from 'vue';
const emits = defineEmits(['ActivedropdownInput','subItemSelected'])
const props =  defineProps({
  id: String,
  header: String,
  subItems: Array,
  open: Boolean,
})

let SubdropdownInputMaxHeight = ref(null)
const toggledropdownInput = (header)=>{
  emits('ActivedropdownInput',header)
  SubdropdownInputMaxHeight.value = document.querySelector(`#_${props.id} .subDropdownInput-header+.subDropdownInputItems-container`).scrollHeight + 'px'
}

// the whole animation is done based on the open prop and inline Style
// Note ... only set the maxHeight you need
</script>

<template>
  <div class="subDropdownInput-container"  :id='`_${id}`'  >
    <p class="subDropdownInput-header" @click=" toggledropdownInput(header)" > 
      {{ header }} 
      <span class="icon">
        <svg v-if="!open"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
        <svg v-if="open"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </p>

    <div class="subDropdownInputItems-container" :style="{ maxHeight: open ? SubdropdownInputMaxHeight : '0px',transition:'max-height  0.3s ease-out'}">
      <p  v-for="(subItem, i) in subItems" :key="i" 
        class="subDropdownInput-items" 
        @click="$emit('subItemSelected',subItem)">
        {{ subItem.name }} 
      </p>
    </div>
    
  </div>
</template>
<style scoped lang="scss">
@import './style/sub-select-Input.scss';
</style>