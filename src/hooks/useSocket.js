import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (token) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const serverUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8000';

    const socket = io(serverUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socket.on('connect', () => {});
    socket.on('connect_error', () => {});
    socket.on('disconnect', () => {});

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return socketRef;
};
