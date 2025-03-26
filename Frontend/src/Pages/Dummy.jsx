
import { useState } from "react"
import { SearchBar } from "./components/SearchBar"
import { SearchResults } from "./components/SearchResult"
import { AIAssistant } from "./components/AIAssistance"

function Dummy() {
    const [query, setQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState([])
  
    const handleSearch = (searchQuery) => {
      setQuery(searchQuery)
      setIsSearching(true)
  
      // Simulate search results after a delay
      setTimeout(() => {
        const mockResults = [
          {
            id: 1,
            title: "Understanding Healthcare AI",
            content: "AI is transforming healthcare by improving diagnostics and patient care...",
          },
          {
            id: 2,
            title: "Medical Records Management",
            content: "Secure and efficient management of medical records using advanced technology...",
          },
          {
            id: 3,
            title: "Telemedicine Solutions",
            content: "Remote healthcare services that connect patients with healthcare providers...",
          },
          {
            id: 4,
            title: "Preventive Healthcare",
            content: "AI-powered solutions for early detection and prevention of health issues...",
          },
        ]
        setResults(mockResults)
        setIsSearching(false)
      }, 1500)
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

