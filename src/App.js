import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateGallery from "./pages/CreateGallery";
import ProtectedRoute from "./shared/ProtectedRoute";
import ViewGallery from "./pages/ViewGallery";
import MyGalleries from "./pages/MyGalleries";
import AuthorsGalleries from "./pages/AuthorsGalleries";

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
        <Route path="galleries/:id" element={<ViewGallery />}></Route>
        <Route
          path="my-galleries"
          element={
            <ProtectedRoute>
              <MyGalleries />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="authors/:id" element={<AuthorsGalleries />}></Route>
      </Routes>
    </div>
  );
}

export default App;
