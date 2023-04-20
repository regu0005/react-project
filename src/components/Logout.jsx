import { useEffect } from 'react';
import { useToken } from '../context/TokenContext';

export function Logout() {
  const [token, setToken] = useToken();

  useEffect(() => {
    sessionStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  }, []);

  return null;
}