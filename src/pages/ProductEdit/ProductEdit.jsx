import { Button } from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LeftNavigation from '../../components/LeftNav/LeftNav';
import s from "./ProductEdit.module.css";
import Logout from '../../assets/tabler_logout.jpeg';
import { useNavigate, useParams } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader";
import ProductForm from '../../components/ProductForm/ProductForm'; 
import { useProduct } from "../../context/ProductContext";
import { useUser } from "../../context/UserContext";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSettings, setShowSettings] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { getProductsById, product } = useProduct();
  const { logout } = useUser();

  useEffect(() => {
    getProductsById(id);
  }, [id]);

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
              <p className={s.pageText}>Edit Product</p>
            </div>

            <div className={s.logoutButton}>
              <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
            </div>
          </div>
        </div>

        {showSettings ? (
          <ProductForm productData={product} setShowSettings={setShowSettings} />
        ) : (
          <div className={s.formContainer1}>
            <div className={s.productRow}>
              <img src={product?.image_url} />
            </div>
            <div className={s.formContainer}>
              <div className={s.inputContainer}>
                <div>Name</div>
                <div className={s.input}>{product?.name}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Description</div>
                <div className={s.input}>{product?.description}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Weight</div>
                <div className={s.input}>{product?.weight}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Category</div>
                <div className={s.input}>{product?.category_name}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Material</div>
                <div className={s.input}>{product?.material_type_name}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Carat</div>
                <div className={s.input}>{product?.carat}</div>
              </div>

              <div className={s.formEdit}>
                <Button className={s.saveButton} onClick={() => setShowSettings(!showSettings)}>Edit</Button>
                <Button className={s.saveButton} >Delete</Button>
              </div>
            </div> 
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
