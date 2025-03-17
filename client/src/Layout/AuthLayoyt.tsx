import { Outlet } from "react-router-dom"


const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200  dark:bg-[#080710] relative">
    {/* Background Shapes */}
    <div className="absolute w-52 h-52 bg-gradient-to-r from-[#1845ad] to-[#23a2f6] rounded-full -top-20 -left-20 "></div>
    <div className="absolute w-52 h-52 bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-tl-[92%] bottom-0 right-0 z-0"></div>

          <div className="dark:bg-[#C7D2D6] dark:bg-opacity-[20%] shadow-lg bg-white rounded-md min-w-[350px] z-10 mx-2">
          <Outlet />
          </div>
       
        </div>

  )
}

export default AuthLayout