
import { useState } from "react"
import { SearchBar } from "./components/SearchBar"
import { SearchResults } from "./components/SearchResult"
import { AIAssistant } from "./components/AIAssistance"
import axios from 'axios'

function Dummy() {
    const [query, setQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState([])
  
    const handleSearch = async (searchQuery) => {
      setQuery(searchQuery)
      console.log( searchQuery)
      setIsSearching(true)
      const result = await axios.post('http://localhost:3001/analyse/analyse', {
        input: searchQuery
    });
    setResults(result.data.data)
    setIsSearching(false)
    }
  
    return (
      <div className="min-h-screen bg-sky-50 text-gray-800">
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
                <SearchResults results={results} />
              ) : (
                <AIAssistant />
              )}
            </div>
  
          </div>
        </div>
      </div>
    )
}

export default Dummy

