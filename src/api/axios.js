import axios from "axios";

export default axios.create({
    baseURL: 'https://rewardof.pythonanywhere.com',
    // baseURL: 'http://127.0.0.1:8000',
});