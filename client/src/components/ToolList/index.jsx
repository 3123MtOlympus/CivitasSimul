import { Link } from 'react-router-dom';

const ToolList = ({
  tools,
}) => {
  if (!tools.length) {
    return <h3>No Tools </h3>;
  }

  return (
    <div>
      {tools &&
        tools.map((tool) => (
          <div key={tool._id} className="card mb-3">
             <div className="card-body bg-light p-2">
              <p>Tools listed in Tool Library:</p>
            </div>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"
                  to={`/tools/${tool._id}`}
                >
                  {tool.name} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {tool.description}
                  </span>
                </Link>
            </h4>
            <div className="btn btn-primary btn-block btn-squared">
              { 
                tool.isAvailable? (`Tool is currently available`):(`Tool not currently available`)
              }
            </div>
          </div>
        ))}
    </div>
  );
};

export default ToolList;
