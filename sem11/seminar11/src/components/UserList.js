import {useState, useEffect} from 'react'
import PowerUser from './PowerUser'
import RegularUser from './RegularUser'
import UserDetails from './UserDetails'
import UserForm from './UserForm'
import './UserList.css'


const SERVER='http://localhost:8080'

function UserList(props){
    const [users, setUsers]=useState([])
    const [selected, setSelected]=useState(0)

    const getUsers=async()=>{
        const response=await fetch(`${SERVER}/users`);
        const data=await response.json();
        console.warn(data);
        setUsers(data);
    }

    const addUser=async(user)=>{
        await fetch(`${SERVER}/users`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        getUsers() 
    }

    useEffect(()=>{
        getUsers()
    }, []);

    const regularList = users.filter(u => u.type === 'regular-user');
    const powerList = users.filter(u => u.type === 'power-user');

    return(
        <div className='user-list'>
        {
            selected !== 0
            ? (
                <UserDetails 
                    onCancel={() => setSelected(0)} 
                    item={users.find(e => e.id === selected)} 
                />
            )
            : (
                <>
                    <h3>Power Users</h3>
                    {
                        powerList.map(e => (
                            <PowerUser 
                                key={e.id} 
                                item={e} 
                                onSelect={(id) => setSelected(id)} 
                            />
                        ))
                    }

                    <hr />

                    <h3>Regular Users</h3>
                    {
                        regularList.map(e => (
                            <RegularUser 
                                key={e.id} 
                                item={e} 
                                onSelect={(id) => setSelected(id)} 
                            />
                        ))
                    }

                    <hr />
                    <UserForm onAdd={addUser} />
                </>
            )
        }
        </div>
    )
}

export default UserList;