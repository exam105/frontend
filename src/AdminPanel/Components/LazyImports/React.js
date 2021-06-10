import React, { Suspense } from "react";
import lazy from "react-lazy-named";

const RDatePicker = lazy(() => import("react-datepicker"));
export const DatePicker = (props) => (
  <Suspense fallback={null}>
    <RDatePicker {...props} />
  </Suspense>
);
