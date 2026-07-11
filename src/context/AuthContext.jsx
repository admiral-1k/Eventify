import { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import { eventStore } from '../data/eventStore';

const AuthContext = createContext();

const syncLocalUser = (userData) => {
  const users = eventStore.getUsers();
  const nextUsers = users.some((item) => item.id === userData.id || item.email === userData.email)
    ? users.map((item) => (item.id === userData.id || item.email === userData.email ? { ...item, ...userData } : item))
    : [...users, userData];

  eventStore.saveUsers(nextUsers);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    try {
      return storedUser && storedToken ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/users/login', { email, password });
      
      if (response.data.success) {
        const { user: userData, token } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        syncLocalUser(userData);
        
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      const localUser = eventStore
        .getUsers()
        .find((item) => item.email.toLowerCase() === email.toLowerCase());

      const passwordMatches = localUser?.password
        ? localUser.password === password
        : password === 'password' || password.length >= 4;

      if (localUser && passwordMatches) {
        localStorage.setItem('token', `local-token-${localUser.id}`);
        localStorage.setItem('user', JSON.stringify(localUser));
        setUser(localUser);
        return { success: true };
      }

      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Try demo password: password' 
      };
    }
  };

  const register = async (fullname, email, password, role, extra = {}) => {
    try {
      const response = await apiClient.post('/users/register', { 
        fullname, 
        email, 
        password, 
        role,
        ...extra,
      });
      
      if (response.data.success) {
        // Option 1: Auto-login after register
        const { user: userData, token } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        syncLocalUser(userData);
        
        setUser(userData);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      const users = eventStore.getUsers();
      const exists = users.some((item) => item.email.toLowerCase() === email.toLowerCase());

      if (!exists) {
        const localUser = {
          id: Date.now(),
          fullname,
          email,
          role,
          phone: extra.phone || "",
          companyName: role === "eventor" ? extra.companyName || fullname : "",
          accountStatus: role === "eventor" ? "pending" : "approved",
          password,
        };
        eventStore.saveUsers([...users, localUser]);
        localStorage.setItem('token', `local-token-${localUser.id}`);
        localStorage.setItem('user', JSON.stringify(localUser));
        setUser(localUser);
        return { success: true };
      }

      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateLocalPassword = (email, password) => {
    const users = eventStore.getUsers();
    const exists = users.some((item) => item.email.toLowerCase() === email.toLowerCase());

    if (!exists) {
      return { success: false, message: "No account found for that email." };
    }

    eventStore.saveUsers(
      users.map((item) =>
        item.email.toLowerCase() === email.toLowerCase() ? { ...item, password } : item
      )
    );
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateLocalPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
