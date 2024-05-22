import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={token ? <Dashboard /> : <SignupPage />}
          />
          <Route
            path="/signin"
            element={token ? <Dashboard /> : <SigninPage />}
          />
          <Route path="/" element={!token ? <SigninPage /> : <Dashboard />} />
          <Route
            path="/send"
            element={!token ? <SigninPage /> : <SendMoney />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
