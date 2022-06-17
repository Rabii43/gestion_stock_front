export const SERVER_BASE_URL = "http://localhost:8005/";
export const SERVER_BASE_URL_API = SERVER_BASE_URL + "api/";
export const IMAGE_URL = SERVER_BASE_URL + "uploads/images/";


//***************** users *************************
export const usersDetails = SERVER_BASE_URL_API + 'users';

//***************** Register *********************
export const registerUrl = SERVER_BASE_URL + 'register';
//***************** login *********************
export const login = SERVER_BASE_URL + 'login';
//***************** Update Password *********************
export const updatePassword = SERVER_BASE_URL_API + 'updatePassword';

//***************** Logout File *********************
export const resetPassword = SERVER_BASE_URL + 'reset/password';
//***************** Refreche Token *********************
export const refrecheToken = SERVER_BASE_URL + 'token/refresh';

