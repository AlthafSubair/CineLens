import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../redux/store"


const WatchListBanner = () => {

  const {username} = useSelector((state: RootState)=>state.auth)

  return (
    <div className="w-full min-h-60 bg-slate-200 dark:bg-[#111111] flex md:flex-row flex-col p-4 lg:p-0">
<div className="md:w-3/4 w-full lg:pl-16">
<h1 className="md:pt-16 pt-8 dark:text-slate-100 text-4xl text-gray-800">Your Watchlist</h1>
<p className="pl-1 pt-1 dark:text-slate-400 text-gray-500">by {username}</p>

<p className="dark:text-slate-400 text-gray-700 pb-4 pt-6 text-justify lg:pr-0 pr-4 ">
Your Watchlist is the place to track the titles you want to watch. Add your favorite movies, shows, or content, and easily access them whenever you're ready to enjoy. Keep your entertainment organized and never miss out on what you love!</p>
</div>

<div className="md:w-1/4 w-full flex md:min-h-60 md:pt-0 pt-8 justify-center items-center">
<Link to='/' className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 text-lg font-semibold ">Add More to WatchList</Link>
</div>

    </div>
  )
}

export default WatchListBanner