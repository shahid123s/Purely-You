// components/doctor/DoctorChatPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import doctorAxiosInstance from '../../utils/doctorAxiosInstance';

const DoctorChatPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([ {
    content: 'Hello Doctor, I’ve been feeling unwell since yesterday.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isDoctor: false,
  },
  {
    content: 'Can you describe the symptoms?',
    timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString(),
    isDoctor: true,
  },
  {
    content: 'I’ve had a sore throat and mild fever.',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    isDoctor: false,
  },]);
  const [newMessage, setNewMessage] = useState('');
  const [patient, setPatient] = useState({
    _id: patientId,
    name: 'Rahul Nair',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [patientRes, messagesRes] = await Promise.all([
        //   doctorAxiosInstance.get(`/patients/${patientId}`),
        //   doctorAxiosInstance.get(`/chats/${patientId}`)
        // ]);
        // const dummyPatient = {
        //     _id: patientId,
        //     name: 'Rahul Nair',
        //     profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        //   };
    
        //   // Dummy chat messages
        //   const dummyMessages = [
        //     {
        //       content: 'Hello Doctor, I’ve been feeling unwell since yesterday.',
        //       timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        //       isDoctor: false,
        //     },
        //     {
        //       content: 'Can you describe the symptoms?',
        //       timestamp: new Date(Date.now() - 1000 * 60 * 58).toISOString(),
        //       isDoctor: true,
        //     },
        //     {
        //       content: 'I’ve had a sore throat and mild fever.',
        //       timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        //       isDoctor: false,
        //     },
        //   ];
    
        //   setPatient(dummyPatient);
        //   setMessages(dummyMessages);
      } catch (error) {
        console.error('Error loading chat:', error);
        navigate('/doctor/chats');
      }
    };
    
    fetchData();
  }, [patientId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await doctorAxiosInstance.post('/chats/send', {
        patientId,
        message: newMessage,
        isDoctor: true
      });

      setMessages(prev => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6 border-b pb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        <img
          src={patient.profileImage}
          alt={patient.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{patient.name}</h2>
          <p className="text-gray-600">Patient</p>
        </div>
      </div>

      <div className="h-96 overflow-y-auto mb-4 space-y-4 p-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isDoctor ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.isDoctor 
                  ? 'bg-cyan-100 ml-auto' 
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-gray-800">{message.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorChatPage;