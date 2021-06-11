import React from "react";
// Material UI
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "../AdminPanel/Components/LazyImports/MaterialUI";
// Styles
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModelNotification(props) {
  return (
    <Dialog
      open={props.DialogStatus}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth={true}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        className="py-3 text-center h3"
      >
        {props.DialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.DialogDesc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          {props.DialogOk}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModelNotification;
