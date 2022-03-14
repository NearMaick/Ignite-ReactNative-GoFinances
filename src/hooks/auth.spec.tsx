import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "./auth";

fetchMock.enableMocks();

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  beforeEach(async () => {
    const userCollectionKey = "@goFinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "id_test",
        email: "test@email.com",
        name: "John doe",
        photo: "any_photo.png",
      })
    );

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user.email).toBe("test@email.com");
  });

  it("user shouldn't connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(result.current.user).not.toHaveProperty("id");
  });
});
