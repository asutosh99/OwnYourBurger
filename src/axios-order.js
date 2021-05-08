import axios from 'axios';

const instance =axios.create({
    baseURL:'https://burger2-876e0-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;