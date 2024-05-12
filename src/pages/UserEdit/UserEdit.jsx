import {React, useEffect, useState} from 'react'
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import LeftNavigation from '../../components/LeftNav/LeftNav'
import s from "./UserEdit.module.css"
import Logout from '../../assets/tabler_logout.jpeg';
import { useUser } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AccountForm from '../../components/AccountForm/AccountForm';


const UserEdit = () => {

 const {id} = useParams();
 const navigate = useNavigate();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [data, setData] = useState(null);
  const { setId, logout, userById } = useUser(); 
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setId(id);
  }, [id, userById]); 
  
  // console.log(userById);
  
  const handleFilterModalToggle = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleLogout = () => {
    logout();
    toast.success("User Logged Out");
    navigate('/login');
  }
  
  const func = () => {
    toast.success("Now you can edit data")
    setShowSettings(!showSettings);
  }

  

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

        {/* <div className={s.userList}> */}
        {showSettings ? (
        <AccountForm userData={userById} setShowSettings={setShowSettings} />
      ) : (
        <div className={s.formContainer1}>
          <div className={s.profileCard}>
            
            <div className={s.formContainer}>
              <dl className={s.profileDetails}>

                <div className={s.inputContainer}>
                  <dt>Full name</dt>
                  <dd className={s.input}>{userById?.fullname}</dd>
                </div>

                <div className={s.inputContainer}>
                  <dt>Username</dt>
                  <dd className={s.input}>{userById?.username}</dd>
                </div>
                <div className={s.inputContainer}>
                  <dt>Email address</dt>
                  <dd className={s.input}>{userById?.email}</dd>
                </div>
                <div className={s.inputContainer}>
                  <dt>Address</dt>
                  <dd className={s.input}>{userById?.address}</dd>
                </div>
                <div className={s.inputContainer}>
                  <dt>City</dt>
                  <dd className={s.input}>{userById?.city}</dd>
                </div>
                <div className={s.inputContainer}>
                  <dt>State</dt>
                  <dd className={s.input}>{userById?.state}</dd>
                </div>
                <div className={s.inputContainer}>
                  <dt>Country</dt>
                  <dd className={s.input}>{userById?.country}</dd>
                </div>
                <div className={s.formEdit}>
                  <Button 
                  // iconRight={Edit2}
                  className={s.saveButton}
                   onClick={func}>
                    Edit
                  </Button>

                  <Button 
                  className={s.saveButton}
                   >
                    Delete
                  </Button>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
        </div>
        
      </div>
    // </div>
  )
}

export default UserEdit