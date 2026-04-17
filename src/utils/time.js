export const formatDateTime = (isoString) => {
    if (!isoString) return { date: "N/A", time: "N/A" };

    const safeString = isoString.split(".")[0];

    const dateObj = new Date(safeString);

    if (isNaN(dateObj.getTime())) {
      return { date: "Invalid Date", time: "Invalid Time" };
    }

    return {
      date: dateObj.toLocaleDateString("en-GB"),
      time: dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };