import './App.css'
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="app-root">
      {isAuthenticated ? <Dashboard /> : <Auth />}
    </div>
  );
}


export default App
