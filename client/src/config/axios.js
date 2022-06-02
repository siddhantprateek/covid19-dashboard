import axios from "axios";
// production URL: https://covyapp.herokuapp.com
// developement URL: http://localhost:4000
const instance = axios.create({
    baseURL: 'https://covyapp.herokuapp.com'
})

export default instance;