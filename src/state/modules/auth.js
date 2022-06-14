import axios from "axios";

import {registerUrl} from "../../../api/entryPoint";

export const state = {

    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null,
    isAuth: false,
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
    roles: []
}

export const mutations = {
    SET_TOKEN(state, newValue) {
        state.token = newValue
        saveState('token', newValue)
    },
    SET_TOKEN_REFRESH(state, newValue) {
        state.refreshToken = newValue
        saveState('refreshToken', newValue)
    },
    SET_IS_AUTH(state, newValue) {
        state.isAuth = newValue
    },
    SET_USER_ID(state, newValue) {
        state.userId = newValue
        saveState('userId', newValue)
    },

}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.isAuth
    },
}

export const actions = {

    // Logs out the current user.
    logOut({commit}) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        commit('SET_IS_AUTH', false)
    },
    // register user
    // eslint-disable-next-line no-unused-vars
    register({commit}, payload) {
        axios.post(registerUrl,
            {
                username: payload.firstname + "_" + payload.lastname,
                email: payload.email,
                password: payload.password,
                firstName: payload.firstname,
                lastName: payload.lastname,
            },
            {
                headers: {
                    "Content-type": "application/json",
                },
            }
        ).then((res) => {
            if (res.data.code === 200) {
                this.registerSuccess = true;
            } else {
                this.isRegisterError = true;
                this.regError = res.data.message;
            }
        })
            .catch((error) => {
                this.isRegisterError = true;
                this.regError = error.data.message;
            });
    }
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, state);
}

