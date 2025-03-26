import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="p-4 border-b">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Healthcare App
      </Link>
    </header>
  )
}

export default Header

