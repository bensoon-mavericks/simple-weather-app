import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

describe("Home", () => {
  it("renders home page", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    const buttons = screen.getAllByRole("button");
    const nowButton = buttons[0];
    const forecastButton = buttons[1];

    expect(heading).toHaveTextContent(/^Simple Weather App$/)
    expect(nowButton).toHaveTextContent(/^Now$/)
    expect(forecastButton).toHaveTextContent(/^Forecast$/)
  });
});
