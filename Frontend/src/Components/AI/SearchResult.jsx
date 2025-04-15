export function SearchResults({ results }) {
  

  const serachUrl =  (name) => {
    return  `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  }


  console.log(results)
  // Check if results is empty or doesn't have the expected structure
  if (!results || !results.exact_matches || results.exact_matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No results found. Try a different search term.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Disclaimer */}
      {results.disclaimer && (
        <div className="bg-sky-100 border-l-4 border-teal-500 p-4 mb-8 rounded-r-md">
          <p className="text-sm text-gray-700">{results.disclaimer}</p>
        </div>
      )}

      {/* Results count */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Found {results.exact_matches.length} skin condition{results.exact_matches.length !== 1 ? "s" : ""}
      </h2>

      {/* Exact matches */}
      <div className="space-y-8">
        {results.exact_matches.map((match, index) => (
          <div
            key={index}
            className="bg-white border border-sky-100 rounded-xl p-6 hover:border-teal-200 transition-colors shadow-sm"
          >
            {/* Condition name */}
            <h3 className="text-2xl font-medium mb-3 text-teal-700 capitalize">{match.condition}</h3>

            {/* Reason */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Cause</h4>
              <p className="text-gray-700">{match.reason}</p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Solution</h4>
              <p className="text-gray-700">{match.solution}</p>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Recommended Products
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {match.products.map((product, productIndex) => (
                  <a
                    key={productIndex}
                    href={serachUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-teal-700">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.brand}</p>
                      <div className="mt-1">
                        <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                          {product.price}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {results.suggestions && results.suggestions.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Other Possible Skin Condition{results.suggestions.length !== 1 ? "s" : ""}
          </h2>
          <div className="space-y-8">
            {results.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white border border-sky-100 rounded-xl p-6 hover:border-teal-200 transition-colors shadow-sm"
              >
                {/* Condition name */}
                <h3 className="text-2xl font-medium mb-3 text-teal-700 capitalize">{suggestion.condition}</h3>

                {/* Reason */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Cause</h4>
                  <p className="text-gray-700">{suggestion.reason}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Solution</h4>
                  <p className="text-gray-700">{suggestion.solution}</p>
                </div>

                {/* Products */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Recommended Products
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestion.products.map((product, productIndex) => (
                      <a
                        key={productIndex}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-teal-700">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.brand}</p>
                          <div className="mt-1">
                            <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                              {product.price}
                            </span>
                          </div>
                        </div>
                        <div className="ml-2 text-teal-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.suggestions.length > 1 && (
        <div className="bg-sky-100 border-l-4 border-teal-500 p-4 mb-8 rounded-r-md mt-5">
          <p className="text-sm text-gray-700 font-bold">{"Always consult a doctor to identify the correct issue"}</p>
        </div>
      ) }
    </div>
  )
}

export default SearchResults

