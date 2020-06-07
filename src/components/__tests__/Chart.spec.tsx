import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Chart } from "../../index";

test("Renders", async () => {
  const { getByRole } = render(<Chart />);
  expect(getByRole("document")).toBeValid();
});
