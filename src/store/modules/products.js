import products from '../../data/prouducts'

const state = {
    products : []
}

const mutations = {

    getProducts : (state , products) => {
        state.products = products
    }
}

const actions = {
    initProducts: ({commit}) => {
        commit('getProducts' , products)
    }

}

const getters = {
    getAllProducts : (state) => {
        return state.products
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}