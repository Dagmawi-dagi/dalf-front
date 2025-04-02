import Joi from 'joi';

// use this validation function form any where to validate any value
// the callback func will be called after the validation has finished 
export const validateInput = (input,validations,callback)=>{

  if (!validations) return callback({ err: false, userinput: input.inputVal })

  //to be passed validations are only the below... so check before calling validateInput function 
    // string 'email' , 'creditCard' 
    // number '-ve' , '+ve' // make sure the input type is number
    // for string and number 'min=1','max=2'
    // for file 'type= img || pdf || docs |xlsx' ,  'size=3 must in mb',
    // required or not 'rq'
    // other stuff like 
      // valid values {'valid':[]} 
      // same-value {same:{ ref: '',val:'' } }
  // add other validation in the feature as needed and handle validation 

  // NOTE the validation error will be in the order of the validations passed!!!!!
  
  let { inputType,inputVal,inputName } = input
  
  let joiSchema;

  if (inputType === 'string')   joiSchema = Joi.string().trim().label(inputName ?? 'value')
  else if (inputType === 'number')  joiSchema = Joi.number().label(inputName ?? 'value')
  else if (inputType === 'boolean')  joiSchema = Joi.boolean().label(inputName ?? 'value')
  else if (inputType === 'date')  joiSchema = Joi.date().label(inputName ?? 'value')
  else joiSchema = Joi.any().label(inputName ?? 'value')
  // for inputType === 'file'
  const file_schema = {// will contain file , type(optional) ,size(optional)
    file: JSON.stringify([...validations]).includes('rq') ? Joi.object().instance(File,'file upload').label(inputName ?? 'value') : Joi.any().label(inputName ?? 'value')
  }
  
  for (let i = 0; i < validations.length; i++) {
    const validationParam = validations[i];

    if( typeof validationParam === 'string'  ){ // for any string validation param like 'email','min=1'...
      if(validationParam === 'email' ) joiSchema =  joiSchema.email({tlds:{allow:false}})
      else if(validationParam === 'creditCard' ) joiSchema = joiSchema.creditCard()
      else if(validationParam.startsWith('min')) joiSchema = joiSchema.min(Number(validationParam.split('=')[1]))
      else if(validationParam.startsWith('max')) joiSchema = joiSchema.max(Number(validationParam.split('=')[1]))
      else if(validationParam === '-ve' ) joiSchema = joiSchema.negative()
      else if(validationParam === '+ve' ) joiSchema = joiSchema.positive()
    }

    else if( typeof validationParam === 'object' ){ // for validation param like {'valid':[]}  {same:{ val: 'asdasdasd',ref:'password' } } ....
      const obj = JSON.stringify(validationParam)
      if(obj.includes('valid') )joiSchema =  joiSchema.valid( ...JSON.parse(obj).valid).error(errors => {errors.forEach(err => {if (err.code === 'any.only')  err.message =`${inputName } must only be ${JSON.parse(obj).valid}`} );return errors;})  // for valid values
      else if(obj.includes('same') )joiSchema =  joiSchema.valid(JSON.parse(obj).same.val).error(errors => {errors.forEach(err => {if (err.code === 'any.only')  err.message = `${inputName } must be same as ${JSON.parse(obj).same.ref}`} );return errors;}) // for same values
    }

    if (inputType === 'file') {
      if( validationParam.startsWith('type')){ // if type is specifide on validation 
        if(validationParam.split('=')[1] === 'img') file_schema.type = Joi.string().valid('image/jpeg', 'image/png', 'image/jpg')
        else if(validationParam.split('=')[1] === 'pdf') file_schema.type = Joi.string().valid('application/pdf')
        else if(validationParam.split('=')[1] === 'docx' || validationParam.split('=')[1] === 'xlsx' ) file_schema.type = Joi.string().valid('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' )
      }
      if(validationParam.startsWith('size')) file_schema.size = Joi.number().$.max(validationParam.split('=')[1] * 1000000).rule({message:`the file size must be max of ${validationParam.split('=')[1]} MB`}) ; // in MB // if size is specifide on validation 
    }
  }
  
  // ------ for loop end ------ //
  // the value to be validated && the joiSchema must be different for File type
  if (inputType === 'file') {
    const required = JSON.stringify([...validations]).includes('rq') ? true : false
    // file joi schema
    if(JSON.stringify([...validations]).includes('single')) joiSchema = Joi.object(file_schema)
    else if(JSON.stringify([...validations]).includes('array')) joiSchema =  Joi.array().label(inputName ?? 'value').items( required ? Joi.object({...file_schema}).required() : Joi.object({...file_schema}) )
    // file validate inputval
    if(JSON.stringify([...validations]).includes('single')){
      const obj = {file: inputVal} // can be null if no file has been uploaded and the validations aray will be checked if it is required or not
      if( JSON.stringify([...validations]).includes('type') && inputVal) obj['type'] = inputVal.type; // if type validation is specifilde for file validation
      if( JSON.stringify([...validations]).includes('size') && inputVal) obj['size'] = inputVal.size; // if size validation is specifilde for file validation
      inputVal = obj
    }
    else if(JSON.stringify([...validations]).includes('array')){
      const arrayofFiles = []
      for (const key in inputVal) {
        const file = inputVal[key];
        if( file instanceof File ){
          const obj = {file: file} // can be null if no file has been uploaded and the validations aray will be checked if it is required or not
          if( JSON.stringify([...validations]).includes('type')) obj['type'] = file.type; // if type validation is specifilde for file validation
          if( JSON.stringify([...validations]).includes('size')) obj['size'] = file.size; // if size validation is specifilde for file validation
          arrayofFiles.push(obj)
        }
      }
      inputVal = arrayofFiles
    }
  }

  // if the validation inclues required or Not
  if( JSON.stringify([...validations]).includes('rq') && inputType != 'file') joiSchema = joiSchema.required()
  else if( !JSON.stringify([...validations]).includes('rq') && inputType != 'file') joiSchema = joiSchema.allow(inputVal) // to all null || '' || undifined 
  
  // call the callback with the validationResult ...meaning the validation has ended and pass the result 
  let { error,value } =  joiSchema.validate(inputVal)

  if(!error){
    if( inputType === 'file' ) {
      // since we have modified the input val to {file: File , type: '' , size:''} for validation // we need to change it back to file || [files] inly
      if( JSON.stringify([...validations]).includes('single') ) value = value.file
      else if( JSON.stringify([...validations]).includes('array') ) value = value.map(el=>el.file) 
    }
    callback(value) // if no error is found the value wiil be given 
  }
  else callback({validationFailed: error.message }) // of the value validation was faild err is given
}