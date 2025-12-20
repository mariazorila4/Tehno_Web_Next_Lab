import React, {useState, useEffect} from "react"
import Gato from "./Gato"
import UserList from "./UserList";

const App=()=>{
  const [count, setCount]=useState(0);

  useEffect(()=>{
    document.title=`Gato want ${count} quasoo`
  })

  return (
    <div className="container">
      <p>Today I want to eat {count} quasoo :)</p>
      <button onClick={()=>setCount(count+1)}>🥐</button>
      <hr/>
      <Gato/>

      <hr/>
      <h1>An App with users</h1>
      <UserList/>
    </div>
  )
}

export default App;
