import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { movieGraph } from "../redux/thunk/adminThunk";

interface key{
    month: string,
    count: number
  }

const MovieGraph = () => {
  const { moviegraph } = useSelector((state: RootState) => state.admin);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();
  const [chartData, setChartData] = useState<key[]>([]);

  useEffect(() => {
    dispatch(movieGraph());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(moviegraph) && moviegraph.length > 0) {
      setChartData(moviegraph);
    }
  }, [moviegraph]);


  return (
    <div className="md:p-4 p-1 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200 pl-12">
        Movie Analytics
      </h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke={darkMode ? "#444" : "#ddd"} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              stroke={darkMode ? "#fff" : "#000"}
              tick={{ fill: darkMode ? "#fff" : "#000", fontSize: 14 }}
            />
            <YAxis
              stroke={darkMode ? "#fff" : "#000"}
              tick={{ fill: darkMode ? "#fff" : "#000", fontSize: 14 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#222" : "#fff",
                color: darkMode ? "#fff" : "#000",
              }}
              itemStyle={{ color: darkMode ? "#fff" : "#000" }}
            />
            <Bar dataKey="count" fill={darkMode ? "#4caf50" : "#8884d8"} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading graph...</p>
      )}
    </div>
  );
};

export default MovieGraph;
