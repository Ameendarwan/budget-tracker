import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const ALLOWED_ROLES = {
  admin: 'admin',
  user: 'user',
};

export interface MyToken {
  id: string;
  scope: string;
  user: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const auth = {
  token: () => Cookies.get('token'),

  saveToken: (token: string) => {
    Cookies.set('token', token);
  },

  getDecodedToken: () => {
    const token = Cookies.get('token');
    if (!token) return null;
    try {
      return jwtDecode<MyToken>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  },

  getUserRole: () => {
    const decoded = auth.getDecodedToken();
    return decoded?.role || null;
  },

  isTokenExpired: () => {
    const decodedToken = auth.getDecodedToken();
    if (!decodedToken) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  },

  clearToken: () => {
    Cookies.remove('token');
  },
};

export default auth;
