import axios from "axios"
const state = {
    shirts : []
}

const mutations = {

    removeShirt : (state, id) => {
        state.shirts = state.shirts.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    }
}

const actions = {

    deleteShirt : ({commit} , shirt) =>{
        axios.delete(`/shirts/${shirt.id}`).then(res=>{
            commit('removeShirt' , shirt.id)
            
        })
    },

    deleteSelectedBranches :({commit} , selectedBranches) =>{
        for(const branch in selectedBranches){
            axios.delete(`/allBranches/${branch.id}`)
        }
        commit('removeSelectedBranches', selectedBranches)
    }
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters,
}