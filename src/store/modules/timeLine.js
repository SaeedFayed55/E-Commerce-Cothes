import axios  from "axios";

const state = {
    confirmOrder : [],
    shippedOrder : [],
    deliveredOrder : [],
}

const mutations = {

    getConfirmedOrders : (state , confirmed) => {
        state.confirmOrder = confirmed
    },

    getShippedOrders : (state, shipped) => {
        state.shippedOrder = shipped
    },

    getDeliveredOrders : (state , delivred) => {
        state.deliveredOrder = delivred
    },

}

const actions = {
    getConfirmedOrders : ({commit}) => {
        axios.get('/confirmedIDs').then(res => {
            commit('getConfirmedOrders' , res.data)
        })
    },

    getShippedOrders : ({commit}) => {
        axios.get('/shippedIDs').then(res => {
            commit('getShippedOrders' , res.data)
        })
    },

    getDeliveredOrders : ({commit}) => {
        axios.get('/deliveredIDs').then(res => {
            commit('getDeliveredOrders' , res.data)
        })
    },
}

const getters = {
    getConfirmed : state => {
        return state.confirmOrder
    },

    getShipped : state => {
        return state.shippedOrder
    },

    getDelivered : state => {
        return state.deliveredOrder
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
