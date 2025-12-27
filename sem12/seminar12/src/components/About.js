import {useNavigate} from 'react-router-dom';

const About=()=>{
    const navigate=useNavigate();

    return(
        <>
            <p>About: </p>
            <button onClick={()=>{
                    navigate('/')
            }}>Go to homepage</button>
        </>
    )
}

export default About;