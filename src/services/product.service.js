import API from "../api/axios.config";

class ProductService {
    getProducts(page) {
        return API.get(`/products/?page=${page}`);
    }

    getProduct(id) {
        return API.get(`/products/${id}`);
    }

    getProductByName(name) {
        return API.get(`/products/name/${name}`);
    }

    getProductsByCategory(category) {
        return API.get(`/products/category/${category}`);
    }

    getProductsByMaterialType(materialType) {
        return API.get(`/products/Material/${materialType}`);
    }

    createProduct(data) {
        // Ensure `data` is an instance of FormData
        if (data instanceof FormData) {
            for (let [key, value] of data.entries()) {
                console.log(`${key}: ${value}`);
            }
        } else {
            console.log('Data is not a FormData instance');
        }
        
        console.log(data)
            return API.post('/products', data);
       
    }

    filterProducts(filters) {
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== undefined && value !== '')
        );

        const queryString = Object.keys(filteredFilters)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredFilters[key])}`)
            .join('&');

        return API.get(`/products/filter?${queryString}`);
    }

    deleteProduct(id) {
        return API.delete(`/products/${id}`);
    }

    // Add the missing updateProduct function
    updateProduct(updateData) {
        return API.put(`/products/${updateData.product_id}`, updateData);
    }
}

export default new ProductService();
