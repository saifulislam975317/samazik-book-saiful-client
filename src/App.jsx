import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/Routes";

function App() {
  return (
    <div className="w-[1200px] mx-auto">
      <RouterProvider router={router}></RouterProvider>;
    </div>
  );
}

export default App;
