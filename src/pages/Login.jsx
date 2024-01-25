import { useState } from "react";
import { useUser } from "../lib/context/user";

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" w-screen h-screen bg-emerald-100 absolute top-0 -z-10">
      <div className=" w-[70vw] h-[70vh] bg-emerald-500 absolute transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] flex rounded-xl">
        <div className=" flex-1">
          <img
            src="https://i.pinimg.com/564x/bb/7c/9c/bb7c9ca12e4b6efd59e5b6678e509849.jpg"
            alt=""
            className=" h-[100%] object-cover rounded-xl"
          />
        </div>
        <section className=" flex-1 flex flex-col justify-center gap-6 items-center">
          <h1 className=" absolute top-10 text-lg font-medium text-white">
            Login or register
          </h1>
          <form className=" flex flex-col w-[60%] gap-5">
            <input
              className=" bg-transparent text-white placeholder:text-zinc-100 border-b border-b-white"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className=" bg-transparent text-white placeholder:text-zinc-100 border-b border-b-white"
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
                onClick={() => user.login(email, password)}
              >
                Login
              </button>
              <button
                className="button w-[100%] border-white border text-white p-1 rounded-xl"
                type="button"
                onClick={() => {
                  console.log(email, password);
                  user.register(email, password);
                }}
              >
                Register
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
