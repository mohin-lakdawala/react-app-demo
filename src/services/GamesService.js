import axios from 'axios';
import {getAuthHeader} from "./helper";
import {API_BASE_URL} from "./config";


class GamesService {
    list() {
        return axios.get(API_BASE_URL + 'games', getAuthHeader());
    }

    start() {
        console.log('game start');
        return axios.post(API_BASE_URL + 'games', {}, getAuthHeader());
    }

    finishGame({ playerLife, dragonLife, logs }, gameId) {
        return axios.patch(API_BASE_URL + `games/${gameId}`, {
            playerLife, dragonLife, logs
        }, getAuthHeader());
    }
}

export default new GamesService();