import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { fetchDoctors } from '../../services/FetchDatas'
export default function TeamSection() {

    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
      const getDoctors = async () => {
        const result = await fetchDoctors()
        setDoctors(result.data.data)
      }
      getDoctors()
    },[])




    return (
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-sky-50 px-4 py-1.5 text-sm font-medium text-cyan-600">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
                  Meet our team
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Experienced and <span className="text-cyan-500">Skilled Team</span>
                  <br />
                  of Experts
                </h2>
              </div>
  
              <div className="hidden sm:flex items-center space-x-2">
                {/* Navigation buttons remain unchanged */}
              </div>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  onClick={() => navigate(`patient/chat/${doctor._id}`)}

                >
                  <div className="aspect-[3/4] w-full relative">
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="object-cover w-full h-full"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }