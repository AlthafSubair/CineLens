import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getCastCount, getMoviesCount, getRatingCount, getUserCount } from "../redux/thunk/adminThunk";
import { FaUsers } from "react-icons/fa";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TbStarsFilled } from "react-icons/tb";
import { MdRecentActors } from "react-icons/md";

const DashboardHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userCount, movieCount, rateCount, castCount } = useSelector(
    (state: RootState) => state.admin
  );

  const [user, setUser] = useState(0);
  const [movies, setMovies] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [casts, setCasts] = useState(0);

  useEffect(() => {
   dispatch(getUserCount());
    
    dispatch(getMoviesCount());
    dispatch(getRatingCount());
    dispatch(getCastCount())
  }, [dispatch]);

  useEffect(() => {
    const incrementRate = (ucount: number) => {
      if (ucount > 1000000) return 10000;
      if (ucount > 10000) return 1000;
      if (ucount > 1000) return 50;
      if (ucount > 100) return 1;
      return 1;
    };

    const updateCount = (currentCount: number, targetCount: number, setCount: React.Dispatch<React.SetStateAction<number>>) => {
      const increment = incrementRate(targetCount);
      const intervalTime = 1;

      const interval = setInterval(() => {
        if (currentCount < targetCount) {
          setCount((prev) => Math.min(prev + increment, targetCount));
        } else {
          clearInterval(interval);
        }
      }, intervalTime);

      return () => clearInterval(interval);
    };

    // Running numbers for users, movies, and ratings
    updateCount(user, userCount, setUser);
    updateCount(movies, movieCount, setMovies);
    updateCount(ratings, rateCount, setRatings);
    updateCount(casts, castCount, setCasts);

  }, [userCount, movieCount, rateCount, user, movies, ratings, casts, castCount]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 my-12">
      <div className=" flex p-4 items-center dark:bg-gradient-to-br from-gray-800 to-black shadow-lg bg-white rounded-lg h-36">
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="flex flex-col justify-between items-center h-full py-2 gap-2">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">Users</h1>
            <FaUsers className="dark:text-slate-300 text-gray-600 text-6xl" />
          </div>

          <div className="flex h-full w-full justify-center items-center">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">{user}</h1>
          </div>
        </div>
      </div>
      <div className="  flex p-4 items-center dark:bg-gradient-to-br from-gray-800 to-black shadow-lg bg-white rounded-lg h-36">
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="flex flex-col justify-between items-center h-full py-2 gap-2">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">Movies</h1>
            <BsCollectionPlayFill className="dark:text-slate-300 text-gray-600 text-6xl" />
          </div>

          <div className="flex h-full w-full justify-center items-center">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">{movies}</h1>
          </div>
        </div>
      </div>
      <div className="  flex p-4 items-center dark:bg-gradient-to-br from-gray-800 to-black shadow-lg bg-white rounded-lg h-36">
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="flex flex-col justify-between items-center h-full py-2 gap-2">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">Ratings</h1>
            <TbStarsFilled className="dark:text-slate-300 text-gray-600 text-6xl" />
          </div>

          <div className="flex h-full w-full justify-center items-center">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">{ratings}</h1>
          </div>
        </div>
      </div>
      <div className="  flex p-4 items-center dark:bg-gradient-to-br from-gray-800 to-black shadow-lg bg-white rounded-lg h-36">
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="flex flex-col justify-between items-center h-full py-2 gap-2">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">Artists</h1>
            <MdRecentActors className="dark:text-slate-300 text-gray-600 text-6xl" />
          </div>

          <div className="flex h-full w-full justify-center items-center">
            <h1 className="text-3xl font-bold dark:text-slate-300 text-gray-600">{casts}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
