import axios from "axios"
const state = {

    users: [],
    showDailog: false,

}

const mutations = {
    showDailog: (state) => {
        state.showDailog = true;
    },

    toggleDialog : (state) => {
        state.showDailog = !state.showDailog
    }
}

const actions = {
    signUser: ({ commit }, payload) => {
        axios.post('/users', payload)
            .then(res => {
                commit('showDailog')
                console.log("posted " + payload);
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    },

    toggleDialog : ({commit}) => {
        commit('toggleDialog')
    }


}

const getters = {
    getDialog: (state) => {
        return state.showDailog
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}