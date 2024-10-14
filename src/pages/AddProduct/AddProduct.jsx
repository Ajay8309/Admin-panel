import LeftNavigation from '../../components/LeftNav/LeftNav';
import s from "./AddProduct.module.css";
import { useUser } from '../../context/UserContext';
import Logout from '../../assets/tabler_logout.jpeg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { toast } from 'react-hot-toast';
import API from '../../api/axios.config';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
  const { logout } = useUser();
  const { createProduct } = useProduct();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      weight: '',
      category_name: '',
      material_type_name: '',
      image_url: null, // Keep the default value for the image field as null
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append image file if selected
    if (data.image_url && data.image_url[0]) {
        formData.append('image_url', data.image_url[0]); // Binary format
    }

    // Append other form fields as strings
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('weight', String(data.weight));  // Ensure it's a string
    formData.append('category_name', data.category_name);
    formData.append('material_type_name', data.material_type_name);

    try {
        await createProduct(formData);
        reset();
        toast.success('Product created successfully');
        navigate('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        toast.error('Error creating product');
    }
};


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={s.container}>
      <LeftNavigation />
      <div className={s.rightContainer}>
        <div className={s.navigation}>
          <div className={s.navContainer}>
            <div className={s.PageName}>
              <h1 className={s.pageTitle}>Products</h1>
              <p className={s.pageText}>Create New</p>
            </div>
            <div className={s.logoutButton}>
              <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
            </div>
          </div>
        </div>
        <form className={s.formContainer} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <div className={s.dropZone}>
              Click here to upload Image of Product
              <input type="file" {...register('image_url', { required: true })} />
            </div>
          </div>
          <div className={s.inputContainer}>
            <div>Name</div>
            <input
              type="text"
              placeholder="Enter name of the Product"
              {...register('name')}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Description</div>
            <input
              type="text"
              placeholder="Enter the description for the product"
              {...register('description')}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Weight</div>
            <input
              type="text"
              placeholder="Enter the weight of the product"
              {...register('weight')}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Category</div>
            <input
              type="text"
              placeholder="Enter the Category of the product"
              {...register('category_name')}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Metal</div>
            <input
              type="text"
              placeholder="Enter the Metal type of the product"
              {...register('material_type_name')}
            />
          </div>
          <div>
            <button className={s.saveButton} type="submit">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
