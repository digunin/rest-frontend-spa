import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";
import overlayReducer from "./overlaySlice";
import { signInAPI } from "../api/authAPI";
import { databaseAPI } from "./../api/databaseAPI";
import databaseErrorReducer from "./databaseErrorSlice";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
  overlayState: overlayReducer,
  databaseErrorState: databaseErrorReducer,
  [signInAPI.reducerPath]: signInAPI.reducer,
  [databaseAPI.reducerPath]: databaseAPI.reducer,
};
