"use client"
import { useState } from 'react';

export default function PsychiatristAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();
      console.log(data)
      const aiMessage = { text: data.res, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, something went wrong.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-5xl mx-auto h-screen flex flex-col p-6">
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 rounded-2xl shadow-xl backdrop-blur-sm ${isDark ? 'bg-gray-800/80 border border-purple-500/30' : 'bg-white/80 border border-purple-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-purple-400 to-pink-400'}`}>
              <span className="text-2xl">🧠</span>
            </div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-purple-400 to-blue-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              Psychiatrist AI
            </h1>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/50' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'}`}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-8 space-y-6 rounded-2xl my-6 shadow-xl backdrop-blur-sm ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}`}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className={`text-6xl mb-4 ${isDark ? 'animate-pulse' : ''}`}>💭</div>
              <p className={`text-xl font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                How can I help you today?
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Start a conversation to get support
              </p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className="flex items-end gap-3 max-w-2xl">
                {msg.sender === 'ai' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-purple-400 to-pink-400'}`}>
                    <span className="text-sm">🤖</span>
                  </div>
                )}
                <div
                  className={`px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.sender === 'user'
                      ? isDark
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : isDark
                      ? 'bg-gray-700/80 text-white border border-purple-500/30'
                      : 'bg-white text-gray-900 border border-purple-200'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-green-600 to-teal-600' : 'bg-gradient-to-br from-green-400 to-teal-400'}`}>
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-end gap-3 max-w-2xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gradient-to-br from-purple-400 to-pink-400'}`}>
                  <span className="text-sm">🤖</span>
                </div>
                <div className={`px-6 py-4 rounded-2xl shadow-lg ${isDark ? 'bg-gray-700/80 border border-purple-500/30' : 'bg-white border border-purple-200'}`}>
                  <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDelay: '0ms'}}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDelay: '150ms'}}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`p-6 rounded-2xl shadow-xl backdrop-blur-sm ${isDark ? 'bg-gray-800/80 border border-purple-500/30' : 'bg-white/80 border border-purple-200'}`}>
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                isDark
                  ? 'bg-gray-700/50 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-gray-700'
                  : 'bg-white border-purple-200 text-gray-900 placeholder-gray-500 focus:border-purple-400 focus:bg-purple-50'
              } focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isDark
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-400/50'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}