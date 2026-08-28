import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: input,
        context: 'Unë jam duke punuar në një projekt',
        files: []
      });

      const aiMessage = {
        role: 'assistant',
        text: response.data.response.text,
        type: response.data.response.type
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Gabim:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '❌ Gabim në lidhje me serverin',
        type: 'error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <h2>💬 Asistenti i Bisedës për Kodin</h2>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome">
            <p>👋 Përshëndetje! Unë jam Vylor AI</p>
            <p>Mund të të ndihmoj me:</p>
            <ul>
              <li>📚 Shpjegime të kodit</li>
              <li>🐛 Identifikimin e gabimeve</li>
              <li>💡 Sugjerime për përmirësimet</li>
            </ul>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? '👤' : '🤖'}:</strong>
              <p>{msg.text}</p>
            </div>
          ))
        )}
        {loading && <div className="message assistant">⏳ Po përgjigjem...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Pyet diçka rreth kodit..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Dërgo
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
