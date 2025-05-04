import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDoctorChat, fetchDoctorDetails } from '../../services/FetchDatas';
import { sendMessageToDoctor } from '../../services/sendData';

const PatientChatPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [patientMessageCount, setPatientMessageCount] = useState(0);
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Load doctor details and chat history
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [doctorRes, chatRes] = await Promise.all([
          fetchDoctorDetails(doctorId),
          fetchDoctorChat(doctorId)
        ]);

        setDoctor(doctorRes.data.data);
        setMessages(chatRes.data.data.content || []);
        
        // Count existing patient messages
        const initialCount = (chatRes.data.data.content || [])
          .filter(msg => msg.sender === 'patient').length;
        setPatientMessageCount(initialCount);
      } catch (error) {
        console.error('Error loading chat:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [doctorId]);

  const handleSendMessage = async () => {
    if (patientMessageCount >= 4 || !newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      
      // Optimistically update UI
      const tempId = Date.now(); // Temporary ID for the message
      setMessages(prev => [...prev, 
        { 
          _id: tempId, 
          msg: newMessage, 
          sender: 'patient', 
          createdAt: new Date().toISOString() 
        }
      ]);
      setPatientMessageCount(prev => prev + 1);
      setNewMessage('');

      // Send to backend
      const result = await sendMessageToDoctor({ doctorId, newMessage });
      
      // Replace temp message with actual response
      setMessages(prev => prev.map(msg => 
        msg._id === tempId ? result.data.data : msg
      ));

      // Simulate doctor reply (replace with real-time updates when implemented)
      setTimeout(() => {
        setMessages(prev => [...prev,
          { 
            _id: Date.now(),
            msg: "Thank you for your message. The doctor will respond shortly.", 
            sender: 'doctor',
            createdAt: new Date().toISOString()
          }
        ]);
      }, 1000);

    } catch (error) {
      console.error('Failed to send message:', error);
      // Rollback on error
      setMessages(prev => prev.filter(msg => msg._id !== tempId));
      setPatientMessageCount(prev => prev - 1);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Doctor Header */}
        <div className="flex items-center mb-6 border-b pb-4">
          <button 
            onClick={() => navigate(-1)}
            className="mr-2 p-1 rounded-full hover:bg-gray-100"
          >
            ←
          </button>
          <img 
            src={doctor?.profileImage || '/default-avatar.png'} 
            alt={doctor?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{doctor?.name || 'Doctor'}</h2>
            <p className="text-gray-600">{doctor?.specialization || 'Specialist'}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[calc(100vh-300px)] overflow-y-auto mb-4 space-y-4 p-2">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id} 
                className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'patient' 
                    ? 'bg-cyan-100 text-cyan-900 ml-auto' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p>{message.msg}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))
          )}

          {patientMessageCount >= 4 && (
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800">
                You've reached your message limit. Please{' '}
                <button 
                  onClick={() => navigate('/appointment')}
                  className="text-cyan-600 hover:underline font-medium"
                >
                  book an appointment
                </button>{' '}
                for further discussion.
              </p>
            </div>
          )}
        </div>

        {/* Message Input */}
        {patientMessageCount < 4 && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isSending}
              className={`p-3 rounded-lg ${
                !newMessage.trim() || isSending
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700'
              } text-white`}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientChatPage;