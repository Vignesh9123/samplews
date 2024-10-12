import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://3.110.83.128'); // Make sure this matches your backend URL

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for events from the server
    socket.on('welcome', (data) => {
      console.log(data.message);
      setMessage(data.message);
    });

    socket.on('serverEvent', (data) => {
      console.log(data.message);
      setMessage(data.message);
    });

    // Cleanup on unmount
    return () => socket.off('serverEvent');
  }, []);

  const sendMessageToServer = () => {
    // Emit event to the server
    socket.emit('clientEvent', { message: 'Hello from the client!' });
  };

  return (
    <div className="App">
      <h1>React + Socket.io</h1>
      <p>Message from server: {message}</p>
      <button onClick={sendMessageToServer}>Send Message to Server</button>
    </div>
  );
}

export default App;
