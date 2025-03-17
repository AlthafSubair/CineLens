import { FaListUl } from "react-icons/fa"
import { IoGridOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
    setLayout: React.Dispatch<React.SetStateAction<boolean>>,
   
}

const WatchListHeader = ({ setLayout }: Props) => {

const {watchlist} = useSelector((state: RootState) => state.user)

    return (
        <div className="w-full flex flex-row sm:justify-between justify-end items-end py-8 px-4">

            <div className="sm:flex flex-row hidden items-center">
                <h1 className="text-center sm:mx-2 my-2 sm:text-lg text-gray-600 dark:text-slate-400">{watchlist?.length > 0 &&  watchlist?.length} titles</h1>
            </div>

            <div className="flex flex-row items-center gap-2">

                <div className="flex sm:gap-2 gap-1">
                    <p className="m-2 sm:font-semibold dark:text-white">Sort by</p>

                    <button
                        className="sm:px-6 flex justify-center items-center gap-2 sm:py-2 px-3 py-1 font-semibold dark:bg-black dark:bg-opacity-30 dark:text-slate-400 dark:hover:text-blue-700 dark:hover:bg-gray-300 rounded-md text-gray-600 hover:bg-gray-200 hover:text-blue-700">
                        List Order <TiArrowSortedDown className="pt-1 text-xl" />
                    </button></div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setLayout(false)}
                        className="p-3 sm:text-xl text-base dark:bg-black dark:bg-opacity-30 dark:text-slate-400 dark:hover:text-blue-700 dark:hover:bg-gray-300 rounded-full text-gray-600 hover:bg-gray-200 hover:text-blue-700">
                        <IoGridOutline />
                    </button>

                    <button
                        onClick={() => setLayout(true)}
                        className="p-3 sm:text-xl text-base dark:bg-black dark:bg-opacity-30 dark:text-slate-400 dark:hover:text-blue-700 dark:hover:bg-gray-300 rounded-full text-gray-600 hover:bg-gray-200 hover:text-blue-700">
                        <FaListUl />
                    </button>
                </div>


            </div>
        </div>
    )
}

export default WatchListHeader