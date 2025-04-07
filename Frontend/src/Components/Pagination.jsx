const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = []
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
  
    return (
      <nav className="mt-6">
        <ul className="flex justify-center space-x-1">
          {pageNumbers.map(number => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
  
  export default Pagination