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

const MUIBox = lazy(() => import("@material-ui/core/Box"));
export const Box = (props) => (
  <Suspense fallback={null}>
    <MUIBox {...props} />
  </Suspense>
);

const MUIContainer = lazy(() => import("@material-ui/core/Container"));
export const Container = (props) => (
  <Suspense fallback={null}>
    <MUIContainer {...props} />
  </Suspense>
);

const MUIFab = lazy(() => import("@material-ui/core/Fab"));
export const Fab = (props) => (
  <Suspense fallback={null}>
    <MUIFab {...props} />
  </Suspense>
);

const MUIKeyboardArrowUpIcon = lazy(() =>
  import("@material-ui/icons/KeyboardArrowUp")
);
export const KeyboardArrowUpIcon = (props) => (
  <Suspense fallback={null}>
    <MUIKeyboardArrowUpIcon {...props} />
  </Suspense>
);

const MUIZoom = lazy(() => import("@material-ui/core/Zoom"));
export const Zoom = (props) => (
  <Suspense fallback={null}>
    <MUIZoom {...props} />
  </Suspense>
);

const MUIRadio = lazy(() => import("@material-ui/core/Radio"));
export const Radio = (props) => (
  <Suspense fallback={null}>
    <MUIRadio {...props} />
  </Suspense>
);

const MUIRadioGroup = lazy(() => import("@material-ui/core/RadioGroup"));
export const RadioGroup = (props) => (
  <Suspense fallback={null}>
    <MUIRadioGroup {...props} />
  </Suspense>
);

const MUIFormControlLabel = lazy(() =>
  import("@material-ui/core/FormControlLabel")
);
export const FormControlLabel = (props) => (
  <Suspense fallback={null}>
    <MUIFormControlLabel {...props} />
  </Suspense>
);

const MUIFormControl = lazy(() => import("@material-ui/core/FormControl"));
export const FormControl = (props) => (
  <Suspense fallback={null}>
    <MUIFormControl {...props} />
  </Suspense>
);

const MUIFormLabel = lazy(() => import("@material-ui/core/FormLabel"));
export const FormLabel = (props) => (
  <Suspense fallback={null}>
    <MUIFormLabel {...props} />
  </Suspense>
);

const MUIInputLabel = lazy(() => import("@material-ui/core/InputLabel"));
export const InputLabel = (props) => (
  <Suspense fallback={null}>
    <MUIInputLabel {...props} />
  </Suspense>
);

const MUIMenuItem = lazy(() => import("@material-ui/core/MenuItem"));
export const MenuItem = (props) => (
  <Suspense fallback={null}>
    <MUIMenuItem {...props} />
  </Suspense>
);

const MUISelect = lazy(() => import("@material-ui/core/Select"));
export const Select = (props) => (
  <Suspense fallback={null}>
    <MUISelect {...props} />
  </Suspense>
);

const MUIBackdrop = lazy(() => import("@material-ui/core/Backdrop"));
export const Backdrop = (props) => (
  <Suspense fallback={null}>
    <MUIBackdrop {...props} />
  </Suspense>
);

const MUIDialogActions = lazy(() => import("@material-ui/core/DialogActions"));
export const DialogActions = (props) => (
  <Suspense fallback={null}>
    <MUIDialogActions {...props} />
  </Suspense>
);

const MUIDialogContent = lazy(() => import("@material-ui/core/DialogContent"));
export const DialogContent = (props) => (
  <Suspense fallback={null}>
    <MUIDialogContent {...props} />
  </Suspense>
);

const MUIDialogContentText = lazy(() =>
  import("@material-ui/core/DialogContentText")
);
export const DialogContentText = (props) => (
  <Suspense fallback={null}>
    <MUIDialogContentText {...props} />
  </Suspense>
);

const MUIDialogTitle = lazy(() => import("@material-ui/core/DialogTitle"));
export const DialogTitle = (props) => (
  <Suspense fallback={null}>
    <MUIDialogTitle {...props} />
  </Suspense>
);

const MUIButton = lazy(() => import("@material-ui/core"), "Button");
export const Button = (props) => (
  <Suspense fallback={null}>
    <MUIButton {...props} />
  </Suspense>
);

const MUITextField = lazy(() => import("@material-ui/core"), "TextField");
export const TextField = (props) => (
  <Suspense fallback={null}>
    <MUITextField {...props} />
  </Suspense>
);

const MUITableHead = lazy(() => import("@material-ui/core/TableHead"));
export const TableHead = (props) => (
  <Suspense fallback={null}>
    <MUITableHead {...props} />
  </Suspense>
);

const MUISnackbar = lazy(() => import("@material-ui/core/Snackbar"));
export const Snackbar = (props) => (
  <Suspense fallback={null}>
    <MUISnackbar {...props} />
  </Suspense>
);

const MUIMuiAlert = lazy(() => import("@material-ui/lab/Alert"));
export const MuiAlert = (props) => (
  <Suspense fallback={null}>
    <MUIMuiAlert {...props} />
  </Suspense>
);

const MUIRefreshIcon = lazy(() => import("@material-ui/icons/Refresh"));
export const RefreshIcon = (props) => (
  <Suspense fallback={null}>
    <MUIRefreshIcon {...props} />
  </Suspense>
);

const MUIDeleteIcon = lazy(() => import("@material-ui/icons/Delete"));
export const DeleteIcon = (props) => (
  <Suspense fallback={null}>
    <MUIDeleteIcon {...props} />
  </Suspense>
);

const MUITablePagination = lazy(() =>
  import("@material-ui/core/TablePagination")
);
export const TablePagination = (props) => (
  <Suspense fallback={null}>
    <MUITablePagination {...props} />
  </Suspense>
);

const MUITableSortLabel = lazy(() =>
  import("@material-ui/core/TableSortLabel")
);
export const TableSortLabel = (props) => (
  <Suspense fallback={null}>
    <MUITableSortLabel {...props} />
  </Suspense>
);

const MUICheckbox = lazy(() => import("@material-ui/core/Checkbox"));
export const Checkbox = (props) => (
  <Suspense fallback={null}>
    <MUICheckbox {...props} />
  </Suspense>
);

const MUICloseIcon = lazy(() => import("@material-ui/icons/Close"));
export const CloseIcon = (props) => (
  <Suspense fallback={null}>
    <MUICloseIcon {...props} />
  </Suspense>
);

const MUIArrowForwardIcon = lazy(() =>
  import("@material-ui/icons/ArrowForward")
);
export const ArrowForwardIcon = (props) => (
  <Suspense fallback={null}>
    <MUIArrowForwardIcon {...props} />
  </Suspense>
);

const MUIAddIcon = lazy(() => import("@material-ui/icons/Add"));
export const AddIcon = (props) => (
  <Suspense fallback={null}>
    <MUIAddIcon {...props} />
  </Suspense>
);
