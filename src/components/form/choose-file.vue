<script setup>
//comps
import errDisplay from '../Reusable/err-display.vue';
//composables
import { useUserInput } from '../../composables/user-input';
import { use_light_box } from '../../composables/light-box';
// conmposables
import { useFileDialog } from '@vueuse/core';
// vue
import { ref,watch } from 'vue';

const emits = defineEmits(['inputVal'])
const props = defineProps({
  id: String,
  single: Boolean, // if the file upload is single || many 
  validations: Array,
  btntext: {
    type:String,
    default: 'Choose file'
  },
  onSubmitDyn: Number, // for on submit validation
  resetVal: Object, // ref({dyn : Math.random(),id: 'all' || prop.id})
})

const { open,files,reset,onChange } = useFileDialog()
const selectedfile = ref(null)
const fileUrl = ref(null) // to check image file uploads ..... how about to check other file uploads (we need pdf reader for pdf upload and for others too)

const { validate_userinput_emitval,validation_result } = useUserInput()

onChange(()=> {
  selectedfile.value = props.single ? files.value[0] : files.value 
  fileUrl.value = selectedfile.value && props.single ? URL.createObjectURL( selectedfile.value ) : [...selectedfile.value].map(file=> URL.createObjectURL(file) )
  validate_userinput_emitval('file',selectedfile.value,'upload',props.validations,emits)
})
// for fileUplode userinput will be validated both on input and onSubmitDyn evt
watch(()=> props.onSubmitDyn, ()=>{  validate_userinput_emitval('file',selectedfile.value,'upload',props.validations,emits) })
// resetVal Object holds Dynamic val so that it will simulate an event then reset the value of this specific input OR all other RIChoosefile s)
watch(()=> props.resetVal ,()=>{ 
  if( props.resetVal.id === `_${props.id}` || props.resetVal.id === 'all'  ) reset()
},{deep: true})

// to check what user have choosen as afile upload 
const { show_global_vueEasyLightbox } = use_light_box()
const check_upload = ()=>{
  // for image file(s) use global vue-easy-lightbox 
  show_global_vueEasyLightbox(fileUrl.value,props.single ? null :fileUrl.value,0)
}

</script>
<template>
  <div class="chooseFile-container" ref="container" :id='`_${id}`'>
      <button type="button" @click="open"  >{{ btntext }}</button>
      <button  @click="selectedfile= null,fileUrl = null,reset(),validation_result = null " v-if="files" >cancel</button>
      <button  @click="check_upload" v-if="selectedfile">view</button>
      <!-- <p> {{ fileUrl }} </p> -->
      <p  class="fileName" v-if="selectedfile">{{ single ? selectedfile.name :  [...selectedfile].map(file=>file.name) }}  </p>
      <!-- {{ validation_result }} -->
      <errDisplay  
        v-if="validation_result"
        class="err"
        :err=" validation_result.validationFailed ? true : false"  
        :err-msg="validation_result.validationFailed"
      />
  </div>
</template>
<style scoped lang="scss">
@import './style/choose-file.scss';
</style>