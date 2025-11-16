export const formatSecondsToMinutes = (seconds: number): string => {
  if (!seconds || seconds === 0) return "0 с.";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds} с.`;
  }

  if (remainingSeconds === 0) {
    return `${minutes} м.`;
  }

  return `${minutes} м. ${remainingSeconds} с.`;
};
