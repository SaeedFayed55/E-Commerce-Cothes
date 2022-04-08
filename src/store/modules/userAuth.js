import axios from "axios"
const state = {
    users: []
}

const mutations = {
    getUsers: (state, users) => {
        state.users = users
    }
}

const actions = {
    initUsers: ({ commit }) => {
        axios.get('https://stock-trade-system-default-rtdb.firebaseio.com//users.json').then(res => {
            const allusers = []
            let data = res.data
            for (const key in data){
                const user = data[key]
                user.id =key
                allusers.push(user)
            }
            commit('getUsers', allusers)
        }
        )}
}


const getters = {
    getAllUsers : (state) => {
        return state.users ; 
    }
    }

export default {
        state,
        mutations,
        actions,
        getters
    }