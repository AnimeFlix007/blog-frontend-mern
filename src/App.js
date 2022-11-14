import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Router from "./router/Router";
import Alert from "./utils/error/Alert";
import CategoryAlert from "./utils/error/CategoryAlert";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <CategoryAlert />
      <Alert />
    </BrowserRouter>
  );
}

export default App;
