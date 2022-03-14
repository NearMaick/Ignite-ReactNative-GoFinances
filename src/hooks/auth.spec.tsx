import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";
import { AuthProvider, useAuth } from "./auth";

fetchMock.enableMocks();

fetchMock.mockResponse(
  JSON.stringify({
    id: "id_test",
    email: "test@email.com",
    name: "John doe",
    photo: "any_photo.png",
  })
);

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo-auth-session", () => ({
  startAsync: () => ({
    type: "success",
    params: { access_token: "any_token" },
  }),
}));

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user.email).toBe("test@email.com");
  });
});
