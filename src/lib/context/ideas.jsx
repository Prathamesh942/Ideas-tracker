import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = "65b294123f25267d06cf"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "65b2941e8b5997205c0a"; // Replace with your collection ID

export const COMMENTS_DATABASE_ID = "65b294123f25267d06cf"; // Replace with your comments database ID
export const COMMENTS_COLLECTION_ID = "6648f511001700d4c169"; // Replace with your comments collection ID


const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea
    );
    setIdeas((ideas) => [response.$id, ...ideas].slice(0, 10));
  }

  async function updateVote(id, newVote) {
    const ideaToUpdate = ideas.find((idea) => idea.$id === id);
    if (!ideaToUpdate) return;

    const updatedIdea = { ...ideaToUpdate, vote: newVote };
    console.log(newVote);

    const response = await databases.updateDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      id,
      { votes: newVote }
    );

    setIdeas((ideas) =>
      ideas.map((idea) =>
        idea.$id === id ? response : idea
      )
    );
  }

  async function addComment(id, username, newcomment){
    const response = await databases.createDocument(
      COMMENTS_DATABASE_ID,
      COMMENTS_COLLECTION_ID,
      ID.unique(),
      { username, comment:newcomment }
    );
    const ideaToUpdate = ideas.find((idea) => idea.$id === id);
    if (!ideaToUpdate) return;

    // Add the new comment's ID to the comments array
    const updatedComments = ideaToUpdate.comment
      ? [...ideaToUpdate.comment, response.$id]
      : [response.$id];

    const updatedIdea = { ...ideaToUpdate, comment: updatedComments };

    const response1 = await databases.updateDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      id,
      { comment: updatedComments }
    );

    // Update the local state
    setIdeas((ideas) =>
      ideas.map((idea) =>
        idea.$id === id ? response1 : idea
      )
    );
  }


  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init(); // Refetch ideas to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove, updateVote, addComment }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
