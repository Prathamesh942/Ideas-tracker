import { useEffect, useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { Navbar } from "./Home";
import "../App.css";


const Card = ({idea, user, ideas}) => {
  const [vote, setVote] = useState(idea.votes || 0);
  const [show, setShow] = useState(false);
  const [mycomment, setMyComment] = useState('');
  const { fetchComments} = useIdeas();
  const [comments, setComments] = useState(idea.comment);

  useEffect(()=>{},[idea.comment])


  return(
    <li
              key={idea.$id}
              className=" flex flex-col gap-4 w-[100%] border-2 rounded-lg p-3 my-4 cursor-pointer"
            >
              <div className=" flex flex-col gap-5" onClick={()=>{setShow(!show)}}>
              <span className=" flex items-center gap-2">
                <div className=" w-8 h-8 bg-zinc-800 text-white rounded-full flex justify-center items-center">
                  {idea.username ? idea.username[0].toUpperCase() : <></>}
                </div>
                {idea.username}
              </span>
              <strong className=" w-[100%] bg-zinc-100 p-2 flex justify-between">
                {idea.title}
                <div className=" flex justify-center items-center gap-2">
                <button onClick={(e)=>{e.stopPropagation(); if(vote==-1){setVote(0); ideas.updateVote(idea.$id,0)}else{setVote(-1); ideas.updateVote(idea.$id,-1)}}}><img className=" w-5" src={` ${vote==-1 ? './down.svg' : 'https://www.svgrepo.com/show/333916/downvote.svg'}`} alt="" /></button>
                <span>{vote}</span>
                <button onClick={(e)=>{e.stopPropagation(); if(vote==1){setVote(0); ideas.updateVote(idea.$id,0)}else{setVote(1); ideas.updateVote(idea.$id,1)}}}><img className=" w-5" src={` ${vote==1 ? './up.svg' : 'https://www.svgrepo.com/show/334337/upvote.svg'}`} alt="" /></button>
                </div>
              </strong>
              <p>{idea.description}</p>
              </div>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <button
                  type="button"
                  onClick={() => {ideas.remove(idea.$id);}}
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
              {
                show ? <div className=" border-t-2">
                  {
                    comments.map((cmt)=>{
                      return(
                        <div className=" flex flex-col py-2">
                          <span className=" font-bold">{cmt.username}</span>
                          <span>{cmt.comment}</span>
                        </div>
                      )
                    })
                  }
                  <div className=" py-2 gap-4">
                  <input className=" outline-none" onChange={(e)=>{setMyComment(e.target.value)}} type="text" placeholder="Add comment" value={mycomment} />
                  <button onClick={(e)=>{ideas.addComment(idea.$id,user.current.email,mycomment); setMyComment('')}} className=" bg-zinc-800 rounded-lg text-white p-2">Add</button>
                  </div>
                  
                </div> : null
              }
            </li>
  )
}

function Ideas() {
  const user = useUser();
  const ideas = useIdeas();
  const [clickedidea, setclickedidea] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className=" overflow-x-hidden w-[100%]">
      <div className=" w-[100%]">
        <Navbar />
      </div>
      <div className=" flex justify-center pt-[60px] px-[15%]">
        {clickedidea ? (
          <div className=" w-[100%] h-screen absolute bg-[#ffffffc1] top-0">
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
                <section className="flex gap-4 justify-center items-center">
                  <p>Please login to submit an idea.</p>
                  <button
                    className=" p-2 rounded-full bg-slate-950 text-white"
                    onClick={() => {
                      setclickedidea(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="white"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                </section>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <section className=" w-screen px-[15%] mt-8 pb-20">
        <ul>
          {ideas.current.map((idea) => (
            <Card idea={idea} user={user} ideas={ideas}/>
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
