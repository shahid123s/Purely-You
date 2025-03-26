export function SearchResults({ results }) {
    if (results.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No results found. Try a different search term.</p>
        </div>
      )
    }
  
    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Search Results</h2>
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white border border-sky-100 rounded-xl p-6 hover:border-teal-200 transition-colors cursor-pointer shadow-sm"
            >
              <h3 className="text-xl font-medium mb-2 text-teal-700">{result.title}</h3>
              <p className="text-gray-600">{result.content}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  