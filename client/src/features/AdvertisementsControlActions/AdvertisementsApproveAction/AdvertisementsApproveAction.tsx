import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useAdvertisementStore } from "../../../entities/Advertisement/model/AdvertisementStore";
import type { IAdvertisement } from "../../../entities/Advertisement/types/Advertisement";

export const AdvertisementsApproveAction = ({ advertisement }: { advertisement: IAdvertisement }) => {
  const { approveAdvertisement } = useAdvertisementStore();

  const handleApprove = async () => {
    await approveAdvertisement(advertisement.id);
  };

  return (
    <>
      <Button type="primary" size="large" icon={<CheckOutlined />} onClick={handleApprove} disabled={advertisement.status !== "pending"}>
        Одобрить
      </Button>
    </>
  );
};
