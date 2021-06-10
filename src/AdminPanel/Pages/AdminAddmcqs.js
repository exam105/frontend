import React from "react";
import {
  AdminAddmcqsComponent,
  AdminSideBar,
} from "../Components/LazyImports/LocalComponents";

function AdminAddmcqs() {
  return (
    <section>
      <AdminSideBar />
      <AdminAddmcqsComponent />
    </section>
  );
}

export default AdminAddmcqs;
