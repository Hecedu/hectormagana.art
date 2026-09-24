import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

jest.mock("../Components/Portfolio/AsciiBanner", () => () => (
  <div data-testid="ascii-banner" />
));

test("shows the banner and projects without the presentation card", () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByTestId("ascii-banner")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Storefront" })).toBeInTheDocument();
  expect(container.querySelector("#me")).not.toBeInTheDocument();
});
