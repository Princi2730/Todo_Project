import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateComponent from "./components/authentication/PrivatComponent";
import SignIn from "./components/authentication/SignIn";
import SideDrawer from "./components/sideBar/SideDrawer";
import Register from "./components/authentication/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateComponent />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sidedrawer" element={<SideDrawer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
