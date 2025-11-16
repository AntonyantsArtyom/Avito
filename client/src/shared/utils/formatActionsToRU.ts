export const formatActionToRU = (action: string) => {
  switch (action) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "requestChanges":
      return "На доработку";
    default:
      return "Неизвестное действие";
  }
};
