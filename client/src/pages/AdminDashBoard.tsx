import React from "react";
import AuthHOC from "../components/AuthHOC";
import DashboardHeader from "../components/DashboardHeader";
import UserChart from "../components/UserChart";
import MovieGraph from "../components/MovieGraph.tsx";


const AdminDashboard: React.FC = () => {
  return <div className="py-4">
    <DashboardHeader />
    <div className="flex lg:flex-row flex-col gap-2 pt-8">
      <div className="lg:w-1/2 w-full">
     <UserChart />
      </div>
      <div className="lg:w-1/2 w-full">
     <MovieGraph />
      </div>
    </div>
    </div>;
};

// Wrap the AdminDashboard with AuthHOC
const ProtectedAdminDashboard = AuthHOC(AdminDashboard);

export default ProtectedAdminDashboard;
