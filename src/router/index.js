import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import MenPants from '../views/Menpants.vue'
import adminusertypes from '../views/adminusertype.vue'
import branches from '../views/Branches.vue'
import shirts from '../views/shirts.vue'
import adminshirt from '../views/adminShirts.vue'
import adminpants from '../views/adminPants.vue'
import anotherlog from '../views/anotherlogin.vue'
import cart from '../views/cart.vue'
import manager from '../components/studycomponents/manager.vue'
import paySteps from '../views/steps.vue'
import orderDetails from '../views/orderDetails.vue'
import confirmshirts from '../views/AdminConfirmShirts.vue'
import traking from '../views/ordertrack.vue'
import userOrder from '../views/userOrder.vue'
import shipping from '../views/Shipping.vue'
import delivery from '../views/Delivered.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/confirmdelivery',
    name: 'delivery',
    component: delivery,
  },
  {
    path: '/confirmshipping',
    name: 'shipping',
    component: shipping,
  },
  {
    path: '/orders',
    name: 'userOrder',
    component: userOrder,
  },
  
  {
    path: '/order/:productName',
    name: 'trackorder',
    props: true,
    component: traking,

  },
  {
    path: '/confirmshirts',
    name: 'confirmshirts',
    component: confirmshirts,
  },

  {
    path: '/manager',
    name: 'manager',
    component: manager
  },

  {
    path: '/payment',
    name: 'payment',
    component: paySteps
  },

  {
    path: '/',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/another',
    name: 'anotherlog',
    component: anotherlog
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/menpants',
    name: 'MenPants',
    component: MenPants
  },
  {
    path: '/adminshirts',
    name: 'adminshirts',
    component: adminshirt
  },
  {
    path: '/adminpants',
    name: 'adminpants',
    component: adminpants
  },

  
  {
    path : '/:pname/:id/details',
    component : orderDetails,
    name : 'details',  
    props : true
    
  },
  {
    path: '/shirts',
   
    component: shirts,
    children : [
      {
        path : '',
        component: shirts
      },
      
    ]
   
  },
  {
    path :"*" , redirect : '/home'
  },
  {
    path: '/branches',
    name: 'branches',
    component: branches
  },

  {
    path: '/usertypes',
    name: 'adminusertype',
    component: adminusertypes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  

  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
