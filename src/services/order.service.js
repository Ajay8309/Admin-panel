import API from "../api/axios.config"

class OrderService {
    createOrder(amount, itemTotal, ref, paymentMethod) {
        return API.post("/order/create", {
            amount, 
            itemTotal, 
            ref, 
            paymentMethod
        });
    }

    getAllOrders(page) {
        return API.get(`/order/?page=${page}`);
    }

    getAll(page) {
        return API.get(`/order/getAll/?page=${page}`);
    }

    getOrder(id) {
        return API.get(`/order/${id}`);
    }

    updateOrderStatus({id, status}) {
        console.log(id);
        return API.put(`/order/${id}`, {
            status
        });
    }
}

export default new OrderService();