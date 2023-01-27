import { LoginComponent } from "../login/login";
import { useLogin } from "../login/login.store";

export const Main = () => {
  const app = useLogin();

  return (
    <div>
      {app.isLoggedIn ? (
        <div>
          You are Logged in:
          <section>{JSON.stringify(app.userInfo, null, 2)}</section>
        </div>
      ) : (
        <LoginComponent />
      )}
    </div>
  );
};
