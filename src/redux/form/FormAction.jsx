import { toast } from "react-toastify";
import { getForm, postForm } from "../../helper/axios";
import { setform } from "./FormSlice";


export const CreateFormAction = (formDt) => async (dispatch) => {
    try {
      
      const pendingResp = await postForm(formDt)
  
      const { status, message} = pendingResp;
  
      toast[status](message);
  
      if (status === 'success') {
      }
  
    } catch (error) {
     
      toast.error('An error occurred during login');
      return {
        status: 'error',
        message: error.message,
      };
    }
  };

  export const getApplicatonAction = () => async (dispatch) => {
    const { status, lists } = await getForm();
   console.log(lists)
    status === "success" && dispatch(setform(lists));
  };