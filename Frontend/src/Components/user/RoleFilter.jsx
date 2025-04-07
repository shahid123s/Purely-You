const RoleFilter = ({ selectedRole, onRoleChange }) => {
    return (
      <select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
    )
  }
  
  export default RoleFilter