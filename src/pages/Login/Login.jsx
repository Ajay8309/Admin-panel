import { useState } from 'react';
import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import authService from '../../services/auth.service';
import React from 'react';

import s from './Login.module.css';

const Login = () => {
  const { isLoggedIn, setUserState } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      const userData = await authService.loginAdmin(email, password);
      toast.success("Login successful 🔓");
      setUserState(userData);
      setRedirectToReferrer(true);
    } catch (error) {
      setIsLoading(false);
      toast.error("Enter correct credentials");
      const errorMessage = error.response?.data.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  if (redirectToReferrer || isLoggedIn) {
    return <Navigate to={state?.from || "/"} />;
  }

  return (
    <div className={s.container}>
      <div className={s.heading}>
        <h1>Admin Panel</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={s.inputForm}>
        <div className={s.input1Box}>
          <p className={s.label}>Email Address</p>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your Email"
            className={s.input1}
          />
        </div>

        <div className={s.input2Box}>
          <p className={s.label}>Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your Password"
            className={s.input2}
          />
        </div>

        <button type="submit" disabled={isLoading} className={s.submitBtn}>
          {isLoading ? <PulseLoader color={"#0a138b"} size={10} loading /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
