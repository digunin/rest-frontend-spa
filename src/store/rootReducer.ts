import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";
import databaseReducer from "./database/databaseSlice";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
  databaseState: databaseReducer,
};
