import axios from 'axios'

const state = {
    orders: [],
    cartnum: 0,
    getButon : true,
}

const mutations = {
    getOrder: (state, orders) => {
        state.orders = orders
    },
    removeCart: (state, id) => {
        state.orders = state.orders.filter(val => val.id !== id)
    },

    containProduct: (state, productt) => {
        for (let product of state.orders) {
         
            if (product.order.name === productt.name) {
                console.log('yes')
                console.log(product.quantity)
                return true
            }
            else {
                console.log('no')
                return false
            }
        
    }
    },


}

const actions = {
    initOrders: ({ commit }) => {
        axios.get('/orders').then(res => {
            commit('getOrder', res.data)
        })
    },
    showSuccess: ({ commit }) => {
        this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Item is Deleted', life: 3000 });
    },
    deleteCart: ({ commit, dispatch }, cart) => {
        axios.delete(`/orders/${cart.id}`).then(res => {

            commit('removeCart', cart.id);
            dispatch('initOrders');
            this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Item is Deleted', life: 3000 });


        }).catch(error => {
            console.log("errorrR")
        })
    },
    containProduct: ({ commit }, product) => {
        commit('containProduct', product)
    }


}

const getters = {
    Orders: (state) => {
        return state.orders
    },
    getBtn : state => {
        return state.getButon
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}