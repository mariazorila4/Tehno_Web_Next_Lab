import './UserDetails.css'

function UserDetails (props) {
  const { item, onCancel } = props
  return (
    <div className="user-details-container">
      <h1 className="user-details-username">{item.username}</h1>
      <h2 className="user-details-fullname">{item.fullName}</h2>
      <h3 className="user-details-type">{item.type}</h3>
      <div>
        <input type='button' value='back' className="btn-back" onClick={() => onCancel()} />
      </div>
    </div>
  )
}

export default UserDetails;