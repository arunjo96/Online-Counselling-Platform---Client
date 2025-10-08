import { useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';

export const useChatSocketSetup = (socketRef, user, refetchMessages, refetchConversations) => {
  const { 
    selectedUser,
    setSocketStatus,
    isMountedRef
  } = useChatContext();

  useEffect(() => {
    if (!socketRef.current || !user) return;
    const socket = socketRef.current;

    const onConnect = () => {
      setSocketStatus("connected");
      socket.emit("join", user._id);
      if (selectedUser) refetchMessages();
      refetchConversations();
    };

    const onDisconnect = () => setSocketStatus("disconnected");
    const onError = () => setSocketStatus("error");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);

    if (socket.connected) onConnect();
    else socket.connect();

    const reconnectInterval = setInterval(() => {
      if (isMountedRef.current && !socket.connected) socket.connect();
    }, 15000);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      clearInterval(reconnectInterval);
    };
  }, [
    socketRef, 
    user, 
    refetchMessages, 
    refetchConversations, 
    selectedUser, 
    setSocketStatus,
    isMountedRef
  ]);
};
