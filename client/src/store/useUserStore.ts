import { create } from 'zustand';
import axios from 'axios';
import { IUserStore, IUser, IGetData, IDeleteData, IUpdateData } from '../interfaces';

const API_URL = 'http://localhost:5000/api/v1';

const useUserStore = create<IUserStore>((set) => ({
  users: [],
  getUsers: async () => {
    const { data } = await axios.get<IGetData>(`${API_URL}/users`);
    set({ users: data.users });
    return data;
  },
  createUser: async (user) => {
    const response = await axios.post<IUser>(`${API_URL}/users`, user);
    set((state) => ({ users: [...state.users, response.data] }));
  },
  updateUser: async (id, user) => {
    const { data } = await axios.patch<IUpdateData>(`${API_URL}/users/${id}`, user);
    set((state) => ({ users: state.users.map(user => user.id === id ? data.user : user) }));
    return data;
  },
  deleteUser: async (id) => {
    const { data } = await axios.delete<IDeleteData>(`${API_URL}/users/${id}`);
    set((state) => ({ users: state.users.filter(user => user.id !== id) }));
    return data;
  }
}));

export default useUserStore;