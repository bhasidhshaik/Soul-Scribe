import axios from 'axios';

// Create an axios instance with a correct base URL
const api = axios.create({
  baseURL: 'https://server-jet-nine-58.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Move this out of headers
});
// Function for Google login
export const googleLogin = async (code) => {
  try {
    // Send the POST request with the authorization code
    const response = await api.post('/auth/google', { code },{
    });
    return response.data;
  } catch (error) {
    // Handle errors gracefully
    console.error('Google login failed:', error.response?.data || error.message);
    throw error;
  }
};
export const getMe = async()=>{
  try {
    const response = await api.get('/auth/me' , {
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user:', error.response?.data || error.message);
    
  }
}
export const createJournal = async(entry)=>{
  try {
    const response = await api.post('/journal/create' , {entry} , {
    } )
    return response;
  } catch (error) {
    console.log("Failed to create " , error);
    
  }

}

export const getJournals = async()=>{
  try {
    const response = await api.get('/journal/journals' , {
      withCredentials:true,
    })
    return response;
  } catch (error) {
    console.log("Error while fetching journals." , error);
    
  }
}