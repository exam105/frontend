import React from "react";
import {
  AdminSearchComponent,
  AdminSideBar,
} from "../Components/LazyImports/LocalComponents";

const AdminSearch = () => {
  return (
    <div>
      <AdminSideBar />
      <AdminSearchComponent />
    </div>
  );
};

export default AdminSearch;
