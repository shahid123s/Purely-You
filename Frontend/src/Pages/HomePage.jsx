import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import TeamSection from "../components/team/TeamSection";

export default function HomePage() {

  const navigate = useNavigate();
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-sky-50 to-cyan-50 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-medium text-cyan-800">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                Healthcare Made Simple
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Your Health, <span className="text-cyan-600">Our Priority</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Experience personalized care with our team of expert doctors. Book appointments, access medical records,
                and get the care you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={()=>navigate('/ai')} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  search your problems
                </button>
                {/* <button className="px-8 py-3 bg-white text-gray-700 text-lg font-medium rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Learn More
                </button> */}
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] w-full">
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-500/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Navigation Links */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/patient" className="block">
              <div className="group p-6 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">Patient Portal</h3>
                <p className="text-gray-600">
                  Access your medical records, view appointments, and manage your healthcare.
                </p>
              </div>
            </Link>
            <Link to="/team" className="block">
              <div className="group p-6 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">Our Medical Team</h3>
                <p className="text-gray-600">Meet our experienced doctors and specialists dedicated to your health.</p>
              </div>
            </Link>
            <Link to="/doctor" className="block">
              <div className="group p-6 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors cursor-pointer">
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">Doctor Dashboard</h3>
                <p className="text-gray-600">For healthcare providers to manage appointments and patient records.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}