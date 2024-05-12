import LeftNavigation from '../../components/LeftNav/LeftNav';
import s from "./AddProduct.module.css"
import { useUser } from '../../context/UserContext';
import Logout from '../../assets/tabler_logout.jpeg';
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const { logout } = useUser();
  const { createProduct } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weight: '',
    category_name: '',
    material_type_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      setFormData({
        name: '',
        description: '',
        weight: '',
        category_name: '',
        material_type_name: ''
      });
      toast.success('Product created');
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

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
        <form
          className={s.formContainer}
          onSubmit={onSubmit}
        >
          <div>
            <div className={s.dropZone}>
              Click here to upload Image of Product
              <input
                type="file"
                name="file"
              />
            </div>
          </div>
          <div className={s.inputContainer}>
            <div>Name</div>
            <input
              type="text"
              placeholder="Enter name of the Product"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Description</div>
            <input
              type="text"
              placeholder="Enter the description for the product"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Weight</div>
            <input
              type="text"
              placeholder="Enter the weight of the product"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Category</div>
            <input
              type="text"
              placeholder="Enter the Category of the product"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
            />
          </div>
          <div className={s.inputContainer}>
            <div>Metal</div>
            <input
              type="text"
              placeholder="Enter the Metal type of the product"
              name="material_type_name"
              value={formData.material_type_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className={s.saveButton} type="submit">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct;
