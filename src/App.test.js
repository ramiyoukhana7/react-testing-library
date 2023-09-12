import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import UserCard from "./UserCard";
import userEvent from "@testing-library/user-event";

describe("UserCard", () => {
  it("should render given props", () => {
    const user = {
      name: "Emil A",
      email: "EmailsEmail@yahoo.zyx",
      phone: "123-444-555",
    };
    render(<UserCard user={user} />);
    expect(screen.getByText("Emil A")).toBeInTheDocument();
  });
});

test('"loading.." text is visable', () => {
  render(<App />);
  expect(screen.getByText("Loading..")).toBeInTheDocument();
});

it("should display 3 emails", async () => {
  render(<App />);

  await waitFor(
    () => {
      expect(screen.queryByText("Loading..")).not.toBeInTheDocument();
    },
    { timeout: 2000 }
  );

  const button = screen.getByText("Toggle user cards");
  userEvent.click(button);

  await waitFor(() => {
    const emailEl = screen.getAllByText(/@example.com/);
    expect(emailEl.length).toBe(3);
  });
});

it("should display 0 emails", async () => {
  render(<App />);

  await waitFor(
    () => {
      expect(screen.queryByText("Loading..")).not.toBeInTheDocument();
    },
    { timeout: 2000 }
  );

  const button = screen.getByText("Toggle user cards");
  userEvent.click(button);

  const button2 = screen.getByText("Toggle user cards");
  userEvent.click(button2);

  await waitFor(() => {
    expect(screen.queryByText(/@example.com/)).not.toBeInTheDocument();
  });
});

it("should hide users", async () => {
  render(<App />);

  await waitFor(
    () => {
      expect(screen.queryByText("Loading..")).not.toBeInTheDocument();
    },
    { timeout: 2000 }
  );

  const button = screen.getByText("Toggle user cards");
  userEvent.click(button);

  const button2 = screen.getByText("Toggle user cards");
  userEvent.click(button2);

  await waitFor(() => {
    expect(
      screen.queryByText("All users currently hidden")
    ).toBeInTheDocument();
  });
});
