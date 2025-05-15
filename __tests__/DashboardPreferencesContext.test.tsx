import {
  DashboardPreferencesProvider,
  useDashboardPreferences,
} from "@/context/DashboardPreferencesContext";
import { render, screen } from "@testing-library/react";
import React from "react";

const TestComponent = () => {
  const {
    showPrivateRepos,
    togglePrivateRepos,
    showRateLimit,
    toggleRateLimit,
  } = useDashboardPreferences();

  return (
    <>
      <p>Private: {showPrivateRepos ? "Yes" : "No"}</p>
      <p>RateLimit: {showRateLimit ? "Yes" : "No"}</p>
      <button onClick={togglePrivateRepos}>Toggle Private</button>
      <button onClick={toggleRateLimit}>Toggle Rate</button>
    </>
  );
};

describe("DashboardPreferencesContext", () => {
  it("toggles preferences", () => {
    render(
      <DashboardPreferencesProvider>
        <TestComponent />
      </DashboardPreferencesProvider>
    );

    expect(screen.getByText(/Private: No/)).toBeInTheDocument();
    expect(screen.getByText(/RateLimit: No/)).toBeInTheDocument();

    screen.getByText("Toggle Private").click();
    screen.getByText("Toggle Rate").click();

    expect(screen.getByText(/Private: Yes/)).toBeInTheDocument();
    expect(screen.getByText(/RateLimit: Yes/)).toBeInTheDocument();
  });
});
