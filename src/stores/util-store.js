import { defineStore } from 'pinia';
import { ref } from 'vue';
import { use_break_point } from '../composables/break-point'

// this store is for global util variables
export const use_util_store = defineStore('util-store',()=>{
  
  // to tell any comp that the page routing is resolved 
  const route_resovled = ref(false)

  const dark_theme = ref(false)

  // template refs to use from Anywhwere  
  const router_view_container = ref(null)

  // for controlling global modal
  const any_open_modal = ref({
    bool: false,
    id: '',
    AnythingTopass: null // use this passed data on the mounted modal
  })

  // for global image viewer comp controll
  const   global_vue_easy_lightbox = ref({
    display: false,
    imgs: [],
    imgIndex: 0
  })

  // for filter sort search
  // we can push the filter and search Obj to the Route OR we can store them on localStorage then on reload the page will be bsed on the filter and search if there is any 
  const filter_obj = ref(null)  
  const search_string = ref(null)  
  const sort_obj = ref(null)  

  return{
    route_resovled,

    dark_theme,

    //refs
    router_view_container,


    any_open_modal,

    global_vue_easy_lightbox,

    filter_obj,
    search_string,
    sort_obj
  }
})