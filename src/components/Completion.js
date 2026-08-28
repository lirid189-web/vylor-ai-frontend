import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Completion() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCompletion = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/completion`, {
        code,
        language,
        cursorPosition: code.length
      });

      setSuggestions(response.data.suggestions || []);
    } catch (error) {
      console.error('Gabim:', error);
      setSuggestions([{ text: '❌ Gabim në lidhje me serverin', type: 'error' }]);
    } finally {
      setLoading(false);
    }
  };

  const insertSuggestion = (text) => {
    setCode(code + text);
  };

  return (
    <div className="completion-panel">
      <h2>📝 Plotësimi Automatik i Sintaksës</h2>

      <div className="control-group">
        <label>Gjuha e Programimit:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="control-group">
        <label>Shkruaj Kodin:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Shkruaj kodin këtu dhe pres sugjerime..."
          rows="8"
        />
      </div>

      <button onClick={handleCompletion} disabled={loading}>
        {loading ? '⏳ Po analizoj...' : '🔍 Merr Sugjerime'}
      </button>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>💡 Sugjerime:</h3>
          <ul>
            {suggestions.map((s, idx) => (
              <li key={idx} onClick={() => insertSuggestion(s.text)}>
                <code>{s.text}</code> - {s.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Completion;
