import { Link } from 'react-router-dom';

const ToolList = ({
  tools,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!tools.length) {
    return <h3>No Thoughts </h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {tools &&
        tools.map((tool) => (
        
          <div key={tool._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${tool.owner}`}
                >
                  {tool.owner} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {tool}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {tool}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{tool.toolText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/tools/${tool._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ToolList;
