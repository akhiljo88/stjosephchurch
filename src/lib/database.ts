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
  familyPhoto?: string | null;
  isAdmin?: boolean;
}): Promise<User | null> => {
  // For admin users, set financial amounts to 0
  const monthlyCollection = userData.isAdmin ? 0 : userData.monthlyCollection;
  const cleaning = userData.isAdmin ? 0 : userData.cleaning;
  const commonWork = userData.isAdmin ? 0 : userData.commonWork;
  const funeralFund = userData.isAdmin ? 0 : userData.funeralFund;
  
  const total = monthlyCollection + cleaning + commonWork + funeralFund;
  
  const userInsert: UserInsert = {
    name: userData.name,
    username: userData.username,
    password: userData.password,
    monthly_collection: monthlyCollection,
    cleaning: cleaning,
    common_work: commonWork,
    funeral_fund: funeralFund,
    total: total,
    is_admin: userData.isAdmin || false,
    family_photo: userData.familyPhoto || null
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
  familyPhoto?: string | null;
}): Promise<User | null> => {
  const userUpdate: UserUpdate = {
    updated_at: new Date().toISOString()
  };

  if (updates.name !== undefined) userUpdate.name = updates.name;
  if (updates.monthlyCollection !== undefined) userUpdate.monthly_collection = updates.monthlyCollection;
  if (updates.cleaning !== undefined) userUpdate.cleaning = updates.cleaning;
  if (updates.commonWork !== undefined) userUpdate.common_work = updates.commonWork;
  if (updates.funeralFund !== undefined) userUpdate.funeral_fund = updates.funeralFund;
  if (updates.familyPhoto !== undefined) userUpdate.family_photo = updates.familyPhoto;

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

// Event management functions
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
};

export const addEvent = async (eventData: {
  title: string;
  description: string;
  date: string;
  time: string;
}) => {
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding event:', error);
    return null;
  }

  return data;
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    return false;
  }

  return true;
};

export const updateEvent = async (id: string, eventData: {
  title: string;
  description: string;
  date: string;
  time: string;
}) => {
  const { data, error } = await supabase
    .from('events')
    .update({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    return null;
  }

  return data;
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

// Media management functions
export const addMedia = async (mediaData: {
  title: string;
  description: string;
  category: string;
  type: string;
  src: string;
  filename: string;
}) => {
  const { data, error } = await supabase
    .from('media')
    .insert({
      title: mediaData.title,
      description: mediaData.description,
      category: mediaData.category,
      type: mediaData.type,
      src: mediaData.src,
      filename: mediaData.filename
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding media:', error);
    return null;
  }

  return data;
};

export const getMedia = async () => {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching media:', error);
    return [];
  }

  return data || [];
};

// Family management functions
export const addFamily = async (familyData: {
  headOfFamily: string;
  contactNumber: string;
  address: string;
  numberOfMembers: number;
  members: any[];
  familyPhoto?: string | null;
}) => {
  const { data, error } = await supabase
    .from('families')
    .insert({
      head_of_family: familyData.headOfFamily,
      contact_number: familyData.contactNumber,
      address: familyData.address,
      number_of_members: familyData.numberOfMembers,
      members: familyData.members,
      family_photo: familyData.familyPhoto || null
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding family:', error);
    return null;
  }

  return data;
};

export const getFamilies = async () => {
  const { data, error } = await supabase
    .from('families')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching families:', error);
    return [];
  }

  // Transform the data to match our interface
  return (data || []).map(family => ({
    id: family.id,
    headOfFamily: family.head_of_family,
    contactNumber: family.contact_number,
    address: family.address,
    numberOfMembers: family.number_of_members,
    members: family.members || [],
    familyPhoto: family.family_photo,
    created_at: family.created_at
  }));
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