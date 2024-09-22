import { toast } from "react-toastify";
import { deleteForm, getForm, postForm, updateForm } from "../../helper/axios";
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

export const getApplicatonAction = (page, limit) => async (dispatch) => {
    if (page === undefined || limit === undefined) {
      console.error("Page number and limit must be provided.");
      return;
    }
  
    try {
      const { status, lists, totalPages, totalItems } = await getForm(page, limit);
      
      if (status === "success") {
        dispatch(setform({ lists, totalPages, totalItems}));
      } else {
        console.error('Failed to fetch application data:', lists.message);
      }
    } catch (error) {
      console.error('Error dispatching getApplicatonAction:', error.message);
    }
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


  export const getSelectedAction = (currentPage, limit) => async (dispatch) => {
    const { status, lists, currentPage, limit } = await getForm();
  
    status === "success" && dispatch(setform(lists,currentPage, limit));
  };
