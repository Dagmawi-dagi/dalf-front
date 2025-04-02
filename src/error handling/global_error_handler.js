import { DialogToast,DialogMessage } from 'v-dialogs';

export const global_apicall_feedback_handler = ()=>{

  const err = (err)=>{
    DialogToast(err.response.data.errMessage ?? err.message,{
      messageType:'error',
      closeButton:true,
      placement:'top-right',
      duration:5000,
      customClass: 'global_error',
    })
  }

  const success = (msg)=>{
    DialogMessage(`${msg}`,{ 
      messageType: 'success',
      icon:true,
      placement:"top",
      duration:5000,
      customClass: 'global_success', 
      closeButton:true,
      pill:false
    })
  }

  return {
    err,
    success
  }
}