import { useParams, useHistory } from 'react-router-dom'
import { getCurrentUser } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { getBlogs } from "./graphql/queries";
import { deleteBlogs } from "./graphql/mutations";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState(''); // Initialize userEmail state
  const client = generateClient();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await client.graphql({
          query: getBlogs,
          variables: {
            id,
          },
        });
        const fetchedBlog = response.data.getBlogs;
        console.log(fetchedBlog);
        setIsPending(false);
        setBlog(fetchedBlog);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    fetchBlog();
    // Fetch the current user when the component mounts
    getCurrentUser()
      .then((user) => {
        // Access the user's email
        const email = user.signInDetails.loginId;
        setUserEmail(email); // Set the userEmail state to the user's email
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
      });
  }, []); // Empty dependency array ensures this runs only once

  const deleteBlog = async () => {
    try {
      const response = await client.graphql({
        query: deleteBlogs,
        variables: {
          input: {
            id: id
          }
        }
      });
      console.log(response);
      setIsPending(false);
      history.push('/');
    } catch (err) {
      setIsPending(false);
      setError(err.message);
      console.log(err);
    }
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div>}
      { blog && !isPending && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          { userEmail === blog.author && <button onClick={deleteBlog}>Delete</button> }
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;