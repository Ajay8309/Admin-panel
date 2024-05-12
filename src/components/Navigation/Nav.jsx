import React from 'react'
import TableSearch from '../../assets/tabler_search.jpeg';
import Logout from '../../assets/tabler_logout.jpeg';
import Delete from '../../assets/delete.jpeg';
import Cross from '../../assets/cross.jpeg';
import { useUser } from '../../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import s from '../../pages/Products/Products.module.css';


const Nav = ({isProductsPage, selectAll}) => {

    const navigate = useNavigate();


    const {logout} = useUser();
//   const {products, setProducts} = useProduct();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  // console.log(isProductsPage);

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
          {selectAll && (
          <button className={s.btn}>Select all</button>
           )}
        </div>
      </div>
      <div className={s.logoutButton}>

      {/* <div className={s.newBtn}> */}
      <div className={s.logContainer}>
        <img src={Delete} alt="" className={s.delete} />
        <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
      </div>
       <Link to={'/add-product'}>
        {isProductsPage && (
            <button className={s.createNewButton}>Create New</button>
          )}
       </Link>
      </div>
      {/* </div> */}
    </div>
  </div>
  )
}

export default Nav