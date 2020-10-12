import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8000/api/';

class AuthService {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "login", credentials);
    }

    register(data){
        return axios.post(USER_API_BASE_URL + "register", data);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return { headers: { Authorization: `Bearer ${this.getUserInfo()['access_token']}` }};
    }

    logOut() {
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }

    isAuthenticated() {

        if (! this.getUserInfo() || ! this.getUserInfo()['access_token']) {
            return false;
        }

        return axios.post(USER_API_BASE_URL + 'me', {}, this.getAuthHeader())
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