import { createStore } from 'vuex'
import { auth } from "./auth.module"
import {utils} from "./utils.module"

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        utils
    }
})
