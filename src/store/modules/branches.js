import axios from "axios"
const state = {
    branches : []
}

const mutations = {
    getBranches : (state , payload) => {
        state.branches = payload 
    },

    removeBranch : (state, id) => {
        state.branches = state.branches.filter(val => val.id !== id)
    },

    removeSelectedBranches:(state, selectedBranches) =>{
        state.branches = state.branches.filter(val => !selectedBranches.includes(val))

    }
}

const actions = {
    initBranches : ({commit}) => {
        axios.get('/allBranches').then(res =>{
            console.log(res)
            commit('getBranches' , res.data)
        })
    },

    deleteBranch : ({commit} , branch) =>{
        axios.delete(`/allBranches/${branch.id}`).then(res=>{
            commit('removeBranch' , branch.id)
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
    allBranches : (state) => {
        return state.branches
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}