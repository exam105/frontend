import React from "react";
import {
  AdminPapersComponent,
  AdminSideBar,
} from "../Components/LazyImports/LocalComponents";

function AdminPapers() {
  return (
    <div>
      <AdminSideBar />
      <AdminPapersComponent />
    </div>
  );
}

export default AdminPapers;
