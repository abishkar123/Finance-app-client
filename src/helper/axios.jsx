import axios from 'axios';

const rootUrl = "http://finance-backend-env-env.eba-pcmrgz3r.ap-southeast-2.elasticbeanstalk.com/api/v1"

// const rootUrl = import.meta.env.MODE === 'production' 
//   // ? import.meta.env.VITE_ROOT_API 
//   : 'http://localhost:8000/api/v1';


const clientapi = `${rootUrl}/user`;
const applicationApi = `${rootUrl}/form`;


//user
export const postNewUser = async (userData) => {
  try {
    const { data } = await axios.post(`${clientapi}/login`, userData);
    return data;
  } catch (error) {
    console.error("Error posting new user:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const GetUser = async () => {
  try {
    const { data } = await axios.get(`${clientapi}/user-profile`); 
    return data;
  } catch (error) {
    console.error("Error getting user:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};

//form-application 

export const postForm = async (userData) => {
  try {
    const { data } = await axios.post(`${applicationApi}`, userData);
    return data;
  } catch (error) {
    console.error("Error posting new user:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const getForm = async () => {
  try {
    const { data } = await axios.get(`${applicationApi}`);
    return data;
  } catch (error) {
    console.error("Error geting lists of applications:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};


export const deleteForm = async (_ids) => {
  try {
    console.log(_ids)
    const {data } = await axios.delete(`${applicationApi}`, {data:_ids});
    return data;
  } catch (error) {
    console.error("Error deleting of lists of your applications:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};

export const updateForm = async (data) => {
  try {
    const { rosponse } = await axios.put(`${applicationApi}`, data);
    return rosponse;
  } catch (error) {
    console.error("Error upate of lists of your applications:", error); 
    return {
      status: 'error',
      message: error.message,
    };
  }
};

