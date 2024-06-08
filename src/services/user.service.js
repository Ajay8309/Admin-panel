import API from "../api/axios.config";

class userService {


    getUsers(page) {
        return API.get(`/user/?page=${page}`);
      }  

    getUserById(id) {
        return API.get(`/user/${id}`);
    }  



}

export default new userService();