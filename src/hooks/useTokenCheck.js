import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const token = JSON.parse(user).token;
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    }, 5 * 60 * 1000); // Chequea cada 5 minutos

    return () => clearInterval(interval);
  }, [navigate]);
};

export default useTokenCheck;
