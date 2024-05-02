import API from "../api/axios.config";

class userService {

    getUsers() {
        return API.get(`/user`);
      }

    getUserById(id) {
        return API.get(`/user/${id}`);
    }  

//    deleteUser(id) {

//    }

}

export default new userService();