const useTimeAgo = (dateString: string) => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffMs = now.getTime() - pastDate.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} дней назад`;
  } else if (diffHours > 0) {
    return `${diffHours} часов назад`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} минут назад`;
  } else {
    return "Меньше минуты назад";
  }
};

export default useTimeAgo;