import Vue from 'vue'
import Vuex from 'vuex'
import countries from './modules/countries'
import products from './modules/products'
import register from './modules/register'
import dtpro from './modules/dtproducts'
import branches from './modules/branches'
import userAuth from './modules/userAuth'
import shirts from './modules/shirts'
import adminshirts from './modules/adminshirts'
import pantsmen from './modules/pantsmen'
import adminpants from './modules/adminpants'
import currentuser from './modules/currentUser'
import order from './modules/order'
import paymentsteps from './modules/paymentSteps'
import notifications from './modules/notifications'
import clickc from './modules/clickedItem'
import confirmShirtOrder from './modules/confirmShirtOrder'
import userorders from './modules/UserOrders'
import confirmshipped from './modules/confirmShipping'
import confirmdelivered from './modules/confirmDelivered'
import timeline from './modules/timeLine'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    countries,
    products,
    register,
    dtpro,
    branches,
    userAuth,
    shirts,
    adminshirts,
    pantsmen,
    adminpants,
    currentuser,
    order,
    paymentsteps,
    notifications,
    clickc,
    confirmShirtOrder,
    userorders,
    confirmshipped,
    confirmdelivered,
    timeline
    
  }
})
