import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { Navbar } from "./Home";
import "../App.css";

function Ideas() {
  const user = useUser();
  const ideas = useIdeas();
  const [clickedidea, setclickedidea] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <Navbar />
      <div className=" flex justify-center pt-[60px] px-[15%]">
        {clickedidea ? (
          <div className=" w-screen h-screen absolute bg-[#ffffffc1] top-0">
            <div className=" absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
              {user.current ? (
                <section className=" flex flex-col m-5 w-[60vw] max-w-[400px]  bg-white shadow-2xl rounded-lg border-4 border-slate-900 p-8 gap-2 rounded-lg relative">
                  <button
                    className=" absolute right-5 top-5 text-2xl"
                    onClick={() => {
                      setclickedidea(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                  <h2 className=" text-center m-5">Submit Idea</h2>
                  <form className=" flex flex-col gap-10">
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                      className="outline-none bg-transparent placeholder:text-black border-b border-zinc-700"
                    />
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.target.value);
                      }}
                      className="outline-none bg-transparent placeholder:text-black border-b border-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        ideas.add({
                          userId: user.current.$id,
                          title,
                          description,
                          username: user.current.email,
                        });
                        setclickedidea(false);
                        console.log(user.current.email);
                      }}
                      className="bg-slate-800 text-white p-1 rounded-lg"
                    >
                      Submit
                    </button>
                  </form>
                </section>
              ) : (
                <section>
                  <p>Please login to submit an idea.</p>
                </section>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <section className=" w-screen px-[15%] mt-8">
        <ul>
          {ideas.current.map((idea) => (
            <li
              key={idea.$id}
              className=" flex flex-col gap-4 w-[100%] border-2 rounded-lg p-3 my-4"
            >
              <span className=" flex items-center gap-2">
                <div className=" w-8 h-8 bg-zinc-800 text-white rounded-full flex justify-center items-center">
                  {idea.username ? idea.username[0].toUpperCase() : <></>}
                </div>
                {idea.username}
              </span>
              <strong className=" w-[100%] bg-zinc-100 p-2">
                {idea.title}
              </strong>
              <p>{idea.description}</p>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <button
                  type="button"
                  onClick={() => ideas.remove(idea.$id)}
                  className=" flex w-[100%] justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
      {!clickedidea ? (
        <button
          className=" text-xl flex justify-center items-center p-2 text-white rounded-md fixed bottom-20 bg-slate-950 left-[50%] transform translate-x-[-50%]"
          onClick={() => {
            setclickedidea(!clickedidea);
          }}
        >
          Add Idea
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Ideas;
