import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import { HiMenuAlt1 } from "react-icons/hi";
import {  FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { searchMovies } from "../redux/thunk/userThunk";
import { RiHomeLine } from "react-icons/ri";

interface prop {
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  profile: boolean
}

const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout>; // This automatically infers the correct type for the timeout variable
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const NavBar = ({setProfile, profile} : prop) => {
  const [search, setSearch] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [profilePhoto,setProfilePhoto] = useState<string | null>("")
  const [showNavBar, setShowNavBar] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  const [input, setInput] = useState<string>("")
  const navigate = useNavigate()
  
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty searches

    try {
      await dispatch(searchMovies(input));
      navigate("/search"); // Navigate to the search results page
      setSearch(false);
      setInput("")
    } catch (error) {
      console.log(error);
    }
  };



  const {token, avatar} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    setProfilePhoto(avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png");
  }, [avatar]);
  



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenu(false);
        setSearch(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Hide Navbar on Scroll Down
        setShowNavBar(false);
      } else {
        // Show Navbar on Scroll Up
        setShowNavBar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);


 

  return (
    <div>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNavBar ? "translate-y-0" : "-translate-y-full"
        } dark:bg-[#111111] bg-slate-100 h-16 md:justify-center justify-between px-4 items-center shadow-lg gap-8 ${menu ? "hidden" : "flex"}`}
      >
      
        {/* Logo Section */}
        <div className={`text-violet-800 font-bold text-2xl flex items-center ${search ? "hidden" : "block"}`}>
          <HiMenuAlt1
            className="md:hidden text-2xl text-violet-800 cursor-pointer"
            onClick={() => setMenu(prev => !prev)}
          />

         {
          location.pathname === "/" ?  <button className="flex justify-center items-center">
          <img src="/logo.png" alt="logo" width={60} height={60} className="pl-4" />
          <span>CineLens</span>
        </button> :  <Link to="/" className="flex justify-center items-center">
            <img src="/logo.png" alt="logo" width={60} height={60} className="pl-4" />
            <span>CineLens</span>
          </Link>
         }
        </div>
       

        {/* Search Bar for Larger Screens */}
        <div className="w-5/12 sm:flex gap-4 hidden justify-center items-center ">
 
          <Link to='/'><RiHomeLine size={40} className="p-2 dark:bg-black text-gray-600 dark:text-slate-400 bg-slate-200 hover:text-violet-700 rounded-full dark:bg-opacity-50 "/></Link>
    
          <Search />
        </div>

        {/* Links and Theme Toggle */}
        <div className="md:flex hidden gap-2 items-center">
          <Link to="/watchlist" className="dark:text-[#fff] font-bold text-slate-800 dark:hover:bg-[#1e1e1e] hover:bg-slate-200 py-2 px-3 rounded-lg">
            Watchlist
          </Link>
         {
          token && profilePhoto ? (
            <button onClick={() => setProfile(!profile)} className="dark:text-[#fff] font-bold text-slate-800 py-2 px-2 rounded-lg">
              <img
                src={profilePhoto}
                width={30}
                height={30}
                className="rounded-full"
                alt="User Avatar"
                onError={() => setProfilePhoto("https://cdn-icons-png.flaticon.com/512/149/149071.png")} // Fallback on error
              />
            </button>
          ) : (
            <Link to="/auth/login" className="dark:text-[#fff] font-bold text-slate-800 dark:hover:bg-[#1e1e1e] hover:bg-slate-200 py-2 px-2 rounded-lg">
              Sign In
            </Link>
          )
         }
          <ThemeToggle />
        </div>

        {/* Search Toggle for Smaller Screens */}
        <div className="sm:hidden block" onClick={() => setSearch(prev => !prev)}>
          <FaSearch className={`p-2 text-4xl text-slate-400 cursor-pointer rounded-lg ${search ? "hidden" : "block"}`} />
        </div>

        {/* Search Input for Smaller Screens */}
        {search && (
        <div className="relative w-full sm:hidden flex justify-center -left-6">
          {/* Form ensures Enter submits the search */}
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 dark:bg-[#1e1e1e] bg-slate-200 rounded-lg dark:text-[#fff] outline-none"
              placeholder="Search for a movie"
            />
          </form>
          <IoClose
            onClick={() => setSearch(false)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 cursor-pointer text-2xl"
          />
        </div>
      )}

      </nav>

      {/* Overlay for Sidebar */}
      {menu && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenu(false)}></div>}

      {/* Sidebar Menu */}
      {menu && (
        <div className="fixed top-0 left-0 h-screen w-3/4 shadow-lg dark:bg-[#212121] bg-slate-100 z-50 flex flex-col">
          <div className="dark:text-white text-violet-800 font-bold text-2xl flex justify-between p-3">
            <span>CineLens</span>
            <div className="absolute right-12 top-2 cursor-pointer">
              <ThemeToggle />
            </div>
            <IoClose className="absolute right-3 top-4 text-slate-400 cursor-pointer text-2xl" onClick={() => setMenu(prev => !prev)} />
          </div>
          <ul className="p-4 space-y-3 text-slate-800 dark:text-slate-300">
            <li onClick={() => setMenu(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link to="/watchlist">WatchList</Link>
            </li>
            <li onClick={() => setMenu(false)}>
              <Link to="#contact">Contact</Link>
            </li>
            <li onClick={() => setMenu(false)}>
            { token ? <button onClick={()=>setProfile(!profile)}>Profile</button> :  <Link to="/auth/login">Sign In</Link>}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
