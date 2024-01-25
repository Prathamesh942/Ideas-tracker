import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <IdeasProvider>
        <UserProvider>
          <Navbar /> {/* Add the navbar before page content */}
          <main>{isLoginPage ? <Login /> : <Home />}</main>
        </UserProvider>
      </IdeasProvider>
    </div>
  );
}

function Navbar() {
  const user = useUser();

  return (
    <nav className=" w-screen flex justify-between px-[10%] py-[1%] bg-emerald-500 text-white">
      <a href="/">Idea tracker</a>
      <div>
        {user.current ? (
          <>
            <span>{user.current.email}</span>
            <button type="button" onClick={() => user.logout()}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
}

export default App;
