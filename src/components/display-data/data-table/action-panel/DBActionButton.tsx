import React, { ComponentType, FC } from "react";
import { IconButton, SvgIconProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

type ActionType = "edit" | "delete" | "save" | "cancel";
type ABProps = {
  onclick: () => void;
  action: ActionType;
  disabled: boolean;
};

const actionIcons: { [key in ActionType]: ComponentType<SvgIconProps> } = {
  edit: EditIcon,
  delete: DeleteIcon,
  save: SaveIcon,
  cancel: CancelIcon,
};

const DBActioButton: FC<ABProps> = ({ onclick, action, disabled }) => {
  const Icon = actionIcons[action];
  return (
    <IconButton aria-label={action} onClick={onclick} disabled={disabled}>
      <Icon fontSize="small" />
    </IconButton>
  );
};

export default DBActioButton;
