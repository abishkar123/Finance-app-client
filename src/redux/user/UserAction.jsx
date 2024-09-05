import { toast } from "react-toastify";
import { GetUser, postNewUser } from "../../helper/axios"
import { setUser, logout } from "./UserSlice";

export const loginAction = (formDt) => async (dispatch) => {
    try {
      
      const pendingResp = await postNewUser(formDt)
    
      const { status, message, user } = pendingResp;
  
      toast[status](message);
  
      if (status === 'success') {
        dispatch(setUser(user)); 
       
      }
  
    } catch (error) {
     
      toast.error('An error occurred during login');
      return {
        status: 'error',
        message: error.message,
      };
    }
  };

export const logoutAction = () => (dispatch)=>{
    dispatch(logout());

  }
// export const getAdminProfile =() =>async(dispatch)=>{
//     const {status, users} = await GetUser();
    
//     status === "success"
//     ? dispatch(setUser(users))
//     : dispatch(setUser({})); 
//     };


