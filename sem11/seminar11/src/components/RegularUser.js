import './RegularUser.css'

function User (props) {
  const { item, onSelect} = props

  return (
    <div className='regular-user'onClick={()=>onSelect(item.id)}>
      <div className='username'>
        {item.username}
      </div>
      <div className='fullName'>
        {item.fullName}
      </div>
      Regular user
    </div>
  )
}

export default User;