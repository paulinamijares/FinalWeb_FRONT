import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Ensure correct navigation handling

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <AppBar position="static" sx={{ backgroundColor: "#c2185b", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e91e63" },
            }}
            onClick={() => navigate("/login")} // Now functional!
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
