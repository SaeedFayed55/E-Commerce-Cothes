import axios  from "axios"
const state = {
    pants : []
}

const mutations = {
    getPants : (state , shirts) => {
        state.pants = shirts
    }
}

const actions = {
    initPants :({commit}) => {
        axios.get('/pantsmen').then(res => {
            commit('getPants' , res.data)
        })
    }
}

const getters = {
    getAllPants : (state) => {
        return state.pants
    }
}

export default {
    state,
    mutations,
    actions, 
    getters
}