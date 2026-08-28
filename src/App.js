import React, { useState, useEffect } from 'react';
import './App.css';
import Completion from './components/Completion';
import ChatPanel from './components/ChatPanel';
import Agent from './components/Agent';

function App() {
  const [activeTab, setActiveTab] = useState('completion');

  return (
    <div className="App">
      {/* HEADER ME LOGON */}
      <header className="vylor-header">
        <div className="logo">
          <span className="logo-v">🟢 V</span>
          <h1>Vylor AI</h1>
        </div>
        <p className="tagline">Sistemi i Inteligjencës Artificiale për Zhvillimin</p>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'completion' ? 'active' : ''}`}
          onClick={() => setActiveTab('completion')}
        >
          📝 Plotësim Kodi
        </button>
        <button 
          className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat Panel
        </button>
        <button 
          className={`tab ${activeTab === 'agent' ? 'active' : ''}`}
          onClick={() => setActiveTab('agent')}
        >
          🤖 Agjenti Autonom
        </button>
      </nav>

      {/* CONTENT */}
      <main className="content">
        {activeTab === 'completion' && <Completion />}
        {activeTab === 'chat' && <ChatPanel />}
        {activeTab === 'agent' && <Agent />}
      </main>
    </div>
  );
}

export default App;
