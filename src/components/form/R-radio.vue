<script setup>
//vue
import { ref,watch } from 'vue';
// no need for validation for 'checkbox' and 'radio' inputs
const emits = defineEmits(['inputVal'])
const props = defineProps({
  id: String,
  legend: String,
  radioOptions: Array,
  inputname: String,
  defaultRadio: Number, 
  onSubmitDyn: Number, // for on submit emit inputVal
})
// user Must select one of the options.
const userInput = ref( props.radioOptions[props.defaultRadio] )
watch(()=>props.onSubmitDyn ,()=>{ emits('inputVal',{err:false ,  userInput:userInput.value})})

</script>

<template>
  <div class="inputContainer" :id='`_${id}`'>
    <p>{{ legend }}</p>
    <div class="custom-radio-container"  v-for="(option, i) in radioOptions" :key="i">
      <input type="radio" :id="`radio${i}${option}`" :name="inputname" :value="option" v-model="userInput"  @change="$emit('inputVal',{err:false ,userInput : $event.target.value})" >
      <label :for="`radio${i}${option}`">{{ option }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './style/R-radio.scss';
</style>