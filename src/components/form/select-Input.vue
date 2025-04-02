<script setup>
// comps
import subSelectInput from './sub-select-Input.vue';
// composables
import { useUserInput } from '../../composables/user-input';
import { onClickOutside } from '@vueuse/core';
// vue
import { ref,watch,onMounted } from 'vue';

const emits = defineEmits(['inputVal'])
const props = defineProps({
  id: String,
  placeholder: String,
  items: Array, // [{ name: 'one', sub: []},....],
  item_ref: String, // on the items Array the key that holds the name of the item
  subItems: String, // on the items Array the key that holds the sub items Array 
  validations: Array,
  preVal: String,
  onSubmitDyn:Number,
  validateOn: {
    type: String,
    default: 'blur' // by default the input validation will be on blur
  }
})

const { validate_userinput_emitval,validation_result } = useUserInput()

const dropdownInputOpen = ref(false)
const openedSubselectitem = ref('')
const selectedInput = ref('')
// set PreVal if we have any passed
onMounted(()=>{ if (props.preVal) selectedInput.value = props.preVal })
// here the selectedInput.value is passed as a string JUST to validate for required validation parameter since the expected validation is JUSt [] 
watch(()=>props.onSubmitDyn ,()=>{ validate_userinput_emitval('string', selectedInput.value ? JSON.stringify(selectedInput.value) : '' ,props.placeholder,props.validations,emits)})
// we need to set the max height of the dropdownInput to it's scrollHeight of the el
// cus on open we only need the maxheight to be as much as it's content 
// on Sub open we need  to add the sub-content scrollHeight maxheight 
// key objective only set the maxHeight you need
let dropdownInputMaxHeight = ref(null)
const toggledropdownInput = ()=>{
  openedSubselectitem.value = ''
  dropdownInputOpen.value = !dropdownInputOpen.value
  dropdownInputMaxHeight.value = document.querySelector(`#_${props.id} .dropdownInput+.dropdownInputItems-container`).scrollHeight 
}

const onActivedropdownInput=(header)=>{
  dropdownInputMaxHeight.value = dropdownInputMaxHeight.value + document.querySelector(`#_${props.id} .subDropdownInputItems-container`).scrollHeight    
  // if allready set ...user is trying to cloth the openedSubselectitem 
  openedSubselectitem.value === header  ? openedSubselectitem.value = '' : openedSubselectitem.value =  header 
}


const container = ref(null)
const headerinput = ref(null)
onClickOutside(container,()=>{
  dropdownInputOpen.value = false
},{ignore:[headerinput]})

</script>

<template>
  <div class="dropdownInput-container" :id="`_${id}`" >
    <div class="dropdownInput"  ref="headerinput"  :style="{ color: selectedInput ? 'var(--text-dark-gray)' : 'var(--text-light-gray)' }"  @click="toggledropdownInput">
      {{ selectedInput ? selectedInput[item_ref] : placeholder }}
      <span class="selectIcon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </span>
    </div>

    <div class="dropdownInputItems-container"  ref="container" :style="{ 
        maxHeight: dropdownInputOpen ? `${dropdownInputMaxHeight + 20 /** 20 for padding*/ }px`: '0px',
        padding: dropdownInputOpen ? '0px' : '',
        border: !dropdownInputOpen ? 'none':'',
        transition:`padding .2s,max-height 0.2s ease-out`}" 
      >
        
      <template v-for="(item,index) in items" :key="index">
        <p v-if=" !item[`${subItems}`] ||  item[`${subItems}`]?.length === 0" class="dropdownInput-items"  @click="selectedInput = item,dropdownInputOpen=false ,openedSubselectitem=''">{{ item[item_ref] }} </p>
        
        <subSelectInput  
          v-if="item[`${subItems}`] && item[`${subItems}`]?.length !=0 " 
          @ActivedropdownInput="onActivedropdownInput($event)"
          @subItemSelected="selectedInput = $event,dropdownInputOpen=false,openedSubselectitem=''"
          :header="item[item_ref]"  
          :sub-items="item[`${subItems}`]" 
          :open="openedSubselectitem === item[item_ref]"
        />

      </template>  
    </div>
    <p class="err-msg" v-if='validation_result.validationFailed'>{{ validation_result.validationFailed }}</p>

  </div>
</template>

<style scoped lang='scss'>
@import './style/select-Input.scss';
</style>