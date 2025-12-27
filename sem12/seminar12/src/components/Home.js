import {useNavigate} from 'react-router';

const Home=()=>{

    const navigate=useNavigate();

    return(
        <>
            <p>Home</p>
            <button onClick={()=>{
                navigate('/tasks')
            }}>Go to tasks</button>
            <br/>
            <button onClick={()=>{
                navigate('/about')
            }}>See details about it</button>
        </>
    )
}

export default Home;