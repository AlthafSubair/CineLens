import { FaSearch } from "react-icons/fa";
import { useDispatch,  } from "react-redux";
import { AppDispatch,} from "../redux/store";
import { useState } from "react";
import { searchMovies } from "../redux/thunk/userThunk";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [input, setInput] = useState("");
  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty searches
    try {
      await dispatch(searchMovies(input));
      navigate('/search')
      setInput("")
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="w-full">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 bg-slate-200 dark:bg-[#1e1e1e] rounded-lg dark:text-[#fff] outline-none pr-10"
          placeholder="Search for a movie"
        />
        <FaSearch
          onClick={() => handleSearch(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>)} // Manually trigger form submission
          className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Search;
