// src/Table.jsx
import React, { useEffect, useMemo } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { CrudStore } from "../data/CrudStore";

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = () => {
  const { fetchData, addData, updateData, deleteData } = CrudStore();

  const queryClient = new QueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: "data",
    queryFn: fetchData,
  });

  const createMutation = useMutation({ mutationFn: addData });
  const updateMutation = useMutation({ mutationFn: updateData });
  const deleteMutation = useMutation({ mutationFn: deleteData });

  useEffect(() => {
    fetchData();
  }, [
    createMutation.isSuccess,
    updateMutation.isSuccess,
    deleteMutation.isSuccess,
  ]);

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
    data: data || [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowSave: (newItem) => {
      createMutation.mutate(newItem);
    },
    onEditingRowSave: (updatedItem) => {
      updateMutation.mutate(updatedItem);
    },
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
          <IconButton onClick={() => table.editRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => deleteMutation.mutate(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React CRUD App</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data {error.message}</p>}
        {data && <MaterialReactTable table={table} />}
      </div>
    </QueryClientProvider>
  );
};

export default Table;
