// src/middleware/auth.js

import jwt_decode from 'jwt-decode'

function checkTokenValidity(token) {
    if (token) {
        const decodedToken = jwt_decode(token);
        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }
    return false
}

export default function auth({next, router}) {
    if (!localStorage.getItem('token')) {
        return router.push({name: 'login'});
    }

    // If token expired
    let token = localStorage.getItem('token');
    if (!checkTokenValidity(token)) {
        localStorage.removeItem('token')
        return router.push({name: 'login'});
    }
    return next();
}








