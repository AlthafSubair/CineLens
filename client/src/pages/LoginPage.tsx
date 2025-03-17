import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from "react-toastify";
import { logIn, resendOtp } from "../redux/thunk/authThunk";
import { AppDispatch, RootState } from "../redux/store";


interface formDataType{
  email: string,
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
    const validationSchema = yup.object().shape({
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
  })

  const {register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: yupResolver(validationSchema)
  })

  const {loading} = useSelector((state: RootState) => state.auth)



  const onSubmit = async (formData: formDataType) => {
    try {
      const res = await dispatch(logIn(formData));
      if (logIn.fulfilled.match(res)) {
        toast.success(res.payload.message, {
          position: "bottom-left",
          autoClose: 5000,
        });
        dispatch(login(
          {
            token: res.payload.token,
            username: res.payload.user.username,
            email: res.payload.user.email,
            avatar: res.payload.user.avatar,
            role: res.payload.user.role,
            userId: res.payload.user._id
          }
        ))
  
        reset();
       
  
          if(res.payload.user.role === 'admin') {
            navigate('/admin/dashboard')
          } else {
            navigate('/')
          }
        
      } else {
        const errorMessage = res.payload as string;
        toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 5000,
        });
        if(errorMessage === "User is not verified"){
          const email = res.meta.arg.email
        const response =  await dispatch(resendOtp({email}));
        if (resendOtp.fulfilled.match(response)) {
          toast.success(response.payload.message, {
            position: "bottom-left",
            autoClose: 5000,
          });
        }else{
          toast.error(response.payload as string, {
            position: "bottom-left",
            autoClose: 5000,
          });
        }
          navigate(`/auth/verify-otp/${email}`)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center dark:text-white text-slate-800 p-8">
      <h1 className="mt-4 text-center text-xl font-semibold">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 my-4">
          <label className="">Email</label>
          <Input type="text" placeholder="username@gmail.com" {...register("email", {required: "Email is required"})} />
          {errors.email && <p className="text-red-500 text-sm ">{errors.email.message}</p>}
        </div>
       

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" {...register("password", {required: "Password is required"})} />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 text-gray-500 cursor-pointer opacity-45"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 text-gray-500 cursor-pointer opacity-45"
              />
            )}
          </div>
        </div>
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        <div className="flex justify-end p-1">
          <Link to='/auth/forgot-password' className="mb-6 text-sm">Forgot Password?</Link>
        </div>

        <div className="">
          <Button bg="#003465" text="Sign in" color="#fff" isLoading={loading}/>
        </div>
      </form>
      

      <div className="flex my-4 mx-auto">
        <p className="text-center text-[13px]">Don't have an Account?</p> &nbsp; <Link to='/auth/signup' className="text-[13px]">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
