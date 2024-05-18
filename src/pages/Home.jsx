import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Ideas from "./Ideas";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();
  let navigate = useNavigate();

  console.log(ideas);
  console.log(user.current);
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" min-h-[100vh]">
      <Navbar />
      <section className=" h-screen flex flex-col justify-center  items-center rounded-3xl mx-[10%] text-slate-800">
        <p className=" text-[200px] hero relative ">
          <span className="herosm absolute left-[50%] transform translate-x-[-50%]">
            share your
          </span>
          <span>IDEAS</span>
          {/* <img
            src="src\assets\bulb.png"
            alt=""
            className=" absolute w-[200px] left-[70%] top-[0%] transform rotate-[40deg]"
          /> */}
          <span className="herosm absolute left-[50%] transform translate-x-[-50%] bottom-0">
            With world
          </span>
          <div className=" w-[100px] h-[100px] bg-[#4034e9] blur-[50px] absolute left-[80%] top-[0%] -z-10 an1"></div>
          <div className=" w-[100px] h-[100px] bg-[#f31339] blur-[50px] absolute left-[60%] top-[0%] -z-10 an2"></div>
        </p>
        <p className=" text-[15px] font-medium p-10 text-center">
          Join our community of creative minds. Share your innovative ideas and
          discover a world <br /> of inspiration from others.
        </p>
        <button
          className=" p-3 bg-slate-950 text-white"
          onClick={() => {
            navigate("/ideas");
          }}
        >
          Explore Ideas💡
        </button>
      </section>
    </div>
  );
}

export function Navbar() {
  const user = useUser();

  return (
    <div className=" overflow-x-hidden w-[100%]">
      <nav className=" border-b border-zinc-400 bg-white w-screen flex justify-between items-center px-[15%] py-[1%] h-[60px] absolute">
        <a href="/" className="logo">
          !DEAlist
        </a>
        <div>
          {user.current ? (
            <div className="flex gap-5 text-black">
              <button
                className="border p-2 py-0  border-zinc-500"
                type="button"
                onClick={() => user.logout()}
              >
                Logout
              </button>
              <div className=" size-5  bg-zinc-700 justify-center items-center flex p-5 rounded-full text-white">
                <span>
                  {user.current.email && user.current.email.length > 0
                    ? user.current.email[0].toUpperCase()
                    : ""}
                </span>
              </div>
            </div>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </nav>
      <p className=" font-semibold bg-white fixed left-[50%] bottom-5 transform translate-x-[-50%] w-[100%] text-center">
        Made with 💙 by
        <a href="https://github.com/Prathamesh942">
          <span className=" font-bold text-blue-600"> Prathamesh</span>
        </a>
      </p>
    </div>
  );
}
