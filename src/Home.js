import BlogList from './BlogList';
import { generateClient } from "aws-amplify/api";
import { listBlogs } from "./graphql/queries";
import { useState, useEffect } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const client = generateClient();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await client.graphql({ query: listBlogs });
        const fetchedBlogs = response.data.listBlogs.items;
        console.log(fetchedBlogs);
        setIsPending(false);
        setBlogs(fetchedBlogs);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && !isPending && <BlogList blogs={blogs} title="All Blogs!"/>}
    </div>
  );
}
 
export default Home;