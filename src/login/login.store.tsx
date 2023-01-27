import createStore from "../create-context";
import { UserInfo, App } from "./login.type";

type Action =
  | { type: "setUser"; userInfo: UserInfo }
  | {
      type: "setLanguage";
      lang: string;
    }
  | { type: "default" };

const initialState: App = {
  isLoggedIn: false,
  userInfo: {
    refreshToken: "",
    token: "",
    email: "aa@aa.com",
    firstName: "S",
    lang: "en",
    lastName: "A",
    datePolicyAccepted: new Date(),
  },
};

function reducer(initialState: App, action: Action): App {
  switch (action.type) {
    case "setUser":
      return {
        ...initialState,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };

    case "setLanguage":
      return {
        ...initialState,
        userInfo: {
          ...initialState.userInfo,
          lang: action.lang,
        },
      };
    default:
      throw new Error(`Action [${action.type}] not implemented`);
  }
}

export const {
  StoreProvider: LoginProvider,
  useDispatch: useLoginDispatch,
  useStore: useLogin,
} = createStore<App, Action>(reducer, initialState);
