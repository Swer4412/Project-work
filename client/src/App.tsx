import React, {useState, useEffect} from 'react';

const App = () => {

  const [backendData, setBackendData] = useState<any>(undefined) 

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then (
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>
      {(backendData === undefined) ? (
        <p>Loading...</p>
      ) : (
        backendData.list.map((item:any, i:any) => (
          <p key={i}>{item}</p>
        ))
      )}
    </div>
  );
};

export default App;
