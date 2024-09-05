import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./src/redux/user/UserSlice";
import useForm from "./src/redux/form/FormSlice"

export default configureStore({
  reducer: {
    user: useReducer,
    form: useForm,
   
  },
});