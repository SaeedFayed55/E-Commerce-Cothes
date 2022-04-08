import order from './order'
const state = {
    activeStep: 'personal',
    isAdress: true,
    isDelivery: false,
    isPay: false,
    isConfirm: false,
    addressInfo: {},
    DeliverInfo: {},
    paymentInfo: {},
    confirmPay: {},
    orr: order

}

const mutations = {

    personalInfo: (state) => {
        state.activeStep = "personal";
        state.isAdress = true;
        state.isConfirm = false;
        state.isDelivery = false;
        state.isPay = false;

    },

    confirmpay: (state) => {
        state.activeStep = "confirmpay";
        state.isAdress = false;
        state.isConfirm = true;
        state.isDelivery = false;
        state.isPay = false;
    },
    deliveryData: (state) => {
        state.activeStep = "delivery";
        state.isAdress = false;
        state.isConfirm = false;
        state.isDelivery = true;
        state.isPay = false;
    },
    paymentData: (state) => {
        state.activeStep = "payment";
        state.isAdress = false;
        state.isConfirm = false;
        state.isDelivery = false;
        state.isPay = true;
    },

    saveAddressInfo: (state, info) => {
        state.addressInfo = info
    },
    saveDeliverInfo: (state, info) => {
        state.DeliverInfo = info
    },
    savePaymentInfo: (state, info) => {
        state.paymentInfo = info
    },
    confirmPayInfo: (state) => {
        let payInfo = Object.assign(state.addressInfo, state.DeliverInfo, state.paymentInfo);
        state.confirmPay = payInfo
    }
}

const actions = {

    deliveryData: ({ commit }) => {
        commit('deliveryData')
    },
    confirmpay: ({ commit }) => {
        commit('confirmpay')
    },
    paymentData: ({ commit }) => {
        commit('paymentData')
    },
    personalInfo: ({ commit }, info) => {
        commit('personalInfo', info)
    },

    saveAddressInfo: ({ commit }, info) => {
        commit('saveAddressInfo', info)
    },
    saveDeliverInfo: ({ commit }, info) => {
        commit('saveDeliverInfo', info)
    },
    savePaymentInfo: ({ commit }, info) => {
        commit('savePaymentInfo', info)
    },
    confirmPayInfo: ({ commit }) => {
        commit('confirmPayInfo')
    }

}

const getters = {
    getActiveStep: state => {
        return state.activeStep
    },
    isAdress: state => {
        return state.isAdress;
    },
    isDelivery: state => {
        return state.isDelivery;
    },
    isPay: state => {
        return state.isPay;
    },
    isConfirm: state => {
        return state.isConfirm;
    },
    getAd: (state) => {
        return state.addressInfo
    },
    getConfirmPay: state => {
        return state.confirmPay;
    },
    getDeliverInfo: state => {
        return state.DeliverInfo;
    },
    getOrderex: state => {
        console.log(state.orr.state.orders)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}