import {useState, useEffect} from "react"

interface BackendData {
  _id: {
    $oid: string;
  };
  msg: string;
  list: number[];
}

const App = () => {
  const [backendData, setBackendData] = useState<BackendData | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data: BackendData[]) => {
        setBackendData(data[0]);
      });
  }, []);

  return (
    <div>
      {!backendData ? (
        <p>Loading...</p>
      ) : (
        backendData.list.map((item:any, i:any) => <p key={i}>{item}</p>)
      )}
    </div>
  );
};

export default App;
