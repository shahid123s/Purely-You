import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDoctorChat, fetchDoctorDetails } from '../../services/FetchDatas';
import { sendMessageToDoctor } from '../../services/sendData';


const PatientChatPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const loadDoctor = async () => {
      const result = await fetchDoctorDetails(doctorId);
      setDoctor(result.data.data);
    };
    const loadChat = async () => {
      const result = await fetchDoctorChat(doctorId);
      setMessages(result.data.data.content);
    };
    loadDoctor();
    loadChat()
  }, [doctorId]);

  const handleSendMessage = async () => {
    if (questionCount >= 4) return;
    
    if (newMessage.trim()) {
      // Add user's question
      const result = await sendMessageToDoctor({doctorId, newMessage});
      console.log(result);
      setMessages(prev => [...prev, 
        { msg: newMessage, sender: 'patient', isQuestion: true }
      ]);
      
      // Simulate doctor's reply after 1 second
      setTimeout(() => {
        setMessages(prev => [...prev,
          { text: "We will consider you msg to the doctor. You may please wait. Don't reply on this message you'll get Doctors answer soon", sender: 'doctor' }
        ]);
      }, 1000);

      setQuestionCount(prev => prev + 1);
      setNewMessage('');
    }
  };

  // if (!doctor) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Doctor Header */}
        <div className="flex items-center mb-6 border-b pb-4">
          <img 
            src={doctor?.profileImage ||'./placeholder'} 
            alt={doctor?.name || ''}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{doctor?.name ||'oka'}</h2>
            <p className="text-gray-600">{doctor?.specialization || 'Dermatologist'}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-100 ml-auto' 
                  : 'bg-gray-100'
              }`}>
                <p className="text-gray-800">{message.msg}</p>
              </div>
            </div>
          ))}

          {questionCount >= 4 && (
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <p className="text-yellow-800">
                You've reached your question limit. Please 
                <button 
                  onClick={() => navigate('/appointment')}
                  className="ml-1 text-blue-600 hover:underline"
                >
                  book an appointment
                </button> 
                for further clarification.
              </p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question..."
            className="flex-1 p-2 border rounded-lg"
            disabled={questionCount >= 4}
          />
          <button
            onClick={handleSendMessage}
            disabled={questionCount >= 4}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientChatPage;