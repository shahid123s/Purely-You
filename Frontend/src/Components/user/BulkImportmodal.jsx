import { useState } from 'react'

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    
    setIsLoading(true)
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would parse the file here
      const dummyUsers = [
        { name: 'Imported User 1', email: 'import1@example.com', role: 'patient' },
        { name: 'Imported User 2', email: 'import2@example.com', role: 'doctor', specialty: 'Cardiology' }
      ]
      
      onImport(dummyUsers)
    } catch (error) {
      console.error('Import failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Bulk Import Users</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV/JSON File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="mt-2 text-sm text-gray-600">
                    {file ? file.name : 'Drag and drop or click to browse'}
                  </span>
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: CSV, JSON. Max file size: 5MB
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                disabled={!file || isLoading}
              >
                {isLoading ? 'Importing...' : 'Import'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BulkImportModal