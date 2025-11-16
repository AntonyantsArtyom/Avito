export const formatStatusToRU = (status: string) => {
  switch (status) {
    case "pending":
      return "Ожидает модерации";
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "draft":
      return "Черновик";
    default:
      return status;
  }
};
