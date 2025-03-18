import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Info from "../components/Info";
import MovieScroll from "../components/MovieScroll";
import { AppDispatch, RootState } from "../redux/store";
import { getMovies } from "../redux/thunk/userThunk";

const HomePage = () => {
  const { movies } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const topTen = movies
    .filter((movie) => movie.rateCount > 0)
    .sort((a, b) => {
      const aRating = a.rateCount > 0 ? a.rate / a.rateCount : 0;
      const bRating = b.rateCount > 0 ? b.rate / b.rateCount : 0;
      return bRating - aRating || b.rateCount - a.rateCount; // Tie-breaker
    })
    .slice(0, 10);

  const latestTen = movies
    .filter((movie) => movie.year) // Ensure `year` exists
    .sort((a, b) => new Date(`${b.year}-01-01`).getTime() - new Date(`${a.year}-01-01`).getTime())
    .slice(0, 10);

  const mostViewed = movies
    .filter((movie) => movie.rateCount > 0)
    .sort((a, b) => b.rateCount - a.rateCount) // No need for redundant tie-breaker
    .slice(0, 10);

  const [info, setInfo] = useState(false);
  const [id, setId] = useState("");

  return (
    <div className="dark:text-white min-h-screen relative sm:mx-12 mx-4">
      <Carousel />
      {latestTen.length > 0 && <MovieScroll sectionName="Latest" movies={latestTen} setInfo={setInfo} setId={setId} />}
      {topTen.length > 0 && <MovieScroll sectionName="Top Rated" movies={topTen} setInfo={setInfo} setId={setId} />}
      {mostViewed.length > 0 && <MovieScroll sectionName="Most Viewed" movies={mostViewed} setInfo={setInfo} setId={setId} />}
      {info && <Info setInfo={setInfo} id={id} />}
    </div>
  );
};

export default HomePage;
