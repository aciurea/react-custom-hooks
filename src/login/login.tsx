import { useLoginDispatch } from "./login.store";

export const LoginComponent = () => {
  const dispatch = useLoginDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "setUser",
            userInfo: {
              datePolicyAccepted: new Date(),
              email: "A.a@acom",
              firstName: "a",
              lastName: "b",
              lang: "en",
              refreshToken: "",
              token: "",
            },
          });
        }}
      >
        Log in
      </button>
    </div>
  );
};
