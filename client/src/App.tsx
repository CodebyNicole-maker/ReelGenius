import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
