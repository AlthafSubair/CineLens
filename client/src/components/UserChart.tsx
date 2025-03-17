import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { userGraph } from "../redux/thunk/adminThunk";


const UserChart = () => {

    const {usergraph} = useSelector((state: RootState) => state.admin)
  const {darkMode} = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    dispatch(userGraph())
  },[dispatch])



  const axisColor = darkMode ? "#ffffff" : "#333"; // Ensure good contrast
  const labelColor = darkMode ? "#ffffff" : "#000000"; // Ensure readable text
  const gridColor = darkMode ? "#555" : "#ddd"; // Grid should be visible in both themes

  return (
    <div className="md:p-4 p-1 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 pl-12 pb-4">User Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={usergraph}>
          {/* Grid */}
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis 
            dataKey="month" 
            stroke={axisColor} 
            tick={{ fill: labelColor, fontSize: 14 }} // 🟢 Explicit tick color fix
          />

          {/* Y Axis */}
          <YAxis 
            stroke={axisColor} 
            tick={{ fill:labelColor, fontSize: 14 }} // 🟢 Explicit tick color fix333", fontSize: 14 }} // 🟢 Explicit tick color fix
          />

          {/* Tooltip */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? "#333" : "#fff", 
              color: darkMode ? "#fff" : "#000",
              border: darkMode ? "1px solid #777" : "1px solid #ddd"
            }} 
          />

          {/* Line */}
          <Line type="monotone" dataKey="count" stroke={darkMode ? "#4ADE80" : "#3B82F6"} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
