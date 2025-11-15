import { Button, Form, message, Modal, Select, Input } from "antd";
import { useAdvertisementStore } from "../../../entities/Advertisement/model/AdvertisementStore";
import type { IAdvertisement } from "../../../entities/Advertisement/types/Advertisement";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

export const AdvertisementsRejectAction = ({ advertisement }: { advertisement: IAdvertisement }) => {
  const { rejectAdvertisement } = useAdvertisementStore();
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleReject = async (values: { reason: string; comment?: string }) => {
    try {
      await rejectAdvertisement(advertisement.id, values.reason, values.comment);
      setRejectModalVisible(false);
      form.resetFields();
      message.success("Объявление отклонено");
    } catch (error) {
      message.error("Ошибка при отклонении объявления");
    }
  };

  return (
    <>
      <Button type="primary" size="large" icon={<CloseOutlined />} onClick={() => setRejectModalVisible(true)} disabled={advertisement.status !== "pending"}>
        Отклонить
      </Button>
      <Modal title="Отклонить объявление" open={rejectModalVisible} onCancel={() => setRejectModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleReject} layout="vertical">
          <Form.Item name="reason" label="Причина отклонения" rules={[{ required: true, message: "Выберите причину" }]}>
            <Select placeholder="Выберите причину">
              <Option value="Запрещенный товар">Запрещенный товар</Option>
              <Option value="Неверная категория">Неверная категория</Option>
              <Option value="Некорректное описание">Некорректное описание</Option>
              <Option value="Проблемы с фото">Проблемы с фото</Option>
              <Option value="Подозрение на мошенничество">Подозрение на мошенничество</Option>
              <Option value="Другое">Другое</Option>
            </Select>
          </Form.Item>

          <Form.Item name="comment" label="Комментарий">
            <Input.TextArea placeholder="Дополнительный комментарий" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" danger>
              Отклонить
            </Button>
            <Button onClick={() => setRejectModalVisible(false)} style={{ marginLeft: 8 }}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
