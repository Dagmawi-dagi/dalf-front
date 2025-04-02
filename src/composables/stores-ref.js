//stores
import { use_blog_store } from '../stores/blog';
import { use_vacancy_store } from '../stores/vacancy';
import { use_newsletter_store } from '../stores/newsletter';


export const use_stores_refs = ()=>{
  // stores reference 
  // you must add any newly created store after created
  const stores = {
    'blog': use_blog_store(),
    'vacancy':use_vacancy_store(),
    'newsletter':use_newsletter_store()
  }
  
  // init the stores ApiCalls status holder reactive Object
  // should be inited on App.vue is started
  const init_stores = ()=>{
    // for every Api calls from any store we have an obj that stores the ApiCall State ( fetching,succ,err )
    // init every stores Apicalls Status holder
    for (const key in stores) {
      const store = stores[key]
      store['api_calls'].forEach(callId => {
        store[`${key}_store_apicalls_statusholder_obj`][callId] = {
          fetching: false,
          succ: false,
          err: null,
        }
      });
    }
  }

  // reset ApiCall Status holder Object when ever you want
  const reset_apicall_status_holder = (storeName,ApiCallHolder)=>{
    const store = stores[storeName]
    if(ApiCallHolder === 'all'){
      store.apiCalls.forEach(callId => {
        store[`${storeName}_store_apicalls_statusholder_obj`][callId] = {
          fetching: false,
          succ: false,
          err: null,
        }
      });
      return
    }
      store[`${storeName}_store_apicalls_statusholder_obj`][ApiCallHolder].fetching = false
      store[`${storeName}_store_apicalls_statusholder_obj`][ApiCallHolder].succ = false
      store[`${storeName}_store_apicalls_statusholder_obj`][ApiCallHolder].err = null
  }

  return{
    stores,
    init_stores,
    reset_apicall_status_holder
  }

}