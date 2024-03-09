// src/data/CrudStore.js
import { create } from "zustand";

const CrudStore = create((set) => {
  set({ data: [], loading: false, error: null });

  return {
    fetchData: async () => {
      try {
        set({ loading: true });
        const response = await fetch("http://localhost:3333/route/getData");
        const data = await response.json();
        console.log(data);

        set({ data, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
    addData: async (newData) => {
      try {
        set({ loading: true });
        const response = await fetch("http://localhost:3333/route/addData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });
        const addedData = await response.json();
        set({
          data: [...CrudStore.getState().data, addedData],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.log(error.message);
        set({ loading: false, error });
      }
    },
    updateData: async (id, updatedData) => {
      try {
        console.log("he");
        console.log(id);
        console.log("object");
        console.log(updatedData.value);
        set({ loading: true });
        const response = await fetch(
          `http://localhost:3333/route/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );
        const updatedItem = await response.json();
        const updatedIndex = CrudStore.getState().data.findIndex(
          (item) => item.id === id
        );
        const updatedDataArray = [...CrudStore.getState().data];
        updatedDataArray[updatedIndex] = updatedItem;
        set({ data: updatedDataArray, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
    deleteData: async (id) => {
      try {
        set({ loading: true });
        await fetch(`http://localhost:3333/route/delete/${id}`, {
          method: "DELETE",
        });
        const updatedDataArray = CrudStore.getState().data.filter(
          (item) => item.id !== id
        );
        set({ data: updatedDataArray, loading: false, error: null });
      } catch (error) {
        set({ loading: false, error });
      }
    },
  };
});

export { CrudStore };
