import { useState, useEffect } from 'react';

interface User {
  token: string;
  username: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // On mount, check if a token exists in session storage
    // If it does, that means the user is logged in
    const token = window.sessionStorage.getItem('jwtToken');
    const username = window.sessionStorage.getItem('username');

    if (token && username) {
      setUser({ token, username });
    }
  }, []);

  return { user, setUser }; 
};

export default useUser;
