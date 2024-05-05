import React, { useState } from 'react';
import LeftNavigation from '../../components/LeftNav/LeftNav';
import s from './User.module.css';
import TableSearch from '../../assets/tabler_search.jpeg';
import Logout from '../../assets/tabler_logout.jpeg';
import Arrowleft from '../../assets/arrowLeft.jpeg';
import Arrowright from '../../assets/arrowRight.jpeg';
import Delete from '../../assets/delete.jpeg';
import Cross from '../../assets/cross.jpeg';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

// Navigate

const User = () => {

  const navigate = useNavigate();
  
  const {logout, user, setUser} = useUser();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

  const [cnt, setCnt] = useState(0);

  setCnt(cnt + 1);

  console.log(cnt);

  console.log(user);

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
      <LeftNavigation />
      <div className={s.rightContainer}>
        <div className={s.navigation}>
          <div className={s.navContainer}>
            <div className={s.PageName}>
              <h1 className={s.pageTitle}>Users</h1>
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
            <h2 className={s.cardTitleFirstName}>First Name</h2>
            <h2 className={s.cardTitleLastName}>Last Name</h2>
            <h2 className={s.cardTitleEmail}>Email</h2>
          </div>
          <div className={s.cardContainer}>
            <div className={s.scrollableContainer}>
              {user && user.map((user) => (
                <div className={s.card} key={user.id}>
                  <div className={s.checkBoxAndProfile}>
                    <input
                      type="checkbox"
                      // checked={selectedUsers.includes(user.id)}
                      // onChange={() => handleSelectedUsers(user.id)}
                    />
                    <div className={s.profilePicture}>
                      {/* <img src={Elipse} alt="" /> */}
                    </div>
                  </div>
                  <div
                    className={s.itemContainer}
                    onClick={() => navigate(`/edit/${user.user_id}`)}
                  >
                    <div className={s.UserData}>
                      <p className={s.UserData1}>{user.username}</p>
                    </div>
                    <div className={s.UserData}>
                      <p className={s.UserData2}>{user.fullname}</p>
                    </div>
                    <div className={s.UserDataEmail}>
                      <p className={s.UserData3}>{user.email}</p>
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
  );
};

export default User;
