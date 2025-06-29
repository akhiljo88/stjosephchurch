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
      monthlyCollection: data.monthly_collection || 0,
      cleaning: data.cleaning || 0,
      commonWork: data.common_work || 0,
      funeralFund: data.funeral_fund || 0,
      total: data.total || 0,
      isAdmin: data.is_admin || false,
      familyPhoto: data.family_photo || null
    };

    // Create a copy of user object without familyPhoto for localStorage
    const userForStorage = {
      id: user.id,
      name: user.name,
      username: user.username,
      monthlyCollection: user.monthlyCollection,
      cleaning: user.cleaning,
      commonWork: user.commonWork,
      funeralFund: user.funeralFund,
      total: user.total,
      isAdmin: user.isAdmin
      // Explicitly exclude familyPhoto to prevent localStorage quota issues
    };

    // Store user in localStorage for session management (without familyPhoto)
    localStorage.setItem('currentUser', JSON.stringify(userForStorage));

    return { 
      success: true, 
      user, // Return full user object including familyPhoto
      isAdmin: data.is_admin || false
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
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