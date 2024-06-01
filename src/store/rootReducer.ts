import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";
import databaseReducer from "./database/databaseSlice";
import overlayReducer from "./overlaySlice";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
  databaseState: databaseReducer,
  overlayState: overlayReducer,
};
