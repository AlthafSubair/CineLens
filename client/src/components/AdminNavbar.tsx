
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";
import { MdMenu } from "react-icons/md";
import { memo, useState } from "react";
import { searchMovies } from "../redux/thunk/adminThunk";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

interface PropTypes {
  hideSidebar: boolean;
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminNavbar = ({ hideSidebar, setHideSidebar }: PropTypes) => {

  const [input, setInput] = useState("")

  const navigate = useNavigate()
  
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty searches

    try {
      await dispatch(searchMovies(input));
      navigate("/admin/search"); // Navigate to the search results page
      setInput("")
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div className="flex flex-row sm:justify-between justify-center items-center h-12 w-full">
      {/* Breadcrumb section */}
      <div className="sm:w-1/4 hidden sm:flex">
        {/* <h1 className="text-slate-200">
          {pathWithoutAdmin.map((segment, index) => (
            <span key={index}>
              {index > 0 && '/'}
              {segment === lastSegment ? (
                <span className="capitalize text-gray-900 dark:text-white text-[17px]">{segment}</span>
              ) : (
                segment
              )}
            </span>
          ))}
        </h1> */}
      </div>

      {/* Navbar actions */}
      <div className="sm:w-3/4 w-full flex flex-row sm:justify-end justify-center items-center sm:gap-4 mr-2 gap-2">
        {/* Search bar */}
        <form onSubmit={handleSearch}>
        <div className="relative sm:mx-0 mx-2">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 dark:bg-[#0c0c0cf2] bg-slate-200 rounded-lg dark:text-[#fff] outline-none"
            placeholder="Search for a movie"
          />
          <button type="submit"><FaSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 cursor-pointer" /></button>
        </div>
        </form>
        {/* Menu toggle for mobile */}
        <div
          className="dark:text-slate-300 xl:hidden block text-gray-600 hover:dark:bg-black hover:dark:bg-opacity-25 px-2 py-2 rounded-full hover:bg-slate-200 hover:bg-opacity-50 cursor-pointer"
          onClick={() => setHideSidebar(!hideSidebar)}
        >
          <MdMenu size={24} />
        </div>

        {/* Notifications */}
        <div className="dark:text-slate-300 text-gray-600 hover:dark:bg-black hover:dark:bg-opacity-25 px-2 py-2 rounded-full hover:bg-slate-200 hover:bg-opacity-50 cursor-pointer">
          <IoNotifications size={24} />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default memo(AdminNavbar);
