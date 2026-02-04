import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const Chat = () => {
  const { orderId } = useParams();
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchOrderAndMessages();
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchOrderAndMessages = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [orderRes, messagesRes] = await Promise.all([
        axios.get(`${API_URL}/orders/${orderId}`, { headers }),
        axios.get(`${API_URL}/chat/${orderId}`, { headers }),
      ]);
      setOrder(orderRes.data);
      setMessages(messagesRes.data);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      if (error.response?.status === 400) {
        toast.error('Chat available only after payment completion');
      } else {
        toast.error('Failed to load chat');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/chat/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      // Silently fail for polling
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await axios.post(
        `${API_URL}/chat/send`,
        { order_id: orderId, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  const otherParty = order?.buyer_id === user?.id ? order?.provider_name : order?.buyer_name;

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-green-100 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link to="/orders">
            <Button variant="ghost" size="sm" className="rounded-full" data-testid="back-to-orders">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-primary-foreground" data-testid="chat-other-party">
              {otherParty}
            </h1>
            <p className="text-xs text-muted-foreground">Order #{orderId?.slice(0, 8)}</p>
          </div>
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${msg.id}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    isMe
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white border border-green-100 text-primary-foreground rounded-bl-sm'
                  }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender_name}</p>
                  )}
                  <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                  <p className={`text-xs mt-1 ${isMe ? 'text-green-100' : 'text-muted-foreground'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-green-100 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-12 rounded-full"
            data-testid="message-input"
          />
          <Button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="h-12 w-12 rounded-full btn-primary p-0"
            data-testid="send-message-btn"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
