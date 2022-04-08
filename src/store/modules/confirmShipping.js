import axios from "axios"
const state = {
    ShippedShirts : []
}

const mutations = {

    removeShirt : (state, id) => {
        state.ShippedShirts = state.ShippedShirts.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    },
    getShippedShirtss : (state , shiipedshirts) => {
        state.ShippedShirts = shiipedshirts
    }
}

const actions = {

    confirmShippingShirt : ({commit , dispatch} , shirt) =>{
        axios.post('/shipped' , shirt).then(res => {
            axios.post('/shippedIDs' , { id: shirt.order.id , shippedDate : shirt.shippedDate}).then(res =>{
                axios.delete(`/confirmedShirts/${shirt.id}`).then(res=>{
                    dispatch("getConfirmedShirtss")
                    dispatch("getShippedShirtss")
                    dispatch("getShippedOrders")
                    commit('removeShirt' , shirt.id)
                    
                })
            })
           
        })
       
    },

    

    getShippedShirtss : ({commit}) => {
        axios.get('/shipped').then(res => {
            commit('getShippedShirtss' , res.data)
        })
    }
}

const getters = {
    getShippedShirts : state => {
        return state.ShippedShirts
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}