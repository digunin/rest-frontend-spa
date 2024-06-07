import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";
import databaseReducer from "./database/databaseSlice";
import overlayReducer from "./overlaySlice";
import { signInAPI } from "../api/authAPI";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
  databaseState: databaseReducer,
  overlayState: overlayReducer,
  [signInAPI.reducerPath]: signInAPI.reducer,
};
