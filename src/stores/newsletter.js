import { defineStore } from "pinia";
// vue
import { ref } from "vue";

export const use_newsletter_store= defineStore('newsletter-store',()=>{
  
  // this array items have thier corespondant( same string ) urlRef on the "api-urls" Asset file
  const api_calls = ['subscribe','confirmSub','unsub']
  const newsletter_store_apicalls_statusholder_obj = ref({})

  const subscriber = ref(null)

  return {
    api_calls,
    newsletter_store_apicalls_statusholder_obj,

    subscriber,
  }
})