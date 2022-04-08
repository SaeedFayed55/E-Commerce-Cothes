import axios from "axios"
const state = {
    pants : []
}

const mutations = {

    removePant : (state, id) => {
        state.pants = state.pants.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    }
}

const actions = {

    deletePant : ({commit} , pant) =>{
        axios.delete(`/pantsmen/${pant.id}`).then(res=>{
            commit('removePant' , pant.id)
            
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