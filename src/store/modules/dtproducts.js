import axios from 'axios'
const state = {
    userTypes: [],
    userTypesJson: [],
}

const mutations = {

    //firebase
    // getdtuserTypes: (state, userTypess) => {
    //     let usersType = []
    //     for (let key in userTypess) {
    //         const userType = userTypess[key]
    //         usersType.push(userType)
    //     }
    //     state.userTypes = usersType

    // },
    //firebase

    getJsonTypes: (state, userTypes) => {
        state.userTypesJson = userTypes
    },

    removeUserType: (state, id) => {
        state.userTypesJson = state.userTypesJson.filter((val) => { val.id !== id })
        console.log(id)
    },

    removeSelectedUsertype: (state, selectedusertypes) => {
        const delArr = state.userTypesJson.filter(val => selectedusertypes.includes(val))
        delArr.forEach(function (item, index, state) {
            if (item.id === selectedusertypes.id) { state.userTypesJson.splice(index, 1) }
        })
        console.log("del arr", delArr)
        console.log(typeof (delArr))
        console.log("needed ", state.userTypesJson)
        return state.userTypesJson
    },

    
}

const actions = {
    //firebase
    // initdtuserTypes: ({ commit }) => {
    //     axios.get('/usertypes.json')
    //         .then(res => {
    //             console.log(res)
    //             commit('getdtuserTypes', res.data)
    //         }).catch(error => {
    //             console.log("get error")
    //             console.log(error)
    //         })
    // },
    //firebase

    initjsonUserTypes: ({ commit }) => {
        axios.get('/usertypes').then(res => {
            commit('getJsonTypes', res.data)
        })
    },

    deleteUserType: ({ commit }, userType) => {
        axios.delete(`/usertypes/${userType.id}`)
        commit('removeUserType', userType.id)
    },

    deleteSelectedUserType: ({ commit }, selectedUser) => {
        axios.delete(`/usertypes/${selectedUser}`)
        commit('removeSelectedUsertype', selectedUser)
    }
}

const getters = {
    getdtProducts: (state) => {
        return state.userTypes
    },

    getJsonTypes: (state) => {
        return state.userTypesJson;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}