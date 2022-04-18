import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import { Routes } from "../routes";
import "./App.css";
// import logo from "./logo.svg";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
