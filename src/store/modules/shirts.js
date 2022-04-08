import axios  from "axios"
const state = {
 shirts : []
}

const mutations = {
    getShirts : (state , shirts) => {
        state.shirts = shirts
    }
}

const actions = {
    initShirts :({commit}) => {
        axios.get('/shirts').then(res => {
            commit('getShirts' , res.data)
        })
    }
}

const getters = {
    getAllShirts : (state) => {
        return state.shirts
    }
}

export default {
    state,
    mutations,
    actions, 
    getters
}