import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Agent() {
  const [request, setRequest] = useState('');
  const [projectFiles, setProjectFiles] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runAgent = async () => {
    if (!request.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/agent`, {
        request,
        projectStructure: projectFiles,
        files: []
      });

      setResult({
        action: response.data.action,
        filesModified: response.data.filesModified,
        summary: response.data.summary
      });
    } catch (error) {
      console.error('Gabim:', error);
      setResult({
        action: 'ERROR',
        filesModified: [],
        summary: '❌ Gabim në lidhje me serverin'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-panel">
      <h2>🤖 Agjenti Autonom i Zhvillimit</h2>

      <div className="control-group">
        <label>Përshkrimi i Kërkesës (në shqip):</label>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="P.sh: Krijo një funksion për validimin e email-it..."
          rows="6"
        />
      </div>

      <div className="control-group">
        <label>Struktura e Projektit (Opsionale):</label>
        <textarea
          value={projectFiles}
          onChange={(e) => setProjectFiles(e.target.value)}
          placeholder="src/\n  components/\n  utils/\n..."
          rows="6"
        />
      </div>

      <button onClick={runAgent} disabled={loading}>
        {loading ? '⏳ Agjenti po punon...' : '🚀 Ekzekuto Agjentin'}
      </button>

      {result && (
        <div className="result">
          <h3>Rezultati:</h3>
          <div className="result-item">
            <strong>Aksioni:</strong> {result.action}
          </div>
          {result.filesModified.length > 0 && (
            <div className="result-item">
              <strong>Skedarë të Ndryshuara:</strong>
              <ul>
                {result.filesModified.map((file, idx) => (
                  <li key={idx}>✅ {file}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="result-item">
            <strong>Përmbledhje:</strong> {result.summary}
          </div>
        </div>
      )}
    </div>
  );
}

export default Agent;
