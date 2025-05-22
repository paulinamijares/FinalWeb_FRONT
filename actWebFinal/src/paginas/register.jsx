import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";

const RegistroPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    console.log("User registered:", data);

    // Redirigir al login o mostrar éxito
    alert("Registration successful! Please log in.");
    window.location.href = "/login";
  } catch (error) {
    console.error("Error registering user:", error);
    alert(`Registration failed: ${error.message}`);
  }
};

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: "90%", sm: "70%", md: "40%" },
          p: "2rem",
          borderRadius: 3,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          bgcolor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ typography: { xs: "h5", md: "h4" }, color: "#c2185b" }}
        >
          Create an Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Username"
            name="username"
            type="text"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={handleChange}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { borderRadius: 2 },
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={handleChange}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { borderRadius: 2 },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={handleChange}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { borderRadius: 2 },
            }}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "60%",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                backgroundColor: "#d81b60",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#ad1457" },
              }}
            >
              Register
            </Button>
          </Box>

          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Already registered?{" "}
            <Link href="/login" underline="hover" sx={{ color: "#d81b60", fontWeight: "bold" }}>
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistroPage;
