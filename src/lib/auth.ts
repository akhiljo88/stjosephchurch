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

    // Store user in localStorage for persistent session management
    localStorage.setItem('currentUser', JSON.stringify(userForStorage));
    
    // Also store authentication state separately for quick checks
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', data.is_admin ? 'admin' : 'user');

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

// New function to get complete user data including family photo
export const getCurrentUserWithPhoto = async (): Promise<User | null> => {
  try {
    const localUser = getCurrentUser();
    if (!localUser) return null;

    // Fetch complete user data from database including family photo
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', localUser.id)
      .single();

    if (error || !data) {
      console.error('Error fetching user with photo:', error);
      return localUser; // Return local user as fallback
    }

    return {
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
  } catch (error) {
    console.error('Error getting current user with photo:', error);
    return getCurrentUser(); // Return local user as fallback
  }
};

export const signOut = (): void => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userRole');
};

export const isAuthenticated = (): boolean => {
  // Check both the user data and authentication flag for reliability
  const authFlag = localStorage.getItem('isAuthenticated');
  const user = getCurrentUser();
  return authFlag === 'true' && user !== null;
};

export const isAdmin = (): boolean => {
  // Check both the stored role and user data for reliability
  const userRole = localStorage.getItem('userRole');
  const user = getCurrentUser();
  return userRole === 'admin' && user?.isAdmin === true;
};

export const isUser = (): boolean => {
  // Check if authenticated but not admin
  const userRole = localStorage.getItem('userRole');
  const user = getCurrentUser();
  return userRole === 'user' && user?.isAdmin === false;
};