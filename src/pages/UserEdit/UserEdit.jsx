import {React, useState} from 'react'
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
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
import PulseLoader from "react-spinners/PulseLoader";
import authService from '../../services/auth.service';
import AccountForm from '../../components/AccountForm/AccountForm';


const UserEdit = () => {


 const navigate = useNavigate();
  
  const {logout,  updateUserData, userData} = useUser();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSending, setIsSending] = useState(false);


//   console.log(user);

  const handleFilterModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }


  const resetPassword = () => {
    setIsSending(true);
    authService
      .forgotPassword(userData.email)
      .then((data) => {
        if (data.data.status === "OK") {
          setIsSending(false);
          toast.success("Email has been sent successfully.");
        }
      })
      .catch((error) => {
        setIsSending(false);ßß
      });
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
        {showSettings ? (
        <AccountForm userData={userData} setShowSettings={setShowSettings} />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.profileCard}>
            <div className={s.profileHeader}>
              <h3 className={s.profileTitle}>Profile</h3>
              <p className={s.profileSubtitle}>Your personal information</p>
            </div>
            <div className={s.profileContent}>
              <dl className={s.profileDetails}>
                <div className={s.profileRow}>
                  <dt>Full name</dt>
                  <dd>{userData?.fullname}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>Username</dt>
                  <dd>{userData?.username}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>Email address</dt>
                  <dd>{userData?.email}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>Password</dt>
                  <dd>
                    <Button disabled={isSending} onClick={resetPassword}>
                      {isSending ? <PulseLoader color={"#0a138b"} size={10} /> : "Reset password by email"}
                    </Button>
                  </dd>
                </div>
                <div className={s.profileRow}>
                  <dt>Address</dt>
                  <dd>{userData?.address}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>City</dt>
                  <dd>{userData?.city}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>State</dt>
                  <dd>{userData?.state}</dd>
                </div>
                <div className={s.profileRow}>
                  <dt>Country</dt>
                  <dd>{userData?.country}</dd>
                </div>
                <div className={s.profileEdit}>
                  <Button 
                  // iconRight={Edit2}
                   onClick={(e) => setShowSettings(!showSettings)}>
                    Edit
                  </Button>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
        </div>
        
      </div>
    </div>
  )
}

export default UserEdit