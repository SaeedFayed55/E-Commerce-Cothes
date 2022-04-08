import axios from 'axios'
const state = {
    users  : []
}

const mutations = {
    getUser : (state , users) => {
        state.users = users
    }
}

const actions = {
    initUsers : ({commit}) => {
        axios.get('/users').then(res => {
            commit('getUser' , res.data)
        })
    }
}

const getters = {
    getUsers : (state) => {
        return state.users;
    },

    getCurrentUser : (state) => {
        return state.users[1]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}