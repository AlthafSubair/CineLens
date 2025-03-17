import { useLocation, useNavigate } from "react-router-dom"
import AuthLayout from "./AuthLayoyt";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";




const Layout = () => {
const location = useLocation();

const {role, token} = useSelector((state: RootState) => state.auth)
const navigate = useNavigate()

useEffect(()=>{
    if(token && role === 'admin' && !location.pathname.includes('/admin')){
      navigate('/admin/dashboard')
    }
},[token,role,navigate,location])


  return (
    <div>
        {
            location.pathname.includes('/auth') ? <AuthLayout /> : location.pathname.includes('/admin') ? <AdminLayout /> : <UserLayout /> 
        }
 
    </div>
  )
}

export default Layout