import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/tokenUtils";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked");
    setLoading(true);

    const result = await loginUser(email, password);

    if (result.success) {
      console.log(result.message);
      if (onLoginSuccess) {
        await onLoginSuccess();
      }
      navigate("/dashboard");
    } else {
      alert(result.message);
    }

    setLoading(false);
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
          Welcome Back
        </Typography>

        <Box sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { borderRadius: 2 },
            }}
            value={email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiInputBase-root": { borderRadius: 2 },
            }}
            value={password}
          />
          <Grid container spacing={2} sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2, width: "100%" }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  backgroundColor: "#d81b60",
                  "&:hover": { backgroundColor: "#ad1457" },
                }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/registro")}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  borderColor: "#d81b60",
                  color: "#d81b60",
                  "&:hover": { backgroundColor: "#fce4ec" },
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
