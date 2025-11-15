import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IAdvertisement } from "../../entities/Advertisement/types/Advertisement";
import { AdvertisementFullInfo } from "../../entities/Advertisement/UI/AdvertisementFullInfo/AdvertisementFullInfo";
import { AdvertisementModerationHistory } from "../../entities/Advertisement/UI/AdvertisementModerationHistory/AdvertisementModerationHistory";
import { StyledButtonsArea, StyledContainer, StyledNavigation } from "./AdvertisementsItemPage.styles";
import { CheckOutlined, ReloadOutlined, CloseOutlined, ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Typography, Modal, Form, Select, Input, message } from "antd";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { AdvertisementGallery } from "../../entities/Advertisement/UI/AdvertisementGallery/AdvertisementGallery";

const { Option } = Select;

export const AdvertisementsItemPage = () => {
  const [advertisement, setAdvertisement] = useState<IAdvertisement | null>(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { approveAdvertisement, rejectAdvertisement, requestChangesAdvertisement } = useAdvertisementStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();

    if (id) {
      fetchAdvertisement(id);
    }
  }, []);

  const fetchAdvertisement = async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/v1/ads/${id}`);
    const data = await response.json();
    setAdvertisement(data);
  };

  const handleApprove = async () => {
    if (!advertisement) return;

    try {
      await approveAdvertisement(advertisement.id);
      fetchAdvertisement(advertisement.id.toString());
      message.success("Объявление одобрено");
    } catch (error) {
      message.error("Ошибка при одобрении объявления");
    }
  };

  const handleReject = async (values: { reason: string; comment?: string }) => {
    if (!advertisement) return;

    try {
      await rejectAdvertisement(advertisement.id, values.reason, values.comment);
      fetchAdvertisement(advertisement.id.toString());
      setRejectModalVisible(false);
      form.resetFields();
      message.success("Объявление отклонено");
    } catch (error) {
      message.error("Ошибка при отклонении объявления");
    }
  };

  const handleRequestChanges = async (values: { reason: string; comment?: string }) => {
    if (!advertisement) return;

    try {
      await requestChangesAdvertisement(advertisement.id, values.reason, values.comment);
      fetchAdvertisement(advertisement.id.toString());
      setChangesModalVisible(false);
      form.resetFields();
      message.success("Запрос изменений отправлен");
    } catch (error) {
      message.error("Ошибка при запросе изменений");
    }
  };

  const handleBackToList = () => {
    navigate("/list");
  };

  if (!advertisement) return null;

  return (
    <StyledContainer>
      <AdvertisementGallery images={advertisement.images} />
      <AdvertisementModerationHistory moderationHistory={advertisement.moderationHistory} />
      <AdvertisementFullInfo characteristics={advertisement.characteristics} seller={advertisement.seller} />
      <StyledButtonsArea>
        <Button type="primary" size="large" icon={<CheckOutlined />} onClick={handleApprove} disabled={advertisement.status !== "pending"}>
          Одобрить
        </Button>

        <Button type="primary" size="large" icon={<CloseOutlined />} onClick={() => setRejectModalVisible(true)} disabled={advertisement.status !== "pending"}>
          Отклонить
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<ReloadOutlined />}
          onClick={() => setChangesModalVisible(true)}
          disabled={advertisement.status !== "pending"}
        >
          Доработка
        </Button>
      </StyledButtonsArea>

      <StyledNavigation>
        <Typography.Text onClick={handleBackToList} style={{ cursor: "pointer" }}>
          <ArrowLeftOutlined />К списку
        </Typography.Text>

        <div>
          <Typography.Text style={{ cursor: "pointer" }}>
            <LeftOutlined />
            Предыдущий
          </Typography.Text>
          {" | "}
          <Typography.Text style={{ cursor: "pointer" }}>
            Следующий
            <RightOutlined />
          </Typography.Text>
        </div>
      </StyledNavigation>

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
    </StyledContainer>
  );
};
