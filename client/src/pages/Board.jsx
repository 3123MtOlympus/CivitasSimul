import { useRouteError } from "react-router-dom";

export default function Board() {
  const welcome = "Welcome to The Community Board";

  return (
    <div className="justify-center">

        <div className="card">

 
      <h1>{ welcome }</h1>
      <p>Here you can post about our community.</p>
    </div>
    </div>
  );
}