// these are every urls used in the app 
// "getProfile": "/user/:param1" // when you need to pass params to the url
// globally_res_feedback:{ err:true, succ_msg: 'event-happend successfully'} // if we want the err || succ res to be handled globally
export default  {
  "blog":{
    "getList": {url:"/blog",method: 'get',globally_res_feedback:{ err:true}},
    "recent": {url:"/blog?page=1&perPage=4&sort=-createdAt",method: 'get',globally_res_feedback:{ err:true}},
  },
  "vacancy":{
    "getList": {url:"/vacancy",method: 'get',globally_res_feedback:{ err:true}},
    "apply":  { url:"/vacancy/apply",method: 'post',globally_res_feedback:{ err:true,succ_msg: 'You Have applyed successfully'}  }
  },
  "newsletter":{
    "subscribe": {url:"/newsletter/subscribe",method: 'post'},
    "confirmSub":{url:"/newsletter/confirmSub/:param1",method: 'patch',globally_res_feedback:{ err:true}},
    "unsub":{url:"/newsletter/unSub/:param1",method: 'patch'}
  },
  "contactus":{
    "contact":  { url:"/contactus",method: 'post',globally_res_feedback:{ err:true}  }
  },
}