import userReducer from "./userSlice";
import loginFormReducer from "./form/loginFormSlice";
import dbRecordFormReducer from "./form/DBRecordFormSlice";
import { signInAPI } from "../api/authAPI";
import { databaseAPI } from "./../api/databaseAPI";
import databaseErrorReducer from "./databaseErrorSlice";
import editedRecordReducer from "./editedRecordSlice";

export default {
  userState: userReducer,
  loginFormState: loginFormReducer,
  dbRecordFormState: dbRecordFormReducer,
  databaseErrorState: databaseErrorReducer,
  [signInAPI.reducerPath]: signInAPI.reducer,
  [databaseAPI.reducerPath]: databaseAPI.reducer,
  editedRecordState: editedRecordReducer,
};
