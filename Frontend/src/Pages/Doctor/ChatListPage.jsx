import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorAxiosInstance from '../../utils/doctorAxiosInstance';
import { toast } from 'sonner';
import { User } from 'lucide-react';

const ChatListPage = () => {
  const [chats, setChats] = useState([  {
    patientId: '1',
    patientName: 'Rahul Nair',
    patientProfile: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Doctor, I’ve been experiencing headaches for the past week.',
    lastUpdated: new Date().toISOString(),
    unreadCount: 2,
  },
  {
    patientId: '2',
    patientName: 'Anjali Menon',
    patientProfile: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Can I eat mangoes while on this medication?',
    lastUpdated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    unreadCount: 0,
  },
  {
    patientId: '3',
    patientName: 'Akhil Raj',
    patientProfile: 'https://randomuser.me/api/portraits/men/50.jpg',
    lastMessage: 'Thank you for the prescription, feeling better now.',
    lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    unreadCount: 1,
  },]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await doctorAxiosInstance.get('/chats');
        setChats(response.data.data);
      } catch (error) {
        toast.error('Failed to load chats');
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, []);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Patient Chats</h2>
      <div className="space-y-4">
        {chats.map(chat => (
          <div 
            key={chat.patientId}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => navigate(`/doctor/chats/${chat.patient._id }`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <User/>
                <div>
                  <h3 className="font-semibold">{chat.patient.name }</h3>
                  <p className="text-gray-600 text-sm">
                    {chat.lastMessage?.substring(0, 40)}...
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(chat.updatedAt).toLocaleDateString()}
              </div>
            </div>
            {chat.unreadCount > 0 && (
              <div className="mt-2 flex justify-end">
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {chat.unreadCount} new messages
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;