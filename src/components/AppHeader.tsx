import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Logout } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { setUser } from "../store/userSlice";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store";
import { APP_BAR_HEIGHT } from "../utils/css-var";
import { label_text } from "../utils/text";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { isAuth, username } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            paddingRight: { xs: 1 },
            minHeight: { xs: `${APP_BAR_HEIGHT}px` },
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {label_text.app_bar_title}
          </Typography>
          {isAuth && (
            <>
              <Typography variant="h6" component="span">
                {username}
              </Typography>
              <IconButton
                size="medium"
                color="inherit"
                aria-label="logout"
                sx={{ ml: 1 }}
                onClick={() => {
                  dispatch(setUser({ username: null, token: null }));
                }}
              >
                <Logout />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
