import { createContext, useContext, useState, useEffect } from "react";
import productService from "../services/product.service";
import { toast } from 'react-hot-toast';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [product, setProduct] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        productService.getProducts(page).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching products:', error);
            setIsLoading(false);
        });
    }, [page]);

    useEffect(() => {
        setIsLoading(true);
        productService.filterProducts(filters).then((response) => {
            toast.success("Products filtered");
            setProducts(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error filtering products:', error);
            setIsLoading(false);
        });
    }, [filters]);

    const getProductsById = (id) => {
        setIsLoading(true);
        productService.getProduct(id).then((response) => {
            setProduct(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching product by ID:', error);
            setIsLoading(false);
        });
    };

    const getProductsByName = (name) => {
        setIsLoading(true);
        productService.getProductByName(name).then((response) => {
            setProducts([response.data]);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching product by name:', error);
            setIsLoading(false);
        });
    };

    const getProductByCategory = (category) => {
        setIsLoading(true);
        productService.getProductsByCategory(category).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching products by category:', error);
            setIsLoading(false);
        });
    };

    const getProductByMaterial = (material) => {
        setIsLoading(true);
        productService.getProductsByMaterialType(material).then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching products by material:', error);
            setIsLoading(false);
        });
    };

    const createProduct = async (data) => {
        try {
            console.log(data);
            const response = await productService.createProduct(data);
            setProduct(response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    };

    const updateProductData = async (updateData) => {
        try {
            const response = await productService.updateProduct(updateData);
            setProduct(response.data);
        } catch (error) {
            console.error('Error updating product data:', error);
        }
    };

    const deleteProduct = async (id) => {
        setIsLoading(true);
        try {
            await productService.deleteProduct(id);
            setProducts(products.filter(product => product.product_id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error("Failed to delete product:", error);
            toast.error("Failed to delete product");
        } finally {
            setIsLoading(false);
        }
    };

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                isLoading,
                setIsLoading,
                page,
                setPage,
                filters,
                updateFilters,
                getProductsByName,
                getProductByCategory,
                getProductByMaterial,
                getProductsById,
                product,
                updateProductData,
                createProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

const useProduct = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

export { ProductContext, ProductProvider, useProduct };
