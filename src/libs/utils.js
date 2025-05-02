export const formatDate = (date) => {
    if (!date) return "";
    date = new Date(date)
    const day = date?.getDate();
    const month = date?.getMonth();
    const year = date?.getFullYear();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayOfWeek = dayNames[date.getDay()];
    return `${dayOfWeek}, ${day} ${monthNames[month]} ${year}`;
};