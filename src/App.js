import React, { useState } from 'react';
import './App.css';
import BusinessEntityChatbot from './components/BusinessEntityChatbot';
import LLCTrifectaChatbot from './components/LLCTrifectaChatbot';

function App() {
  const [activeChatbot, setActiveChatbot] = useState(null); // null, 'business', or 'llc'

  const handleClose = () => {
    setActiveChatbot(null);
  };

  const openChatbot = (type) => {
    setActiveChatbot(type);
  };

  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
        <h1>Welcome to Interactive Advisors</h1>
        <p>Select a chatbot to explore expert guidance on business and wealth strategies.</p>
        <div className="chatbot-selector">
          <button
            className="selector-btn"
            onClick={() => openChatbot('business')}
            disabled={activeChatbot === 'business'}
          >
            Business Entity Advisor
          </button>
          <button
            className="selector-btn"
            onClick={() => openChatbot('llc')}
            disabled={activeChatbot === 'llc'}
          >
            LLC Trifecta Advisor
          </button>
        </div>
      </header>

      {activeChatbot === 'business' && <BusinessEntityChatbot onClose={handleClose} />}
      {activeChatbot === 'llc' && <LLCTrifectaChatbot onClose={handleClose} />}

      {!activeChatbot && (
        <div className="placeholder">
          <p>Choose a chatbot above to get started. These tools provide educational insights—consult professionals for personalized advice.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;