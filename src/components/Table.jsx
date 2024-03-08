import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    name: {
      firstName: "Ali",
      lastName: "Khan",
    },
    address: "123 Main Street",
    email: "ali.khan@example.com",
    city: "Karachi",
  },
  {
    name: {
      firstName: "Sara",
      lastName: "Ahmed",
    },
    address: "456 Park Avenue",
    email: "sara.ahmed@example.com",
    city: "Lahore",
  },
  {
    name: {
      firstName: "Ahmed",
      lastName: "Malik",
    },
    address: "789 Crescent Road",
    email: "ahmed.malik@example.com",
    city: "Islamabad",
  },
  {
    name: {
      firstName: "Aisha",
      lastName: "Khan",
    },
    address: "987 Liberty Street",
    email: "aisha.khan@example.com",
    city: "Rawalpindi",
  },
  {
    name: {
      firstName: "Amir",
      lastName: "Raza",
    },
    address: "543 Sunset Boulevard",
    email: "amir.raza@example.com",
    city: "Faisalabad",
  },
];

const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName",
        header: "First Name",
        size: 150,
      },

      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
