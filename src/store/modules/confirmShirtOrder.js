import axios from "axios"
const state = {
    confirmedShirts : []
}

const mutations = {

    removeShirt : (state, id) => {
        state.confirmedShirts = state.confirmedShirts.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    },
    getConfirmedShirtss : (state , cofirmedshirts) => {
        state.confirmedShirts = cofirmedshirts
    }
}

const actions = {

    confirmOrderedShirt : ({commit,dispatch} , shirt) =>{

       
        axios.post('/confirmedShirts' , shirt).then(res => {
            axios.post('/confirmedIDs' , {id : shirt.order.id , confirmDate : shirt.confirmDate}  ).then(res => {
                axios.delete(`/pending/${shirt.id}`).then(res=>{
                    dispatch('getPendingOrder')
                    dispatch('getConfirmedShirtss')
                    dispatch("getConfirmedOrders")                   
                    commit('removeShirt' , shirt.id);
                    
                })
            })
           
        })
       
    },

    deleteSelectedBranches :({commit} , selectedBranches) =>{
        for(const branch in selectedBranches){
            axios.delete(`/allBranches/${branch.id}`)
        }
        commit('removeSelectedBranches', selectedBranches)
    },

    getConfirmedShirtss : ({commit}) => {
        axios.get('/confirmedShirts').then(res => {
            commit('getConfirmedShirtss' , res.data)
        })
    }
}

const getters = {
    getConfirmedShirts : state => {
        return state.confirmedShirts
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}