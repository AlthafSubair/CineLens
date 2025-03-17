import { Link } from "react-router-dom"
import Button from "./Button"
import { TiSocialFacebookCircular, TiSocialInstagramCircular, TiSocialLinkedinCircular, TiSocialTwitter } from "react-icons/ti"


const Footer = () => {
  return (
    <div className="bottom-0 mt-8 w-full bg-white dark:bg-[#111111] flex justify-center items-center flex-col">
        <p className="text-center text-sm dark:text-slate-400 text-gray-900  font-mono pt-10">REVIEW FOR A BETTER WATCHLIST</p>
        <h1 className="px-6 text-center text-3xl font-bold dark:text-white text-black  py-5">Reeling in the Best Insights</h1>
        <h2 className="text-center text-lg dark:text-slate-400 text-gray-900  font-mono pb-10">CineLens is a dynamic platform dedicated to bringing movie enthusiasts together through reviews, <br /> discussions, and personalized recommendations.</h2>
       <div className="w-40">
       <Button text="Contact Us" bg="#003465" color="#fff"/>
       </div>
       <small className="text-gray-700 py-8 text-sm">&copy;2024 CineLens  All rights reserved.</small>

       <hr className="bg-[#1f1f1f] h-[2px] border-none w-9/12" />
       <div className="my-4 flex flex-col md:flex-row items-center justify-between w-9/12">
  <div className="flex flex-row items-center text-2xl text-violet-800">
    <img src="/logo.png" alt="Logo" width={60} height={60} />
    <span className="ml-2">CineLens</span>
  </div>
  <div className="flex flex-row items-center space-x-4 mb-4 md:mb-0">
    <Link to="/" className="dark:text-slate-400 text-gray-900 hover:underline">Privacy Policy</Link>
    <Link to="/" className="dark:text-slate-400 text-gray-900 hover:underline">Terms of Service</Link>
  </div>

  <div className="flex flex-row items-center space-x-2">
<TiSocialLinkedinCircular className="dark:text-slate-400 text-gray-900  hover:text-blue-500 transition-colors duration-300 text-3xl"/>
  <TiSocialFacebookCircular className="dark:text-slate-400 text-gray-900  hover:text-blue-500 transition-colors duration-300 text-3xl"/>
  <TiSocialInstagramCircular className="dark:text-slate-400 text-gray-900  hover:text-blue-500 transition-colors duration-300 text-3xl" />
  <TiSocialTwitter className="dark:text-slate-400 text-gray-900  hover:text-blue-500 transition-colors duration-300 text-3xl" />
</div>
</div>



    </div>
  )
}

export default Footer