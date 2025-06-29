import { User } from '../types/User';

const USERS_KEY = 'church_users';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = (user: Omit<User, 'id' | 'total'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    total: user.monthlyCollection + user.cleaning + user.commonWork + user.funeralFund
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return null;
  
  const updatedUser = {
    ...users[userIndex],
    ...updates,
    total: (updates.monthlyCollection ?? users[userIndex].monthlyCollection) +
           (updates.cleaning ?? users[userIndex].cleaning) +
           (updates.commonWork ?? users[userIndex].commonWork) +
           (updates.funeralFund ?? users[userIndex].funeralFund)
  };
  
  users[userIndex] = updatedUser;
  saveUsers(users);
  return updatedUser;
};

export const deleteUser = (id: string): boolean => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  saveUsers(filteredUsers);
  return true;
};

export const getUserByCredentials = (username: string, password: string): User | null => {
  const users = getUsers();
  return users.find(user => user.username === username && user.password === password) || null;
};