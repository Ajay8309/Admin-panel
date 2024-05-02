import {React, useState} from 'react'
import LeftNavigation from '../../components/LeftNav/LeftNav'
import s from "./UserEdit.module.css"
import TableSearch from '../../assets/tabler_search.jpeg';
import Logout from '../../assets/tabler_logout.jpeg';
import Arrowleft from '../../assets/arrowLeft.jpeg';
import Arrowright from '../../assets/arrowRight.jpeg';
import Delete from '../../assets/delete.jpeg';
import Cross from '../../assets/cross.jpeg';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


const UserEdit = () => {


 const navigate = useNavigate();
  
  const {logout} = useUser();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);

//   console.log(user);

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
              <h1 className={s.pageTitle}>Users</h1>
              <p className={s.pageText}>List View</p>
            </div>
            
            <div className={s.logoutButton}>
              <img src={Logout} alt="" className={s.imgBtn} onClick={handleLogout} />
            </div>
          </div>
        </div>

        <div className={s.userList}>
         
        </div>
        
      </div>
    </div>
  )
}

export default UserEdit