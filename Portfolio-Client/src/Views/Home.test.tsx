import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import Nav from "../Components/UI/Portfolio/Nav";

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

test("the site name links to the home page", () => {
  render(<Nav />);

  expect(screen.getByRole("link", { name: "Héctor Magaña" })).toHaveAttribute(
    "href",
    "/"
  );
});
