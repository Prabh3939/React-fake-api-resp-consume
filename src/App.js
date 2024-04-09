import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const [data, setData] = useState([]);
  
  const [page , setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const handleChangePage = (newPage)  =>{
    setPage(newPage);
  }
 


  const fetchInfo = async () => {
    const res = await fetch(url);
    const d = await res.json();
    return setData(d);
  
  };
  useEffect(() => {
   
    if(page===0){
      setData(data.slice(0,10));
      setPage(1);

    }
    else{
      setData(data.slice(10*page, 10 + 10 * page));
      setPage( Math.ceil(data.length/rowsPerPage)-1);
      
    }
    
  },[page])

  useEffect(() => {
    fetchInfo();
  }, []);

  const handlePrevious = ()=> {
    if (page >0){

      handleChangePage(page-1);
    }
  };

    const handleNext = ()=> {
      console.log(page);
     // if (page < Math.ceil(data.length/rowsPerPage)-1 ){
        handleChangePage(page+1);
      
    };

  return (
    <div className="App">
      <h1 style={{ color: "green" }}> FETCH API</h1>
      <div>
        <table>
          <tr>
            <th scope="col">userId</th>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">completed</th>
          </tr>
          <tbody>
            {data.map((data) => (
              <tr key={data.userId}>
                <td>{data.userId}</td>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {<p style={{ fontSize: 20, color: 'white' }}>{data.name}</p>
}
      </div>
      <div className="btn">
        <button onClick={handlePrevious}>Previous</button>
        </div>
        <div className="spn">
        <span>
          Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}
        </span>
        </div>
        <div className="btn1">
        <button onClick={handleNext}> Next </button>
        </div>
    </div>
  );
}
export default App;
