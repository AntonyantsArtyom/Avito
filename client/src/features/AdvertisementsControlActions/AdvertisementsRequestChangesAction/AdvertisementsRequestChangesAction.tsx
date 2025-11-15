import { Button, Form, message, Modal, Select, Input } from "antd";
import { useAdvertisementStore } from "../../../entities/Advertisement/model/AdvertisementStore";
import type { IAdvertisement } from "../../../entities/Advertisement/types/Advertisement";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
const { Option } = Select;

export const AdvertisementsRequestChangesAction = ({ advertisement }: { advertisement: IAdvertisement }) => {
  const { requestChangesAdvertisement } = useAdvertisementStore();
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleRequestChanges = async (values: { reason: string; comment?: string }) => {
    try {
      await requestChangesAdvertisement(advertisement.id, values.reason, values.comment);
      setChangesModalVisible(false);
      form.resetFields();
      message.success("Запрос изменений отправлен");
    } catch (error) {
      message.error("Ошибка при запросе изменений");
    }
  };

  return (
    <>
      <Button type="primary" size="large" icon={<ReloadOutlined />} onClick={() => setChangesModalVisible(true)} disabled={advertisement.status !== "pending"}>
        Доработка
      </Button>
      <Modal title="Запрос изменений" open={changesModalVisible} onCancel={() => setChangesModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleRequestChanges} layout="vertical">
          <Form.Item name="reason" label="Причина запроса изменений" rules={[{ required: true, message: "Выберите причину" }]}>
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
            <Input.TextArea placeholder="Опишите, что нужно исправить" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить на доработку
            </Button>
            <Button onClick={() => setChangesModalVisible(false)} style={{ marginLeft: 8 }}>
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
