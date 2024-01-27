import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./pages/Register";
import Ideas from "./pages/Ideas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/ideas",
    element: <Ideas />,
  },
]);

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <IdeasProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </IdeasProvider>
    </div>
  );
}

export default App;
