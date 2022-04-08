import axios from 'axios'

const state = {
    orderss: [],
    
}

const mutations = {
    getOrderr: (state, orders) => {
        state.orderss = orders
    },
  

}

const actions = {
    initUserOrders: ({ commit }) => {
        axios.get('/originaluserOrder').then(res => {
            commit('getOrderr', res.data)
        })
    }

}

const getters = {
    UserOrders: (state) => {
        return state.orderss
    },
  

}

export default {
    state,
    mutations,
    actions,
    getters
}