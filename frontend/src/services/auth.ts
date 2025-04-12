import api from './api';

export interface SignupData {
  email: string;
  password: string;
  role: 'USER' | 'SELLER';
}

export interface SigninData {
    email: string;
    password: string;
}

/**
 * Calls the backend API to sign up a new user or seller.
 * @param data Signup data containing email, password, and role.
 * @returns API response data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signup = async (data: SignupData): Promise<any> => {
  try {
    const response = await api.post('/auth/signup/user', data);
    return response.data;
  } catch (error) {
    // You can enhance error handling here as needed
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const usersignin = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/signin/user', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signin failed');
    }
    };

export const sellersignin = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/signin', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Signin failed');
    }
}

