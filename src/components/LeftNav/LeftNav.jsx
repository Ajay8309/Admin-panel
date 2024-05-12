import React from 'react';
import s from './LeftNav.module.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-regular-svg-icons';
import { faGem as solidGem } from '@fortawesome/free-solid-svg-icons';
import User from '../../assets/Frame4.svg';
import UserLite from '../../assets/Frame4Lite.svg';
 
// const 


export default function LeftNavigation() {
  const location = useLocation();
  const isUsersActive = location.pathname === '/Users' || location.pathname.includes("edit");

  const isAsanasActive = location.pathname === '/orders';
//   const isWorkoutsActive = location.pathname === '/Workouts';

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
            {isAsanasActive ? (
              <img src={User} alt="" className={s.img} />
              ) : (
                <img src={UserLite} className={s.img} />
                )}
          </Link>

          <Link to="/products" className={`${s.asana} ${s.link}`}>
            {isAsanasActive ? (
              <img src={User} alt="" className={s.img} />
              ) : (
                <img src={UserLite} className={s.img} />
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