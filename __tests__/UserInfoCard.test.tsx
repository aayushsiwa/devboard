import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserInfoCard from "@/components/dashboard/UserInfoCard";
import { mockUser } from "@/types/github";


describe("UserInfoCard", () => {
  it("renders user login", () => {
    render(<UserInfoCard user={mockUser} loading={false} repos={[]} />);
    expect(screen.getByText("octocat")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<UserInfoCard user={null} loading={true} repos={[]} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
