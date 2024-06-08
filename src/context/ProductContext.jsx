import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/product.service";
import { toast } from 'react-hot-toast';
import API from "../api/axios.config";
import authService from "../services/auth.service";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({}); 
    const [product, setProduct] = useState(null);


    
    let response;
    
    // with this paginatiion is working fine
    useEffect(() => {
      setIsLoading(true);
      productService.getProducts(page).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, [page]);
    
   
    useEffect(() => {
      setIsLoading(true);
      productService.filterProducts(filters).then((response) => {
        toast.success("products Filterd");
        setProducts(response.data);
        setIsLoading(false);
      });
    }, [filters]);

    const getProductsById = (id) => {
      setIsLoading(true);
      console.log("inside getProduct by Id");
      productService.getProduct(id).then((response) => {
        // console.log(response.data);
        setProduct(response.data);
        // console.log(product);
        setIsLoading(false);
      });
    };

    const getProductsByName = (name) => {
      setIsLoading(true);
      console.log("inside getProduct by name");
      productService.getProductByName(name).then((response) => {
        console.log(response.data);
        setProducts([response.data]);
        console.log(products);
        setIsLoading(false);
      });
    };

    const getProductByCategory = (category) => {
      setIsLoading(true);
      productService.getProductsByCategory(category).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    };
    
    

    const getProductByMaterial = (material) => {
      setIsLoading(true);
      console.log("it is present");
      productService.getProductsByMaterialType(material).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
    }
    
    const createProduct = async (data) => {
      productService.createProduct(data).then((response) => {
        setProduct(response.data);
      })
    }

    const updateProductData = async ({ name, description, image_url, weight, material_type_name, category_name, carat }) => {
      try {
          const res = await API.put(`products/${product.product_id}`, {
              name,
              description,
              image_url,
              weight,
              category_name,
              material_type_name,
              carat
          });

          const updatedProduct = res.data; 
          setProduct(updatedProduct);
          // console.log(product);
          console.log(res);
      } catch (error) {
          // Handle the error, e.g., network request failed
          console.error("Error updating user data:", error);
      }
  };

  // delete a product
  const deleteProduct = (id) => {
    setIsLoading(true);
    productService.deleteProduct(id)
      .then(() => {
        setProducts(products.filter(product => product.product_id !== id));
        toast.success("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
        toast.error("Failed to delete product");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
