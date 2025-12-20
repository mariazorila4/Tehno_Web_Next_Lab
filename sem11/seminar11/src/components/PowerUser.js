import './PowerUser.css'

function User(props){
    const {item, onSelect}=props;

    return(
        <div className='power-user' onClick={()=>onSelect(item.id)}>
            <div className='username'>
                {item.username}
            </div>
            <div className='fullName'>
                {item.fullName}
            </div>
            Power user
        </div>
    )
}

export default User;