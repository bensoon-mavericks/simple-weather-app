import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

describe("Home", () => {
  it("renders home page", () => {
    render(Home());

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
