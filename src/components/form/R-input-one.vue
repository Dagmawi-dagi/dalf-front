<script setup>
//comps
import errDisplay from '../Reusable/err-display.vue';
//composables
import { useUserInput } from '../../composables/user-input'
// vue
import { watch,ref,onMounted } from 'vue';
// use this input comp for 'text' 'number' 'email' 'password' type inputs only
const emits = defineEmits(['inputVal'])
const props = defineProps({
  id: String,
  disabled: {
    type: Boolean,
    default: false
  },
  type: String,
  placeholder: String,
  label:String,
  preVal: String, 
  onSubmitDyn: Number, // for on submit validation
  resetVal: Object, // ref({dyn : Math.random(),id: 'all' || prop.id})
  validations: Array, // ['rq',...]
  validateOn: {
    type: String,
    default: '' 
  },
  labelDisplay: {
    type: String,
    default: "block"
  }
})

const userInput = ref('')
//if we have pre val set it on comp mounted
onMounted(()=>{  if( props.preVal ) userInput.value = props.preVal})

const { validate_userinput_emitval,validation_result } = useUserInput()
//validating the userinput @input 
if( props.validateOn === 'input' ) watch(userInput,()=>{ validate_userinput_emitval( props.type === 'number' ? 'number' : 'string', userInput.value,props.placeholder ?? props.label ,props.validations,emits)})
//validating the userinput @blur
const onblur = () =>{ if(  props.validateOn === 'blur') validate_userinput_emitval( props.type === 'number' ? 'number' : 'string',userInput.value,props.placeholder ?? props.label ,props.validations,emits)}
// nomatter the what the props.validateOn is watch and validate on onSubmitDyn 
watch(()=>props.onSubmitDyn ,()=>{   validate_userinput_emitval( props.type === 'number' ? 'number' : 'string',userInput.value, props.placeholder ?? props.label ,props.validations,emits)})
// resetVal Object holds Dynamic val so that it will simulate an event then reset the value of this specific input OR all other RInputones)
watch(()=> props.resetVal ,()=>{ 
  if( props.resetVal.id === `_${props.id}` || props.resetVal.id === 'all'  ) userInput.value = ''
},{deep: true})
</script>

<template>
  <div class="inputContainer" :id='`_${id}`' >
    <dir class="label-container" :class="{side: labelDisplay === 'inline', stack: labelDisplay === 'block' }" >
      <label :for="`__${id}`" v-if="label"> {{ label }} </label>
      <input :disabled="disabled" :type="type"  :id='`__${id}`' :placeholder="placeholder" v-model="userInput"  @blur="onblur">
    </dir>

    <errDisplay  
      v-if="validation_result"
      class="err"
      :err=" validation_result.validationFailed ? true : false"  
      :err-msg="validation_result.validationFailed"
    />
  </div>
</template>
<style scoped lang="scss">
@import './style/R-input-one.scss';
</style>