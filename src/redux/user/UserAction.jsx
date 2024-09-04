import { toast } from "react-toastify";
import { GetUser, postNewUser } from "../../helper/axios"
import { setUser } from "./UserSlice";

export const loginAction = (formDt) => async (dispatch) => {
    try {
      
  
      const pendingResp = await postNewUser(formDt)
      console.log(pendingResp)
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
// export const getAdminProfile =() =>async(dispatch)=>{
//     const {status, users} = await GetUser();
    
//     status === "success"
//     ? dispatch(setUser(users))
//     : dispatch(setUser({})); 
//     };


