import { Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAdvertisementStore } from "../../../entities/Advertisement/model/AdvertisementStore";
import type { IAdvertisement } from "../../../entities/Advertisement/types/Advertisement";

export const AdvertisementsApproveAction = ({ advertisement }: { advertisement: IAdvertisement }) => {
  const { approveAdvertisement } = useAdvertisementStore();

  const handleApprove = async () => {
    try {
      await approveAdvertisement(advertisement.id);
      message.success("Объявление одобрено");
    } catch (error) {
      message.error("Ошибка при одобрении объявления");
    }
  };

  return (
    <>
      <Button type="primary" size="large" icon={<CheckOutlined />} onClick={handleApprove} disabled={advertisement.status !== "pending"}>
        Одобрить
      </Button>
    </>
  );
};
