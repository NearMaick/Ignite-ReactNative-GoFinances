import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";
import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/core", () => ({ useNavigation: () => jest.fn() }));
jest.mock("../../hooks/auth", () => ({
  useAuth: () => ({ user: { id: "any-id" } }),
}));

describe("Register Screen", () => {
  it("should open category modal when user click on button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("category-modal");
    const categorySelectButton = getByTestId("category-select-button");
    fireEvent.press(categorySelectButton);

    await waitFor(
      () => {
        expect(categoryModal.props.visible).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });
});
