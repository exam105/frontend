import React from "react";
import {
  AdminAddBoardComponent,
  AdminSideBar,
} from "../Components/LazyImports/LocalComponents";
import "../css/AdminAddBoard.css";

function AdminAddBoard() {
  return (
    <div>
      <AdminSideBar />
      <AdminAddBoardComponent />
    </div>
  );
}

export default AdminAddBoard;
