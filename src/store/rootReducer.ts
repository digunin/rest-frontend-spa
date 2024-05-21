import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
};
