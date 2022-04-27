import axios from "axios";

export default axios.create({
    baseURL: 'https://trainresapp.herokuapp.com',
});