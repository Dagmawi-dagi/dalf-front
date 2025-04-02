// store
import { use_util_store } from '../stores/util-store';
import { storeToRefs } from 'pinia';

// on App.vue import this composable to excu the 'if statement'
export const use_set_theme = ()=>{
  const { dark_theme } = storeToRefs( use_util_store() )

  // on 1st load excute this  to the the theme of the app
  if( localStorage.getItem('dark-theme') == 'true' ){
    document.documentElement.setAttribute('dark-theme', true )
    dark_theme.value = true
  }else{
    document.documentElement.setAttribute('dark-theme',false )
    dark_theme.value = false
  }

  // on the Theme toggler comp
  const set_theme = (bool)=>{
    document.documentElement.setAttribute('dark-theme',bool)
    localStorage.setItem('dark-theme',bool)
    dark_theme.value = bool
  }

  return{
    set_theme
  }

}