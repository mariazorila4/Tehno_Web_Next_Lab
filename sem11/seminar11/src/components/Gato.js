import React, {useState, useEffect} from "react";

const App=()=>{
    const [sleep, setSleep]=useState(true);

    useEffect(()=>{
        console.log("---------------------------------------------");
        console.log("🐱 Gato System v1.0 start successfully.");
        console.log("🥣 Check food bowl... EMPTY!")
        console.log("---------------------------------------------");
    })

    return(
        <div className="container" style={{textAlign:"center", fontSize:"20px"}}>
            <h1 style={{fontSize:"40px"}}>
                {sleep?"😸💤":"🙀🔪"}
            </h1>

            <p>
                {sleep?"Shhh.. cat is dreaming at fish.":"Miauu! I NEED FOOD NOW!"}
            </p>

            <button onClick={()=>setSleep(!sleep)}>
                {sleep?"Wake up the beast📯":"Give it 🐟 and put to sleep"}
            </button>
        </div>
    )
}

export default App;