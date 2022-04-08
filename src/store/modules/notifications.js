import axios from 'axios'
const state = {
    userInfo : {},
    orderInfo : {},
    sumbmitedOrder : [],
    pending : [],
}

const mutations = {
    getUserInfo : (state , userinfo) => {
        state.userInfo = userinfo
    },
    getOrderInfo : (state , orderinfo) => {
        state.orderInfo = orderinfo
    },

    getSumbmitedOrder : state => {
        state.sumbmitedOrder = state.sumbmitedOrder.push(state.userInfo , state.orderInfo)
    },
    getPendingOrder : (state , pending) => {
        state.pending = pending
    }
}

const actions = {
    getUserInfo : ({commit}) =>{
        axios.get('/purchase').then(res => {
            commit('getUserInfo' , res.data)
        }).catch(error => {
            console.log(error)
        })
    },
    getOrderInfo : ({commit}) =>{
        axios.get('/suborder').then(res => {
            commit('getOrderInfo' , res.data)
        }).catch(error => {
            console.log(error)
        })
    },
    getSumbmitedOrder : ({commit}) => {
        commit('getSumbmitedOrder')
    },

    getPendingOrder : ({commit}) => {
        axios.get('/pending').then(res => {
            commit('getPendingOrder' , res.data)

        })
    }
}

const getters = {
    getSumbmitedUserData : state => {
        return state.userInfo
    },
    getSumbmitedOrderData : state => {
        return state.orderInfo
    },

    getSubmit : state => {
        return state.sumbmitedOrder
    },
    getPendingOrderG : state => {
        return state.pending
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}