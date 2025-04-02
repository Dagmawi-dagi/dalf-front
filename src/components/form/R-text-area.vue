<script setup>
//comps
import errDisplay from '../Reusable/err-display.vue';
// composables
import { useUserInput } from '../../composables/user-input';
import { useTextareaAutosize } from '@vueuse/core';
// vue
import { watch,onMounted } from 'vue';

const emits = defineEmits(['inputVal'])
const props  = defineProps({
  id:String,
  placeholder: String,
  label:String,
  preVal: String,
  onSubmitDyn: Number, // for on submit validation
  resetVal: Object, // ref({dyn : Math.random(),id: 'all' || props.id})
  validations: Array, // ['rq',...]
  validateOn: {
    type: String,
    default: 'blur' // by default the input validation will be on blur
  },
})


const { textarea,input } = useTextareaAutosize()
const { validate_userinput_emitval,validation_result } = useUserInput()

// the useTextareaAutosize() sets the input val to 'undefined' on start NOt what we want... so change it to ''
input.value = ''
// set PreVal if we have any passed
onMounted(()=> { if (props.preVal) input.value = props.preVal; else input.value = '' })
// validate the user input on Submit btn
if( props.validateOn === 'onSubmit') watch(()=>props.onSubmitDyn ,()=>{ validate_userinput_emitval('string',input.value,props.placeholder ?? props.label, props.validations,emits)})
//validating the userinput @input 
if(  props.validateOn === 'input') watch(input,()=>{ validate_userinput_emitval('string',input.value,props.placeholder ?? props.label,props.validations,emits)})
//validating the userinput @blur
const onblur = () =>{ if(  props.validateOn === 'blur') validate_userinput_emitval('string',input.value,props.placeholder ?? props.label,props.validations,emits)}
// resetVal Object holds Dynamic val so that it will simulate an event then reset the value of this specific input OR all other RInputones)
watch(()=> props.resetVal ,(val)=>{
  if( val.id === `_${props.id}` || val.id === 'all'  ) input.value = ''
},{deep: true})
</script>

<template>
  <div  class="textAreaContainer"  :id='`_${id}`'>
    <label :for="`_${id}`" v-if="label"> {{ label }} </label>
    <textarea  ref="textarea"  v-model="input" :id="`_${id}`"  :placeholder="placeholder"  @blur="onblur"></textarea>
    <!-- <errDisplay  
    class="err"
    :err="validationErr.err"  
    :err-msg="validationErr.message"
    /> -->
    {{ validation_result }}
  </div>
</template>

<style scoped lang="scss">
@import './style/R-text-area.scss';
</style>