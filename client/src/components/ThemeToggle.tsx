
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/slice/ThemeSlice';
import { RootState } from '../redux/store';
import { TiWeatherSunny } from "react-icons/ti";
import { GoMoon } from "react-icons/go";


const ThemeToggle = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 bg-gray-200 dark:bg-[#1e1e1e] text-2xl text-black dark:text-white rounded-lg"
        >
            {darkMode ? <TiWeatherSunny/>: <GoMoon />}
        </button>
    );
};

export default ThemeToggle;
