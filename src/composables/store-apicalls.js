import { global_apihandler  } from '../plugIn/axios/global-api-hadler';
//util
import { setAuthOnLocalStorage } from '../util/work-with-token'
// router
import { useRoute ,useRouter} from 'vue-router';
//vue
import { ref } from 'vue';


export const  use_apicalls_from_store = ()=> {
  const router = useRouter()
  const route = useRoute()

  // this functions is for api-calls from pinia store 
    // apicall_from_store('storeName','urlRef for the Api call', { token: true, param1: '65c10c02fe9d2e1297bd4acc', data: data , other-options })
    // apicall_from_store('event','event-getlist',{ fresh:true, token: true, onSucSaveTheJsonOn: 'events',queryObj:{ asd: 'asd',dd:'22222',page: 1,perpage: 2}})
      // for load more pagination BUTTONS  add { fresh: false ,list: true ,more:true} option 

    // apicall_from_store( 'user' ,'user-getlist',{
    //     mock:{
    //       delay: 4000,
    //       succ: false
    //     },
    //     param1: '65c10c02fe9d2e1297bd4acc'
    //     list: true,
    //     fresh:false, 
    //     more: false,  
    //     queryObj : { page: page.value, perPage: perPage.value,abc: 'asdasd' },
    //     onSucSaveTheJsonOn: 'users',
    //     token: true 
    //     data: {} // for the reqbody
    // })
  const apicall_from_store_response = ref({})
  const apicall_from_store_loading = ref(false) 

  const apicall_from_store = async (store,urlRef,options)=>{
      // urlRef ~ urlRef event-getlist

      // store_apicalls_statusholder_obj // get it using the `${store}_store_apicalls_statusholder_obj`
      // statusholder_obj_id // get the id from the urlRefString (split it - [1])
      
    // add other options you want to the GlobalApiHandler 
    function otherOptions (){
      const obj = {}
      if( options.mock ) obj.mock = options.mock // { delay: 4000,suc||err:true }
      return obj
    }

    // since the axios promise is handle on the global_apihandler it self 
    // but since it is async function we can catch the return value if the function by .then on the async function
    // and return the response from here to be used from any were
    apicall_from_store_loading.value = true
   const res = await global_apihandler(urlRef, {
      store,
      store_apicalls_statusholder_obj: `${store}_store_apicalls_statusholder_obj`,
      statusholder_obj_id: `${urlRef}`.split('-')[1],
      ...options,
      ...otherOptions(),
    });
    apicall_from_store_loading.value = false;
    apicall_from_store_response.value = {
      status: res.data.status,
      statusCode: res.status,
      data: res.data,
      errMessage: res.data.errMessage ?? ''
    };
    // for every api call check if there is token in the res and save it to the localStorage
    if (JSON.stringify(res.data).includes('token')) {
      setAuthOnLocalStorage(res.data.token);
      if (route.name === 'login') router.push('/');
    }
    return res
  }

  // if you want to cal api out side store ( from any where)
    // global_apihandler(event-getlist,options).then(()=>{  })

  return{
    apicall_from_store,
    apicall_from_store_loading,
    apicall_from_store_response
  }

}
