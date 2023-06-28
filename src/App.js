import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateGallery from "./pages/CreateGallery";
import ProtectedRoute from "./shared/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateGallery />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
