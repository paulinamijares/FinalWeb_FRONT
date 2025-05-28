import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../paginas/login";

test("renders Welcome Back text", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
});
