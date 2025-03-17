import { MdMail } from "react-icons/md";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toast } from "react-toastify";
import { resendOtp, verifyOtp } from "../redux/thunk/authThunk";

interface OtpFormValues {
  otp: string[]; // Ensure otp is strictly an array of strings
}

const Otp = () => {

  const { handleSubmit, control, watch, setValue, reset, setError, clearErrors } =
    useForm<OtpFormValues>({
      defaultValues: {
        otp: ["", "", "", ""], // Ensure all values are initialized as empty strings
      },
    });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { email } = useParams();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpValues = watch("otp");
  const {loading} = useSelector((state: RootState) => state.auth);


  const [timer, setTimer] = useState(120)

  useEffect(()=>{
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  },[])

  // Auto-Move Function
 // Auto-Move Function with Backspace Support
const handleOtpChange = (value: string, index: number) => {
  const updatedOtp = [...otpValues];
  updatedOtp[index] = value;

  setValue("otp", updatedOtp);

  if (value && index < inputRefs.current.length - 1) {
    // Move to the next input field when a value is entered
    inputRefs.current[index + 1]?.focus();
  } else if (!value && index > 0) {
    // Move to the previous input field on Backspace if the current field is empty
    inputRefs.current[index - 1]?.focus();
  }
};

  // Format Time
  const formatTime = (time: number) => {
    const minutes = "0" + Math.floor(time / 60).toString().slice(-2);
    const seconds = ("0" + (time % 60)).toString().slice(-2);
    return `${minutes}:${seconds}`;
  };

  // Custom Validation Function
  const validateOtp = () => {
    if (otpValues.some((v) => v === "")) {
      setError("otp", {
        type: "manual",
        message: "All OTP fields are required.",
      });
      return false;
    }

    if (otpValues.some((v) => !/^\d$/.test(v))) {
      setError("otp", {
        type: "manual",
        message: "OTP fields must contain only digits.",
      });
      return false;
    }

    clearErrors("otp"); // Clear errors if validation passes
    return true;
  };

  const onSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    if (!validateOtp()) return;

    if (!email) {
      toast.error("Email is missing. Please try again.", {
        position: "bottom-left",
        autoClose: 5000,
      });
      return;
    }

    try {
      const otpString = data.otp.join("");
      const requestData = { otp: otpString, email };
      const res = await dispatch(verifyOtp(requestData));

      if (verifyOtp.fulfilled.match(res)) {
        toast.success(res.payload.message, {
          position: "bottom-left",
          autoClose: 5000,
        });
        reset();
        localStorage.removeItem('expireTime')
  
        navigate(`/auth/login`);
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
        setTimer(120);
        const newDate = new Date();
newDate.setMinutes(newDate.getMinutes() + 5);
const newExpireTime = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

// Update the value in localStorage
localStorage.setItem('expireTime', newExpireTime);
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

  const otpFields = new Array(4).fill("");

 const timeIn12hrFormat = localStorage.getItem('expireTime')

  


  return (
    <div className="flex flex-col justify-center items-center dark:text-white text-slate-800 p-8 max-w-sm">
      <MdMail className="text-center text-3xl text-slate-500" />
      <h1 className="mt-2 text-center text-xl font-semibold dark:text-slate-300">
        Verify Your Email Address
      </h1>
      <hr className="w-full mt-4 dark:text-slate-600 text-gray-500" />
      <p className="mt-6 text-center">
        A verification code has been sent to <br />
        <span className="dark:text-white font-semibold mt-1 text-gray-700">
          {email}
        </span>
      </p>

      <p className="pt-8 text-justify">
        Please check your inbox and enter the verification code below to verify
        your email address. The code will expire in {timeIn12hrFormat}.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center items-center mt-8 gap-4">
          {otpFields.map((_, index) => (
         <Controller
         key={index}
         name={`otp.${index}`}
         control={control}
         render={({ field }) => (
           <input
             {...field}
             ref={(el) => (inputRefs.current[index] = el)}
             className="w-14 h-14 text-center rounded-md text-slate-600 dark:text-slate-300 p-4 ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600 dark:bg-[#37373e]"
             maxLength={1}
             onChange={(e) => handleOtpChange(e.target.value, index)}
             onKeyDown={(e) => {
               if (e.key === "Backspace" && !otpValues[index]) {
                 // Move to the previous input if Backspace is pressed and the field is empty
                 inputRefs.current[index - 1]?.focus();
               }
             }}
           />
         )}
       />
       
          ))}
        </div>
        {/* Single error message display */}
        <p className="text-red-500 text-xs mt-2 text-center">
          {control.getFieldState("otp").error?.message}
        </p>

        <div className="mt-4">
          <Button text="Verify" color="white" bg="green" isLoading={loading}/>
        </div>

        <div className="flex justify-between mt-8 text-sm">
          {timer > 0 ? (
            `Resend code in ${formatTime(timer)}`
          ) : (
            <button type="button" onClick={handleResendOtp}>
              Resend Code
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Otp;
