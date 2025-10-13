import React, { useState } from 'react';
import './App.css';
import BusinessEntityChatbot from './components/BusinessEntityChatbot';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {isModalOpen && <BusinessEntityChatbot onClose={handleClose} />}
    </div>
  );
}

export default App;