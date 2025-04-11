import { useState } from "react"
import { SearchBar } from "../components/ai/SearchBar"
import { SearchResults } from "../components/ai/SearchResult"
import { AIAssistant } from "../components/ai/AIAssistance"
import axios from 'axios'
import Header from "../components/header/Header"

export default function AISearch() {
    const [query, setQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState([])
  
    const handleSearch = async (searchQuery) => {
      setQuery(searchQuery)
      setIsSearching(true)
      const result = await axios.post('http://localhost:3001/analyse/analyse', {
        input: searchQuery
      });
      setResults(result.data.data)
      setIsSearching(false)
    }
  
    return (
      <div className="min-h-screen bg-sky-50 text-gray-800">
        <Header/>
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-sky-100 text-teal-600 rounded-full text-sm font-medium mb-4">
              Healthcare Made Simple
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gray-900">Healthcare</span> <span className="text-teal-600">Search</span>
            </h1>
            <p className="text-xl text-gray-600">Find the information you need for better health</p>
          </header>
  
          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <div className="mt-12">
              {isSearching ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                </div>
              ) : query ? (
                <>
                  <SearchResults results={results} />
                  {/* Search Doctor Button */}
                  {results && results.exact_matches?.length > 0 && (
                    <div className="text-center mt-8">
                      <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                        Search for a Specialist Doctor
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <AIAssistant />
              )}
            </div>
          </div>
        </div>
      </div>
    )
}