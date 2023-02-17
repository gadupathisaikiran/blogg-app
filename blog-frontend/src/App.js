import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { ToastContextProvider } from "./Context/ToastContext";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Create from "./Pages/Create";



function App() {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <AuthContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  );
}

export default App;
