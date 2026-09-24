import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AsciiBanner from "../Portfolio/AsciiBanner";
import { ansiColor, renderAnsiBorderCell } from "../Portfolio/asciiFrames";
import BbsPageFrame from "./BbsPageFrame";
import PortfolioLayout from "./Portfolio/PortfolioLayout";
import TerminalLayout from "./The_Terminal/TerminalLayout";

jest.mock("typewriter-effect", () => () => null);

test("frames portfolio page content without a top navigation", () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route element={<PortfolioLayout />}>
          <Route path="/" element={<p>Portfolio content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const frame = container.querySelector(".bbs-page-frame");
  expect(frame).toContainElement(screen.getByText("Portfolio content"));
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  expect(frame).not.toContainElement(screen.getByText("Thank you for your time!"));
});

test("frames terminal page content without a top navigation", () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/terminal"]}>
      <Routes>
        <Route element={<TerminalLayout />}>
          <Route path="/terminal" element={<p>Terminal content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const frame = container.querySelector(".bbs-page-frame");
  expect(frame).toContainElement(screen.getByText("Terminal content"));
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
});

test("page border follows the banner's selected ANSI border theme", () => {
  const originalBounds = HTMLElement.prototype.getBoundingClientRect;
  const bounds = jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    if (this.classList.contains("bbs-page-frame")) return { width: 320, height: 320 } as DOMRect;
    return originalBounds.call(this);
  });
  const random = jest.spyOn(Math, "random").mockReturnValue(0.999999);

  try {
    const { container } = render(<BbsPageFrame><AsciiBanner /></BbsPageFrame>);
    const top = container.querySelector(".bbs-page-frame__top")!;
    const left = container.querySelector(".bbs-page-frame__left")!;
    const columns = top.querySelectorAll("span").length;
    const rows = left.querySelectorAll("span").length;
    const secondCell = () => top.querySelectorAll("span")[1];

    expect(secondCell().textContent).toBe(renderAnsiBorderCell(0, 1, 0, columns, rows, 0).char);
    fireEvent.keyDown(window, { key: "B", code: "KeyB", shiftKey: true, metaKey: true });
    fireEvent.click(screen.getByRole("button", { name: "Matrix" }));

    const matrixCell = renderAnsiBorderCell(6, 1, 0, columns, rows, 0);
    expect(secondCell().textContent).toBe(matrixCell.char);
    expect(secondCell()).toHaveStyle({ color: ansiColor(matrixCell.fg) });
  } finally {
    bounds.mockRestore();
    random.mockRestore();
  }
});
