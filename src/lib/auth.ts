import { supabase } from './supabase';

export interface User {
  id: string;
  name: string;
  username: string;
  monthlyCollection: number;
  cleaning: number;
  commonWork: number;
  funeralFund: number;
  total: number;
  isAdmin: boolean;
  familyPhoto?: string | null;
}

export interface SignInResult {
  success: boolean;
  user?: User;
  isAdmin?: boolean;
  error?: string;
}

export const signIn = async (username: string, password: string): Promise<SignInResult> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid username or password' };
    }

    const user: User = {
      id: data.id,
      name: data.name,
      username: data.username,
      monthlyCollection: data.monthly_collection,
      cleaning: data.cleaning,
      commonWork: data.common_work,
      funeralFund: data.funeral_fund,
      total: data.total,
      isAdmin: data.is_admin,
      familyPhoto: data.family_photo
    };

    // Store user in localStorage for session management
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { 
      success: true, 
      user, 
      isAdmin: data.is_admin 
    };
  } catch (error) {
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const signOut = (): void => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.isAdmin || false;
};