import { useState, memo } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminSideBar from "../components/AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [hideSidebar, setHideSidebar] = useState<boolean>(true);

  return (
    <div className="dark:bg-[#1e1e1e] bg-[#f5f7f8] h-[101vh] flex flex-row overflow-hidden ">
      <div className="">
        <AdminSideBar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
      </div>

      <div className="flex flex-col w-full lg:m-4 sm:m-2 my-2">
        <AdminNavbar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
      <div className="overflow-y-scroll no-scrollbar h-full">
      <Outlet />
      </div>
      </div>
    </div>
  );
};

export default memo(AdminLayout);
