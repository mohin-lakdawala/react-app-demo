import axios from 'axios';
import {getAuthHeader, getUserInfo} from "./helper";
import {API_BASE_URL} from "./config";

class AuthService {

    login(credentials){
        return axios.post(API_BASE_URL + "login", credentials);
    }

    register(data){
        return axios.post(API_BASE_URL + "register", data);
    }

    logOut() {
        return axios.post(API_BASE_URL + 'logout', {}, getAuthHeader());
    }

    isAuthenticated() {

        if (! getUserInfo() || ! getUserInfo()['access_token']) {
            return false;
        }

        return axios.post(API_BASE_URL + 'me', {}, getAuthHeader())
            .then(res => {
                if (res.status === 200) {
                    return true;
                } else {
                    localStorage.clear();
                    return false;
                }
            })
            .catch(error => {
                localStorage.clear();
                return false;
            })
    }
}

export default new AuthService();