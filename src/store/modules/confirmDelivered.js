import axios from "axios"
const state = {
    DeliveredShirts : [],
    cancelledOrders : []
}

const mutations = {

    removeShirt : (state, id) => {
        state.DeliveredShirts = state.DeliveredShirts.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    },
    getdeliveredShirtss : (state , deliveredShirts) => {
        state.DeliveredShirts = deliveredShirts
    },

    getCancelledOr : (state , cancelledOrders) => {
        state.cancelledOrders = cancelledOrders
    }
}

const actions = {

    confirmDeliveredShirt : ({commit , dispatch} , shirt) =>{
        axios.post('/delivered' , shirt).then(res => {
            axios.post('/deliveredIDs' , {id : shirt.order.id , deleliverDate : shirt.deleliverDate}).then(res=> {
                axios.delete(`/shipped/${shirt.id}`).then(res=>{
                 
                        dispatch("getdeliveredShirtss")
                        dispatch("getShippedShirtss")
                        dispatch("getDeliveredOrders")
                        commit('removeShirt' , shirt.id)
                    })
               
            })
           
        })
       
    },

    cancelOrder : ({commit, dispatch}, shirt) => {
        axios.post('/cancelledOrders' , shirt).then(res => {
                axios.delete(`/shipped/${shirt.id}`).then(res=>{
                    axios.delete(`/originaluserOrder/${shirt.id}`).then(res =>{
                    dispatch("getdeliveredShirtss")
                    dispatch("getShippedShirtss")
                    dispatch("getDeliveredOrders")
                    dispatch('getCancelledOrders')
                    dispatch('initUserOrders')
                    commit('removeShirt' , shirt.id)
                    
                })
            })
            
           
        })
    },

    

    getdeliveredShirtss : ({commit}) => {
        axios.get('/delivered').then(res => {
            commit('getdeliveredShirtss' , res.data)
        })
    },

    getCancelledOrders : ({commit}) => {
        axios.get('/cancelledOrders').then(res => {
            commit('getCancelledOr',res.data)
        })
    }
}

const getters = {
    getDeliveredShirts : state => {
        return state.DeliveredShirts
    },

    getAllCancelledOrders : state => {
        return state.cancelledOrders
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}