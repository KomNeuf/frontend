import langs from "@/app/[lang]/dictionaries/langs";

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getLastSeenText = (lastSeen, lang) => {
  const t = langs[lang]?.lastSeen;
  const lastSeenDate = new Date(lastSeen);

  if (isNaN(lastSeenDate.getTime())) {
    return t.invalidDate;
  }

  const now = new Date();
  const timeDifferenceInSeconds = Math.floor((now - lastSeenDate) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return t.justNow;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${t?.lastSeen} ${minutes} ${t?.minute} ${minutes > 1 ? "s" : ""} ${
      t?.ago
    }`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${t?.lastSeen} ${hours} ${t?.hour}${hours > 1 ? "s" : ""} ${
      t?.ago
    }`;
  } else if (timeDifferenceInSeconds < 172800) {
    return t?.yesterday;
  } else {
    const day = lastSeenDate.getDate();
    const month = lastSeenDate.toLocaleString("default", {
      month: "long",
    });
    const year = lastSeenDate.getFullYear();
    return `${t?.lastSeen} ${month} ${day}, ${year}`;
  }
};

export const truncateText = (text, maxLength) => {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const formatDateNotification = (dateString) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate.replace(/,/, ""); // Remove the comma between date and time
};
