import React, { useMemo } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    city: "New York",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 30,
    city: "Los Angeles",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 28,
    city: "Chicago",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    age: 22,
    city: "San Francisco",
  },
  {
    id: 5,
    name: "Eva Davis",
    email: "eva.davis@example.com",
    age: 35,
    city: "Miami",
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    age: 32,
    city: "Houston",
  },
  {
    id: 7,
    name: "Sara Miller",
    email: "sara.miller@example.com",
    age: 27,
    city: "Seattle",
  },
  {
    id: 8,
    name: "David Wilson",
    email: "david.wilson@example.com",
    age: 40,
    city: "Denver",
  },
  {
    id: 9,
    name: "Olivia White",
    email: "olivia.white@example.com",
    age: 24,
    city: "Atlanta",
  },
  {
    id: 10,
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    age: 29,
    city: "Boston",
  },
];

const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "city",
        header: "City",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userData,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowSave: () => {},
    onEditingRowSave: () => {},
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => {}}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
