import React from 'react'
import LeftNavigation from '../../components/LeftNav/LeftNav'
import TableSearch from '../../assets/tabler_search.jpeg';
import Logout from '../../assets/tabler_logout.jpeg';
import Arrowleft from '../../assets/arrowLeft.jpeg';
import Arrowright from '../../assets/arrowRight.jpeg';
import Delete from '../../assets/delete.jpeg';
import Cross from '../../assets/cross.jpeg';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import s from './Products.module.css';
import {useOrder} from "../../context/OrderContext"
import { useProduct } from '../../context/ProductContext';


const Products = () => {

const navigate = useNavigate();
  
  const {logout} = useUser();
  const {products, setProducts} = useProduct();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  console.log(products);

  const handleFilterModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const handleApplyFilter = () => {
    // Implement filter logic here
  };

  const handleClearSearch = () => {
    // Toggle the filter modal to close it when clearing the search
    setShowFilterModal(false);
  };

  return (
    <div className={s.container}>
        <LeftNavigation/>

        <div className={s.rightContainer}>
        <div className={s.navigation}>
          <div className={s.navContainer}>
            <div className={s.PageName}>
              <h1 className={s.pageTitle}>Products</h1>
              <p className={s.pageText}>List View</p>
            </div>
            <div className={s.searchFilterSelectAll}>
              <div className={s.searchBarModal}>
                <div className={s.searchBar}>
                  <input
                    type="text"
                    placeholder="search"
                    className={s.searchInput}
                  />
                  <div className={s.searchIcons}>
                    <img
                      src={TableSearch}
                      className={s.searchButton}
                      alt=""
                    />
                  </div>
                </div>
                {showFilterModal && (
                  <div className={s.filterModal}>
                    <div className={s.verifiedActive}>
                      <div className={s.mainCheckBoxContainer}>
                        <label htmlFor="verified" className={s.verified}>
                          Verified user
                        </label>
                        <div className={s.checkBoxContainer}>
                          <label htmlFor="">
                            <input
                              type="radio"
                              name="verifiedYes"
                              className={s.radioInput}
                              checked={verifiedFilter}
                              onChange={() => setVerifiedFilter(true)}
                            />
                            Yes
                          </label>
                          <label htmlFor="">
                            <input
                              type="radio"
                              name="verifiedNo"
                              className={s.radioInput}
                              checked={!verifiedFilter}
                              onChange={() => setVerifiedFilter(false)}
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div className={s.mainCheckBoxContainer}>
                        <label htmlFor="active" className={s.active}>
                          User Activity
                        </label>
                        <div className={s.checkBoxContainer}>
                          <label htmlFor="">
                            <input
                              type="radio"
                              name="activeYes"
                              className={s.radioInput}
                              checked={activeFilter}
                              onChange={() => setActiveFilter(true)}
                            />
                            Active
                          </label>
                          <label htmlFor="">
                            <input
                              type="radio"
                              name="ActiveNo"
                              className={s.radioInput}
                              checked={!activeFilter}
                              onChange={() => setActiveFilter(false)}
                            />
                            InActive
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className={s.apply}>
                      <button
                        className={s.modalButton}
                        onClick={handleApplyFilter}
                      >
                        Apply filters
                      </button>
                      <img
                        src={Cross}
                        className={s.modalClearSearch}
                        onClick={handleClearSearch}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={s.utilsButtons}>
                <button className={s.btn} onClick={handleFilterModalToggle}>
                  Filter
                </button>
                <button className={s.btn}>Select all</button>
              </div>
            </div>
            <div className={s.logoutButton}>
              <img src={Delete} alt="" className={s.delete} />
              <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
            </div>
          </div>
        </div>
        <div className={s.userList}>
          <div className={s.cardTitles}>
            <div className={s.blank}></div>
            <h2 className={s.cardTitleFirstName}>Name</h2>
            <h2 className={s.cardTitleLastName}>Weight</h2>
            <h2 className={s.cardTitleEmail}>Price</h2>
          </div>
          <div className={s.cardContainer}>
            <div className={s.scrollableContainer}>
              {products && products.map((item) => (
                <div className={s.card} key={item.id}>
                  <div className={s.checkBoxAndProfile}>
                    <input
                      type="checkbox"
                      // checked={selectedUsers.includes(user.id)}
                      // onChange={() => handleSelectedUsers(user.id)}
                    />
                    <div className={s.profilePicture}>
                      <img src={item.image_url} alt="" />
                    </div>
                  </div>
                  <div
                    className={s.itemContainer}
                    // onClick={() => navigate(`/edit/${userItem.id}`)}
                  >
                    <div className={s.UserData}>
                      <p className={s.UserData1}>{item.name}</p>
                    </div>
                    <div className={s.UserData}>
                      <p className={s.UserData2}>{item.weight}</p>
                    </div>
                    <div className={s.UserDataEmail}>
                      <p className={s.UserData3}>{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.pagination}>
          <button className={s.previousPageButton}>
            <img src={Arrowleft} alt="" className={s.ArrowL} />
          </button>
          <div className={s.pageInfo}>
            <p className={s.currentPage}>page</p>
          </div>
          <button className={s.nextPageButton}>
            <img src={Arrowright} className={s.ArrowR} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products;