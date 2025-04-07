const StatusFilter = ({ selectedStatus, onStatusChange }) => {
    return (
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
    )
  }
  
  export default StatusFilter