import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders welcome message", () => {
    const { getByText } = render(<App />);
    const heading = getByText(/Welcome to Brennan's React Applications!/i);
    expect(heading).toBeInTheDocument();
});
