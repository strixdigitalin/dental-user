import { useState } from "react";
import {
  CircleNotifications,
  KeyboardArrowDown,
  Logout,
} from "@mui/icons-material";
import { Button, Menu, MenuItem, Typography } from "@mui/material";

export default function AppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        height: "10%",
        width: "100vw",
        backgroundColor: "#ffffff",
        position: "fixed",
        zIndex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <CircleNotifications
        sx={{
          color: "#ffedef",
        }}
      />
      <Button
        id="profile-button"
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        sx={{
          backgroundColor: "#ffffff",
          "&:hover": { backgroundColor: "#ffffff" },
          color: "#787878",
          height: "60%",
          borderLeft: "3px solid #f8f8f8",
          borderRadius: 0,
        }}
      >
        <Typography sx={{ fontStyle: "normal" }}>BOB CHAPARALA</Typography>
      </Button>
      <Menu
        id="profile-menu"
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <Logout />
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
}
