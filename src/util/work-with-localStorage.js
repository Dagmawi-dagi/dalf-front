export const checkFilterObjOnLocalStorage = ()=>{
  let filterObj = null
  if( localStorage.getItem('filterObj')  ){
    filterObj={  ...JSON.parse(localStorage.getItem('filterObj') ) }
  }
  if(  localStorage.getItem('searchString')  ){
    filterObj = {
      ...filterObj,
      q: localStorage.getItem('searchString')
    }
  }
  return filterObj
}