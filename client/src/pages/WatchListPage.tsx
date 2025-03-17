import {useState } from "react";
import WatchListBanner from "../components/WatchListBanner";
import WatchListHeader from "../components/WatchListHeader";
import Watchlist from "../components/Watchlist";
import RateMovie from "../components/RateMovie";



 const WatchListPage = () => {

  const [layout, setLayout] = useState<boolean>(false);

  const [idofRate, SetIdRate] = useState("")

  // useEffect(() => {
  //   if (openRate) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "visible";
  //   }
  //   return () => {
  //     document.body.style.overflow = "visible"; // Cleanup on unmount
  //   };
  // }, [openRate]);

 


  return (
    <div className="pt-16 min-h-screen relative">
      <WatchListBanner />

      <div className="w-full flex flex-row mb-4">
        <div className="lg:w-8/12 w-full">
          <WatchListHeader setLayout={setLayout}/>
          <Watchlist SetIdRate={SetIdRate} layout={layout} />
        </div>

        <div className="lg:w-4/12 dark:bg-black dark:bg-opacity-50 h-[32rem] bg-stone-50 shadow-lg rounded-xl mt-24 mx-8 lg:flex hidden"></div>
      </div>

      {idofRate !== "" && <RateMovie idofRate={idofRate} SetIdRate={SetIdRate}/>}
    </div>
  );
};

export default WatchListPage;