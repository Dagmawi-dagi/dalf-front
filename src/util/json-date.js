export const useJsonDate = ()=>{
  
  const formatJsonDate = (jsonDate)=>{
    return  new Date(jsonDate).toLocaleString('en-US',{ 
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }) 
  }
  
  return{
    formatJsonDate 

  }
}