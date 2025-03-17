import { memo } from "react";
import { HiHome } from "react-icons/hi2";
import { MdClose, MdLocalMovies, MdLogout } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slice/authSlice";
import { PiSlideshowBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";


interface PropTypes {
  hideSidebar: boolean;
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSideBar = ({ hideSidebar, setHideSidebar }: PropTypes) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logout())
  }
  
  const getLinkClass = (path: string) =>
    `text-[17px] p-2 px-4 dark:text-white flex flex-row items-center gap-4 w-full py-3 rounded-md ${
      location.pathname === path
        ? "bg-gradient-to-br from-gray-800 to-gray-900 dark:bg-gradient-to-br dark:from-orange-600 dark:to-orange-700 text-white"
        : "text-[#5c6569] hover:bg-slate-200 hover:bg-opacity-50 dark:hover:bg-black dark:hover:bg-opacity-25 dark:hover:text-white"
    }`;

  return (
    <div
    className={`${
      hideSidebar ? "hidden xl:block" : "block z-50"
    } max-w-sm w-80 absolute xl:relative xl:-mt-4 min-h-screen dark:bg-gradient-to-br from-gray-800 to-black shadow-lg bg-white border dark:border-0 border-[#dae0e3] rounded-md m-0 p-0`}
  >
  
      <div className="text-gray-950 dark:text-white font-bold text-2xl my-4 flex items-center justify-center px-auto">
        <span className="text-center mt-4">CineLens</span>
      </div>

      <div className="flex mt-12 w-full">
        <ul className="p-2 w-full space-y-3" onClick={() => setHideSidebar(true)}>
          <li>
            <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
              <HiHome size={24} /> DashBoard
            </Link>
          </li>

          <li>
            <Link to="/admin/movies" className={getLinkClass("/admin/movies")}>
              <MdLocalMovies size={24} /> Movies
            </Link>
          </li>

          <li>
            <Link to="/admin/roles" className={getLinkClass("/admin/roles")}>
              <IoPersonAddSharp size={24} /> Add Roles
            </Link>
          </li>

          <li>
            <Link to="/admin/corusel" className={getLinkClass("/admin/corusel")}>
              <PiSlideshowBold size={24} /> Carousel
            </Link>
          </li>

          <li>
            <Link to="/admin/users" className={getLinkClass("/admin/users")}>
              <FaUsers size={24} /> Users
            </Link>
          </li>

          <li>
            <button onClick={handleLogout} className={"text-[17px] p-2 px-4 dark:text-white flex flex-row items-center gap-4 w-full py-3 rounded-md text-[#5c6569] hover:bg-slate-200 hover:bg-opacity-50 dark:hover:bg-black dark:hover:bg-opacity-25 dark:hover:text-white"}>
              <MdLogout size={24} />Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="flex md:hidden justify-end top-1 right-1 absolute w-full">
        <button
          onClick={() => setHideSidebar(true)}
          className="text-lg px-2 py-2 rounded-full dark:bg-black bg-slate-200 hover:bg-opacity-25 text-[#5c6569] dark:text-white"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default memo(AdminSideBar);
