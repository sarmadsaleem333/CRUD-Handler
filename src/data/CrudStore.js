// src/data/CrudStore.js
import { fetchData, addData, updateData, deleteData } from "../backend/api";
import { create } from "zustand";

const CrudStore = create((set) => {
  set({ data: [], loading: false, error: null });

  return {
    fetchData: async () => {
      try {
        set({ loading: true });
        const response = await fetchData();
        return response;
      } catch (error) {
        set({ loading: false, error });
      }
    },
    addData: async (newData) => {
      try {
        set({ loading: true });
        const response = await addData(newData);
        set({ data: response, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
    updateData: async (id, updatedData) => {
      try {
        set({ loading: true });
        const response = await updateData(id, updatedData);
        set({ data: response, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
    deleteData: async (id) => {
      try {
        set({ loading: true });
        const response = await deleteData(id);
        set({ data: response, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
  };
});

export { CrudStore };
