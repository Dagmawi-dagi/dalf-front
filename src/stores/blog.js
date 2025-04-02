import { defineStore } from "pinia";
// vue
import { ref } from "vue";

export const use_blog_store= defineStore('blog-store',()=>{
  
  // this array items have thier corespondant( same string ) urlRef on the "api-urls" Asset file
  const api_calls = ['getList']
  const blog_store_apicalls_statusholder_obj = ref({})

  const page = ref(1)
  const perPage = ref(10) 

  const blog_posts = ref([])

  return {
    api_calls,
    blog_store_apicalls_statusholder_obj,

    page,
    perPage,

    blog_posts,
  }
})
