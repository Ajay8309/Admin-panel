import React, { useState, useEffect } from "react";
import { Button } from "@windmill/react-ui";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LeftNavigation from '../../components/LeftNav/LeftNav';
import s from "./OrderDetails.module.css";
import Logout from '../../assets/tabler_logout.jpeg';
import { useProduct } from "../../context/ProductContext";
import { useUser } from "../../context/UserContext";
import { Card, CardBody } from "@windmill/react-ui";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useOrder } from "../../context/OrderContext";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSettings, setShowSettings] = useState(false);
  const { getProductsById, product } = useProduct();
  const { logout } = useUser();
  const { state } = useLocation();
  const [orderData, setOrderData] = useState(state.order);

  useEffect(() => {
    getProductsById(id);
  }, [id]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formattedPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const updateOrderStatus = (status) => {
    setOrderData((prevOrder) => ({
      ...prevOrder,
      status,
    }));
  };

  return (
    <div className={s.container}>
      <LeftNavigation />

      <div className={s.rightContainer}>
        <div className={s.navigation}>
          <div className={s.navContainer}>
            <div className={s.PageName}>
              <h1 className={s.pageTitle}>Order Details</h1>
              <p className={s.pageText}>Update Status</p>
            </div>

            <div className={s.logoutButton}>
              <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
            </div>
          </div>
        </div>

        {showSettings ? (
          <OrderForm orderData={orderData} setShowSettings={setShowSettings} updateOrderStatus={updateOrderStatus} />
        ) : (
          <div className={s.formContainer1}>
            <div className={s.formContainer}>
              <div className={s.inputContainer}>
                <div>Order Amount</div>
                <div className={s.input}>{orderData?.amount}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Email</div>
                <div className={s.input}>{orderData?.user_email}</div>
              </div>

              <div className={s.inputContainer}>
                <div>FullName</div>
                <div className={s.input}>{orderData?.user_fullname}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Date</div>
                <div className={s.input}>{orderData?.date}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Status</div>
                <div className={s.input}>{orderData?.status}</div>
              </div>

              <div className={s.inputContainer}>
                <div>Products</div>
                <div className={s.cardWrapper}>
                  {orderData.products?.map((product) => (
                    <Card key={product.product_id} className={s.card}>
                      <img
                        className={s.cardImage}
                        loading="lazy"
                        decoding="async"
                        src={product.product_image_url}
                        alt={product.product_name}
                      />
                      <CardBody className={s.cardBody}>
                        <h1 className={s.itemName}>{product.product_name}</h1>
                        <p className={s.itemPrice}>{formattedPrice(product.product_price)}</p>
                        <p className={s.itemDescription}>{product.product_description}</p>
                        <p className={s.itemQuantity}>Quantity: {product.quantity}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              <div className={s.formEdit}>
                <Button className={s.saveButton} onClick={() => setShowSettings(!showSettings)}>Edit</Button>
                <Button className={s.saveButton}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
