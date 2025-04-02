import { validateInput } from '../util/user-Input-validator';
import { ref,watch } from 'vue';

export const useUserInput = (submitFunc)=>{

  //--------------------------used on the comp that work with inputs form-------------------//
  const form = ref({}) // will hold all the form inputs
  const resetVal = ref({dyn : null,id: null}) // Maths random and the id of the input comp should be passed to reset the input vals
  // when clicking "submit btn" on the form we need to check the validity of every form inputs to procceed (submit funtion call)..
  // which is the funtion that will be called if the validations for all the form inputs have passed
  const onSubmitDyn =  ref(null) // Maths random should be given to simulate an event
  // we need to wait a little for the form inputs to get thier validationResult
  // and the call the submit function if the validation for every form inputs have passed 
  watch(onSubmitDyn,()=>{
    setTimeout(() => {
      for (const field in form.value) {
        if( form.value[field].validationFailed )  return
        else if( typeof form.value[field] == 'object' &&  JSON.stringify(form.value[field]).includes('validationFailed') )  return
      }
      // before submit remove the fields with empty string like (field:"") cus on the back end we are using Joi to validate the input and empty string is not allowed
      // form.value is {} with values  {field: String} || {field: {field: String }} || {field: [{field: String }]}  
      // so we need to remove any field's value with empty String ("") from the form object
      for (const field in form.value) {
        console.log(  )
        if(  typeof form.value[field] === 'object' ){
          if(  Array.isArray(form.value[field]) ){
            form.value[field].forEach( (item,index) => {
              //since the item is object we need to check if it has any empty string value and remove it
              if(  typeof item === 'object' ){
                for (const key in item) {
                  if( item[key] === '' ) delete item[key]
                }
              }
              else if (typeof item === 'string' && item === '' ) delete form.value[field][index]
            })
          }else{
            for (const key in form.value[field]) {
              if( form.value[field][key] === '' ) delete form.value[field][key]
            }
        } 
        }else if( typeof form.value[field] === 'string' && form.value[field] === '' ) delete form.value[field]
     }

      submitFunc()
    }, 300);
  })

  //-----------------------------------------------------------------------------------------//

  //------------------------------used on the Reusable inputs comps--------------------------//
  const validation_result =  ref({})
  const validate_userinput_emitval = (inputType,inputVal,inputName,validations,emits)=>{
    
    validateInput({inputType, inputVal,inputName}, validations,( validationResult )=>{
      emits('inputVal', validationResult ) // will be error obj Or if validation passed { err: false, userinput:value }
      validation_result.value = validationResult
    })
  }
  //----------------------------------------------------------------------------------//
    
  return{
    onSubmitDyn,
    resetVal,
    form,

    validate_userinput_emitval,
    validation_result
  }

}