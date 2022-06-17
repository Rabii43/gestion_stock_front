import axios from "axios";
import {refrecheToken} from "../../api/entryPoint";
import Vue from "vue";
import router from "@/router";
import authService from "@/services/authenticationService";

const api = axios.create({
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalConfig = error.config;
        if (error.response) {
            // Access Token was expired
            if (error.response.status === 403) {
                router.replace({
                    path: "/login",
                    query: {redirect: router.currentRoute.fullPath}
                });
            } else if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                api.post(refrecheToken,
                    {"refresh_token": localStorage.getItem('refreshToken')}).then(
                    (res) => {
                        authService.saveToken(res.data.token);
                        authService.saveRefreshToken(res.data.refresh_token);
                        window.location.reload();
                    },
                    (err) => {
                        originalConfig._retry = true;
                        return Promise.reject(err);
                    }
                );
            }
        }
        return Promise.reject(error);
    }
);

/* interceptors Axios */
Vue.prototype.$http = api;
api.defaults.timeout = 10000;

api.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("token")) {
            const token = "Bearer " + localStorage.getItem("token");
            if (token) {
                config.headers.common["Authorization"] = token;
            }
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;