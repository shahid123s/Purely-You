import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-sky-50 py-4 px-6 md:px-12">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-cyan-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-700">
              Purely <span className="text-cyan-700">You</span>
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="#" className="text-cyan-600 font-medium">
            Home
          </Link>
          <Link to="#" className="text-gray-600 hover:text-cyan-600">
            About us
          </Link>
          <Link to="#" className="text-gray-600 hover:text-cyan-600">
            Departments
          </Link>
          <Link to="#" className="text-gray-600 hover:text-cyan-600">
            Doctors
          </Link>
          <Link to="#" className="text-gray-600 hover:text-cyan-600">
            Gallery
          </Link>
          <Link to="#" className="text-gray-600 hover:text-cyan-600">
            Contact us
          </Link>
        </nav>

        <button className="bg-navy-800 hover:bg-navy-900 text-white rounded-full px-6 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
          Book Appointment
        </button>
      </div>
    </header>
  );
}