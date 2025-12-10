import React from "react";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminTopbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
