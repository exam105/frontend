import React from "react";
// Material UI
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
} from "../AdminPanel/Components/LazyImports/MaterialUI";

const SelectDialog = (props) => {
  const { onClose, selectedValue, items, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <List>
        {items.map((item, i) => (
          <ListItem
            button
            onClick={() => handleListItemClick(item)}
            key={i}
            style={{ padding: "10px 40px" }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SelectDialog;
