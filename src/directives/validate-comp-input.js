// util
import { validateInput  } from '../util/user-Input-validator';
import { ref } from 'vue';

export const vTooltip = {
    validation_result: ref(),
    mounted(el, options) {
        const {inputType, inputVal,inputName,validations,elToDisplayTheErrUnder} = options
        validateInput({inputType, inputVal,inputName}, validations,( validationResult )=>{
            // set the validation result
            this.validation_result.value = validationResult
            // display the error under the #elToDisplayTheErrUnder
        })

    }
}  