import axios from 'axios';

const rootUrl = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_ROOT_API 
  : 'http://localhost:8000/api/v1';

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
