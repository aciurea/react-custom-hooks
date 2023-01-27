import * as React from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useLoginDispatch } from "./login.store";

export const LoginComponent = () => {
  const dispatch = useLoginDispatch();
  const ref = React.useRef(null);
  useClickOutside(ref, () => console.log("cleanup function"));

  return (
    <div ref={ref}>
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
