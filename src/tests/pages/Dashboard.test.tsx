import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";

describe("Dashboard", () => {
  test("renders Dashboard", () => {
    render(<Dashboard />);
  });
});
