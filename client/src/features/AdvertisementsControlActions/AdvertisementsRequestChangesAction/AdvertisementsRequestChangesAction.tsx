import { Button, Form, Modal, Select, Input } from "antd";
import { useAdvertisementStore } from "../../../entities/Advertisement/model/AdvertisementStore";
import type { IAdvertisement } from "../../../entities/Advertisement/types/Advertisement";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

export const AdvertisementsRequestChangesAction = ({ advertisement }: { advertisement: IAdvertisement }) => {
  const { requestChangesAdvertisement } = useAdvertisementStore();
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [showCustomReason, setShowCustomReason] = useState(false);
  const [form] = Form.useForm();

  const handleRequestChanges = async (values: { reason: string; comment?: string; customReason?: string }) => {
    let finalReason = values.reason;

    if (values.reason === "Другое" && values.customReason) {
      finalReason = `Другое: ${values.customReason}`;
    }

    await requestChangesAdvertisement(advertisement.id, finalReason, values.comment);
    setChangesModalVisible(false);
    setShowCustomReason(false);
    form.resetFields();
  };

  const handleReasonChange = (value: string) => {
    setShowCustomReason(value === "Другое");
  };

  const handleModalClose = () => {
    setChangesModalVisible(false);
    setShowCustomReason(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" size="large" icon={<ReloadOutlined />} onClick={() => setChangesModalVisible(true)} disabled={advertisement.status !== "pending"}>
        Доработка
      </Button>
      <Modal title="Запрос изменений" open={changesModalVisible} onCancel={handleModalClose} footer={null}>
        <Form form={form} onFinish={handleRequestChanges} layout="vertical">
          <Form.Item name="reason" label="Причина запроса изменений" rules={[{ required: true, message: "Выберите причину" }]}>
            <Select placeholder="Выберите причину" onChange={handleReasonChange}>
              <Option value="Запрещенный товар">Запрещенный товар</Option>
              <Option value="Неверная категория">Неверная категория</Option>
              <Option value="Некорректное описание">Некорректное описание</Option>
              <Option value="Проблемы с фото">Проблемы с фото</Option>
              <Option value="Подозрение на мошенничество">Подозрение на мошенничество</Option>
              <Option value="Другое">Другое</Option>
            </Select>
          </Form.Item>

          {showCustomReason && (
            <Form.Item name="customReason" label="Укажите причину" rules={[{ required: true, message: "Введите причину" }]}>
              <Input placeholder="Опишите причину запроса изменений" />
            </Form.Item>
          )}

          <Form.Item name="comment" label="Комментарий">
            <Input.TextArea placeholder="Опишите, что нужно исправить" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить на доработку
            </Button>
            <Button onClick={handleModalClose} style={{ marginLeft: 8 }}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
