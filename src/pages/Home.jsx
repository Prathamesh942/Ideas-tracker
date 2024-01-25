import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(ideas);
  return (
    <>
      <div className=" flex justify-center">
        {user.current ? (
          <section className=" flex flex-col m-5  bg-emerald-200 p-5 rounded-lg">
            <h2 className=" text-center m-5">Submit Idea</h2>
            <form className=" flex flex-col gap-5">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                className=" bg-transparent placeholder:text-black border-b border-zinc-700"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                className=" bg-transparent placeholder:text-black border-b border-zinc-700"
              />
              <button
                type="button"
                onClick={() =>
                  ideas.add({ userId: user.current.$id, title, description })
                }
                className=" bg-emerald-500 text-white p-1 rounded-lg"
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
      <section className=" w-screen px-[20%] mt-8">
        <h2>Latest Ideas</h2>
        <ul>
          {ideas.current.map((idea) => (
            <li key={idea.$id}>
              <strong>{idea.title}</strong>
              <p>{idea.description}</p>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <button type="button" onClick={() => ideas.remove(idea.$id)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
