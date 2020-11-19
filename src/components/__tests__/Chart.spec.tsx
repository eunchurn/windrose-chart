import * as React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Chart from "../../index";
import "jest-styled-components";

describe("<Chart />", () => {
  it("matches snapshot", () => {
    const utils = render(<Chart />);
    expect(utils.container).toMatchSnapshot();
  });
  it("should matches onmouseover snapshot", async () => {
    try {
      render(<Chart />);
      console.log("before", screen.getByTestId("test_1"));
      console.log("beforeScreen", screen);
      fireEvent.mouseOver(screen.getByTestId("test_1"));
      await waitFor(() => screen.getByTestId("test_1"));
      console.log("afterScreen", screen);
      console.log("after", screen.getByTestId("test_1"));
    } catch (e) {
      console.log(e);
    }
  });
});

// test("Renders", async () => {
//   const {  } = render(<Chart />);
//   expect(getByRole("document")).toBeValid();
// });
