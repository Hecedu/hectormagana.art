import React from "react";
import { render, screen } from "@testing-library/react";
import InnerSpace from "./InnerSpace";

test("shows the InnerSpace scene and teaser copy", () => {
  render(<InnerSpace />);

  expect(screen.getByRole("img", { name: /moonlit river/ })).toBeInTheDocument();
  expect(screen.getByText("Water from the heavens always makes it to the sea—will you be able to make it there too?")).toBeInTheDocument();
});
