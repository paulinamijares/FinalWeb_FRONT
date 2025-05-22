import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "../assets/Navbar";
import { getToken, isTokenValid } from "../utils/tokenUtils";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/users`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token && !hasRedirected.current) {
      console.error("No token found. Redirecting to login.");
      hasRedirected.current = true;
      navigate("/login", { replace: true });
      return;
    }

    const checkTokenAndFetch = async () => {
      const valid = await isTokenValid(token);
      if (valid) {
        fetchUsers(token);
      } else if (!hasRedirected.current) {
        console.error("Invalid or expired token. Redirecting to login.");
        hasRedirected.current = true;
        navigate("/login", { replace: true });
      }
    };

    checkTokenAndFetch();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_SERVER}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditOpen = (user) => {
    setEditUser(user);
  };

  const handleEditClose = () => {
    setEditUser(null);
  };

  const handleEditSave = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER}/users/${editUser.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    });

    if (!response.ok) throw new Error("Failed to update user");

    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    handleEditClose();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};


  if (loading) {
    return <Typography variant="h5" sx={{ textAlign: "center", mt: 3 }}>Loading...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container
        maxWidth={false}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #ff758c, #ff7eb3)",
          py: 5,
        }}
      >
        <Box
          sx={{
            width: "60%",
            p: 3,
            bgcolor: "rgba(255,255,255,0.95)",
            borderRadius: 3,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, color: "#c2185b", textAlign: "center" }}
          >
            User Dashboard
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Table sx={{ width: "90%" }}>
              <TableHead>
                <TableRow>
                  {["ID", "Name", "Email", "Actions"].map((header) => (
                    <TableCell key={header} sx={{ textAlign: "center", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ textAlign: "center" }}>{user.id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.username}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button variant="outlined" color="primary" onClick={() => handleEditOpen(user)}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        sx={{ ml: 2 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Edit Dialog */}
        <Dialog open={!!editUser} onClose={handleEditClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            {editUser && (
              <>
                <TextField
                  label="Name"
                  fullWidth
                  margin="dense"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="dense"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="error">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard;
