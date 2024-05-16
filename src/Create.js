import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createBlogs } from "./graphql/mutations";

const Create = ({ user, checkUser }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const client = generateClient();

  useEffect(() => {
    // Fetch the current user when the component mounts
    checkUser();
    setAuthor(user.signInDetails.loginId); // Set the author state
  }, []); // Empty dependency array ensures this runs only once

  const createBlog = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const blogDetails = {
        title: title,
        body: body,
        author: author
      };
      const response = await client.graphql({
        query: createBlogs,
        variables: {
          input: blogDetails
        }
      })
      console.log(response);
      setIsPending(false);
      console.log('Blog created successfully!');
      history.push('/');
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  }

  return ( 
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={(e) => createBlog(e)}>
        <label>Blog title:</label>
        <input 
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label >Blog author:</label>
        <input
          type="text"
          value={author}
          readOnly // Prevent user input
        />
        { !isPending && <button>Add Blog</button> }
        { isPending && <button disabled>Adding blog...</button> }
      </form>
    </div>
  );
}

export default withAuthenticator(Create);