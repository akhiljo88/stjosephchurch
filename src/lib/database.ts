import { supabase } from './supabase';
import type { Database } from './supabase';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data || [];
};

export const addUser = async (userData: {
  name: string;
  username: string;
  password: string;
  monthlyCollection: number;
  cleaning: number;
  commonWork: number;
  funeralFund: number;
}): Promise<User | null> => {
  const total = userData.monthlyCollection + userData.cleaning + userData.commonWork + userData.funeralFund;
  
  const userInsert: UserInsert = {
    name: userData.name,
    username: userData.username,
    password: userData.password,
    monthly_collection: userData.monthlyCollection,
    cleaning: userData.cleaning,
    common_work: userData.commonWork,
    funeral_fund: userData.funeralFund,
    total: total,
    is_admin: false
  };

  const { data, error } = await supabase
    .from('users')
    .insert(userInsert)
    .select()
    .single();

  if (error) {
    console.error('Error adding user:', error);
    return null;
  }

  return data;
};

export const updateUser = async (id: string, updates: {
  name?: string;
  monthlyCollection?: number;
  cleaning?: number;
  commonWork?: number;
  funeralFund?: number;
}): Promise<User | null> => {
  const userUpdate: UserUpdate = {
    updated_at: new Date().toISOString()
  };

  if (updates.name !== undefined) userUpdate.name = updates.name;
  if (updates.monthlyCollection !== undefined) userUpdate.monthly_collection = updates.monthlyCollection;
  if (updates.cleaning !== undefined) userUpdate.cleaning = updates.cleaning;
  if (updates.commonWork !== undefined) userUpdate.common_work = updates.commonWork;
  if (updates.funeralFund !== undefined) userUpdate.funeral_fund = updates.funeralFund;

  // Calculate new total
  if (updates.monthlyCollection !== undefined || updates.cleaning !== undefined || 
      updates.commonWork !== undefined || updates.funeralFund !== undefined) {
    
    // Get current user data to calculate total
    const { data: currentUser } = await supabase
      .from('users')
      .select('monthly_collection, cleaning, common_work, funeral_fund')
      .eq('id', id)
      .single();

    if (currentUser) {
      const monthlyCollection = updates.monthlyCollection ?? currentUser.monthly_collection;
      const cleaning = updates.cleaning ?? currentUser.cleaning;
      const commonWork = updates.commonWork ?? currentUser.common_work;
      const funeralFund = updates.funeralFund ?? currentUser.funeral_fund;
      
      userUpdate.total = monthlyCollection + cleaning + commonWork + funeralFund;
    }
  }

  const { data, error } = await supabase
    .from('users')
    .update(userUpdate)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
};

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  const { error } = await supabase
    .from('contact_messages')
    .insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      message: formData.message
    });

  if (error) {
    console.error('Error submitting contact form:', error);
    return false;
  }

  return true;
};