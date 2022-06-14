import {usersDetails} from "../../../api/entryPoint";
import api from "../../services/axiosHeader.js";

export const state = {
    users: [],
    usersDetails: {},
    isLoading: true,
    isLoadingNav: true
}

export const mutations = {
    SET_USERS(state, newValue) {
        state.users = newValue
    },
    SET_USERS_DETAILS(state, newValue) {
        state.usersDetails = newValue
    },
    SET_USERS_DETAILS_NAV(state, newValue) {
        state.usersDetailsNav = newValue
    },
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload
    },
    SET_IS_LOADING_NAV(state, payload) {
        state.isLoadingNav = payload
    },
}

export const getters = {
    getUsers(state) {
        return state.users;
    },
    getUsersDetails(state) {
        return state.usersDetails;
    },
    getUsersDetailsNav(state) {
        return state.usersDetailsNav;
    },
    getIsLoading(state) {
        return state.isLoading;
    },
    getIsLoadingNav(state) {
        return state.isLoadingNav;
    },
}

export const actions = {
    // List all users
    listUsers({commit}) {
        api.get(usersDetails).then((res) => {
            commit('SET_USERS', res.data);
        }).catch((error) => {
            console.log(error);
        });
    },
    //users details
    usersDetails({commit}, payload) {
        commit('SET_IS_LOADING', true);
        api.get(usersDetails + '/' + payload).then((res) => {
            commit('SET_USERS_DETAILS', res.data[0]);
            commit('SET_IS_LOADING', false);
        }).catch((error) => {
            console.log(error);
        });
    },
//nav bar
    usersDetailsNav({commit}, payload) {
        commit('SET_IS_LOADING_NAV', true);
        api.get(usersDetails + '/' + payload).then((res) => {
            commit('SET_USERS_DETAILS_NAV', res.data[0]);
            commit('SET_IS_LOADING_NAV', false);
        }).catch((error) => {
            console.log(error);
        });
    },
    /* delete User */
    deleteUser({commit},id) {
        return api.delete(usersDetails + '/' + id);
    },
    /* Activate User */
    activateUser({commit},id) {
        return api.get(usersDetails + '/' + id + '/activate');
    },
}

