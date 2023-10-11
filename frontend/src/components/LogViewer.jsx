// LogViewer.js

import React, { useEffect, useState } from 'react';






export const comm=(command1)=>{
  const socket = new WebSocket('ws://127.0.0.1:8000/ws/logs/');

  socket.onopen = () => {
    const command2 = {
      command: command1
    };
   socket.send(JSON.stringify(command2));
   console.log("send")
  };

}

export const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [command, setCommand] = useState('pip freeze');


  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/logs/');

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const logEntry = data.logs;
      setLogs((prevLogs) => [...prevLogs, logEntry]);
      socket.close(); // Close the socket after receiving the response
    };
    socket.onopen = () => {
      const commandData = {
        command: command,
      };
      socket.send(JSON.stringify(commandData));
    };


  };
  



  return (
    <div>
      <h1>Log Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit">Send Command</button>
      </form>

      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

