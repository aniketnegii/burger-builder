import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-project21-default-rtdb.firebaseio.com/'
});

export default instance;