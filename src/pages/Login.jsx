import { useState } from "react";
import { useUser } from "../lib/context/user";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";

export function Login() {
  let navigate = useNavigate();
  const user = useUser();
  const [error, seterror] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" w-screen h-screen bg-pink-100 absolute top-0 -z-10">
      <div className="logincont w-[70vw] h-[70vh]  bg-[rgba(16,14,37,1)] absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] flex rounded-lg">
        <div className=" flex-1 login1">
          <img
            src="https://cdn.dribbble.com/users/831521/screenshots/7434906/media/137fb5376dad8eceaf7bb6207b3d8172.jpg?resize=1000x750&vertical=center"
            alt=""
            className="login1 w-[100%] h-[100%] object-cover rounded-tl-lg rounded-bl-lg"
          />
        </div>
        <section className=" flex-1 login2 flex flex-col justify-center gap-6 items-center relative">
          <h1 className=" absolute top-10 text-lg font-medium text-white">
            Login or register
          </h1>
          <form className=" flex flex-col w-[60%] gap-5">
            <input
              className=" outline-none bg-transparent text-white placeholder:text-zinc-100 border-b border-b-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="outline-none bg-transparent text-white placeholder:text-zinc-100 border-b border-b-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="flex flex-col gap-3 mt-5">
              <button
                className="button w-[100%] bg-white p-1 rounded-xl"
                type="button"
                onClick={async () => {
                  const result = await user.login(email, password);
                  if (result.success) {
                    navigate("/");
                  } else {
                    seterror(result.error);
                  }
                }}
              >
                Login
              </button>
              <p className="text-[#ffffff95] text-center absolute bottom-10 left-[50%] transform translate-x-[-50%]">
                Don't have an account ?{" "}
                <Link to="/register">
                  <span className=" text-[#ff36bf]">Register</span>
                </Link>
              </p>
            </div>
          </form>
          {error && (
            <p className="text-red-500 text-sm w-[60%] font-light text-center">
              {error}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
