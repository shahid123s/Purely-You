import { useState } from "react";

export default function AppointmentForm({
  services = [
    { value: "general", label: "General Checkup" },
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "orthopedics", label: "Orthopedics" },
  ],
  onSubmit,
  showImage = true,
  imageUrl = "/images/doctors.png",
  title = "Book An Appointment",
  subtitle = "We will send you a confirmation within 24 hours.",
  buttonText = "View all",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      onSubmit(formDataObj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-white py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form fields remain the same */}
              {/* ... (all form elements unchanged) ... */}
            </form>
          </div>

          {showImage && (
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Healthcare professionals"
                  className="object-cover w-full h-full"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}