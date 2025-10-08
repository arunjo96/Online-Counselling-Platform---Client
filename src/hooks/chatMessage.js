import { useEffect } from 'react';
import { useGetMessagesQuery, useSendMessageMutation } from "../features/Api/messageApi";
import { useChatContext } from '../context/ChatContext';

export const useChatMessages = (user, socketRef) => {
  const { 
    selectedUser, 
    messages, 
    dispatch, 
    socketStatus, 
    lastMessageTimeRef 
  } = useChatContext();

  const {
    data: fetchedMessages,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(selectedUser?._id, {
    skip: !selectedUser,
    pollingInterval: socketStatus !== "connected" ? 3000 : 0,
  });

  const [sendMessage, { isLoading: isSendingMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (fetchedMessages?.messages) {
      const sortedMessages = [...fetchedMessages.messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      dispatch({ type: 'SET_MESSAGES', payload: sortedMessages });
      lastMessageTimeRef.current = Date.now();
    }
  }, [fetchedMessages, dispatch, lastMessageTimeRef]);

  useEffect(() => {
    if (!socketRef.current || !user || !selectedUser) return;
    
    const socket = socketRef.current;

    const onPrivateMessage = (msg) => {
      lastMessageTimeRef.current = Date.now();

      if (
        (msg.sender === selectedUser._id && msg.receiver === user._id) ||
        (msg.sender === user._id && msg.receiver === selectedUser._id)
      ) {
        if (!messages.some(m => m._id === msg._id)) {
          dispatch({ type: 'ADD_MESSAGE', payload: msg });
        }

        if (msg.sender === selectedUser._id && socket.connected) {
          socket.emit("messageDelivered", {
            messageId: msg._id,
            to: msg.sender,
          });
        }
      }
    };

    socket.on("privateMessage", onPrivateMessage);

    return () => socket.off("privateMessage", onPrivateMessage);
  }, [socketRef, selectedUser, user, messages, dispatch, lastMessageTimeRef]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedUser) return;

    const tempId = `temp-${Date.now()}`;
    const tempMsg = {
      _id: tempId,
      text: text.trim(),
      sender: user._id,
      receiver: selectedUser._id,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: tempMsg });

    try {
      const response = await sendMessage({
        receiverId: selectedUser._id,
        text: text.trim(),
      }).unwrap();

      if (response?.msg) {
        const realMsg = { ...response.msg, pending: false };
        dispatch({ 
          type: 'UPDATE_MESSAGE', 
          payload: { tempId, message: realMsg } 
        });

        if (socketRef.current?.connected) {
          socketRef.current.emit("privateMessage", {
            ...realMsg,
            to: selectedUser._id,
          });
        }

        lastMessageTimeRef.current = Date.now();
      }
    } catch (err) {
      dispatch({ type: 'REMOVE_MESSAGE', payload: tempId });
      alert("Failed to send message. Please try again.");
    }
  };

  return {
    messages,
    messagesLoading,
    refetchMessages,
    isSendingMessage,
    handleSendMessage
  };
};
