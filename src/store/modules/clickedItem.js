import axios from 'axios'
const state = {
    cickedItem : []
}

const mutations = {
    getClickedItem : (state ,clickedd) => {
        state.cickedItem = clickedd
    }
}

const actions = {
    getClickedItem : ({commit}) => {
        axios.get('/clickedproduct').then(res => {
            commit('getClickedItem', res.data)
        })
    }
}

const getters = {
    getItemclicked : state => {
        return state.cickedItem
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}