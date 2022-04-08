import countries  from "../../data/countries";

const state = {
    countries : []
}

const mutations = {
    setCountries : (state ,countries) => {
        state.countries = countries
    }
}

const actions = {
    initCoountries : ({commit}) => {
        commit('setCountries', countries)
    }
}

const getters = {
    getCountries : (state) => {
        return state.countries
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}