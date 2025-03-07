// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/api';

// Create a Context for the User
const UserContext = createContext();

// Create a Provider Component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the app mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData); // Store user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // If there's an error, reset user state to null
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchUser(); // Call the function to fetch user data
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children} 
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
