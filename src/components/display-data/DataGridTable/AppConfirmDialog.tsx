import { Box, Checkbox, FormControlLabel } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { FC, useState } from "react";
import { label_text } from "../../../utils/text";

type ACDProps = {
  title: string;
  body: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (askConfirm: boolean) => void;
};

const AppConfirmDialog: FC<ACDProps> = ({
  title,
  body,
  open,
  onClose,
  onConfirm,
}) => {
  const [checked, setChecked] = useState(false);

  const handleConfirm = (askConfirm: boolean) => () => {
    onConfirm(askConfirm);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label={label_text.askConfirm}
          labelPlacement="end"
        />
      </DialogActions>
      <DialogActions>
        <Button onClick={handleConfirm(!checked)}>Удалить</Button>
        <Button onClick={onClose} autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
