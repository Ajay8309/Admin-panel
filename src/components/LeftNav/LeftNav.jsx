import React from 'react';
import s from './LeftNav.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-regular-svg-icons';
import { faGem as solidGem } from '@fortawesome/free-solid-svg-icons';
import User from '../../assets/Frame4.svg';
import lightOrder from "../../assets/lightOrder.png"
import darkOrder from "../../assets/darkOrder.png"
import { IoBagHandle } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import UserLite from '../../assets/Frame4Lite.svg';
import { BsBoxSeamFill } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";

 
// const 


export default function LeftNavigation() {
  const location = useLocation();
  const isUsersActive = location.pathname === '/' || location.pathname.includes("/edit/");

  const isOrderActive = location.pathname === '/orders';
  const isProductActive = location.pathname === '/products';

  return (
    <div>
      <div className={s.leftNav}>
        <div className={s.links}>
          <Link to="/" className={`${s.user} ${s.link}`}>
            {isUsersActive ? (
              <img src={User} alt="" className={s.img} />
            ) : (
              <img src={UserLite} className={s.img} />
            )}
          </Link>

          <Link to="/orders" className={`${s.asana} ${s.link}`}>
            {isOrderActive ? (
              <IoBagHandle size={38} color='black'  className={s.img}/>
              ) : (
                <IoBagHandleOutline color='black' size={38} />
                )}
          </Link>

          <Link to="/products" className={`${s.asana} ${s.link}`}>
            {isProductActive ? (
              <BsBoxSeamFill color='black' size={35} className={s.img} />
              ) : (
              <BsBoxSeam color='black' name='Products' size={35} className={s.img} />
            )}
          </Link>

        
        </div>

        <div className={s.logo}>
          <h3>Shringar</h3>
        </div>
      </div>
    </div>
  );
}