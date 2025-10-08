import { useEffect } from 'react';
import { useGetMyConversationsQuery } from "../features/Api/appointmentApi";
import { useChatContext } from '../context/ChatContext';

export const useChatConversations = (user, refetchMessages) => {
  const { 
    selectedUser, 
    dispatch, 
    lastMessageTimeRef,
    setMobileSidebarOpen
  } = useChatContext();

  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    refetch: refetchConversations,
  } = useGetMyConversationsQuery({
    pollingInterval: user?.role === "counsellor" ? 5000 : 10000,
  });

  useEffect(() => {
    if (!user || user.role !== "counsellor") return;

    const updateInterval = setInterval(() => {
      if (Date.now() - lastMessageTimeRef.current > 10000) {
        refetchConversations();
        if (selectedUser) refetchMessages();
      }
    }, 12000);

    return () => clearInterval(updateInterval);
  }, [user, selectedUser, refetchConversations, refetchMessages, lastMessageTimeRef]);

  useEffect(() => {
    if (conversationsData?.data) {
      const sortedConversations = [...conversationsData.data].sort((a, b) => {
        if (a.lastMessageTime && b.lastMessageTime) {
          return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
        }
        if (a.lastAppointment?.date && b.lastAppointment?.date) {
          return new Date(b.lastAppointment.date) - new Date(a.lastAppointment.date);
        }
        return 0;
      });

      dispatch({ type: 'SET_CONVERSATIONS', payload: sortedConversations });

      if (!selectedUser && sortedConversations.length > 0 && window.innerWidth >= 1024) {
        dispatch({ type: 'SET_SELECTED_USER', payload: sortedConversations[0] });
        setMobileSidebarOpen(false);
      }
    }
  }, [conversationsData, selectedUser, dispatch, setMobileSidebarOpen]);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedChatUser");
    if (storedUser) {
      try {
        dispatch({ type: 'SET_SELECTED_USER', payload: JSON.parse(storedUser) });
        setMobileSidebarOpen(false);
        localStorage.removeItem("selectedChatUser");
      } catch (error) {
        console.error("Failed to parse stored user", error);
      }
    }
  }, [dispatch, setMobileSidebarOpen]);

  const handleSelectUser = (user) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: user });
    dispatch({ type: 'SET_MESSAGES', payload: [] });
    setMobileSidebarOpen(false);
    refetchMessages();
  };

  return {
    conversationsLoading,
    refetchConversations,
    handleSelectUser
  };
};
