import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InnerSpaceMessenger from "./InnerSpaceMessenger";

test("slides the messenger in at the bottom and back out when scrolling up", () => {
  const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
  const originalInnerHeight = Object.getOwnPropertyDescriptor(window, "innerHeight");
  const originalScrollHeight = Object.getOwnPropertyDescriptor(document.documentElement, "scrollHeight");
  let scrollY = 0;

  Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 1600 });

  try {
    const { container } = render(<MemoryRouter><InnerSpaceMessenger /></MemoryRouter>);
    const messenger = container.querySelector(".innerspace-messenger");
    expect(messenger).toHaveAttribute("aria-hidden", "true");
    expect(messenger).toHaveAttribute("tabindex", "-1");
    expect(screen.queryByRole("link", { name: "Explore InnerSpace" })).not.toBeInTheDocument();

    scrollY = 700;
    fireEvent.scroll(window);
    expect(screen.queryByRole("link", { name: "Explore InnerSpace" })).not.toBeInTheDocument();

    scrollY = 800;
    fireEvent.scroll(window);
    expect(screen.getByRole("link", { name: "Explore InnerSpace" })).toHaveAttribute("href", "/innerspace");
    expect(messenger).toHaveClass("innerspace-messenger--visible");

    scrollY = 300;
    fireEvent.scroll(window);
    expect(container.querySelector(".innerspace-messenger")).toBe(messenger);
    expect(messenger).not.toHaveClass("innerspace-messenger--visible");
    expect(messenger).toHaveAttribute("aria-hidden", "true");
    expect(messenger).toHaveAttribute("tabindex", "-1");
    expect(screen.queryByRole("link", { name: "Explore InnerSpace" })).not.toBeInTheDocument();
  } finally {
    if (originalScrollY) Object.defineProperty(window, "scrollY", originalScrollY);
    if (originalInnerHeight) Object.defineProperty(window, "innerHeight", originalInnerHeight);
    if (originalScrollHeight) Object.defineProperty(document.documentElement, "scrollHeight", originalScrollHeight);
  }
});
