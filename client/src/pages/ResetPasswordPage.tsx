import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { resendOtp, resetPassword } from "../redux/thunk/authThunk"
import { toast } from "react-toastify"


const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {email} = useParams()
    const {loading} = useSelector((state: RootState) => state.auth);


    const validationScehma = yup.object().shape({
        
        password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
        confirmpassword: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match"),
        otp: yup.string().required("OTP is required").min(4, "OTP must be 4 digits").max(4, "OTP must be 4 digits")
      })

    const {register,handleSubmit,reset,formState:{errors},watch} = useForm({resolver: yupResolver(validationScehma)})

const password = watch("password")
const confirmpassword = watch("confirmpassword")
const otp = watch("otp")

const [expireOtp, setExpireOtp] = useState(false)


    const onSubmit = async () => {
      if (!email) {
        toast.error("Email is missing. Please try again.", {
          position: "bottom-left",
          autoClose: 5000,
        });
        return;
      }
      try {
        const res = await dispatch(resetPassword({email,otp,password,confirmpassword}))
        if (resetPassword.fulfilled.match(res)) {
          toast.success(res.payload.message, {
            position: "bottom-left",
            autoClose: 5000,
          });
      
     
          reset();
          navigate('/auth/login')
         
  
        } else {
          const errorMessage = res.payload as string;
          toast.error(errorMessage, {
            position: "bottom-left",
            autoClose: 5000,
          });

          if(errorMessage === "OTP has expired"){
            setExpireOtp(true)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }


    const handleResendOtp = async () => {
      if (!email) {
        toast.error("Email is missing. Please try again.", {
          position: "bottom-left",
          autoClose: 5000,
        });
        return;
      }
      try {
        const res = await dispatch(resendOtp({ email }));
  
        if (resendOtp.fulfilled.match(res)) {
          toast.success(res.payload.message, {
            position: "bottom-left",
            autoClose: 5000,
          });
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
    <div className="flex flex-col justify-center text-slate-800 dark:text-white p-8">
    <h1 className="my-4 text-center text-xl font-semibold">Reset Password</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div>
    <label className="pt-4">Password</label>
    <div className="relative mt-2 mb-1">
        
    <Input type={showPassword ? "text" : "password"} placeholder="Enter Password" {...register("password")}/>
  {
    showPassword ?   <FaEyeSlash
    onClick={() => setShowPassword(!showPassword)} 
    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 opacity-45 text-gray-500 cursor-pointer" />
   : <FaEye
   onClick={() => setShowPassword(!showPassword)} 
   className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 opacity-45 text-gray-500 cursor-pointer" />
  }
  </div>
  {errors.password && <span className="text-sm text-red-700">{errors.password.message}</span>}
    </div>
  
  <div className="mt-4">
  <label className="pb-4">Confirm Password</label>
  <div className="relative mt-2 mb-1">
    <Input type={confirmShow ? "text" : "password"} placeholder="Enter Password" {...register("confirmpassword")}/>
  {
    confirmShow ?   <FaEyeSlash
    onClick={() => setConfirmShow(!confirmShow)} 
    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 opacity-45 text-gray-500 cursor-pointer" />
   : <FaEye
   onClick={() => setConfirmShow(!confirmShow)} 
   className="absolute top-1/2 right-3 -translate-y-1/2 text-xl dark:text-slate-400 opacity-45 text-gray-500 cursor-pointer" />
  }
  </div>
  </div>
  {errors.confirmpassword && <span className="text-sm text-red-700">{errors.confirmpassword.message}</span>}
  <div className="flex flex-col gap-2 my-4 mb-8">
    <label className="">Otp</label>
    <Input type="text" placeholder="Enter OTP" {...register('otp')}/>
    {errors.otp && <span className="text-sm text-red-700">{errors.otp.message}</span>}
    {
      expireOtp && <button onClick={handleResendOtp} className="text-sm text-sky-700 text-right">Resend Otp?</button>
    }
    </div>
   
    <Button bg="#003465" text="Reset Password" color="#fff" isLoading={loading}/>
    </form>
   
   
  <div className="flex my-4 mx-auto">
<Link to='/auth/login' className="text-[13px]">Back to Login</Link>
  </div>
          
      </div>
  )
}

export default ResetPasswordPage