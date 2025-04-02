import { createRouter, createWebHistory } from 'vue-router';
// libs
import { compareAsc ,addDays  } from 'date-fns'
// progressbar
import { progress_bar } from '../main';
// store
import { use_util_store } from '../stores/util-store';
import { storeToRefs } from 'pinia';


const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // if (savedPosition) return  savedPosition
    return { top: 0, left: 0 }
  },

  history: createWebHistory(import.meta.env.BASE_URL),
  
  // // things to pass to a route meta
  //   meta :{
  //     title: 'login', 
  //     auth: false, // if the page is only for logged in users
  //     restrict: ['a','b'], // if the page is for specific user types
  //     search: { // for search functionalty on this route // the search result will be saved on store[result]
  //       store: '',
  //       store_result: '', 
  //     },
  //     filter: { // for filter functionalty on this route // the filter result will be saved on store[result]
  //       store: '',
  //       store_result:''
  //     },
  //     other_info:{
        //  infinit_scroll:{ // if the page has infinite scroll
        //     custom_el: String, //  if the el that the infinit directive expects is nor the RouterView Element
        //     urlRef: 'user-getList',
        //     store_ref: 'user',
        //     onSucSaveTheJsonOn: "users",
        //     distance: 20,
        //   } 
  //     }
  //   },

  routes: [
    {
      path:'/age-verification',
      name:'age-verification',
      meta:{ 
        title: 'age-verification', 
        other_info:{
          navbar: false,
          footer: false,
        }
      },
      component : ()=>import ('../views/ageVerification.vue'),
    },
    {
      path:'/',
      name:'home',
      meta:{ 
        title: 'home',
      },
      component : ()=>import ('../views/HOME_.vue'),
    },
    {
      path:'/about-us',
      name:'about-us',
      meta:{ 
        title: 'about-us',
      },
      component : ()=>import ('../views/aboutUs.vue'),
    },
    {
      path:'/contact-us',
      name:'contact-us',
      meta:{ 
        title: 'about-us',
      },
      component : ()=>import ('../views/contactUs.vue'),
    },
    {
      path:'/blog',
      name:'blog',
      meta:{ 
        title: 'blog',
      },
      component : ()=>import ('../views/blog/blogsPage.vue'),
    },
    {
      path:'/community',
      name:'community',
      meta:{ 
        title: 'community',
      },
      component : ()=>import ('../views/community/community_.vue'),
    },
    {
      path:'/vacancy',
      name:'vacancy',
      meta:{ 
        title: 'vacancy',
      },
      component : ()=>import ('../views/career/vacancy.vue'),
    },
    {
      path:'/newsletter-unsub/:id',
      name:'newsletter-unsub',
      meta:{ 
        title: 'newsletter-unsub',
        other_info:{
          navbar: false,
          footer: false,
        }
      },
      component : ()=>import ('../views/newsletter/unsubConfirmation.vue'),
    },
    {
      path:'/newsletter-confirm/:id',
      name:'newsletter-confirm',
      meta:{ 
        title: 'newsletter-confirm',
        // other_info:{
        //   navbar: false,
        //   footer: false,
        // }
      },
      component : ()=>import ('../views/newsletter/confirmSub.vue'),
    },
    {
      path:'/:catchAll(.*)',
      name:'page-not-found',
      meta: {
        title: '404 page-not-found'
      },
      component: ()=>import ('../views/404-page-not-found.vue'),
    }
  ]
})

router.beforeEach(  (to,from,next)=>{
  console.log('beforeEach');
  // set the state of the routing and init the progress bar
  const { route_resovled } = storeToRefs(use_util_store())
  route_resovled.value = false
  progress_bar.start();

  next()
})

router.beforeResolve((to,from,next) => {
    console.log('beforeResolve'); 
    // check if we have age verified on local storage
    const ageVerifiedDate = Number(window.localStorage.getItem('ageVerifiedDate'))
    // ( new Date(1771872869398) > addDays(ageVerifiedDate,10) ) the verification has to be for 1 day only 
    if (!ageVerifiedDate && to.name != "age-verification" ) return next('/age-verification')
    if ( compareAsc( addDays (new Date(ageVerifiedDate),1 ) , new Date() ) === -1  && to.name != "age-verification" ) return next('/age-verification')
  next()
})

router.afterEach((to)=>{
  console.log('afterEach');
  // set the state of the routing
  const { route_resovled } = storeToRefs(use_util_store())
  route_resovled.value = true
  // set the page title  
  document.title = `Z | ${to.meta.title} `
  // end the progress bar
  progress_bar.done()
})

export default router