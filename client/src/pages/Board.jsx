import { useRouteError } from "react-router-dom";
import { Navigate, useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const Board = () => {
  const { posts } = useQuery(QUERY_POSTS);
  console.log(posts);
  const welcome = "Welcome to The Community Board";
  
  return (
    <div className="justify-center ">

        <div className="community">

 
   

      <h1>{ welcome }</h1>
      <p>Here you can post about our community.</p>
      <div>
        <PostList posts = { posts }/>
      </div>
    </div>
    </div>
  );
};

export default Board;