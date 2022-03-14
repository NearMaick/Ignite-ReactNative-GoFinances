import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import * as AuthSession from "expo-auth-session";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}
const userStorageKey = "@goFinances:user";

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = (await response.json()) as IUser;

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName?.givenName!,
          picture: `https://ui-avatars.com/api/?name=${name}&length=1`,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function loadUserStorageData() {
    const userStorage = await AsyncStorage.getItem(userStorageKey);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as IUser;
      setUser(userLogged);
    }
    setUserStorageLoading(false);
  }

  async function signOut() {
    setUser({} as IUser);

    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
