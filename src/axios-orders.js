import axios from 'axios'

const instance  = axios.create({
    baseURL: 'https://burger-builder-d3c6f.firebaseio.com'
});

export default instance;