import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../../utils/queries';

const PostList = () => {

  const [formState, setFormState] = useState([]);
  const { loading, data } = useQuery(QUERY_POSTS);

  const posts = data?.posts  || [];

  console.log(posts);

  if (!posts) {
    return <h3> No Posts </h3>;
  }

  return (
    <div>
      {posts &&
        posts.map((post) => (
        
          <div key={post._id} >
             {/* <div className="card p-2">
              <p>Post:</p>
            </div> */}
            <h4 className=" bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"
                  to={`/post/${post._id}`}
                >
                  {post.title} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {post.postText}
                  </span>
                </Link>
            </h4>
            <div className="btn btn-primary btn-block btn-squared">
              { 
                
              }
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
