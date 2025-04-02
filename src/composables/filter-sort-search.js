// stores
import { UseUtilStore } from '../stores/utilStore';
import { storeToRefs } from 'pinia';
// vue
import { watch,onBeforeUnmount } from 'vue';

// this will watch for any filter seach sort stuff and call new api based on the filter and search obj
// sort just sort the list no need to call  Any Api
export  const useFiltersortSearch = (getApiFunction)=>{

  const { filterObj,searchString,sortObj } = storeToRefs( UseUtilStore() )

  // for filter
  watch(filterObj,(val)=>{
    console.log(val);
    getApiFunction({fresh:true})
  },{deep: true})
  
  // for Search
  watch(searchString,(val)=>{
    console.log(val);
    localStorage.removeItem('filterObj')
    getApiFunction({fresh:true})
  })

  // for Sort 
  watch(sortObj,(val)=>{
    console.log(val);
  },{deep: true})


  // reset any fitler and search params  on store and localstorage when comp unMounts cus the new comp needs it's won filter and search obj
  // on reload the localStorage will still exist cus reload and onBeforeUnmount are two d|t things w|h is Good 
  onBeforeUnmount(()=>{
    filterObj.value = null
    searchString.value = ''
    localStorage.removeItem('filterObj')
    localStorage.removeItem('searchString')
  })

  return{

  }
}