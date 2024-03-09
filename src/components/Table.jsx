import React, { useEffect, useMemo } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { CrudStore } from "../data/CrudStore";
import * as Yup from "yup";
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
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  city: Yup.string().required("City is required"),
});

const Table = () => {
  const { fetchData, addData, updateData, deleteData, data } = CrudStore();

  const queryClient = new QueryClient();

  const { isLoading, isError, error } = useQuery({
    queryFn: fetchData,
  });

  const createMutation = useMutation({ mutationFn: addData });
  const updateMutation = useMutation({ mutationFn: updateData });
  const deleteMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries("getData");
    },
  });

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
      createMutation.mutate(newItem.values);
    },
    onEditingRowSave: (updatedItem) => {
      console.log(updatedItem.row.id);
      console.log(updatedItem.values);
      updateMutation.mutate(updatedItem.row.id, updatedItem.values);
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
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    onCreatingRowSave: async (newItem) => {
      try {
        await validationSchema.validate(newItem.values, { abortEarly: false });
        createMutation.mutate(newItem.values);
      } catch (error) {
        alert(error.errors[0]);
      }
    },

    onEditingRowSave: async (updatedItem) => {
      try {
        await validationSchema.validate(updatedItem.values, {
          abortEarly: false,
        });
        updateMutation.mutate(updatedItem);
      } catch (error) {
        alert(error.errors[0]);
      }
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained "
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
  });

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(row.original.id);
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React CRUD App</h1>
        <div></div>
        {data && <MaterialReactTable table={table} />}
      </div>
    </QueryClientProvider>
  );
};

export default Table;
