
export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};


export const formatDate = (dateString) => {
  const today = new Date().toDateString();
  const messageDate = new Date(dateString);
  const messageDateString = messageDate.toDateString();

  if (messageDateString === today) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (messageDateString === yesterday.toDateString()) {
    return "Yesterday";
  }

  return messageDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};


export const isToday = (dateString) => {
  const today = new Date().toDateString();
  const messageDate = new Date(dateString).toDateString();
  return messageDate === today;
};


export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};


export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const appointmentFormatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric", 
    month: "long", 
    day: "numeric"
  });
};

export const sessionNotesFormatDate = (dateString) =>
    new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
});

export const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getFormattedCallDuration = (durationInSeconds) => {
  if (!durationInSeconds) return "00:00";
  
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
