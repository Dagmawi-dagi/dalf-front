import { AxiosInstance } from './instance';
import { setAuth } from '../../util/work-with-token';
import apiUrls from '../../assets/api-urls';
// error handling
import { global_apicall_feedback_handler } from '../../error handling/global_error_handler'

// stores 
import { use_stores_refs } from '../../composables/stores-ref'
import { storeToRefs } from 'pinia';

// the return of this function is the result of a promise ( succ Or Error )
// the Promise is handled here BUT it is handled by tryCatch block 
// so we  can both get the (Err and Succ) on await or .then(()=>{}) but not ON .catch cus the Promise has been handled here

export const global_apihandler =   async ( urlRef, options )=>{

  // if you want to cal api out side store ( for any where)
    // global_apihandler('event-getlist',options).then(()=>{  })

  // urlRef ~ urlRef event-getlist
  const { url,method,globally_res_feedback} = apiUrls[urlRef.split('-')[0]][urlRef.split('-')[1]]

  // here if the GlobalApiHandler Call was from any of the stores 
  // we want to handle every thing on here (the storage of the response Obj and the status of that specific api caller method )
  let store;
  let store_apicalls_statusholder_obj;
  let statusholder_obj_id;
  let onSucSaveTheJsonOn;

  // if the call was from a store we need to set the fetching state of the api 
  if( options?.store ) {
    const { stores } = use_stores_refs()
    store = stores[options?.store]
    store_apicalls_statusholder_obj = storeToRefs(store)[options?.store_apicalls_statusholder_obj]
    statusholder_obj_id = options?.statusholder_obj_id
    onSucSaveTheJsonOn = storeToRefs(store)[options?.onSucSaveTheJsonOn]

    if( options?.list && options?.fresh ) initApiCall(statusholder_obj_id,store_apicalls_statusholder_obj)
    if( !options?.list ) initApiCall(statusholder_obj_id,store_apicalls_statusholder_obj)
  }

  // ------------------if we only want to mock----------------------
  if( options?.mock?.delay ){
    try {
      const res =  await  new Promise((res,rej)=>{
        setTimeout(() => {
          if( options?.mock.succ )  {
            if (options?.store)  EndApiWithSuc(statusholder_obj_id,store_apicalls_statusholder_obj)
            res({succ: true})
          }
          else {
            if (options?.store)  EndApiWithErr(statusholder_obj_id, store_apicalls_statusholder_obj ,{err:'mock err'} ) 
            rej({err: true})
          }
        }, options?.mock.delay );
      })
      return res
    } catch (err) { 
      return err 
    }
  }

  // -----------------------------http request---------------------------------------- //
  try {
    const res =  await AxiosInstance({ url: getFulUrl(url,options), method , ...new ApiConfigOptions(options) })
    if( options?.store ) {
      if( options?.onSucSaveTheJsonOn ){
        if( options?.list  &&  options?.fresh ) onSucSaveTheJsonOn.value = res?.data.data 
        if( options?.list  &&  options?.more )  onSucSaveTheJsonOn.value.push(...res.data.data )
        if( !options?.list ) onSucSaveTheJsonOn.value = res?.data.data ? res?.data.data : res?.data }
      EndApiWithSuc(statusholder_obj_id,store_apicalls_statusholder_obj);
    }
    // if the Apicall was not form store the res will be returned  ... so can be used from there 
    if ( globally_res_feedback?.succ_msg ) global_apicall_feedback_handler().success(globally_res_feedback.succ_msg) 
    return res
  } catch (err) {

    if( options?.store ) EndApiWithErr(statusholder_obj_id,store_apicalls_statusholder_obj,err);
    if( globally_res_feedback?.err ) global_apicall_feedback_handler().err(err) 

    // if the Apicall was not form store the resErr will be returned ... so can be used from there
    return err.response

  }
}


function getFulUrl (urlString, options) {
  // then replace any params on the urlString by the options params 
  // options?.param1,options?.param2,options?.param3
  // replace the param with the options params
  for (let i = 1 ; i < 10; i++) urlString = `${urlString}`.replace(`:param${i}`,options[`param${i}`])
  // if queryObj was passed with the options 
  // change the passed obj {asd:'asd',asd:'asd'} to ?asd=asda&asda=asd
  let queryStr
  if( options?.queryObj ){
    queryStr = JSON.stringify(options?.queryObj)
      .replace(/"|{|}/g,'')
      .replace(/,/g,'&')
      .replace(/:/g,'=')
  }

  let fullUrl = `${urlString}${ queryStr ? `?${queryStr}`: '' }`
  console.log(fullUrl);
  
  return fullUrl
}

function ApiConfigOptions (options) {
  if( options?.token ) this.headers = setAuth()
  if( options?.data ) this.data = options?.data // for req.body
}


//---------- methos to set the ApiState of ApiCalls from the Store -----------//
function initApiCall (id,obj){
  // console.log( id, obj)
  // console.log(obj.value  )

  obj.value[id].fetching = true
  obj.value[id].succ = false
  obj.value[id].err = null 
}

function EndApiWithSuc (id,obj){
  obj.value[id].fetching = false
  obj.value[id].succ = true
  obj.value[id].err = null 
}

function EndApiWithErr (id,obj,err){
  obj.value[id].fetching = false
  obj.value[id].succ = false
  obj.value[id].err = err
}