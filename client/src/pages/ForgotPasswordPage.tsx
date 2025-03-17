import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { forgotpassword } from "../redux/thunk/authThunk";
import { toast } from "react-toastify";

interface formDataType {
  email: string
}

const ForgotPasswordPage = () => {

  const validationScehma = yup.object().shape({
    email:  yup.string().required("Email is required").email("Invalid email"),
  })

  const {register,handleSubmit,reset, formState: {errors}} = useForm({
    resolver: yupResolver(validationScehma)
  })

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const {loading} = useSelector((state: RootState) => state.auth);

  const onSubmit = async(formData: formDataType) => {
    try {
      const res = await dispatch(forgotpassword(formData));
      if (forgotpassword.fulfilled.match(res)) {
        toast.success(res.payload.message, {
          position: "bottom-left",
          autoClose: 5000,
        })
      
        reset();
        navigate(`/auth/reset-password/${res.meta.arg.email}`)
      
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
  }

  return (
    <div className="flex flex-col justify-center dark:text-white text-slate-800 p-8 ">
    <h1 className="mt-4 text-center text-xl font-semibold">Forgot password</h1>

    <div className="mt-6 mb-3 flex flex-row gap-4 justify-center items-center text-gray-600 dark:text-slate-200">
        <MdLock className="sm:text-4xl text-6xl"/>
        <p className="text-justify text-[16px]">Enter your email address and we'll send <br className="sm:block hidden"/> you a otp to reset your password.</p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-2 my-4">
    <label className="">Email</label>
    <Input type="text" placeholder="username@gmail.com" {...register('email',{required:true})}/>
    {errors.email && <span className="text-red-800 text-sm text-center">{errors.email.message}</span>}
    </div>  
    <Button bg="#003465" text="Continue" color="#fff" isLoading={loading}/>
    </form>
   
    <div className="flex my-4 mx-auto">
<p className="text-center text-[13px]">Don't have an Account?</p> &nbsp; <Link to='/auth/signup' className="text-[13px] text-sky-600">Sign up</Link>
</div>
      </div>
  )
}

export default ForgotPasswordPage