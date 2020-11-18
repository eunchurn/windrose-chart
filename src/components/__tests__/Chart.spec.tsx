import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Chart from "../../index";
import "jest-styled-components";

describe("<Chart />", () => {
  it("matches snapshot", () => {
    const utils = render(<Chart />);
    expect(utils.container).toMatchSnapshot();
  });
});

// test("Renders", async () => {
//   const {  } = render(<Chart />);
//   expect(getByRole("document")).toBeValid();
// });
