import Header from "../../Components/Header"

const MedicalTeam = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Our Medical Team</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. James Roberts</h2>
                <p className="text-blue-600">Cardiologist</p>
              </div>
              <p className="text-gray-600 text-center">
                Specializing in cardiovascular health with over 15 years of experience in diagnosing and treating heart
                conditions.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. Emily Clark</h2>
                <p className="text-blue-600">Pediatrician</p>
              </div>
              <p className="text-gray-600 text-center">
                Dedicated to children's health and development with a compassionate approach to pediatric care.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. David Lee</h2>
                <p className="text-blue-600">Dermatologist</p>
              </div>
              <p className="text-gray-600 text-center">
                Expert in skin health and treatments with a focus on both medical and cosmetic dermatology.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. Sarah Williams</h2>
                <p className="text-blue-600">Neurologist</p>
              </div>
              <p className="text-gray-600 text-center">
                Specializing in disorders of the nervous system, including the brain, spinal cord, and peripheral
                nerves.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. Michael Chen</h2>
                <p className="text-blue-600">Orthopedic Surgeon</p>
              </div>
              <p className="text-gray-600 text-center">
                Expert in musculoskeletal health, focusing on injuries and conditions affecting bones, joints, and
                muscles.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold">Dr. Lisa Johnson</h2>
                <p className="text-blue-600">Psychiatrist</p>
              </div>
              <p className="text-gray-600 text-center">
                Dedicated to mental health and wellbeing with a compassionate approach to psychiatric care.
              </p>
              <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md">Book Appointment</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default MedicalTeam

