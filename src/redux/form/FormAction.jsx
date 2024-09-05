import { toast } from "react-toastify";
import { deleteForm, getForm, postForm, updateForm } from "../../helper/axios";
import { setform } from "./FormSlice";


export const CreateFormAction = (formDt) => async (dispatch) => {
    try {
      console.log(formDt)
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
  
    status === "success" && dispatch(setform(lists));
  };

  export const deleteApplicationAction = (arrg) => async (dispatch) => {
    const resultPending = deleteForm(arrg)
    
   
    toast.promise(resultPending, {
      pending: "please wait ....",
    });
  
    const { status, message } = await resultPending;
    console.log(status, message)
    toast[status](message);
    
  
    status === "success" && dispatch(getApplicatonAction());
  };

  export const updateApplicationAction = (obj) => async (dispatch) => {
    const respPromise = updateForm(obj)
  
  
    toast.promise(respPromise, {
      pending: "Please wait....",
    });
  
    const { status, message } = await respPromise;
  
    toast[status](message);
  
    status === "success" && dispatch(getApplicatonAction(obj._id));
  };
