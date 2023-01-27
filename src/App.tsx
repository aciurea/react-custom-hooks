import "./App.css";
import { LoginProvider } from "./login/login.store";
import { Main } from "./main/main";

function App() {
  return (
    <div className="App">
      <LoginProvider children={<Main />}></LoginProvider>
    </div>
  );
}

export default App;
