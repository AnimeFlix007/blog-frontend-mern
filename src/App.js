import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Router from "./router/Router";
import Alert from "./utils/error/Alert";
import CategoryAlert from "./utils/error/CategoryAlert";
import PostAlert from "./utils/error/PostAlert";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      {/* SNACKBARS  */}
      <CategoryAlert />
      <Alert />
      <PostAlert />
    </BrowserRouter>
  );
}

export default App;
