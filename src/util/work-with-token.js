export const setAuthOnLocalStorage =(token)=>{
  if( !token ) return
  window.localStorage.setItem('token',token)
}

export  function getToken() {
  const token = window.localStorage.getItem('token')
  if(!token) return null
  return  token
}

// adds token bearer to the Axiosinstance({headers: {}})
export const setAuth = ()=>{
  return { Authorization : `Bearer ${getToken()}`};
}