import * as yup from "yup";
import axios from "axios";
const schema = yup.object().shape({
  name: yup.string().required("Nqme is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  address: yup.string().required("Address is required"),
});

const fetchData = async () => {
  try {
    const response = await fetch("./data.json");

    // Check if the response status is okay (200)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Extract and log the data
    const data = await response.json();
    console.log("Response data is: ");
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // You might want to handle the error in the calling code
  }
};
// let data = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     age: 25,
//     city: "New York",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     age: 30,
//     city: "Los Angeles",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob.johnson@example.com",
//     age: 28,
//     city: "Chicago",
//   },
//   {
//     id: 4,
//     name: "Alice Williams",
//     email: "alice.williams@example.com",
//     age: 22,
//     city: "San Francisco",
//   },
//   {
//     id: 5,
//     name: "Eva Davis",
//     email: "eva.davis@example.com",
//     age: 35,
//     city: "Miami",
//   },
//   {
//     id: 6,
//     name: "Michael Brown",
//     email: "michael.brown@example.com",
//     age: 32,
//     city: "Houston",
//   },
//   {
//     id: 7,
//     name: "Sara Miller",
//     email: "sara.miller@example.com",
//     age: 27,
//     city: "Seattle",
//   },
//   {
//     id: 8,
//     name: "David Wilson",
//     email: "david.wilson@example.com",
//     age: 40,
//     city: "Denver",
//   },
//   {
//     id: 9,
//     name: "Olivia White",
//     email: "olivia.white@example.com",
//     age: 24,
//     city: "Atlanta",
//   },
//   {
//     id: 10,
//     name: "Daniel Lee",
//     email: "daniel.lee@example.com",
//     age: 29,
//     city: "Boston",
//   },
// ];

// const response = data;
// return response;

const addData = async (newData) => {
  await schema.validate(newData, { abortEarly: false });
  const data = await fetchData();
  const updatedData = [...data, { id: data.length + 1, ...newData }];
  //   await saveData(updatedData);
  return updatedData;
};

const updateData = async (id, updatedData) => {
  await schema.validate(updatedData, { abortEarly: false });

  const currentData = await fetchData();
  const index = currentData.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    currentData[index] = { ...currentData[index], ...updatedData };
  }
  //   await saveData(currentData);
  return currentData;
};

const deleteData = async (id) => {
  const currentData = await fetchData();
  const updatedData = currentData.filter((entry) => entry.id !== id);
  //   await saveData(updatedData);
  return updatedData;
};

export { fetchData, addData, updateData, deleteData };
