import { Link } from 'react-router-dom';

const ToolList = ({
  tools,
}) => {
  if (!tools.length) {
    return <h3>No Tools </h3>;
  }

  return (
    <div>
      <div className="bg-light">
    <p>Tools listed in Tool Library:</p>
  </div>
      {tools &&
        tools.map((tool) => (
        
          <div key={tool._id}>
             
            <h4>
              
                <div className="text-light">
                  {tool.name} <br />
                  <span style={{ fontSize: '1rem' }}>
                    {tool.description}
                  </span>
                </div>
            </h4>
          
          </div>
        ))}
    </div>
  );
};

export default ToolList;
