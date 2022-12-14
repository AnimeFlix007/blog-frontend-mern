import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Router from "./router/Router";
import Alert from "./utils/error/Alert";
import CategoryAlert from "./utils/error/CategoryAlert";
import CommentAlert from "./utils/error/CommentAlert";
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
      <CommentAlert />
    </BrowserRouter>
  );
}

export default App;
