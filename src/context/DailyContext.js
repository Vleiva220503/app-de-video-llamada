import React, { createContext, useState, useContext } from 'react';

const DailyContext = createContext();

export const DailyProvider = ({ children }) => {
  const [roomUrl, setRoomUrl] = useState('');
  const [token, setToken] = useState('');
  const [participants, setParticipants] = useState([]);
  const [showButtons, setShowButtons] = useState(true);  
  const [tokenActive, setTokenActive] = useState(false);  

  return (
    <DailyContext.Provider value={{ roomUrl, setRoomUrl, token, setToken, participants, setParticipants, showButtons, setShowButtons, tokenActive, setTokenActive }}>
      {children}
    </DailyContext.Provider>
  );
};

export const useDaily = () => useContext(DailyContext);
