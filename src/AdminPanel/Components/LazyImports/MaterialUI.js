import React, { Suspense } from "react";
import lazy from "react-lazy-named";

const MUIDialog = lazy(() => import("@material-ui/core/Dialog"));
export const Dialog = (props) => (
  <Suspense fallback={null}>
    <MUIDialog {...props} />
  </Suspense>
);

const MUISlide = lazy(() => import("@material-ui/core/Slide"));
export const Slide = (props) => (
  <Suspense fallback={null}>
    <MUISlide {...props} />
  </Suspense>
);

const MUIAppBar = lazy(() => import("@material-ui/core/AppBar"));
export const AppBar = (props) => (
  <Suspense fallback={null}>
    <MUIAppBar {...props} />
  </Suspense>
);

const MUIToolbar = lazy(() => import("@material-ui/core/Toolbar"));
export const Toolbar = (props) => (
  <Suspense fallback={null}>
    <MUIToolbar {...props} />
  </Suspense>
);

const MUITypography = lazy(() => import("@material-ui/core/Typography"));
export const Typography = (props) => (
  <Suspense fallback={null}>
    <MUITypography {...props} />
  </Suspense>
);

const MUITable = lazy(() => import("@material-ui/core/Table"));
export const Table = (props) => (
  <Suspense fallback={null}>
    <MUITable {...props} />
  </Suspense>
);

const MUITableRow = lazy(() => import("@material-ui/core/TableRow"));
export const TableRow = (props) => (
  <Suspense fallback={null}>
    <MUITableRow {...props} />
  </Suspense>
);

const MUITableCell = lazy(() => import("@material-ui/core/TableCell"));
export const TableCell = (props) => (
  <Suspense fallback={null}>
    <MUITableCell {...props} />
  </Suspense>
);

const MUITableBody = lazy(() => import("@material-ui/core/TableBody"));
export const TableBody = (props) => (
  <Suspense fallback={null}>
    <MUITableBody {...props} />
  </Suspense>
);

const MUITableContainer = lazy(() =>
  import("@material-ui/core/TableContainer")
);
export const TableContainer = (props) => (
  <Suspense fallback={null}>
    <MUITableContainer {...props} />
  </Suspense>
);

const MUIPaper = lazy(() => import("@material-ui/core/Paper"));
export const Paper = (props) => (
  <Suspense fallback={null}>
    <MUIPaper {...props} />
  </Suspense>
);

const MUIIconButton = lazy(() => import("@material-ui/core/IconButton"));
export const IconButton = (props) => (
  <Suspense fallback={null}>
    <MUIIconButton {...props} />
  </Suspense>
);

const MUIArrowBackIcon = lazy(() => import("@material-ui/icons/ArrowBack"));
export const ArrowBackIcon = (props) => (
  <Suspense fallback={null}>
    <MUIArrowBackIcon {...props} />
  </Suspense>
);

const MUICancelIcon = lazy(() => import("@material-ui/icons/Cancel"));
export const CancelIcon = (props) => (
  <Suspense fallback={null}>
    <MUICancelIcon {...props} />
  </Suspense>
);

const MUICheckCircleIcon = lazy(() => import("@material-ui/icons/CheckCircle"));
export const CheckCircleIcon = (props) => (
  <Suspense fallback={null}>
    <MUICheckCircleIcon {...props} />
  </Suspense>
);

// const MUImakeStyles = lazy(
//   () => import("@material-ui/core/styles"),
//   "makeStyles"
// );
// export const makeStyles = (props) => (
//   <Suspense fallback={null}>
//     <MUImakeStyles {...props} />
//   </Suspense>
// );
