import jwt_decode from "jwt-decode";

const authService = {

    /* save token */
    saveToken(token) {
        window.localStorage.setItem('token', token);
    },

    /* get token */
    getToken() {
        return localStorage.getItem('token') || null;
    },

    /* remove token */
    removeToken() {
        localStorage.removeItem("token");
    },

    /* save refresh token */
    saveRefreshToken(refreshToken) {
        window.localStorage.setItem('refreshToken', refreshToken);
    },

    /* get refresh token */
    getRefreshToken() {
        return localStorage.getItem('refreshToken') || null;
    },

    /* remove Refresh token */
    removeRefreshToken() {
        localStorage.removeItem("refreshToken");
    },

    /* get decoded token */
    getDecodedToken() {
        const token = this.getToken();
        return  token ? jwt_decode(token) : null;
    },
}

export default authService;
