import { Link, useLocation } from "react-router-dom";
import Header from "../components/header";

const HomePage = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-4 inline-block px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-blue-600 text-sm">
              • Healthcare Made Simple
            </span>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gray-900">Your Health,</span>{" "}
              <span className="text-blue-500">Our Priority</span>
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Experience personalized care with our team of expert doctors. Book
              appointments, access medical records, and get the care you
              deserve.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/patient-portal"
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                to="/medical-team"
                className="px-6 py-3 bg-white text-gray-800 font-medium rounded-full border hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-medical-light">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto p-8">
          <Link
            to="/doctor/patient-portal"
            className="p-6 rounded-lg bg-blue hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-medical-dark mb-2">
              Patient Portal
            </h3>
            <p className="text-sm text-gray-600">
              Access your medical records and manage appointments
            </p>
          </Link>

          <Link
            to="/doctor/medical-team"
            className="p-6 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-medical-dark mb-2">
              Our Medical Team
            </h3>
            <p className="text-sm text-gray-600">
              Meet our experienced doctors and specialists dedicated to your
              health.
            </p>
          </Link>

          <Link
            to="/doctor/doctor-dashboard"
            className="p-6 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-medical-dark mb-2">
              Doctor Dashboard
            </h3>
            <p className="text-sm text-gray-600">
              For healthcare providers to manage appointments and patient
              records.
            </p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
