import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8000/api/';

class GamesService {
    list() {
        return axios.get(USER_API_BASE_URL + 'games', this.getAuthHeader());
    }

    start() {
        console.log('game start');
        return axios.post(USER_API_BASE_URL + 'games', {}, this.getAuthHeader());
    }

    finishGame({ playerLife, dragonLife, logs }, gameId) {
        return axios.patch(USER_API_BASE_URL + `games/${gameId}`, {
            playerLife, dragonLife, logs
        }, this.getAuthHeader());
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return { headers: { Authorization: `Bearer ${this.getUserInfo()['access_token']}` }};
    }
}

export default new GamesService();