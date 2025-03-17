import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { registerUser } from "../redux/thunk/authThunk";
import { AppDispatch, RootState } from "../redux/store";
import { toast } from "react-toastify";

interface formDataType {
  username: string,
  email: string,
  password: string
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
})

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {loading} = useSelector((state: RootState) => state.auth);

  

  const onSubmit = async (formData: formDataType) => {
    try {
      const res = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(res)) {
        toast.success(res.payload.message, {
          position: "bottom-left",
          autoClose: 5000,
        });
        reset();
  
        const date = new Date(); // Current date and time
  
        // Add 5 minutes (5 * 60 * 1000 milliseconds)
        date.setMinutes(date.getMinutes() + 5);
  
        // Format the new time in 12-hour format
        const timeIn12hrFormat = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  
        // Save the formatted time in localStorage
        localStorage.setItem('expireTime', timeIn12hrFormat);
      
  
        // Optionally, you could save the timestamp as well for further calculations
        // localStorage.setItem('expireTimeTimestamp', date.getTime().toString());
  
        // Redirect to OTP verification page
        navigate(`/auth/verify-otp/${res.meta.arg.email}`);
      } else {
        const errorMessage = res.payload as string;
        toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="flex flex-col justify-center dark:text-white text-slate-800 p-8">
      <h1 className="mt-4 text-center text-xl font-semibold">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 my-4">
          <label>Username</label>
          <Input type="text" placeholder="username" {...register('username', { required: true })} />
          {errors.username && <span className="text-red-700 font-thin text-sm">{errors.username.message}</span>}
        </div>

        <div className="flex flex-col gap-2 my-4">
          <label>Email</label>
          <Input type="text" placeholder="example@gmail.com" {...register('email', { required: true })} />
          {errors.email && <span className="text-red-700 font-thin text-sm">{errors.email.message}</span>}
        </div>

        <label>Password</label>
        <div className="relative mt-2">
          <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" {...register('password', { required: true })} />
          
          {
            showPassword ? <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 text-gray-500 cursor-pointer opacity-45" />
              : <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 text-gray-500 cursor-pointer opacity-45" />
          }
          
        </div>
        {errors.password && <span className="text-red-700 font-thin text-sm">{errors.password.message}</span>}

        <div className="mt-8">
        <Button bg="#003465" text="Sign up" color="#fff" isLoading={loading}/>
        </div>
      </form>

    

      <div className="flex my-4 mx-auto">
        <p className="text-center text-[13px]">Already have an Account?</p> &nbsp; <Link to='/auth/login' className="text-[13px]">Login</Link>
      </div>
    </div>
  );
}

export default Register;
