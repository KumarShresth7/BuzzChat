import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { baseUrl } from '../baseUrl';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('token'); // Replace with your method of storing tokens
      const config = {
        headers:{
            'Content-Type':'application/json',
            'auth-token': token
        },
    }

      if (token) {
        axios.get(`${baseUrl}/api/auth/me`,config)
        .then(({ data }) => {
          console.log(data)
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
      } else {
        console.error('No token found');
      }
    }
  }, []); // Adding user to the dependency array to ensure it only runs when user is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
